package com.xiaoyu.campus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.entity.Image;
import com.xiaoyu.campus.service.ImageService;
import com.xiaoyu.campus.mapper.ImageMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author 张飞宇
* @description 针对表【image】的数据库操作Service实现
* @createDate 2025-02-23 16:17:16
*/
@Service
public class ImageServiceImpl extends ServiceImpl<ImageMapper, Image>
    implements ImageService{

    @Override
    @Transactional
    public boolean uploadImages(List<Image> images) {
        if (images.isEmpty()){
            return false;
        }
        boolean result = this.saveBatch(images);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "图片上传失败");
        return true;
    }

    @Override
    public List<String> getImagesByArticleId(Long articleId) {
        LambdaQueryWrapper<Image> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Image::getArticleId, articleId);
        return this.list(queryWrapper).stream().map(Image::getUrl).collect(Collectors.toList());
    }
}




