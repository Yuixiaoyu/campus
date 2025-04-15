package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.annotation.AuthCheck;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.constant.UserConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.feedback.FeedbackAddRequest;
import com.xiaoyu.campus.model.dto.items.ItemsAddRequest;
import com.xiaoyu.campus.model.dto.items.ItemsQueryRequest;
import com.xiaoyu.campus.model.dto.matchRecords.MatchRecordsAddRequest;
import com.xiaoyu.campus.model.dto.user.UserQueryRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.Items;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.model.vo.ItemsDetailVO;
import com.xiaoyu.campus.model.vo.ItemsVO;
import com.xiaoyu.campus.model.vo.UserVO;
import com.xiaoyu.campus.service.FeedbackService;
import com.xiaoyu.campus.service.ItemsService;
import com.xiaoyu.campus.service.MatchRecordsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * ClassName: ItemsController
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-23 16:42
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/items")
public class ItemsController {

    @Resource
    private ItemsService itemsService;

    @Resource
    private MatchRecordsService matchRecordsService;

    @PostMapping("/publish")
    @SaCheckLogin
    public BaseResponse<Long> addFeedBack(@RequestBody ItemsAddRequest itemsAddRequest) {
        //校验参数是否为空
        if (ObjUtil.isEmpty(itemsAddRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long id = itemsService.publishFoundItem(itemsAddRequest);
        return ResultUtils.success(id);
    }


    /**
     * 分页获取失物招领封装列表
     *
     * @param itemsQueryRequest 查询请求参数
     */
    @PostMapping("/itemsList/page")
    public BaseResponse<Page<ItemsVO>> getArticleList(@RequestBody ItemsQueryRequest itemsQueryRequest) {
        long current = itemsQueryRequest.getCurrent();
        long size = itemsQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Items> picturePage = itemsService.page(new Page<>(current, size),
                itemsService.getQueryWrapper(itemsQueryRequest));
        // 获取封装类
        return ResultUtils.success(itemsService.getItemsVOPage(picturePage));
    }

    /**
     * 根据id获取失物招领详情
     */
    @GetMapping("/items/{id}")
    public BaseResponse<ItemsDetailVO> getItemsById(@PathVariable("id") Long id) {
        if (id ==null||id<=0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(itemsService.getItemsDetailVOById(id));
    }


    @PostMapping("/matchRecords")
    public BaseResponse<Long> addMatchRecords(@RequestBody MatchRecordsAddRequest matchRecordsAddRequest) {
        if (matchRecordsAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(matchRecordsService.addMatchRecords(matchRecordsAddRequest));
    }


}
