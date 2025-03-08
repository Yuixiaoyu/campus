package com.xiaoyu.campus.model.dto.article;

import lombok.Data;

import java.util.List;

/**
 * ClassName: ArticleReportRequest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-06 19:01
 * @version: 1.0
 */
@Data
public class ArticleReportRequest {

    /**
     * 文章id
     */
    private Long articleId;

    /**
     * 举报人id
     */
    private Long userId;

    /**
     * 举报原因
     */
    private String reason;

    /**
     * 图片
     */
    private List<String> images;

}
