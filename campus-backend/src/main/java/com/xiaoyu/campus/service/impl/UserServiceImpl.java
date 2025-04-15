package com.xiaoyu.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.common.WechatPhoneResponse;
import com.xiaoyu.campus.common.WxApp;
import com.xiaoyu.campus.constant.UserConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.mapper.UserMapper;
import com.xiaoyu.campus.model.dto.user.UserQueryRequest;
import com.xiaoyu.campus.model.dto.user.UserRegisterRequest;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.enums.UserRoleEnum;
import com.xiaoyu.campus.model.vo.LoginUserVo;
import com.xiaoyu.campus.model.vo.UserVO;
import com.xiaoyu.campus.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author xiaoyu
 * @description 针对表【user(用户)】的数据库操作Service实现
 * @createDate 2024-12-11 23:06:52
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {


    @Resource
    private WxApp wxApp;


    /**
     * 用户注册
     *
     * @param userRegisterRequest 用户注册dto
     * @return 返回用户id
     */
    @Override
    public long userRegister(UserRegisterRequest userRegisterRequest) {

        //校验参数
        if (ObjUtil.isEmpty(userRegisterRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }

        if (userRegisterRequest.getUserAccount().length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (userRegisterRequest.getUserPassword().length() < 8 || userRegisterRequest.getCheckPassword().length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        if (!userRegisterRequest.getUserPassword().equals(userRegisterRequest.getCheckPassword())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入密码不一致");
        }

        //检查数据库中是否存在该数据
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userRegisterRequest.getUserAccount());

        Long count = this.baseMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "当前账户已存在");
        }
        //对密码进行加密操作
        String encryptPassword = getEncryptPassword(userRegisterRequest.getUserPassword());
        User user = new User();
        user.setUserAccount(userRegisterRequest.getUserAccount());
        user.setUserPassword(encryptPassword);
        user.setUserName("无名");
        user.setUserRole(UserRoleEnum.UESR.getValue());
        boolean saveResult = this.save(user);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库异常");
        }
        //主键回填
        return user.getId();
    }

    /**
     * 用户登录
     *
     * @param userAccount  用户账户
     * @param userPassword 用户密码
     * @param request
     * @return
     */
    @Override
    public LoginUserVo userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        //校验
        if (StrUtil.hasBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4 || userPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账户或密码错误");
        }
        //对用户的密码进行加密
        String encryptPassword = getEncryptPassword(userPassword);

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserAccount, userAccount);
        queryWrapper.eq(User::getUserPassword, encryptPassword);

        //查询数据库找到对应数据
        User user = this.baseMapper.selectOne(queryWrapper);
        if (ObjUtil.isEmpty(user)) {
            log.info("user login failed,userAccount cannot match UserPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在或密码错误");
        }
        //保存用户的登录态，遗弃，微信小程序无法获取到cookie和session，因此采用saToken来实现持久化
        //request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE, user);
        StpUtil.login(user.getId());
        String tokenValue = StpUtil.getTokenValue();
        StpUtil.getSession().set(UserConstant.USER_LOGIN_STATE, user);
        LoginUserVo loginUserVO = getLoginUserVO(user);
        loginUserVO.setToken(tokenValue);
        return loginUserVO;
    }

    @Override
    public LoginUserVo wxLogin(String code) {
        if (StrUtil.isEmpty(code)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        HashMap<String, Object> getTokenData = new HashMap<>();
        getTokenData.put("grant_type", "client_credential");
        getTokenData.put("appid", wxApp.getAppid());
        getTokenData.put("secret", wxApp.getAppSecret());

        String result = HttpUtil.get("https://api.weixin.qq.com/cgi-bin/token", getTokenData);
        JSONObject jsonObject = JSONUtil.parseObj(result);
        String access_token = jsonObject.get("access_token").toString();
        HashMap<String, Object> getPhoneNumberData = new HashMap<>();
        getPhoneNumberData.put("code", code);
        String codeJson = JSONUtil.toJsonStr(getPhoneNumberData);
        String getPhoneResult = HttpUtil.post("https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=" + access_token, codeJson);

        WechatPhoneResponse wechatPhoneResponse = JSONUtil.toBean(getPhoneResult, WechatPhoneResponse.class);

        if (wechatPhoneResponse.getErrCode() != null) {
            log.error("wechat get phone number error:", wechatPhoneResponse.getErrMsg());
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "获取手机号失败");
        }

        String phoneNumber = wechatPhoneResponse.getPhoneInfo().getPhoneNumber();

        //拿到手机号之后先查询数据库是否有用户信息
        User user = baseMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getUserPhone, phoneNumber));
        if (user == null) {
            //没有用户信息，则创建用户
            user = new User();
            user.setUserPhone(phoneNumber);
            user.setUserName("微信用户" + RandomUtil.randomString(5));
            user.setImageUrl("https://minio.fybreeze.cn/campus/INGCaCjrYtS459d8084868d79c9b3aa19644e705d2a6.webp");
            boolean saveResult = save(user);
            ThrowUtils.throwIf(!saveResult, ErrorCode.SYSTEM_ERROR, "创建用户失败");
        }
        user = baseMapper.selectById(user.getId());
        //用户信息存在,直接登录
        StpUtil.login(user.getId());
        LoginUserVo loginUserVo = BeanUtil.copyProperties(user, LoginUserVo.class);
        loginUserVo.setTagList(JSONUtil.toList(user.getTag(), String.class));
        String tokenValue = StpUtil.getTokenValue();
        loginUserVo.setToken(tokenValue);
        StpUtil.getSession().set(UserConstant.WX_LOGIN_STATUS, user);
        return loginUserVo;
    }

    /**
     * 获取脱敏用户
     *
     * @param user 用户信息
     * @return 返回脱敏后的登录用户信息
     */
    @Override
    public LoginUserVo getLoginUserVO(User user) {
        if (user == null) {
            return null;
        }
        LoginUserVo loginUserVo = BeanUtil.copyProperties(user, LoginUserVo.class);
        loginUserVo.setTagList(JSONUtil.toList(user.getTag(), String.class));
        return loginUserVo;
    }

    @Override
    public List<UserVO> getUserVOList(List<User> userList) {
        if (CollUtil.isEmpty(userList)) {
            return new ArrayList<>();
        }
        return userList.stream()
                .map(this::getUserVO)
                .collect(Collectors.toList());
    }

    /**
     * 获取脱敏用户的信息
     *
     * @param user 用户信息
     * @return
     */
    @Override
    public UserVO getUserVO(User user) {
        if (user == null) {
            return null;
        }
        UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);
        userVO.setTagList(JSONUtil.toList(user.getTag(), String.class));
        return userVO;
    }

    public User getLoginUser() {
        // 先判断是否已登录
        if (!StpUtil.isLogin()) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        //从登录态中获取用户信息
        Object userObj = StpUtil.getSession().get(UserConstant.USER_LOGIN_STATE);
        if (userObj == null) {
            userObj = StpUtil.getSession().get(UserConstant.WX_LOGIN_STATUS);
        }
        User currentUser = (User) userObj;
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        currentUser = this.getById(userId);
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentUser;
    }

    public boolean userLogout() {
        if (!StpUtil.isLogin() || StpUtil.getSession().get(UserConstant.USER_LOGIN_STATE) == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未登录");
        }
        // 移除登录态
        StpUtil.logout();
        return true;
    }

    @Override
    public QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest) {
        if (userQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = userQueryRequest.getId();
        String userAccount = userQueryRequest.getUserAccount();
        String userName = userQueryRequest.getUserName();
        String userProfile = userQueryRequest.getUserProfile();
        String userRole = userQueryRequest.getUserRole();
        String sortField = userQueryRequest.getSortField();
        String sortOrder = userQueryRequest.getSortOrder();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(ObjUtil.isNotNull(id), "id", id);
        queryWrapper.eq(StrUtil.isNotBlank(userRole), "userRole", userRole);
        queryWrapper.like(StrUtil.isNotBlank(userAccount), "userAccount", userAccount);
        queryWrapper.like(StrUtil.isNotBlank(userName), "userName", userName);
        queryWrapper.like(StrUtil.isNotBlank(userProfile), "userProfile", userProfile);
        queryWrapper.orderBy(StrUtil.isNotEmpty(sortField), sortOrder.equals("ascend"), sortField);
        return queryWrapper;
    }

    /**
     * 对密码加密
     *
     * @param userPassword 待加密的密码
     * @return 返回加密之后的密码
     */
    @Override
    public String getEncryptPassword(String userPassword) {
        //混淆密码，加盐
        final String SALT = "xiaoyu";
        return DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

    }

    @Override
    public boolean isAdmin(User user) {
        if (user == null) {
            return false;
        }
        return UserRoleEnum.ADMIN.getValue().equals(user.getUserRole());
    }

    // UserServiceImpl.java
    @Override
    public Map<Long, UserVO> getUserVOMapByIds(Set<Long> userIds) {
        if (CollectionUtil.isEmpty(userIds)) {
            return Collections.emptyMap();
        }
        return this.baseMapper.selectBatchIds(userIds)
                .stream()
                .map(user -> {
                    UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);
                    userVO.setTagList(JSONUtil.toList(user.getTag(), String.class));
                    return userVO;
                })
                .collect(Collectors.toMap(UserVO::getId, Function.identity()));
    }

    @Override
    public UserVO getUserVOByUserId(Long userId) {
        if (userId == null || userId < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = getById(userId);
        return getUserVO(user);
    }
}




