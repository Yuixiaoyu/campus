package com.xiaoyu.campus.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.xiaoyu.campus.model.entity.User;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Data
public class ItemsDetailVO implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 标题（如：丢失黑色钱包）
     */
    private String title;

    /**
     * 用户信息
     */
    private UserVO userVO;

    /**
     * 图片url
     */
    private List<String> url;

    /**
     * 详细描述
     */
    private String description;

    /**
     * 类型（1：丢失，2：招领）
     */
    private Integer itemType;

    /**
     * 分类
     */
    private String category;

    /**
     * 位置(如：7号楼711T）
     */
    private String location;

    /**
     * 状态（0：待找回，1：已找回）
     */
    private Integer status;

    /**
     * 丢失/拾取时间
     */
    private Date eventTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}