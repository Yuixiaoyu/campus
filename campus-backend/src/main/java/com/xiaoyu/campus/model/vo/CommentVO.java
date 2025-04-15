package com.xiaoyu.campus.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 
 * @TableName comment
 */
@TableName(value ="comment")
@Data
public class CommentVO implements Serializable {
    /**
     * 评论id
     */
    @TableId
    private Long id;

    /**
     * 文章id
     */
    private Long articleId;

    /**
     * 用户id
     */
    private UserVO userVO;

    /**
     * 评论内容
     */
    private String content;

    /**
     * 向谁回复
     */
    private UserVO parentUserVO;

    /**
     * 子评论列表
     */
    private List<CommentVO> replies;

    /**
     * 创建时间
     */
    private Date createTime;


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}