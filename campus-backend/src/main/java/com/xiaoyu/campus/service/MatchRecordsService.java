package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.dto.matchRecords.MatchRecordsAddRequest;
import com.xiaoyu.campus.model.entity.MatchRecords;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 张飞宇
* @description 针对表【match_records】的数据库操作Service
* @createDate 2025-04-07 18:20:11
*/
public interface MatchRecordsService extends IService<MatchRecords> {

    /**
     * 添加招领记录
     */
    Long addMatchRecords(MatchRecordsAddRequest matchRecordsAddRequest);

}
