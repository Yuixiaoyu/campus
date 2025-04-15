package com.xiaoyu.campus.model.dto.items;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * ClassName: ItemsEditRequest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-31 9:58
 * @version: 1.0
 */
@Data
public class ItemsEditRequest implements Serializable {


    /**
     * ID
     */
    private Long Id;

    /**
     * 标题（如：丢失黑色钱包）
     */
    private String title;

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
     * 发布人ID
     */
    private Long userId;

    /**
     * 位置(如：7号楼711T）
     */
    private String location;

    /**
     * 状态（0：待找回，1：已找回）
     */
    private Integer status;

    /**
     * 图片url
     */
    private List<String> urlList;

    /**
     * 丢失/拾取时间
     */
    private Date eventTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

}
