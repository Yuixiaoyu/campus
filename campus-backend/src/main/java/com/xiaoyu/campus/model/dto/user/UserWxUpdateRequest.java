package com.xiaoyu.campus.model.dto.user;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserWxUpdateRequest implements Serializable {

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
     * 简介
     */
    private String userProfile;

    /**
     * 用户标签
     */
    private List<String> tagList;

    /**
     * 用户星座
     */
    private String constellation;

    /**
     * 用户性别
     */
    private Integer gender;


    private static final long serialVersionUID = 1L;
}
