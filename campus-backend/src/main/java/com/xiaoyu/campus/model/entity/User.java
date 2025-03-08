package com.xiaoyu.campus.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;
import lombok.Value;

/**
 * 用户表
 * @TableName user
 */
@TableName(value ="user")
@Data
public class User implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 账户
     */
    private String userAccount;

    /**
     * 密码
     */
    private String userPassword;

    /**
     * 微信id
     */
    private String openid;

    /**
     * 用户昵称
     */
    private String userName;

    /**
     * 用户角色
     */
    private String userRole;

    /**
     * 用户积分
     */
    private Integer userScore;

    /**
     * 用户手机号
     */
    private String userPhone;

    /**
     * 用户简介
     */
    private String userProfile;

    /**
     * 用户头像
     */
    private String imageUrl;

    /**
     * 编辑时间
     */
    private Date editTime;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}