package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.entity.Image;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
* @author 张飞宇
* @description 针对表【image】的数据库操作Service
* @createDate 2025-02-23 16:17:16
*/
public interface ImageService extends IService<Image> {

    //批量上传图片
    boolean uploadImages(List<Image> images);

    /**
     * 根据文章id获取图片
     * @param articleId
     * @return 返回图片链接
     */
    List<String> getImagesByArticleId(Long articleId);

}
