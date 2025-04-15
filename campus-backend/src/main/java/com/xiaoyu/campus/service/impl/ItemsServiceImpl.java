package com.xiaoyu.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoyu.campus.constant.ArticleConstant;
import com.xiaoyu.campus.constant.UserConstant;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.dto.items.ItemsAddRequest;
import com.xiaoyu.campus.model.dto.items.ItemsEditRequest;
import com.xiaoyu.campus.model.dto.items.ItemsQueryRequest;
import com.xiaoyu.campus.model.entity.Article;
import com.xiaoyu.campus.model.entity.Items;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.enums.ItemStatusEnum;
import com.xiaoyu.campus.model.enums.ItemTypeEnum;
import com.xiaoyu.campus.model.vo.ArticleVO;
import com.xiaoyu.campus.model.vo.ItemsDetailVO;
import com.xiaoyu.campus.model.vo.ItemsVO;
import com.xiaoyu.campus.model.vo.UserVO;
import com.xiaoyu.campus.service.ItemsService;
import com.xiaoyu.campus.mapper.ItemsMapper;
import com.xiaoyu.campus.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author 张飞宇
 * @description 针对表【items】的数据库操作Service实现
 * @createDate 2025-03-31 09:45:50
 */
@Service
public class ItemsServiceImpl extends ServiceImpl<ItemsMapper, Items>
        implements ItemsService {

    @Resource
    private UserService userservice;

    @Override
    public Long publishFoundItem(ItemsAddRequest itemsAddRequest) {
        //校验参数
        if (itemsAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //校验登录用户id
        User loginUser = userservice.getLoginUser();
        if (!Objects.equals(itemsAddRequest.getUserId(), loginUser.getId()) && !loginUser.getUserRole().equals(UserConstant.ADMIN_ROLE)) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        //校验itemsAddRequest.type以及itemsAddRequest.status
        ItemTypeEnum itemTypeEnum = ItemTypeEnum.getByCode(itemsAddRequest.getItemType());
        if (itemTypeEnum == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "物品类型错误");
        }
        Items items = BeanUtil.copyProperties(itemsAddRequest, Items.class);
        //将url转换成string
        List<String> urlList = itemsAddRequest.getUrlList();
        items.setUrl(JSONUtil.toJsonStr(urlList));
        boolean result = save(items);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "添加失败");
        //保存数据
        return items.getId();
    }

    @Override
    public QueryWrapper<Items> getQueryWrapper(ItemsQueryRequest itemsQueryRequest) {
        QueryWrapper<Items> queryWrapper = new QueryWrapper<>();
        if (itemsQueryRequest == null) {
            return queryWrapper;
        }
        Long id = itemsQueryRequest.getId();
        String title = itemsQueryRequest.getTitle();
        String description = itemsQueryRequest.getDescription();
        Integer itemType = itemsQueryRequest.getItemType();
        String category = itemsQueryRequest.getCategory();
        Long userId = itemsQueryRequest.getUserId();
        String location = itemsQueryRequest.getLocation();
        Integer status = itemsQueryRequest.getStatus();
        Date startTime = itemsQueryRequest.getStartTime();
        Date endTime = itemsQueryRequest.getEndTime();

        queryWrapper.eq(ObjUtil.isNotNull(id), "id", id);
        queryWrapper.like(!StrUtil.isBlank(title), "title", title);
        queryWrapper.like(!StrUtil.isBlank(description), "description", description);
        queryWrapper.eq(ObjUtil.isNotNull(itemType), "itemType", itemType);
        queryWrapper.eq(!StrUtil.isBlank(category), "category", category);
        queryWrapper.eq(ObjUtil.isNotNull(userId), "userId", userId);
        queryWrapper.eq(!StrUtil.isBlank(location), "location", location);
        queryWrapper.eq(ObjUtil.isNotNull(status), "status", status);
        //大于等于开始时间，小于等于结束时间
        queryWrapper.ge(ObjUtil.isNotNull(startTime), "eventTime", startTime);
        queryWrapper.le(ObjUtil.isNotNull(endTime), "eventTime", endTime);
        queryWrapper.orderByDesc("createTime");
        return queryWrapper;
    }

    @Override
    public Page<ItemsVO> getItemsVOPage(Page<Items> itemsPage) {
        List<Items> itemsList = itemsPage.getRecords();
        Page<ItemsVO> itemsVOPage = new Page<>(itemsPage.getCurrent(), itemsPage.getSize(), itemsPage.getTotal());
        if (CollUtil.isEmpty(itemsList)) {
            return itemsVOPage;
        }
        List<ItemsVO> itemsVOList = itemsList.stream()
                .map(items -> BeanUtil.copyProperties(items, ItemsVO.class))
                .collect(Collectors.toList());
        itemsVOPage.setRecords(itemsVOList);
        return itemsVOPage;
    }

    @Override
    public boolean updateItemsStatus(Long id, Integer status) {
        if (ObjUtil.isNull(id) || ObjUtil.isNull(status)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        ItemStatusEnum statusEnum = ItemStatusEnum.getByCode(status);
        if (statusEnum == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "状态错误");
        }
        boolean result = update(new UpdateWrapper<Items>().set("status", status).eq("id", id));
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "更新失败");
        return true;
    }

    @Override
    public boolean deleteItems(Long id) {
        if (ObjUtil.isNull(id)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "删除失败");
        return true;
    }

    @Override
    public boolean updateItems(ItemsEditRequest itemsEditRequest) {
        if (ObjUtil.isNull(itemsEditRequest)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Items items = BeanUtil.copyProperties(itemsEditRequest, Items.class);
        return this.updateById(items);
    }

    @Override
    public ItemsDetailVO getItemsDetailVOById(Long id) {
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Items items = this.getById(id);
        if (items==null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        ItemsDetailVO itemsDetailVO = BeanUtil.copyProperties(items, ItemsDetailVO.class);
        //url格式转换
        itemsDetailVO.setUrl(JSONUtil.toList(items.getUrl(),String.class));
        Long userId = items.getUserId();
        User user = userservice.getById(userId);
        UserVO userVO = userservice.getUserVO(user);
        itemsDetailVO.setUserVO(userVO);
        return itemsDetailVO;
    }

}




