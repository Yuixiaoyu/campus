package com.xiaoyu.campus.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.feedback.FeedbackAddRequest;
import com.xiaoyu.campus.model.entity.Feedback;
import com.xiaoyu.campus.service.FeedbackService;
import com.xiaoyu.campus.mapper.FeedbackMapper;
import org.springframework.stereotype.Service;

/**
 * @author 张飞宇
 * @description 针对表【feedback】的数据库操作Service实现
 * @createDate 2025-03-17 09:37:57
 */
@Service
public class FeedbackServiceImpl extends ServiceImpl<FeedbackMapper, Feedback>
        implements FeedbackService {
    @Override
    public Long addFeedBack(FeedbackAddRequest feedbackAddRequest) {
        //校验非空
        if (ObjUtil.isEmpty(feedbackAddRequest)||StrUtil.isEmpty(feedbackAddRequest.getContent())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"内容不能为空~");
        }
        Feedback feedback = BeanUtil.copyProperties(feedbackAddRequest, Feedback.class);
        if (CollectionUtil.isNotEmpty(feedbackAddRequest.getImageList())) {
            feedback.setImages(feedbackAddRequest.getImageList().toString());
        }
        boolean result = save(feedback);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return feedback.getId();
    }
}




