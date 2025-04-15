package com.xiaoyu.campus.model.dto.feedback;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class FeedbackAddRequest implements Serializable {


    private static final long serialVersionUID = -7073181091380213608L;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 内容
     */
    private String content;

    /**
     * 反馈图片链接
     */
    private List<String> imageList;

    /**
     * 联系方式
     */
    private String relation;

}