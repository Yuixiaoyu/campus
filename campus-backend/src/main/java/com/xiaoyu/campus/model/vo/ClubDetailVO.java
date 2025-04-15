package com.xiaoyu.campus.model.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 
 * @TableName club
 */
@Data
public class ClubDetailVO implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 创建人ID
     */
    private UserVO userVO;

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

    /**
     * 累计加入人数
     */
    private Integer grandTotal;

    private List<ActivityVO> activityVOList;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}