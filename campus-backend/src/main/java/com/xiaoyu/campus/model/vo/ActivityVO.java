package com.xiaoyu.campus.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @TableName activity
 */
@Data
public class ActivityVO implements Serializable {


    /**
     * id
     */
    private Long id;

    /**
     * 创建用户id
     */
    private Long userId;

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
     * 活动点击量
     */
    private Integer hits;

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
     * 当前报名人数
     */
    private Integer currentSignups;

    /**
     * 活动对象
     */
    private String targetUsers;

    /**
     * 活动状态（0：未开始，1：进行中，2：已结束）
     */
    private Integer status;

    /**
     * 是否报名
     */
    private Boolean isRegistration;

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