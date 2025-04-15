// activity.ts
import request from '@/utils/request';

// 复用已定义的类型
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

interface Page<T> {
    current: number;
    pages: number;
    records: T[];
    size: number;
    total: number;
}

// Activity 相关类型定义
interface ActivityQueryRequest {
    category?: string;
    current?: number;
    organizers?: string;
    pageSize?: number;
    profile?: string;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: number;
}

interface ActivityAddRequest {
    category?: string;
    coverPicture?: string;
    endTime?: string;
    maxSignups?: number;
    organizers?: string;
    position?: string;
    profile?: string;
    startTime?: string;
    targetUsers?: string;
    title?: string;
    userId?: number;
}

interface ActivityRegisterRequest {
    activityId?: number;
    userId?: number;
}

interface ActivityEditRequest extends ActivityAddRequest {
    id?: number;
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

// 接口封装
export function getActivityList(data: ActivityQueryRequest): Promise<BaseResponse<Page<ActivityVO>>> {
    return request<BaseResponse<Page<ActivityVO>>>({
        url: '/api/activity/activityList/page',
        method: 'POST',
        data
    });
}

export function publishActivity(data: ActivityAddRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/activity/publish',
        method: 'POST',
        data
    });
}

export function registrationActivity(data: ActivityRegisterRequest): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: '/api/activity/registration',
        method: 'POST',
        data
    });
}

export function removeActivity(id: number): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: `/api/activity/remove/${id}`,
        method: 'POST'
    });
}

export function updateActivity(data: ActivityEditRequest): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: '/api/activity/update',
        method: 'POST',
        data
    });
}

export function getActivityVOByJoinUserId(id: number): Promise<BaseResponse<ActivityVO[]>> {
    return request<BaseResponse<ActivityVO[]>>({
        url: `/api/activity/get/${id}`,
        method: 'POST'
    });
}