package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.dto.feedback.FeedbackAddRequest;
import com.xiaoyu.campus.model.entity.Feedback;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 张飞宇
* @description 针对表【feedback】的数据库操作Service
* @createDate 2025-03-17 09:37:57
*/
public interface FeedbackService extends IService<Feedback> {


    /**
     * 添加反馈
     * @param feedbackAddRequest
     * @return
     */
    Long addFeedBack(FeedbackAddRequest feedbackAddRequest);


}
