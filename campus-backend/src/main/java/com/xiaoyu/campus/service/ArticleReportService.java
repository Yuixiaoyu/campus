package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.dto.article.ArticleReportRequest;
import com.xiaoyu.campus.model.entity.ArticleReport;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 张飞宇
* @description 针对表【article_report】的数据库操作Service
* @createDate 2025-03-07 21:22:55
*/
public interface ArticleReportService extends IService<ArticleReport> {


    /**
     * 举报文章
     * @param articleReportRequest
     * @return
     */
    boolean reportArticle(ArticleReportRequest articleReportRequest);
}
