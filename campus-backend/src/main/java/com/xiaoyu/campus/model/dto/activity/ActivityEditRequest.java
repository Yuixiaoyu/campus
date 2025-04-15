package com.xiaoyu.campus.model.dto.activity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @TableName activity
 */
@Data
public class ActivityEditRequest implements Serializable {

    /**
     * 活动ID
     */
    private Long id;

    /**
     * 活动标题
     */
    private String title;

    /**
     * 活动简介
     */
    private String profile;

    /**
     * 活动类别
     */
    private String category;

    /**
     * 发布人ID
     */
    private Long userId;

    /**
     * 封面图片
     */
    private String coverPicture;

    /**
     * 主办单位
     */
    private String organizers;

    /**
     * 地址
     */
    private String position;

    /**
     * 最大报名人数
     */
    private Integer maxSignups;

    /**
     * 活动对象
     */
    private String targetUsers;


    /**
     * 开始时间
     */
    private Date startTime;

    /**
     * 结束时间
     */
    private Date endTime;


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}