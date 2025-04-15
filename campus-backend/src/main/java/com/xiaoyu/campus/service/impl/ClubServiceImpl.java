package com.xiaoyu.campus.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.thread.ThreadUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.constant.ActivityConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.club.ClubAddRequest;
import com.xiaoyu.campus.model.dto.club.ClubQueryRequest;
import com.xiaoyu.campus.model.entity.Activity;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.Club;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.enums.ArticleStatusEnum;
import com.xiaoyu.campus.model.vo.*;
import com.xiaoyu.campus.service.ActivityService;
import com.xiaoyu.campus.service.ClubService;
import com.xiaoyu.campus.mapper.ClubMapper;
import com.xiaoyu.campus.service.UserService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

/**
 * @author 张飞宇
 * @description 针对表【club】的数据库操作Service实现
 * @createDate 2025-04-05 21:30:32
 */
@Service
public class ClubServiceImpl extends ServiceImpl<ClubMapper, Club>
        implements ClubService {

    @Resource
    private UserService userService;

    @Resource
    private ActivityService activityService;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public QueryWrapper<Club> getQueryWrapper(ClubQueryRequest clubQueryRequest) {
        QueryWrapper<Club> queryWrapper = new QueryWrapper<>();
        if (BeanUtil.isEmpty(clubQueryRequest)) {
            return queryWrapper;
        }
        Long id = clubQueryRequest.getId();
        Long userId = clubQueryRequest.getUserId();
        String name = clubQueryRequest.getName();
        queryWrapper.like(StringUtils.isNotBlank(name), "name", name);
        queryWrapper.eq(ObjectUtil.isNotNull(id), "id", id);
        queryWrapper.eq(ObjectUtil.isNotNull(userId), "userId", userId);
        queryWrapper.orderByDesc("createTime");
        return queryWrapper;
    }

    @Override
    public Page<ClubVO> getClubVOPage(Page<Club> clubPage) {
        List<Club> clubList = clubPage.getRecords();
        Page<ClubVO> clubVOPage = new Page<>(clubPage.getCurrent(), clubPage.getSize(), clubPage.getTotal());
        if (CollUtil.isEmpty(clubList)) {
            return clubVOPage;
        }
        List<ClubVO> clubVOList = clubList.stream()
                .map(club -> BeanUtil.copyProperties(club, ClubVO.class))
                .collect(Collectors.toList());
        return clubVOPage.setRecords(clubVOList);
    }

    @Override
    public Long addClub(ClubAddRequest clubAddRequest) {
        if (clubAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Club club = BeanUtil.copyProperties(clubAddRequest, Club.class);
        club.setAwards(JSONUtil.toJsonStr(clubAddRequest.getAwards()));
        boolean saveResult = save(club);
        ThrowUtils.throwIf(!saveResult, ErrorCode.SYSTEM_ERROR, "创建社团失败");
        return club.getId();
    }

    @Override
    public ClubDetailVO getClubDetailVOById(Long clubId) {
        // 参数校验（同步）
        if (clubId == null || clubId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Club club = getById(clubId);
        ThrowUtils.throwIf(club == null, ErrorCode.NOT_FOUND_ERROR, "社团不存在");

        // 基础属性拷贝（同步）
        ClubDetailVO clubDetailVO = BeanUtil.copyProperties(club, ClubDetailVO.class);
        clubDetailVO.setAwards(JSONUtil.toList(club.getAwards(), String.class));

        // 获取社团关联用户（同步）
        Long userId = club.getUserId();
        User user = userService.getById(userId);
        ThrowUtils.throwIf(user == null, ErrorCode.NOT_FOUND_ERROR, "用户不存在");

        // 在主线程获取登录用户ID（同步）
        User loginUser = userService.getLoginUser();
        Long loginUserId = loginUser != null ? loginUser.getId() : null;

        // 使用CompletableFuture并行处理（异步）
        Future<List<ActivityVO>> activityFuture = ThreadUtil.execAsync(() -> {
            // 异步处理活动列表
            List<Activity> activities = activityService.list(new QueryWrapper<Activity>()
                    .eq("userId", user.getId()));
            return activities.stream().map(activity -> {
                ActivityVO vo = BeanUtil.copyProperties(activity, ActivityVO.class);
                String key = ActivityConstant.REDIS_ACTIVITY_PREFIX + activity.getId();
                Boolean isMember = stringRedisTemplate.opsForSet().isMember(
                        key, String.valueOf(loginUserId)
                );
                vo.setIsRegistration(isMember);
                return vo;
            }).collect(Collectors.toList());
        });
        Future<UserVO> userVOFuture = ThreadUtil.execAsync(() -> {
            // 异步处理用户信息转换
            return userService.getUserVO(user);
        });
        // 阻塞等待并组装结果（同步）
        try {
            clubDetailVO.setActivityVOList(activityFuture.get());
            clubDetailVO.setUserVO(userVOFuture.get());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "线程中断异常");
        } catch (ExecutionException e) {
            Throwable cause = e.getCause();
            if (cause instanceof BusinessException) {
                throw (BusinessException) cause;
            } else {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "异步执行异常");
            }
        }

        return clubDetailVO;
    }
}




