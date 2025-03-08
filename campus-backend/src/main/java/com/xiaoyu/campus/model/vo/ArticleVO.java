package com.xiaoyu.campus.model.vo;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.annotation.*;
import com.xiaoyu.campus.model.entity.Article;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 文章视图
 */
@Data
public class ArticleVO implements Serializable {

    /**
     * 文章id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 作者id
     */
    private Long userId;


    /**
     * 作者信息
     */
    private UserVO userVO;


    /**
     * 文章内容
     */
    private String content;

    /**
     * 标签（JSON数组）
     */
    private List<String> tags;

    /**
     * 浏览次数
     */
    private Integer viewCount;

    /**
     * 点赞次数
     */
    private Integer likeCount;

    /**
     * 评论次数
     */
    private Integer commentCount;


    /**
     * 文章图片
     */
    private List<String> imagesList;

    /**
     * 发布时间
     */
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * 封装类转对象
     */
    public static Article voToObj(ArticleVO articleVO) {
        if (articleVO == null) {
            return null;
        }
        Article article = new Article();
        BeanUtils.copyProperties(articleVO, article);
        // 类型不同，需要转换
        article.setTags(JSONUtil.toJsonStr(articleVO.getTags()));
        return article;
    }

    /**
     * 对象转封装类
     */
    public static ArticleVO objToVo(Article article) {
        if (article == null) {
            return null;
        }
        ArticleVO articleVO = new ArticleVO();
        BeanUtils.copyProperties(article, articleVO);
        // 类型不同，需要转换
        articleVO.setTags(JSONUtil.toList(article.getTags(), String.class));
        return articleVO;
    }
}