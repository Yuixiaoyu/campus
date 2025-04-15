package com.xiaoyu.campus.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoyu.campus.model.dto.article.ArticleQueryRequest;
import com.xiaoyu.campus.model.dto.items.ItemsAddRequest;
import com.xiaoyu.campus.model.dto.items.ItemsEditRequest;
import com.xiaoyu.campus.model.dto.items.ItemsQueryRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.Items;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.model.vo.ItemsDetailVO;
import com.xiaoyu.campus.model.vo.ItemsVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 张飞宇
* @description 针对表【items】的数据库操作Service
* @createDate 2025-03-31 09:45:50
*/
public interface ItemsService extends IService<Items> {


    /**
     * 发布失物招领
     * @param itemsAddRequest
     * @return
     */
    Long publishFoundItem(ItemsAddRequest itemsAddRequest);


    /**
     * 查询失物招领
     * @param itemsQueryRequest
     * @return
     */
    QueryWrapper<Items> getQueryWrapper(ItemsQueryRequest itemsQueryRequest);

    /**
     * 获取失物招领列表分页
     * @param itemsPage
     * @return
     */
    Page<ItemsVO> getItemsVOPage(Page<Items> itemsPage);


    /**
     * 更新失物招领状态
     * @param id
     * @param status
     * @return
     */
    boolean updateItemsStatus(Long id, Integer status);

    /**
     * 删除失物招领
     * @param id
     * @return
     */
    boolean deleteItems(Long id);

    /**
     * 更新失物招领
     * @param itemsEditRequest
     * @return
     */
    boolean updateItems(ItemsEditRequest itemsEditRequest);


    /**
     * 根据物品id获取失物招领详情
     * @param id
     * @return
     */
    ItemsDetailVO getItemsDetailVOById(Long id);


}
