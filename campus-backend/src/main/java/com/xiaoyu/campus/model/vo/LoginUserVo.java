package com.xiaoyu.campus.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 已登录用户视图（脱敏）
 * @TableName user
 */
@Data
public class LoginUserVo implements Serializable {


    private static final long serialVersionUID = 4778493586101283309L;

    /**
     * id
     */
    private Long id;

    /**
     * 账号
     */
    private String userAccount;

    /**
     * 用户昵称
     */
    private String userName;

    /**
     * 用户头像
     */
    private String imageUrl;

    /**
     * 用户简介
     */
    private String userProfile;

    /**
     * 用户星座
     */
    private String constellation;

    /**
     * 用户性别
     */
    private Integer gender;

    /**
     * 用户标签列表
     */
    private List<String> tagList;

    /**
     * 用户角色：user/admin
     */
    private String userRole;

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
     * 返回token信息随后每次请求携带token
     */
    private String token;

}