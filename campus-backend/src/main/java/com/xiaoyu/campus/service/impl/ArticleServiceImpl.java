package com.xiaoyu.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.thread.ThreadUtil;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.houbb.sensitive.word.bs.SensitiveWordBs;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.constant.ArticleConstant;
import com.xiaoyu.campus.constant.UserConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.mapper.ArticleMapper;
import com.xiaoyu.campus.model.dto.article.ArticleAddRequest;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.entity.*;
import com.xiaoyu.campus.model.enums.ArticleStatusEnum;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.model.vo.UserVO;
import com.xiaoyu.campus.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author 张飞宇
 * @description 针对表【article】的数据库操作Service实现
 * @createDate 2025-02-16 15:16:18
 */
@Service
@Slf4j
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article>
        implements ArticleService {


    @Resource
    private UserService userService;

    @Resource
    private ImageService imageService;

    @Resource
    private SensitiveWordBs sensitiveWordBs;

    @Resource
    @Lazy
    private CommentService commentService;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private UploadFilesService uploadFilesService;

    @Resource
    private TransactionTemplate transactionTemplate;

    @Resource
    private ArticleLikeService articleLikeService;

    /**
     * 发布文章
     *
     * @param articleAddRequest
     */
    @Override
    @Transactional
    public Long addArticle(ArticleAddRequest articleAddRequest) throws ExecutionException, InterruptedException {
        //1.校验参数
        if (articleAddRequest == null) {
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
        //异步敏感词检测（与主流程并行）
        Future<Boolean> sensitiveFuture = ThreadUtil.execAsync(() ->
                sensitiveWordBs.contains(article.getContent())
        );
        //boolean contains = sensitiveWordBs.contains(article.getContent());
        // 先将状态设置为待审核
        article.setStatus(ArticleStatusEnum.PENDING_REVIEW.getCode());

        //待审核状态 将项目扩展为微服务架构时发送给消息队列之前设置为待审核，消费者处理消息再设置为对应的状态
        //article.setStatus(ArticleStatus.PENDING_REVIEW.getCode());
        boolean result = save(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "发布失败");
        //调用上传图片服务
        List<String> images = articleAddRequest.getImages();
        if (CollUtil.isNotEmpty(images)) {
            ThreadUtil.execAsync(() -> {
                List<Image> imageList = images.stream().map(url -> {
                    Image image = new Image();
                    image.setArticleId(article.getId());
                    image.setUrl(url);
                    return image;
                }).collect(Collectors.toList());
                try {
                    boolean uploadResult = ThreadUtil.execAsync(() ->
                            imageService.uploadImages(imageList)
                    ).get();
                    if (!uploadResult) {
                        log.error("图片上传失败，articleId: {}", article.getId());
                    }
                } catch (InterruptedException | ExecutionException e) {
                    log.error("图片上传失败，articleId: {}", article.getId(), e);
                    throw new BusinessException(ErrorCode.OPERATION_ERROR, "图片上传失败");
                }
            });
        }
        //异步更新审核状态
        Boolean containsSensitive = sensitiveFuture.get();
        ThreadUtil.execAsync(() -> {
            Article updateEntity = new Article();
            updateEntity.setId(article.getId());
            updateEntity.setStatus(containsSensitive ?
                    ArticleStatusEnum.REJECTED.getCode() :
                    ArticleStatusEnum.APPROVED.getCode());
            updateById(updateEntity);
        });
        return article.getId();
    }

    @Override
    public QueryWrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest) {
        QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
        if (BeanUtil.isEmpty(articleQueryRequest)) {
            return queryWrapper;
        }
        String content = articleQueryRequest.getContent();
        Long userId = articleQueryRequest.getUserId();
        queryWrapper.like(StringUtils.isNotBlank(content), "content", content);
        queryWrapper.eq(ObjectUtil.isNotNull(userId), "userId", userId);
        queryWrapper.eq("status", ArticleStatusEnum.APPROVED.getCode());
        queryWrapper.orderByDesc("createTime");
        return queryWrapper;
    }

    //@Override
    //public Page<ArticleVO> getArticleVOPage(Page<Article> articlePage, HttpServletRequest request) {
    //    List<Article> articleList = articlePage.getRecords();
    //    Page<ArticleVO> articleVOPage = new Page<>(articlePage.getCurrent(), articlePage.getSize(), articlePage.getTotal());
    //    if (CollUtil.isEmpty(articleList)) {
    //        return articleVOPage;
    //    }
    //    List<ArticleVO> articleVOList = articleList.stream()
    //            .map(ArticleVO::objToVo)
    //            .collect(Collectors.toList());
    //    Set<Long> userIdSet = articleList.stream().map(Article::getUserId).collect(Collectors.toSet());
    //    Map<Long, List<User>> userIdUserListMap = userService.listByIds(userIdSet).stream().collect(Collectors.groupingBy(User::getId));
    //    User loginUser = userService.getLoginUser();
    //    articleVOList.forEach(articleVO -> {
    //        Long userId = articleVO.getUserId();
    //        User user = null;
    //        if (userIdUserListMap.containsKey(userId)) {
    //            user = userIdUserListMap.get(userId).get(0);
    //        }
    //        articleVO.setUserVO(userService.getUserVO(user));
    //        Long articleId = articleVO.getId();
    //        List<String> imagesByArticleId = imageService.getImagesByArticleId(articleId);
    //        articleVO.setImagesList(imagesByArticleId);
    //        String key = ArticleConstant.REDIS_ARTICLE_PREFIX + articleId;
    //        if (loginUser == null) {
    //            articleVO.setIsLike(false);
    //        } else {
    //            Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, loginUser.getId().toString());
    //            articleVO.setIsLike(BooleanUtil.isTrue(isMember));
    //        }
    //    });
    //    articleVOPage.setRecords(articleVOList);
    //    return articleVOPage;
    //}
    @Override
    public Page<ArticleVO> getArticleVOPage(Page<Article> articlePage, HttpServletRequest request) {
        List<Article> articleList = articlePage.getRecords();
        Page<ArticleVO> articleVOPage = new Page<>(articlePage.getCurrent(), articlePage.getSize(), articlePage.getTotal());
        if (CollUtil.isEmpty(articleList)) {
            return articleVOPage;
        }

        // 1. 基础数据准备
        List<ArticleVO> articleVOList = articleList.stream()
                .map(ArticleVO::objToVo)
                .collect(Collectors.toList());
        Set<Long> userIdSet = articleList.stream().map(Article::getUserId).collect(Collectors.toSet());

        // 2. 并行处理用户信息和图片查询
        Map<Long, UserVO> userVOMap = getUserVOMap(userIdSet);
        Map<Long, List<String>> imageMap = getImageMap(articleList);
        Map<Long, Boolean> likeStatusMap = getLikeStatusMap(articleList, request);

        // 3. 组装VO数据
        articleVOList.forEach(articleVO -> {
            Long articleId = articleVO.getId();
            articleVO.setUserVO(userVOMap.get(articleVO.getUserId()));
            articleVO.setImagesList(imageMap.getOrDefault(articleId, Collections.emptyList()));
            articleVO.setIsLike(likeStatusMap.getOrDefault(articleId, false));
        });

        articleVOPage.setRecords(articleVOList);
        return articleVOPage;
    }

    // 使用Hutool线程池批量获取图片
    private Map<Long, List<String>> getImageMap(List<Article> articles) {
        Set<Long> articleIds = articles.stream().map(Article::getId).collect(Collectors.toSet());

        // 异步执行图片批量查询
        Future<Map<Long, List<String>>> future = ThreadUtil.execAsync(() ->
                imageService.getImagesByArticleIds(articleIds).stream()
                        .collect(Collectors.groupingBy(Image::getArticleId,
                                Collectors.mapping(Image::getUrl, Collectors.toList())))
        );

        try {
            return future.get(2, TimeUnit.SECONDS); // 设置超时时间
        } catch (Exception e) {
            log.error("图片查询失败", e);
            return Collections.emptyMap();
        }
    }

    // 使用Redis Pipeline批量获取点赞状态
    private Map<Long, Boolean> getLikeStatusMap(List<Article> articles, HttpServletRequest request) {
        //用户首次进入不应直接获取登陆用户信息，会报未登录
        if (!StpUtil.isLogin()) {
            return Collections.emptyMap();
        }
        //User loginUser = (User) StpUtil.getSession().get(UserConstant.WX_LOGIN_STATUS);
        User loginUser = userService.getLoginUser();
        if (loginUser == null) return Collections.emptyMap();

        List<Long> articleIds = articles.stream()
                .map(Article::getId)
                .collect(Collectors.toList());

        // 使用Pipeline批量查询
        List<Object> results = stringRedisTemplate.executePipelined((RedisCallback<Object>) connection -> {
            for (Long articleId : articleIds) {
                String key = ArticleConstant.REDIS_ARTICLE_PREFIX + articleId;
                connection.sIsMember(key.getBytes(), loginUser.getId().toString().getBytes());
            }
            return null;
        });

        Map<Long, Boolean> statusMap = new HashMap<>();
        for (int i = 0; i < articleIds.size(); i++) {
            statusMap.put(articleIds.get(i), (Boolean) results.get(i));
        }
        return statusMap;
    }

    // 批量获取用户信息（保持原逻辑）
    private Map<Long, UserVO> getUserVOMap(Set<Long> userIds) {
        return userService.listByIds(userIds).stream()
                .map(userService::getUserVO)
                .collect(Collectors.toMap(UserVO::getId, Function.identity()));
    }

    @Override
    public List<String> getArticleTags() {
        return Arrays.asList("闲聊", "日常", "答疑", "搞笑", "考研", "考公", "四六级", "计算机", "失物招领", "兼职", "游戏");
    }

    @Override
    public List<ArticleVO> getArticleVOListByUserId(Long userId) {
        if (userId < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户ID错误");
        }
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getUserId, userId);
        queryWrapper.eq(Article::getStatus, ArticleStatusEnum.APPROVED.getCode());
        //根据创建时间降序排列
        queryWrapper.orderByDesc(Article::getCreateTime);
        return this.list(queryWrapper).stream().map(article -> {
            ArticleVO articleVO = BeanUtil.copyProperties(article, ArticleVO.class);
            List<String> imagesList = imageService.getImagesByArticleId(article.getId());
            articleVO.setImagesList(imagesList);
            User user = userService.getById(userId);
            UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);
            userVO.setTagList(JSONUtil.toList(user.getTag(), String.class));
            articleVO.setUserVO(userVO);
            return articleVO;
        }).collect(Collectors.toList());
    }

    /*
    @Override
    public ArticleVO getArticleVOByArticleId(Long articleId) {
        if (articleId == null || articleId < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "文章ID错误");
        }
        Article article = this.getById(articleId);
        if (article == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "文章不存在");
        }
        ArticleVO articleVO = BeanUtil.copyProperties(article, ArticleVO.class);
        User user = userService.getById(articleVO.getUserId());
        ThrowUtils.throwIf(user == null, ErrorCode.NOT_FOUND_ERROR, "用户不存在");
        UserVO userVO = userService.getUserVO(user);
        List<String> imageList = imageService.getImagesByArticleId(articleId);
        articleVO.setImagesList(imageList);
        articleVO.setUserVO(userVO);
        //更新一下文章的评论数量
        long count = commentService.count(new QueryWrapper<Comment>().eq("articleId", articleId));
        boolean update = update(new UpdateWrapper<Article>().set("commentCount", count).eq("id", articleId));
        ThrowUtils.throwIf(!update, ErrorCode.SYSTEM_ERROR, "更新文章评论数量失败");
        return articleVO;
    }
    */

    @Override
    public ArticleVO getArticleVOByArticleId(Long articleId) {
        // 参数校验
        if (ObjUtil.isNull(articleId) || articleId < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "文章ID错误");
        }

        // 主数据查询
        Article article = this.getById(articleId);
        if (article == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "文章不存在");
        }

        // 初始化VO对象
        ArticleVO articleVO = BeanUtil.copyProperties(article, ArticleVO.class);

        // 并行任务1：用户信息查询
        Future<UserVO> userFuture = ThreadUtil.execAsync(() -> {
            User user = userService.getById(article.getUserId());
            ThrowUtils.throwIf(user == null, ErrorCode.NOT_FOUND_ERROR, "用户不存在");
            return userService.getUserVO(user);
        });
        // 并行任务2：图片列表查询
        Future<List<String>> imageFuture = ThreadUtil.execAsync(() ->
                imageService.getImagesByArticleId(articleId)
        );
        try {
            // 异步获取用户信息（设置超时时间）
            articleVO.setUserVO(userFuture.get(2, TimeUnit.SECONDS));
            // 异步获取图片列表
            articleVO.setImagesList(imageFuture.get(2, TimeUnit.SECONDS));
        } catch (TimeoutException e) {
            log.error("查询超时 articleId:{}",articleId,e);
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "服务响应超时");
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "数据加载失败");
        }

        // 异步更新评论数（不阻塞主流程）
        ThreadUtil.execAsync(() -> {
            long count = commentService.lambdaQuery()
                    .eq(Comment::getArticleId, articleId)
                    .count();
            boolean success = lambdaUpdate()
                    .set(Article::getCommentCount, count)
                    .eq(Article::getId, articleId)
                    .update();
            if (!success) {
                log.error("评论数更新失败 articleId:{}",articleId);
            }
        });
        return articleVO;
    }

    @Override
    public boolean likeArticle(Long articleId) {
        if (articleId < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //获取登陆用户信息
        User user = userService.getLoginUser();

        String key = ArticleConstant.REDIS_ARTICLE_PREFIX + articleId;

        //判断当前用户是否已经点赞
        Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, user.getId().toString());
        //如果未点赞，可以点赞
        if (BooleanUtil.isFalse(isMember)) {
            //数据库点赞数+1
            boolean update = update().setSql("likeCount = likeCount + 1").eq("id", articleId).update();
            ThrowUtils.throwIf(!update, ErrorCode.SYSTEM_ERROR, "点赞失败");
            //保存用户到redis的set集合
            stringRedisTemplate.opsForSet().add(key, user.getId().toString());
        } else {
            //如果已经点赞，取消点赞
            //数据库点赞数-1
            boolean update = update().setSql("likeCount = likeCount - 1").eq("id", articleId).update();
            ThrowUtils.throwIf(!update, ErrorCode.SYSTEM_ERROR, "取消点赞失败");
            //从redis的set集合中移除用户
            stringRedisTemplate.opsForSet().remove(key, user.getId().toString());
        }
        return true;
    }

    @Override
    public List<ArticleVO> getArticleCheckList() {
        //todo 权限校验
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getStatus, ArticleStatusEnum.REJECTED.getCode());
        return baseMapper.selectList(queryWrapper).stream().map(article -> {
            ArticleVO articleVO = BeanUtil.copyProperties(article, ArticleVO.class);
            List<String> sensiviveList = sensitiveWordBs.findAll(articleVO.getContent());
            articleVO.setSensitive(sensiviveList);
            return articleVO;
        }).collect(Collectors.toList());
    }

    @Override
    public boolean removeArticle(Long id) {
        //校验参数
        if (id == null || id < 1L) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //校验用户id和当前登陆id是否一致
        Article article = getById(id);
        if (article == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "文章不存在");
        }
        User loginUser = userService.getLoginUser();
        if (!Objects.equals(article.getUserId(), loginUser.getId()) && !loginUser.getUserRole().equals(UserConstant.ADMIN_ROLE)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }

        //异步执行删除redis中的数据（非核心操作）
        ThreadUtil.execAsync(() -> {
            //从redis的set集合中移除文章点赞信息
            stringRedisTemplate.delete(ArticleConstant.REDIS_ARTICLE_PREFIX + id);
        });

        //核心业务
        String lock = String.valueOf(loginUser.getId()).intern();
        synchronized (lock) {
            transactionTemplate.execute(status -> {
                //异步执行逻辑删除评论
                ThreadUtil.execAsync(() -> {
                    boolean removeCommentResult = commentService.lambdaUpdate()
                            .eq(Comment::getArticleId, id)
                            .remove();
                    ThrowUtils.throwIf(!removeCommentResult, ErrorCode.SYSTEM_ERROR, "删除评论失败");
                });
                // 智能图片处理
                long imageCount = imageService.lambdaQuery()
                        .eq(Image::getArticleId, id)
                        .count();
                if (imageCount > 0) {
                    // 分步操作：先标记删除时间
                    boolean markResult = imageService.lambdaUpdate()
                            .eq(Image::getArticleId, id)
                            .set(Image::getDeleteTime, new Date())
                            .update();

                    if (!markResult) {
                        throw new BusinessException(ErrorCode.SYSTEM_ERROR, "图片标记失败");
                    }
                    // 异步物理删除（原逻辑优化）
                    ThreadUtil.execAsync(() -> {
                        boolean deleteRows = imageService.lambdaUpdate()
                                .eq(Image::getArticleId, id)
                                .le(Image::getDeleteTime, new Date())
                                .remove();
                        log.info("删除过期图片 {} 条", deleteRows);
                    });
                } else {
                    log.info("文章[{}]无有效图片可处理", id);
                }
                //最后删除文章数据
                boolean result = removeById(id);
                ThrowUtils.throwIf(!result, ErrorCode.SYSTEM_ERROR, "文章删除失败");
                return true;
            });
        }
        return true;
    }

    @Override
    public List<ArticleVO> getArticleVOLikeListByUserId(Long userId) {
        List<ArticleLike> list = articleLikeService.list(new LambdaQueryWrapper<ArticleLike>().eq(ArticleLike::getUserId, userId));
        if (CollectionUtil.isEmpty(list)){
            return new ArrayList<>();
        }
        List<Long> articleIds = list.stream().map(ArticleLike::getArticleId).collect(Collectors.toList());
        List<Article> articleList = this.baseMapper.selectByIds(articleIds);
        Map<Long, List<String>> imageMap = getImageMap(articleList);

        return articleList.stream().map(article -> {
            ArticleVO articleVO = BeanUtil.copyProperties(article, ArticleVO.class);
            articleVO.setTags(JSONUtil.toList(article.getTags(), String.class));
            User user = userService.getById(articleVO.getUserId());
            UserVO userVO = userService.getUserVO(user);
            articleVO.setUserVO(userVO);
            articleVO.setIsLike(true);
            articleVO.setImagesList(imageMap.getOrDefault(article.getId(), Collections.emptyList()));
            return articleVO;
        }).sorted(Comparator.comparing(ArticleVO::getCreateTime).reversed()).collect(Collectors.toList());
    }

}




