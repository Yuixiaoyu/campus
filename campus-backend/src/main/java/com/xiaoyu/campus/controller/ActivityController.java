package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.activity.ActivityAddRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityEditRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityQueryRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityRegisterRequest;
import com.xiaoyu.campus.model.entity.Activity;
import com.xiaoyu.campus.model.vo.ActivityVO;
import com.xiaoyu.campus.service.ActivityRegistrationService;
import com.xiaoyu.campus.service.ActivityService;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * ClassName: ActivityController
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-23 16:42
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/activity")
public class ActivityController {

    @Resource
    private ActivityService activityService;

    @Resource
    private ActivityRegistrationService activityRegistrationService;

    @PostMapping("/publish")
    @SaCheckLogin
    public BaseResponse<Long> publishActivity(@RequestBody ActivityAddRequest activityAddRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(activityAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long activity = activityService.publishActivity(activityAddRequest);
        return ResultUtils.success(activity);
    }

    @PostMapping("/activityList/page")
    public BaseResponse<Page<ActivityVO>> getActivityList(@RequestBody ActivityQueryRequest activityQueryRequest, HttpServletRequest request) {
        long current = activityQueryRequest.getCurrent();
        long size = activityQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Activity> picturePage = activityService.page(new Page<>(current, size),
                activityService.getQueryWrapper(activityQueryRequest));
        // 获取封装类
        return ResultUtils.success(activityService.getActivityVOPage(picturePage, request));
    }

    @PostMapping("/registration")
    @SaCheckLogin
    public BaseResponse<Boolean> registrationActivity(@RequestBody ActivityRegisterRequest activityRegisterRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(activityRegisterRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = activityRegistrationService.registerActivity(activityRegisterRequest);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(result);
    }


    @PostMapping("/update")
    @SaCheckLogin
    public BaseResponse<Boolean> updateActivity(@RequestBody ActivityEditRequest activityEditRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(activityEditRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = activityService.updateActivity(activityEditRequest);
        return ResultUtils.success(result);
    }


    @PostMapping("/remove/{id}")
    @SaCheckLogin
    public BaseResponse<Boolean> removeActivity(@PathVariable("id") Long id) {
        //校验参数是否为空
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = activityService.deleteActivity(id);
        return ResultUtils.success(result);
    }

    @PostMapping("/get/{id}")
    @SaCheckLogin
    public BaseResponse<List<ActivityVO>> getActivityVOByJoinUserId(@PathVariable("id") Long id) {
        //校验参数是否为空
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<ActivityVO> activityVOList = activityRegistrationService.getActivityVOByJoinUserId(id);
        if (CollectionUtil.isEmpty(activityVOList)){
            return ResultUtils.success(new ArrayList<>());
        }
        return ResultUtils.success(activityVOList);
    }


}
