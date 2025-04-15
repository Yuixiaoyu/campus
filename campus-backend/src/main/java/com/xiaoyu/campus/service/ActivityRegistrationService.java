package com.xiaoyu.campus.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.dto.activity.ActivityRegisterRequest;
import com.xiaoyu.campus.model.entity.ActivityRegistration;
import com.xiaoyu.campus.model.vo.ActivityVO;

import java.util.List;

/**
* @author 张飞宇
* @description 针对表【activity_registration】的数据库操作Service
* @createDate 2025-03-21 15:03:37
*/
public interface ActivityRegistrationService extends IService<ActivityRegistration> {


    //报名
    boolean registerActivity(ActivityRegisterRequest activityRegisterRequest);

    /**
     * 获取用户报名的活动列表
     * @param userId
     * @return
     */
    List<ActivityVO> getActivityVOByJoinUserId(Long userId);

}
