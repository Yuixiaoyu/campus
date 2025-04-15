package com.xiaoyu.campus.model.dto.club;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class ClubAddRequest implements Serializable {


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
    private List<String> awards;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}