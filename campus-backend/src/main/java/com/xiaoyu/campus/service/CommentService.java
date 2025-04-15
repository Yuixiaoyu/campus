package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.dto.comment.CommentAddRequest;
import com.xiaoyu.campus.model.entity.Comment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.vo.CommentVO;

import java.util.List;

/**
* @author 张飞宇
* @description 针对表【comment】的数据库操作Service
* @createDate 2025-03-13 20:09:35
*/
public interface CommentService extends IService<Comment> {


    /**
     * 发表评论
     * @param commentAddRequest
     * @return
     */
    boolean addComment(CommentAddRequest commentAddRequest);

    /**
     * 根据文章id获取评论数量
     * @param articleId
     * @return
     */
    Long getCommentCountByArticleId(Long articleId);

    /**
     * 根据文章id获取评论列表
     * @param articleId
     * @return
     */
    List<CommentVO> getCommentListByArticleId(Long articleId);






}
