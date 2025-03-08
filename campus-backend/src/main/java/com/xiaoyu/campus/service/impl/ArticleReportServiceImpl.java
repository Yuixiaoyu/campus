package com.xiaoyu.campus.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.article.ArticleReportRequest;
import com.xiaoyu.campus.model.entity.ArticleReport;
import com.xiaoyu.campus.service.ArticleReportService;
import com.xiaoyu.campus.mapper.ArticleReportMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author 张飞宇
* @description 针对表【article_report】的数据库操作Service实现
* @createDate 2025-03-07 21:22:55
*/
@Service
public class ArticleReportServiceImpl extends ServiceImpl<ArticleReportMapper, ArticleReport>
    implements ArticleReportService{

    @Override
    public boolean reportArticle(ArticleReportRequest articleReportRequest) {
        if (ObjUtil.isEmpty(articleReportRequest)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        ArticleReport articleReport = BeanUtil.copyProperties(articleReportRequest, ArticleReport.class);
        articleReport.setImages(articleReportRequest.getImages().toString());
        boolean result = save(articleReport);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR,"举报信息保存失败");
        return true;
    }
}




