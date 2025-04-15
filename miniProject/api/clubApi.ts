import request  from '@/utils/request.ts'

// 基础响应类型
export interface BaseResponse<T> {
    code: number
    message: string
    data: T
}

// 分页数据类型
export interface Page<T> {
    records: T[]
    total: number
    size: number
    current: number
    pages: number
}


// 用户VO类型
interface UserVO {
    id?: number
    userName?: string
    userAccount?: string
    userProfile?: string
    userRole?: string
    imageUrl?: string
    gender?: number
    createTime?: string
    tagList?: string[]
    constellation?: string
}

// 社团列表项类型
interface ClubVO {
    id: number
    name: string
    profile: string
    cover: string
}

interface ActivityVO {
    category?: string;
    coverPicture?: string;
    currentSignups?: number;
    endTime?: string;
    hits?: number;
    id?: number;
    maxSignups?: number;
    organizers?: string;
    position?: string;
    profile?: string;
    startTime?: string;
    status?: number;
    targetUsers?: string;
    title?: string;
    userId?: number;
    isRegistration?: boolean
}

// 社团详情VO类型
interface ClubDetailVO {
    id?: number
    name?: string
    profile?: string
    cover?: string
    avatar?: string
    grandTotal?: number
    awards?: string[]
    userVO?: UserVO,
    activityVOList?: ActivityVO[]
}

// 社团查询请求类型
interface ClubQueryRequest {
    current: number
    pageSize: number
    sortField?: string
    sortOrder?: string
}

// 用户VO类型
interface UserVO {
    constellation?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    imageUrl?: string;
    tagList?: string[];
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
}

/**
 * 获取社团列表
 * @param data 查询参数
 */
export function getClubList(data: ClubQueryRequest): Promise<BaseResponse<Page<ClubVO>>> {
    return request<BaseResponse<Page<ClubVO>>>({
        url: '/api/club/clubList/page',
        method: 'POST',
        data: data
    });
}

/**
 * 获取社团详情
 * @param id 社团ID
 */
export function getClubDetail(id: number): Promise<BaseResponse<ClubDetailVO>> {
    return request<BaseResponse<ClubDetailVO>>({
        url: `/api/club/${id}`,
        method: 'POST'
    });
}