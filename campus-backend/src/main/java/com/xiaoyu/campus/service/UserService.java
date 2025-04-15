package com.xiaoyu.campus.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xiaoyu.campus.model.dto.user.UserQueryRequest;
import com.xiaoyu.campus.model.dto.user.UserRegisterRequest;
import com.xiaoyu.campus.model.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.vo.LoginUserVo;
import com.xiaoyu.campus.model.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
* @author 张飞宇
* @description 针对表【user(用户表)】的数据库操作Service
* @createDate 2025-02-04 14:26:25
*/
public interface UserService extends IService<User> {

    long userRegister(UserRegisterRequest userRegisterRequest);

    LoginUserVo userLogin(String userAccount, String userPassword, HttpServletRequest request);

    LoginUserVo getLoginUserVO(User user);

    List<UserVO> getUserVOList(List<User> userList);

    UserVO getUserVO(User user);

    User getLoginUser();

    boolean userLogout();

    QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest);

    String getEncryptPassword(String userPassword);

    boolean isAdmin(User user);

    /**
     *  微信登录
     * @param code
     * @return
     */
    LoginUserVo wxLogin(String code);

    // UserServiceImpl.java
    Map<Long, UserVO> getUserVOMapByIds(Set<Long> userIds);


    UserVO getUserVOByUserId(Long userId);
}
