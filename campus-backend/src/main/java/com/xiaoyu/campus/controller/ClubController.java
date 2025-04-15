package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.club.ClubAddRequest;
import com.xiaoyu.campus.model.dto.club.ClubQueryRequest;
import com.xiaoyu.campus.model.dto.items.ItemsAddRequest;
import com.xiaoyu.campus.model.dto.items.ItemsQueryRequest;
import com.xiaoyu.campus.model.entity.Club;
import com.xiaoyu.campus.model.entity.Items;
import com.xiaoyu.campus.model.vo.ClubDetailVO;
import com.xiaoyu.campus.model.vo.ClubVO;
import com.xiaoyu.campus.model.vo.ItemsVO;
import com.xiaoyu.campus.service.ClubService;
import com.xiaoyu.campus.service.ItemsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * ClassName: ClubController
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-23 16:42
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/club")
public class ClubController {

    @Resource
    private ClubService clubService;

    /**
     * 分页获取社团封装列表
     *
     * @param clubQueryRequest 查询请求参数
     */
    @PostMapping("/clubList/page")
    public BaseResponse<Page<ClubVO>> getClubList(@RequestBody ClubQueryRequest clubQueryRequest) {
        long current = clubQueryRequest.getCurrent();
        long size = clubQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Club> clubPage = clubService.page(new Page<>(current, size),
                clubService.getQueryWrapper(clubQueryRequest));
        // 获取封装类
        return ResultUtils.success(clubService.getClubVOPage(clubPage));
    }

    @PostMapping("/add")
    public BaseResponse<Long> addClub(@RequestBody ClubAddRequest clubAddRequest) {
        if (clubAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long clubId = clubService.addClub(clubAddRequest);
        return ResultUtils.success(clubId);
    }

    @PostMapping("/{id}")
    public BaseResponse<ClubDetailVO> getClubDetailVOById(@PathVariable Long id) {
        if (id == null ||id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        ClubDetailVO clubDetailVOById = clubService.getClubDetailVOById(id);
        return ResultUtils.success(clubDetailVOById);
    }

}
