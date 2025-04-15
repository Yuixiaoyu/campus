package com.xiaoyu.campus.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.club.ClubAddRequest;
import com.xiaoyu.campus.model.dto.club.ClubQueryRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.Club;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.model.vo.ClubDetailVO;
import com.xiaoyu.campus.model.vo.ClubVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 张飞宇
* @description 针对表【club】的数据库操作Service
* @createDate 2025-04-05 21:30:32
*/
public interface ClubService extends IService<Club> {

    /**
     * 查询社团
     * @param clubQueryRequest
     * @return
     */
    QueryWrapper<Club> getQueryWrapper(ClubQueryRequest clubQueryRequest);

    /**
     * 获取社团分页
     * @param clubPage
     * @return
     */
    Page<ClubVO> getClubVOPage(Page<Club> clubPage);


    /**
     * 添加社团
     * @param clubAddRequest
     * @return
     */
    Long addClub(ClubAddRequest clubAddRequest);


    ClubDetailVO getClubDetailVOById(Long clubId);

}
