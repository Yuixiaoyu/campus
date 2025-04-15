package com.xiaoyu.campus.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName items
 */
@TableName(value ="items")
@Data
public class Items implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 标题（如：丢失黑色钱包）
     */
    private String title;

    /**
     * 详细描述
     */
    private String description;

    /**
     * 类型（1：丢失，2：招领）
     */
    private Integer itemType;

    /**
     * 分类
     */
    private String category;

    /**
     * 发布人ID
     */
    private Long userId;

    /**
     * 位置(如：7号楼711T）
     */
    private String location;

    /**
     * 当前位置
     */
    private String currentLocation;

    /**
     * 状态（0：待找回，1：已找回）
     */
    private Integer status;

    /**
     * 图片url
     */
    private String url;

    /**
     * 丢失/拾取时间
     */
    private Date eventTime;

    /**
     * 创建时间
     */
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}