package com.xiaoyu.campus.model.dto.items;

import com.baomidou.mybatisplus.annotation.TableField;
import com.xiaoyu.campus.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * ClassName: ItemsAddRequest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-31 9:58
 * @version: 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ItemsQueryRequest extends PageRequest implements Serializable {

    /**
     * ID
     */
    private Long id;

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
     * 丢失/拾取开始时间
     */
    private Date startTime;

    /**
     * 丢失/拾取结束时间
     */
    private Date endTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
