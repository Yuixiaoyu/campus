package com.xiaoyu.campus.model.dto.activity;

import lombok.Data;

/**
 * ClassName: ActivityRegisterRequest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-21 15:10
 * @version: 1.0
 */
@Data
public class ActivityRegisterRequest {

    /**
     * 活动id
     */
    private Long activityId;

    /**
     * 用户id
     */
    private Long userId;
}
