package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.util.ObjUtil;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.comment.CommentAddRequest;
import com.xiaoyu.campus.model.vo.CommentVO;
import com.xiaoyu.campus.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * ClassName: CommentController
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-23 16:42
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    @PostMapping("/add")
    @SaCheckLogin
    public BaseResponse<Boolean> addComment(@RequestBody CommentAddRequest commentAddRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(commentAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = commentService.addComment(commentAddRequest);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "评论失败");
        return ResultUtils.success(true);
    }

    @GetMapping("/list")
    public BaseResponse<List<CommentVO>> getCommentListByArticleId(Long articleId) {
        if (articleId < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<CommentVO> commentVOList = commentService.getCommentListByArticleId(articleId);
        return ResultUtils.success(commentVOList);
    }




}
