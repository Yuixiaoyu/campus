package com.xiaoyu.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.constant.ActivityConstant;
import com.xiaoyu.campus.constant.ArticleConstant;
import com.xiaoyu.campus.constant.UserConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.activity.ActivityAddRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityEditRequest;
import com.xiaoyu.campus.model.dto.activity.ActivityQueryRequest;
import com.xiaoyu.campus.model.entity.Activity;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.enums.ActivityStatusEnum;
import com.xiaoyu.campus.model.enums.ArticleStatusEnum;
import com.xiaoyu.campus.model.vo.ActivityVO;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.service.ActivityService;
import com.xiaoyu.campus.mapper.ActivityMapper;
import com.xiaoyu.campus.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
* @author 张飞宇
* @description 针对表【activity】的数据库操作Service实现
* @createDate 2025-03-19 09:53:51
*/
@Service
@Slf4j
public class ActivityServiceImpl extends ServiceImpl<ActivityMapper, Activity>
    implements ActivityService{


    @Resource
    private UploadFilesService uploadFilesService;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private UserService userService;

    @Override
    public QueryWrapper<Activity> getQueryWrapper(ActivityQueryRequest activityQueryRequest) {
        QueryWrapper<Activity> queryWrapper = new QueryWrapper<>();
        if (BeanUtil.isEmpty(activityQueryRequest)) {
            return queryWrapper;
        }
        String category = activityQueryRequest.getCategory();
        String title = activityQueryRequest.getTitle();
        String profile = activityQueryRequest.getProfile();
        Long userId = activityQueryRequest.getUserId();
        String organizer = activityQueryRequest.getOrganizers();

        queryWrapper.like(StringUtils.isNotBlank(category), "category", category);
        queryWrapper.like(StringUtils.isNotBlank(title), "title", title);
        queryWrapper.like(StringUtils.isNotBlank(profile), "profile", profile);
        queryWrapper.like(StringUtils.isNotBlank(organizer), "organizer", organizer);
        queryWrapper.eq(ObjectUtil.isNotNull(userId),"userId",userId);
        queryWrapper.orderByAsc("endTime");
        return queryWrapper;
    }

    @Override
    public Page<ActivityVO> getActivityVOPage(Page<Activity> activityPage, HttpServletRequest request) {
        List<Activity> activityList = activityPage.getRecords();
        Page<ActivityVO> activityVOPage = new Page<>(activityPage.getCurrent(), activityPage.getSize(), activityPage.getTotal());
        if (CollUtil.isEmpty(activityList)) {
            return activityVOPage;
        }
        List<ActivityVO> activityVOList = activityList.stream()
                .map(activity -> {
                    ActivityVO activityVO = BeanUtil.copyProperties(activity, ActivityVO.class);
                    Long activityId = activity.getId();
                    String key = ActivityConstant.REDIS_ACTIVITY_PREFIX + activityId;
                    User user = userService.getLoginUser();
                    Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, user.getId().toString());
                    activityVO.setIsRegistration(isMember);
                    return activityVO;
                })
                .collect(Collectors.toList());

        activityVOPage.setRecords(activityVOList);
        return activityVOPage;
    }

    @Override
    public Long publishActivity(ActivityAddRequest activityAddRequest) {
        //校验参数是否为空
        if (ObjectUtil.isNull(activityAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Activity activity = BeanUtil.copyProperties(activityAddRequest, Activity.class);
        //判断活动结束时间是否大于当前时间
        Date currentDate = new Date();
        if (currentDate.after(activity.getEndTime())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"活动结束时间不能小于当前时间");
        }
        if (currentDate.after(activity.getStartTime()) && currentDate.before(activity.getEndTime())) {
            activity.setStatus(ActivityStatusEnum.IN_PROGRESS.getCode());
        }
        if (currentDate.before(activity.getStartTime())) {
            activity.setStatus(ActivityStatusEnum.UNSTARTED.getCode());
        }
        boolean result = save(activity);
        ThrowUtils.throwIf(!result,ErrorCode.OPERATION_ERROR,"活动发布失败");
        return activity.getId();
    }

    @Override
    public boolean updateActivity(ActivityEditRequest activityEditRequest) {
        if (ObjUtil.isEmpty(activityEditRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Activity activity = BeanUtil.copyProperties(activityEditRequest, Activity.class);
        boolean result = updateById(activity);
        ThrowUtils.throwIf(!result,ErrorCode.OPERATION_ERROR,"活动更新失败");
        return true;
    }

    @Override
    @Transactional
    public boolean deleteActivity(Long id) {
        if (id<1 || ObjUtil.isEmpty(id)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        try {
            //先将图片删除
            Activity activity = getById(id);
            if (ObjUtil.isEmpty(activity)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"活动不存在");
            }
            String url = activity.getCoverPicture();
            LambdaQueryWrapper<Activity> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(Activity::getCoverPicture,url);
            long count = count(queryWrapper);
            if (count==1){
                String fileName = FileUtil.mainName(url) + ".webp";
                uploadFilesService.deleteFile(fileName);
            }
            boolean result = removeById(id);
            ThrowUtils.throwIf(!result,ErrorCode.OPERATION_ERROR,"活动删除失败");
        } catch (BusinessException e) {
            log.error("活动删除失败",e);
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }
        return true;
    }
}




