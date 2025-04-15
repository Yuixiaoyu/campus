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
 * @TableName club
 */
@TableName(value ="club")
@Data
public class Club implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 创建人ID
     */
    private Long userId;

    /**
     * 社团名称
     */
    private String name;

    /**
     * 社团头像
     */
    private String avatar;

    /**
     * 社团简介
     */
    private String profile;

    /**
     * 封面图片
     */
    private String cover;

    /**
     * 社团荣誉
     */
    private String awards;

    /**
     * 累计加入人数
     */
    private Integer grandTotal;

    /**
     * 创建时间
     */
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}