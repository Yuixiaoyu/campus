package com.xiaoyu.campus.model.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
public class ClubVO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 社团名称
     */
    private String name;

    /**
     * 社团简介
     */
    private String profile;

    /**
     * 封面图片
     */
    private String cover;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}