package com.xiaoyu.campus.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.houbb.sensitive.word.bs.SensitiveWordBs;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.article.ArticleAddRequest;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.article.ArticleReportRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.Image;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.enums.ArticleStatus;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.model.vo.UserVO;
import com.xiaoyu.campus.service.ArticleService;
import com.xiaoyu.campus.mapper.ArticleMapper;
import com.xiaoyu.campus.service.ImageService;
import com.xiaoyu.campus.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author 张飞宇
 * @description 针对表【article】的数据库操作Service实现
 * @createDate 2025-02-16 15:16:18
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article>
        implements ArticleService {



    @Resource
    private UserService userService;

    @Resource
    private ImageService imageService;

    private static final SensitiveWordBs sensitiveWordBs = SensitiveWordBs.newInstance();

    /**
     * 发布文章
     *
     * @param articleAddRequest
     */
    @Override
    @Transactional
    public Long addArticle(ArticleAddRequest articleAddRequest) {
        //1.校验参数
        if (BeanUtil.isEmpty(articleAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //2.查询用户是否登录
        User loginUser = userService.getLoginUser();
        if (loginUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        //3.操作数据库
        Article article = BeanUtil.copyProperties(articleAddRequest, Article.class);
        article.setUserId(loginUser.getId());
        boolean contains = sensitiveWordBs.contains(article.getContent());
        // 如果包含敏感词，将状态设置为未通过
        if (contains) {
            article.setStatus(ArticleStatus.REJECTED.getCode());
        }else{
            //不包含设置为已通过
            article.setStatus(ArticleStatus.APPROVED.getCode());
        }
        //待审核状态 将项目扩展为微服务架构时发送给消息队列之前设置为待审核，消费者处理消息再设置为对应的状态
        //article.setStatus(ArticleStatus.PENDING_REVIEW.getCode());
        boolean result = save(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        //调用上传图片服务
        List<String> images = articleAddRequest.getImages();
        if(CollUtil.isNotEmpty(images)) {
            List<Image> imageList = images.stream().map(url -> {
                Image image = new Image();
                image.setArticleId(article.getId());
                image.setUrl(url);
                return image;
            }).collect(Collectors.toList());
            boolean imageResult = imageService.uploadImages(imageList);
            ThrowUtils.throwIf(!imageResult, ErrorCode.OPERATION_ERROR, "图片保存失败");
        }
        return article.getId();
    }

    @Override
    public QueryWrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest) {
        QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
        if(BeanUtil.isEmpty(articleQueryRequest)) {
            return queryWrapper;
        }
        String content = articleQueryRequest.getContent();
        queryWrapper.like(StringUtils.isNotBlank(content), "content", content);
        queryWrapper.eq("status", ArticleStatus.APPROVED.getCode());
        queryWrapper.orderByDesc("createTime");
        return queryWrapper;
    }

    @Override
    public Page<ArticleVO> getArticleVOPage(Page<Article> articlePage, HttpServletRequest request) {
        List<Article> articleList = articlePage.getRecords();
        Page<ArticleVO> articleVOPage = new Page<>(articlePage.getCurrent(), articlePage.getSize(), articlePage.getTotal());
        if (CollUtil.isEmpty(articleList)){
            return articleVOPage;
        }
        List<ArticleVO> articleVOList = articleList.stream()
                .map(ArticleVO::objToVo)
                .collect(Collectors.toList());
        Set<Long> userIdSet = articleList.stream().map(Article::getUserId).collect(Collectors.toSet());
        Map<Long, List<User>> userIdUserListMap = userService.listByIds(userIdSet).stream().collect(Collectors.groupingBy(User::getId));
        articleVOList.forEach(articleVO -> {
            Long userId = articleVO.getUserId();
            User user = null;
            if (userIdUserListMap.containsKey(userId)){
                user = userIdUserListMap.get(userId).get(0);
            }
            articleVO.setUserVO(userService.getUserVO(user));
            Long articleVOId = articleVO.getId();
            List<String> imagesByArticleId = imageService.getImagesByArticleId(articleVOId);
            articleVO.setImagesList(imagesByArticleId);
        });
        articleVOPage.setRecords(articleVOList);

        return articleVOPage;
    }

    @Override
    public List<String> getArticleTags() {
        return Arrays.asList("闲聊","日常","答疑","搞笑","考研","考公","四六级","计算机","失物招领","兼职","游戏");
    }

    @Override
    public List<ArticleVO> getArticleVOListByUserId(Long userId) {
        if (userId<0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户ID错误");
        }
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getUserId,userId);
        //根据创建时间降序排列
        queryWrapper.orderByDesc(Article::getCreateTime);
        return this.list(queryWrapper).stream().map(article -> {
            ArticleVO articleVO = BeanUtil.copyProperties(article, ArticleVO.class);
            List<String> imagesList = imageService.getImagesByArticleId(article.getId());
            articleVO.setImagesList(imagesList);
            User user = userService.getById(userId);
            UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);
            articleVO.setUserVO(userVO);
            return articleVO;
        }).collect(Collectors.toList());
    }

}




