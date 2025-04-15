package com.xiaoyu.campus.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.model.dto.activity.ActivityAddRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityEditRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityQueryRequest;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.entity.Activity;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.vo.ActivityVO;
import com.xiaoyu.campus.model.vo.ArticleVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author 张飞宇
* @description 针对表【activity】的数据库操作Service
* @createDate 2025-03-19 09:53:51
*/
public interface ActivityService extends IService<Activity> {


    /**
     * 查询活动
     * @param activityQueryRequest
     * @return
     */
    QueryWrapper<Activity> getQueryWrapper(ActivityQueryRequest activityQueryRequest);


    /**
     * 获取活动分页
     * @param activityPage
     * @param request
     * @return
     */
    Page<ActivityVO> getActivityVOPage(Page<Activity> activityPage, HttpServletRequest request);


    /**
     * 发布活动
     * @param activityAddRequest
     * @return
     */
    Long publishActivity(ActivityAddRequest activityAddRequest);


    /**
     * 编辑活动
     * @param activityEditRequest
     * @return
     */
    boolean updateActivity(ActivityEditRequest activityEditRequest);


    /**
     * 删除活动
     * @param id
     * @return
     */
    boolean deleteActivity(Long id);








}
