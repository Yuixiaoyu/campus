package com.xiaoyu.campus.model.dto.matchRecords;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class MatchRecordsAddRequest implements Serializable {
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
    private List<String> urlList;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}