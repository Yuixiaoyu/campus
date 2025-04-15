package com.xiaoyu.campus.model.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName match_records
 */
@TableName(value ="match_records")
@Data
public class MatchRecords implements Serializable {
    /**
     * id
     */
    @TableId
    private Long id;

    /**
     * 招领物品id
     */
    private Long foundItemId;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 描述物品特征
     */
    private String description;

    /**
     * 证明图片
     */
    private String url;

    /**
     * 状态（0：待处理，1：已通过，2：已拒绝）
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}