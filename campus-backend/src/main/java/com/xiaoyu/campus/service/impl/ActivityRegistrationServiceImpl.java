package com.xiaoyu.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.constant.ActivityConstant;
import com.xiaoyu.campus.constant.UserConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.mapper.ActivityRegistrationMapper;
import com.xiaoyu.campus.model.dto.activity.ActivityRegisterRequest;
import com.xiaoyu.campus.model.entity.Activity;
import com.xiaoyu.campus.model.entity.ActivityRegistration;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.vo.ActivityVO;
import com.xiaoyu.campus.service.ActivityRegistrationService;
import com.xiaoyu.campus.service.ActivityService;
import com.xiaoyu.campus.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
* @author 张飞宇
* @description 针对表【activity_registration】的数据库操作Service实现
* @createDate 2025-03-21 15:03:37
*/
@Service
@Slf4j
public class ActivityRegistrationServiceImpl extends ServiceImpl<ActivityRegistrationMapper, ActivityRegistration>
    implements ActivityRegistrationService{

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private ActivityService activityService;

    @Resource
    private TransactionTemplate transactionTemplate;

    @Resource
    private UserService userService;


    @Override
    public boolean registerActivity(ActivityRegisterRequest activityRegisterRequest) {
        if (ObjUtil.isEmpty(activityRegisterRequest)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //获取登陆用户信息
        User user = userService.getLoginUser();
        Long userId = activityRegisterRequest.getUserId();
        if (!Objects.equals(user.getId(),userId )){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户信息错误");
        }
        String lock = String.valueOf(user.getId()).intern();
        synchronized (lock) {
            transactionTemplate.execute(status -> {
                Long activityId = activityRegisterRequest.getActivityId();
                String key = ActivityConstant.REDIS_ACTIVITY_PREFIX + activityId;
                //判断当前用户是否已经报名
                Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, user.getId().toString());
                //如果未报名，可以报名
                if (BooleanUtil.isFalse(isMember)) {
                    ActivityRegistration activityRegistration = BeanUtil.copyProperties(activityRegisterRequest, ActivityRegistration.class);
                    boolean result = save(activityRegistration);
                    ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR,"报名失败");
                    boolean updateResult = activityService.update().setSql("currentSignups = currentSignups + 1").eq("id", activityId).update();
                    ThrowUtils.throwIf(!updateResult, ErrorCode.OPERATION_ERROR,"报名人数更新失败");
                    //保存用户到redis的set集合
                    stringRedisTemplate.opsForSet().add(key, user.getId().toString());
                } else {
                    //如果已经报名，取消报名
                    //throw new BusinessException(ErrorCode.PARAMS_ERROR,"不能重复报名");
                    boolean updateResult = activityService.update().setSql("currentSignups = currentSignups - 1").eq("id", activityId).update();
                    ThrowUtils.throwIf(!updateResult, ErrorCode.OPERATION_ERROR,"报名人数更新失败");
                    LambdaQueryWrapper<ActivityRegistration> queryWrapper = new LambdaQueryWrapper<>();
                    queryWrapper.eq(ActivityRegistration::getActivityId, activityId)
                            .eq(ActivityRegistration::getUserId, userId);
                    boolean removeResult = remove(queryWrapper);
                    ThrowUtils.throwIf(!removeResult, ErrorCode.OPERATION_ERROR,"取消报名失败");
                    //从redis的set集合中移除用户
                    stringRedisTemplate.opsForSet().remove(key, user.getId().toString());
                }
                return true;
            });
            return true;
        }
    }

    @Override
    public List<ActivityVO> getActivityVOByJoinUserId(Long userId) {
        if (userId == null || userId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户id错误");
        }
        LambdaQueryWrapper<ActivityRegistration> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ActivityRegistration::getUserId, userId);
        List<ActivityRegistration> activityRegistrationList = list(queryWrapper);
        return activityRegistrationList.stream().map(activityRegistration -> {
            Long activityId = activityRegistration.getActivityId();
            Activity activity = activityService.getById(activityId);
            ThrowUtils.throwIf(activity==null, ErrorCode.OPERATION_ERROR,"活动不存在");
            ActivityVO activityVO = BeanUtil.copyProperties(activity, ActivityVO.class);
            activityVO.setIsRegistration(true);
            return activityVO;
        }).collect(Collectors.toList());
    }
}




