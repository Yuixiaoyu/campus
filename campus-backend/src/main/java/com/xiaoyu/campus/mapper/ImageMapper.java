package com.xiaoyu.campus.mapper;

import com.xiaoyu.campus.model.entity.Image;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;

/**
* @author 张飞宇
* @description 针对表【image】的数据库操作Mapper
* @createDate 2025-02-23 16:17:16
* @Entity com.xiaoyu.campus.model.entity.Image
*/
public interface ImageMapper extends BaseMapper<Image> {

    @Delete("DELETE FROM image WHERE isDelete = 1 AND deleteTime <= #{thresholdTime}")
    void physicalDeleteExpired(@Param("thresholdTime") LocalDateTime thresholdTime);


    @Select("select url from image where isDelete = 1 AND deleteTime <= #{thresholdTime}")
    List<String> getImageByIsDelete(@Param("thresholdTime") LocalDateTime thresholdTime);

}




