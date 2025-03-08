package com.xiaoyu.campus.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.model.dto.article.ArticleAddRequest;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.article.ArticleReportRequest;
import com.xiaoyu.campus.model.dto.user.UserQueryRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.vo.ArticleVO;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author 张飞宇
* @description 针对表【article】的数据库操作Service
* @createDate 2025-02-16 15:16:18
*/
public interface ArticleService extends IService<Article> {

    /**
     * 发布文章
     * @param articleAddRequest
     */
    Long addArticle(ArticleAddRequest articleAddRequest);


    /**
     * 查询文章
     * @param articleQueryRequest
     * @return
     */
    QueryWrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest);


    /**
     * 获取文章分页
     * @param articlePage
     * @param request
     * @return
     */
    Page<ArticleVO> getArticleVOPage(Page<Article> articlePage, HttpServletRequest request);

    /**
     * 获取文章标签
     * @return
     */
    List<String> getArticleTags();

    /**
     * 通过用户id获取文章列表
     * @param userId
     * @return
     */
    List<ArticleVO> getArticleVOListByUserId(Long userId);



}
