package com.xiaoyu.campus.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.matchRecords.MatchRecordsAddRequest;
import com.xiaoyu.campus.model.entity.MatchRecords;
import com.xiaoyu.campus.service.MatchRecordsService;
import com.xiaoyu.campus.mapper.MatchRecordsMapper;
import org.springframework.stereotype.Service;

/**
* @author 张飞宇
* @description 针对表【match_records】的数据库操作Service实现
* @createDate 2025-04-07 18:20:11
*/
@Service
public class MatchRecordsServiceImpl extends ServiceImpl<MatchRecordsMapper, MatchRecords>
    implements MatchRecordsService{

    @Override
    public Long addMatchRecords(MatchRecordsAddRequest matchRecordsAddRequest) {
        if (matchRecordsAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        MatchRecords matchRecords = BeanUtil.copyProperties(matchRecordsAddRequest, MatchRecords.class);
        matchRecords.setUrl(JSONUtil.toJsonStr(matchRecordsAddRequest.getUrlList()));
        boolean result = this.save(matchRecords);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "添加失败");
        return matchRecords.getId();
    }
}




