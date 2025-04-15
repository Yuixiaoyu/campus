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
import java.util.concurrent.ExecutionException;

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
    Long addArticle(ArticleAddRequest articleAddRequest) throws ExecutionException, InterruptedException;

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

    /**
     * 通过文章id获取文章详情信息
     * @param articleId
     * @return
     */
    ArticleVO getArticleVOByArticleId(Long articleId);

    /**
     * 文章点赞
     * @param articleId
     * @return
     */
    boolean likeArticle(Long articleId);

    /**
     * 获取待审核的文章列表
     * @return
     */
    List<ArticleVO> getArticleCheckList();


    /**
     * 删除文章
     * @param id
     * @return
     */
    boolean removeArticle(Long id);


    /**
     * 根据当前用户id获取到用户的点赞文章记录
     * @return
     */
    List<ArticleVO> getArticleVOLikeListByUserId(Long userId);




}
