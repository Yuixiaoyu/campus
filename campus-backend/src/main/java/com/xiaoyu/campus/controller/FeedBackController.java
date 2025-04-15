package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjUtil;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.feedback.FeedbackAddRequest;
import com.xiaoyu.campus.service.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * ClassName: FeedBackController
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-23 16:42
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/feedback")
public class FeedBackController {

    @Resource
    private FeedbackService feedbackService;

    @PostMapping("/add")
    @SaCheckLogin
    public BaseResponse<Long> addFeedBack(@RequestBody FeedbackAddRequest feedbackAddRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(feedbackAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long id = feedbackService.addFeedBack(feedbackAddRequest);
        return ResultUtils.success(id);
    }




}
