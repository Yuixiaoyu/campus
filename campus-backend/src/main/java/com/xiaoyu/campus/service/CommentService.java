package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.entity.Comment;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 张飞宇
* @description 针对表【comment】的数据库操作Service
* @createDate 2025-02-16 20:48:29
*/
public interface CommentService extends IService<Comment> {


    /**
     * 根据文章id获取评论数量
     * @param articleId
     * @return
     */
    Long getArticleCommentCountByArticleId(Long articleId);


}
