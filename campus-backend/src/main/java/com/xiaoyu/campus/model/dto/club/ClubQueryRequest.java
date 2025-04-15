package com.xiaoyu.campus.model.dto.club;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.xiaoyu.campus.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * ClassName: ClubQueryRequest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-31 9:58
 * @version: 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ClubQueryRequest extends PageRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 创建人ID
     */
    private Long userId;

    /**
     * 社团名称
     */
    private String name;

}
