package com.xiaoyu.campus.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 
 * @TableName image
 */
@TableName(value ="image")
@Data
public class Image implements Serializable {
    /**
     * 图片id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 文章id
     */
    private Long articleId;

    /**
     * 图片URL
     */
    private String url;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}