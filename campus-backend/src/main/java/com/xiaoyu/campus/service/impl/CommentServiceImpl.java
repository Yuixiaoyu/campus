package com.xiaoyu.campus.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.model.entity.Comment;
import com.xiaoyu.campus.service.CommentService;
import com.xiaoyu.campus.mapper.CommentMapper;
import org.springframework.stereotype.Service;

/**
* @author 张飞宇
* @description 针对表【comment】的数据库操作Service实现
* @createDate 2025-02-16 20:48:29
*/
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment>
    implements CommentService{

    @Override
    public Long getArticleCommentCountByArticleId(Long articleId) {
        if (articleId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"文章id不能为空");
        }
        return lambdaQuery().eq(Comment::getArticleId, articleId).count();
    }
}




