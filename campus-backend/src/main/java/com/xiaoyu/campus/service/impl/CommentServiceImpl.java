package com.xiaoyu.campus.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.houbb.sensitive.word.bs.SensitiveWordBs;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.mapper.CommentMapper;
import com.xiaoyu.campus.model.dto.comment.CommentAddRequest;
import com.xiaoyu.campus.model.entity.Comment;
import com.xiaoyu.campus.model.vo.CommentVO;
import com.xiaoyu.campus.model.vo.UserVO;
import com.xiaoyu.campus.service.ArticleService;
import com.xiaoyu.campus.service.CommentService;
import com.xiaoyu.campus.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author 张飞宇
 * @description 针对表【comment】的数据库操作Service实现
 * @createDate 2025-03-13 20:09:35
 */
@Service
@Slf4j
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment>
        implements CommentService {

    @Resource
    private ArticleService articleService;

    @Resource
    private SensitiveWordBs sensitiveWordBs;

    @Resource
    private UserService userService;

    @Override
    @Transactional
    public boolean addComment(CommentAddRequest commentAddRequest) {
        //校验参数
        if (commentAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean contains = sensitiveWordBs.enableNumCheck(false).contains(commentAddRequest.getContent());
        ThrowUtils.throwIf(contains, ErrorCode.PARAMS_ERROR, "您的评论内容包含敏感词!");
        Comment comment = BeanUtil.copyProperties(commentAddRequest, Comment.class);
        boolean save = save(comment);
        ThrowUtils.throwIf(!save, ErrorCode.OPERATION_ERROR, "评论失败");
        //修改文章的评论数加1
        boolean update = articleService.update().setSql("commentCount = commentCount + 1")
                .eq("id", commentAddRequest.getArticleId()).update();
        ThrowUtils.throwIf(!update, ErrorCode.OPERATION_ERROR, "文章评论数更新失败");
        return true;
    }

    @Override
    public Long getCommentCountByArticleId(Long articleId) {
        if (articleId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<Comment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("article_id", articleId);
        return count(queryWrapper);
    }

    @Override
    public List<CommentVO> getCommentListByArticleId(Long articleId) {
        if (articleId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 1. 查询文章下所有评论（包含所有层级）
        QueryWrapper<Comment> query = new QueryWrapper<>();
        query.eq("articleId", articleId);
        List<Comment> allComments = list(query.orderByAsc("createTime"));
        if (CollectionUtil.isEmpty(allComments)) {
            return Collections.emptyList();
        }
        // 2. 构建评论映射关系
        Map<Long, List<Comment>> commentMap = allComments.stream()
                .collect(Collectors.groupingBy(Comment::getParentId));

        // 新增评论ID到评论对象的映射
        Map<Long, Comment> commentIdMap = allComments.stream()
                .collect(Collectors.toMap(Comment::getId, comment -> comment));

        // 3. 收集所有用户ID
        Set<Long> userIds = allComments.stream()
                .map(Comment::getUserId)
                .collect(Collectors.toSet());
        // 4. 批量获取用户信息
        Map<Long, UserVO> userVOMap = userService.getUserVOMapByIds(userIds);
        // 5. 构建扁平化评论树
        return buildFlattenedCommentTree(commentMap.get(0L), commentMap, userVOMap, commentIdMap);
    }



    private List<CommentVO> buildFlattenedCommentTree(List<Comment> comments,
                                                      Map<Long, List<Comment>> commentMap,
                                                      Map<Long, UserVO> userVOMap,
                                                      Map<Long, Comment> commentIdMap) {
        if (CollectionUtil.isEmpty(comments)) {
            return Collections.emptyList();
        }
        return comments.stream()
                .sorted(Comparator.comparing(Comment::getCreateTime).reversed())
                .map(topComment -> {
                    // 构建顶级评论VO
                    CommentVO topVo = convertToVO(topComment, userVOMap);

                    // 获取所有子评论（包括多层级）
                    List<Comment> allChildren = getAllChildren(topComment.getId(), commentMap);

                    // 转换子评论VO并设置父用户信息
                    List<CommentVO> childVOs = allChildren.stream()
                            .map(child -> {
                                CommentVO vo = convertToVO(child, userVOMap);
                                // 通过父评论ID获取父评论对象
                                Comment parentComment = commentIdMap.get(child.getParentId());
                                if (parentComment != null) {
                                    // 从用户映射中获取父级用户信息
                                    UserVO parentUserVO = userVOMap.get(parentComment.getUserId());
                                    vo.setParentUserVO(parentUserVO);
                                }
                                return vo;
                            })
                            .collect(Collectors.toList());
                    topVo.setReplies(childVOs);
                    return topVo;
                })
                .collect(Collectors.toList());
    }

    // 递归获取所有层级子评论（保持不变）
    private List<Comment> getAllChildren(Long parentId, Map<Long, List<Comment>> commentMap) {
        List<Comment> result = new ArrayList<>();
        List<Comment> directChildren = commentMap.getOrDefault(parentId, Collections.emptyList());

        for (Comment child : directChildren) {
            result.add(child);
            result.addAll(getAllChildren(child.getId(), commentMap));
        }

        return result.stream()
                .sorted(Comparator.comparing(Comment::getCreateTime))
                .collect(Collectors.toList());
    }

    // 通用VO转换方法（保持不变）
    private CommentVO convertToVO(Comment comment, Map<Long, UserVO> userVOMap) {
        CommentVO vo = BeanUtil.copyProperties(comment, CommentVO.class);
        vo.setUserVO(userVOMap.get(comment.getUserId()));
        return vo;
    }
}




