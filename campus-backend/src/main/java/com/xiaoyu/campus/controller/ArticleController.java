package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.article.ArticleAddRequest;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.article.ArticleReportRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.service.ArticleReportService;
import com.xiaoyu.campus.service.ArticleService;
import com.xiaoyu.campus.service.UserService;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import lombok.extern.slf4j.Slf4j;
import org.simpleframework.xml.Path;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * ClassName: ArticleController
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-23 16:42
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/article")
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @Resource
    private UploadFilesService uploadFilesService;

    @Resource
    private ArticleReportService articleReportService;

    @PostMapping("/add")
    @SaCheckLogin
    public BaseResponse<Long> addArticle(@RequestBody ArticleAddRequest articleAddRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(articleAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        try {
            Long ArticleId = articleService.addArticle(articleAddRequest);
            return ResultUtils.success(ArticleId);
        } catch (ExecutionException | InterruptedException e) {
            log.error("发布文章失败", e);
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"发布文章失败");
        }

    }

    /**
     * 上传图片文件列表
     *
     * @return
     */
    @PostMapping("/uploadImages")
    public BaseResponse<List<String>> uploadImages(@RequestParam("file") MultipartFile[] files) {
        List<String> urlList = new ArrayList<>();
        if (ObjUtil.isNotEmpty(files)) {
            try {
                urlList = uploadFilesService.uploadFileList(files);
            } catch (IOException e) {
                log.error("上传图片文件列表失败：{}", e.getMessage());
            }
        }
        return ResultUtils.success(urlList);
    }

    @PostMapping("/articleList/page")
    public BaseResponse<Page<ArticleVO>> getArticleList(@RequestBody ArticleQueryRequest articleQueryRequest, HttpServletRequest request) {
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Article> picturePage = articleService.page(new Page<>(current, size),
                articleService.getQueryWrapper(articleQueryRequest));
        // 获取封装类
        return ResultUtils.success(articleService.getArticleVOPage(picturePage, request));
    }

    //删除文章接口
    @PostMapping("/delete")
    @SaCheckLogin
    public BaseResponse<Boolean> deleteArticle(@RequestParam("id") Long id) {
        if (ObjUtil.isNull(id)||id<1){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = articleService.removeArticle(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR,"文章删除失败");
        return ResultUtils.success(true);
    }

    @GetMapping("/tags")
    public BaseResponse<List<String>> getArticleTags() {
        List<String> tagList = articleService.getArticleTags();
        return ResultUtils.success(tagList);
    }




    /**
     * 根据用户id获取文章
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    @SaCheckLogin
    @Deprecated
    public BaseResponse<List<ArticleVO>> getArticleByUserId(long id) {
        ThrowUtils.throwIf(id < 0, ErrorCode.PARAMS_ERROR);
        List<ArticleVO> articleListByUserId = articleService.getArticleVOListByUserId(id);
        return ResultUtils.success(articleListByUserId);
    }

    @PostMapping("/report")
    @SaCheckLogin
    public BaseResponse<Boolean> reportArticle(@RequestBody ArticleReportRequest articleReportRequest) {
        if (articleReportRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = articleReportService.reportArticle(articleReportRequest);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "举报信息保存失败");
        return ResultUtils.success(true);
    }


    /**
     * 根据文章id获取文章详细信息
     *
     * @param articleId
     * @return
     */
    @GetMapping("/get/detail")
    @SaCheckLogin
    public BaseResponse<ArticleVO> getArticleByArticleId(long articleId) {
        ThrowUtils.throwIf(articleId < 1, ErrorCode.PARAMS_ERROR);
        ArticleVO articleVO = articleService.getArticleVOByArticleId(articleId);
        return ResultUtils.success(articleVO);
    }


    /**
     * 文章点赞
     *
     * @param id
     * @return
     */
    @GetMapping("/like/{id}")
    @SaCheckLogin
    public BaseResponse<Boolean> likeComment(@PathVariable("id") Long id) {
        if (id < 1 || ObjUtil.isNull(id)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = articleService.likeArticle(id);
        return ResultUtils.success(result);
    }

    /**
     * 获取用户点赞文章列表
     *
     * @param id
     * @return
     */
    @GetMapping("/articleLike/{id}")
    @SaCheckLogin
    public BaseResponse<List<ArticleVO>> getArticleLikeByUserId(@PathVariable("id") Long id) {
        if (id < 1 || ObjUtil.isNull(id)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<ArticleVO> articleVOLikeListByUserId = articleService.getArticleVOLikeListByUserId(id);
        return ResultUtils.success(articleVOLikeListByUserId);
    }

    /**
     * 获取待审核的文章列表
     * @return
     */
    @GetMapping("/check")
    @SaCheckLogin
    public BaseResponse<List<ArticleVO>> getCheckArticleList() {
        List<ArticleVO> articleCheckList = articleService.getArticleCheckList();
        return ResultUtils.success(articleCheckList);
    }

}
