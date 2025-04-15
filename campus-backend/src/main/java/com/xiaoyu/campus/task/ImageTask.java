package com.xiaoyu.campus.task;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.io.FileUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xiaoyu.campus.mapper.ImageMapper;
import com.xiaoyu.campus.model.entity.Image;
import com.xiaoyu.campus.service.ImageService;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

/**
 * ClassName: ImageTask
 * Description:
 *
 * @Author: fy
 * @create: 2025-04-01 20:54
 * @version: 1.0
 */
@Component
@Slf4j
public class ImageTask {

    @Resource
    private ImageMapper imageMapper;

    @Resource
    private ImageService imageService;

    @Resource
    private UploadFilesService uploadFilesService;

    @Async
    @Scheduled(cron ="0 30 2 1 * ? ")
    //@Scheduled(cron ="0 0/5 * * * ? ")
    public void physicalDeleteImage() {
        System.out.println("hello");
        LocalDateTime threshold = LocalDateTime.now().minusMonths(2);
        List<String> urlImageList = imageMapper.getImageByIsDelete(threshold);
        if (CollUtil.isNotEmpty(urlImageList)){
            for (String imageUrl : urlImageList) {
                //遍历imagesByArticleId，删除minio中的图片
                String url = FileUtil.mainName(imageUrl) + ".webp";
                uploadFilesService.deleteFile(url);
            }
        }
        imageMapper.physicalDeleteExpired(threshold);
        log.info("删除残留图片的定时任务执行成功");
    }

}
