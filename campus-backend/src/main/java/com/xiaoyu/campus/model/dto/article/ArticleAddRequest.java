package com.xiaoyu.campus.model.dto.article;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Data
public class ArticleAddRequest implements Serializable {

    /**
     * 文章内容
     */
    private String content;

    /**
     * 标签
     */
    private List<String> tags;

    /**
     * 图片列表
     */
    private List<String> images;

    private static final long serialVersionUID = 1L;
}
