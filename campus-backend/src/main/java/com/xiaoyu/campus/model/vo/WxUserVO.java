package com.xiaoyu.campus.model.vo;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * ClassName: WxVO
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-02 19:42
 * @version: 1.0
 */
@Data
public class WxUserVO {
    /**
     * id
     */
    private Long id;


    /**
     * 用户昵称
     */
    private String userName;


    /**
     * 用户头像
     */
    private String imageUrl;

    /**
     * 用户星座
     */
    private String constellation;

    /**
     * 用户性别
     */
    private String gender;

    /**
     * 用户标签列表
     */
    private List<String> tagList;


    /**
     * 用户简介
     */
    private String userProfile;

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
}
