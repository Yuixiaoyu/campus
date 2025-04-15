// itemsApi.ts
import request from '@/utils/request';

// 基础响应类型
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

// 分页结构
interface Page<T> {
    current?: number;
    pages?: number;
    records?: T[];
    size?: number;
    total?: number;
}

// 物品查询请求参数
interface ItemsQueryRequest {
    category?: string;
    current?: number;
    description?: string;
    endTime?: string;
    id?: number;
    itemType?: number;
    location?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    status?: number;
    title?: string;
    userId?: number;
}

// 物品视图对象
interface ItemVO {
    category?: string;
    createTime?: string;
    description?: string;
    id?: number;
    images?: string[];
    itemType?: number;
    location?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
    // 根据实际接口文档补充其他字段
}

// 用户视图对象（复用已有定义）
interface UserVO {
    constellation?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    imageUrl?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
}

// 请求参数类型
interface ItemsAddRequest {
    category?: string;
    description?: string;
    eventTime?: string;  // 使用string表示日期时间
    itemType?: number;
    location?: string;
    currentLocation?: string;
    title?: string;
    urlList?: string[];
    userId?: number;
}


// 物品详情VO
interface ItemsDetailVO {
    category?: string;
    description?: string;
    eventTime?: string;  // 日期时间字符串格式
    id?: number;
    itemType?: number;
    url?: string;
    location?: string;
    status?: number;
    title?: string;
    userVO?: UserVO;
}


export function getItemsById(id: number): Promise<BaseResponse<ItemsDetailVO>> {
    return request<BaseResponse<ItemsDetailVO>>({
        url: `/api/items/items/${id}`,  // 使用模板字符串处理路径参数
        method: 'GET'
    });
}

// 请求参数类型
interface MatchRecordsAddRequest {
    description?: string;
    foundItemId?: number;  // 使用number类型对应Java的long
    urlList?: string[];
    userId?: number;
}

/*
* 新增匹配记录接口
* @param data 请求参数对象
* @returns 新增记录的ID
*/
export function addMatchRecords(data: MatchRecordsAddRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/items/matchRecords',
        method: 'POST',
        data: data  // 通过请求体传递JSON参数
    });
}

/**
 * 新增反馈接口
 * @param data 请求参数对象
 * @returns 新增记录的ID
 */
export function addItems(data: ItemsAddRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/items/publish',
        method: 'POST',
        data: data  // 通过请求体传递JSON参数
    });
}

/**
 * 获取物品分页列表
 * @param data 查询参数
 */
export function getItemsList(data: ItemsQueryRequest): Promise<BaseResponse<Page<ItemVO>>> {
    return request<BaseResponse<Page<ItemVO>>>({
        url: '/api/items/itemsList/page',
        method: 'POST',
        data: data
    });
}
