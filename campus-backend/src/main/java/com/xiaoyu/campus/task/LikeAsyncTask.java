package com.xiaoyu.campus.task;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.xiaoyu.campus.constant.ArticleConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.ArticleLike;
import com.xiaoyu.campus.service.ArticleLikeService;
import com.xiaoyu.campus.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * ClassName: LikeAsyncTask
 * Description:
 *
 * @Author: fy
 * @create: 2025-04-01 20:54
 * @version: 1.0
 */
@Component
@Slf4j
public class LikeAsyncTask {
    private static final String SYNCED_SET_PREFIX = "Article:synced:"; // 已同步用户集合
    private static final int BATCH_SIZE = 500;

    @Resource
    private StringRedisTemplate stringRedisTemplate;
    @Resource
    private ArticleService articleService;
    @Resource
    private ArticleLikeService articleLikeService;

    /**
     * 全量同步任务（每分钟执行）
     */
    @Async
    @Scheduled(cron = "0 10 1 * * ? ")
    public void syncLikes() {
        Set<String> keys = stringRedisTemplate.keys(ArticleConstant.REDIS_ARTICLE_PREFIX + "*");
        if (CollectionUtils.isEmpty(keys)) return;

        keys.forEach(key -> {
            Long articleId = parseArticleId(key);
            String currentKey = key;
            String syncedKey = SYNCED_SET_PREFIX + articleId;

            // 处理新增点赞
            processNewLikes(articleId, currentKey, syncedKey);

            // 处理取消点赞
            processCancelLikes(articleId, currentKey, syncedKey);
        });
        log.info("处理新增和取消任务完成");
    }

    /**
     * 每天晚上一点同步点赞数
     */
    @Async
    @Scheduled(cron = "0 0 1 * * ? ")
    public void updateLike() {
        Set<String> keys = stringRedisTemplate.keys(ArticleConstant.REDIS_ARTICLE_PREFIX + "*");
        if (CollectionUtils.isEmpty(keys)) return;

        keys.forEach(key -> {
            Long articleId = parseArticleId(key);
            // 更新总点赞数
            updateTotalCount(articleId, key);
        });
        log.info("更新点赞完成");
    }


    @Async
    @Scheduled(cron = "0 10 1 * * ? ")
    public void syncLikesLeave() {
        Set<String> likeKeys = stringRedisTemplate.keys(ArticleConstant.REDIS_ARTICLE_PREFIX + "*");
        Set<String> syncKeys = stringRedisTemplate.keys(SYNCED_SET_PREFIX + "*");

        if (CollectionUtil.isEmpty(likeKeys)||CollectionUtil.isEmpty(syncKeys)) return;

        List<Long> likeArticleIdList = likeKeys.stream().map(this::parseArticleId).collect(Collectors.toList());
        List<Long> syncArticleIdList = syncKeys.stream().map(this::parseArticleId).collect(Collectors.toList());
        for (Long syncArticleId : syncArticleIdList) {
            //如果likeArticleIdList当中没有这个文章id，则说明最后一个文章的点赞用户取消了
            if (!likeArticleIdList.contains(syncArticleId)) {
                //删除sync当中的同步数据
                Set<String> userIdSet = stringRedisTemplate.opsForSet().members(SYNCED_SET_PREFIX + syncArticleId);
                if (CollectionUtil.isNotEmpty(userIdSet)) {
                    //删除sync中的同步数据
                    stringRedisTemplate.delete(SYNCED_SET_PREFIX+syncArticleId);
                    for (String userId : userIdSet) {
                        log.info("userid:{}",userId);
                        //stringRedisTemplate.opsForSet().remove(userId, syncArticleId.toString());
                        //删除数据库中的最后一条数据
                        articleLikeService.remove(
                                new QueryWrapper<ArticleLike>()
                                        .eq("userId", parseArticleId(userId))
                                        .eq("articleId", syncArticleId)
                        );
                    }
                }
            }
        }
        log.info("全量遗留问题完成");
    }

    /**
     * 处理新增点赞
     */
    private void processNewLikes(Long articleId, String currentKey, String syncedKey) {
        // 获取未同步的新增用户（差集：currentKey - syncedKey）
        Set<String> newLikes = stringRedisTemplate.opsForSet().difference(currentKey, syncedKey);

        if (!CollectionUtils.isEmpty(newLikes)) {
            // 数据库插入
            List<ArticleLike> records = newLikes.stream()
                    .map(userId -> {
                        ArticleLike articleLike = new ArticleLike();
                        articleLike.setArticleId(articleId);
                        articleLike.setUserId(Long.parseLong(userId));
                        return articleLike;
                    })
                    .collect(Collectors.toList());
            articleLikeService.saveBatch(records, BATCH_SIZE);
            log.info("添加成功,文章ID：{}", articleId);

            // Redis同步集合更新
            stringRedisTemplate.opsForSet().add(syncedKey, newLikes.toArray(new String[0]));
        }
    }

    /**
     * 处理取消点赞
     */
    private void processCancelLikes(Long articleId, String currentKey, String syncedKey) {
        // 获取需要取消的用户（差集：syncedKey - currentKey）
        Set<String> removedLikes = stringRedisTemplate.opsForSet().difference(syncedKey, currentKey);

        if (!CollectionUtils.isEmpty(removedLikes)) {
            // 数据库删除
            List<Long> userIds = removedLikes.stream()
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            articleLikeService.remove(new LambdaQueryWrapper<ArticleLike>()
                    .eq(ArticleLike::getArticleId, articleId)
                    .in(ArticleLike::getUserId, userIds));
            log.info("添加成功,文章ID：{}", articleId);

            // Redis同步集合更新
            stringRedisTemplate.opsForSet().remove(syncedKey, removedLikes.toArray(new String[0]));
        }
    }

    /**
     * 更新文章总点赞数
     */
    private void updateTotalCount(Long articleId, String currentKey) {
        Long count = stringRedisTemplate.opsForSet().size(currentKey);
        articleService.update(new LambdaUpdateWrapper<Article>()
                .eq(Article::getId, articleId)
                .set(Article::getLikeCount, count.intValue()));
    }

    /**
     * 解析文章ID
     */
    private Long parseArticleId(String key) {
        String[] parts = key.split(":");
        return Long.parseLong(parts[parts.length - 1]);
    }
}
