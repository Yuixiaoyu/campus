package com.xiaoyu.campus.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName activity_registration
 */
@TableName(value ="activity_registration")
@Data
public class ActivityRegistration implements Serializable {
    /**
     *  id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 活动id
     */
    private Long activityId;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 报名时间
     */
    private Date signupTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}