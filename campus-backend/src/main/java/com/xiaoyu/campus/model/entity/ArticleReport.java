package com.xiaoyu.campus.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.List;

import lombok.Data;

/**
 * 
 * @TableName article_report
 */
@TableName(value ="article_report")
@Data
public class ArticleReport implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 举报者id
     */
    private Long userId;

    /**
     * 被举报文章id
     */
    private Long articleId;

    /**
     * 举报原因
     */
    private String reason;

    /**
     * 证明图片
     */
    private String images;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}