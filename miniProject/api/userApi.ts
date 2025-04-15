// userApi.ts
import request from '@/utils/request';

// 类型定义
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

interface UserAddRequest {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
}

interface DeleteRequest {
    id?: number;
}

interface User {
    createTime?: string;
    editTime?: string;
    id?: number;
    imageUrl?: string;
    isDelete?: number;
    openid?: string;
    updateTime?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
    userScore?: number;
}

interface LoginUserVo {
    createTime?: string;
    editTime?: string;
    id?: number;
    token?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
    gender?: number;
    constellation?: string;
}

interface UserVO {
    createTime?: string;
    id?: number;
    imageUrl?: string;
    gender?: number;
    constellation?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    tagList?: string[];
    userProfile?: string;
    userRole?: string;
}

interface UserQueryRequest {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
}

interface UserLoginRequest {
    userAccount?: string;
    userPassword?: string;
}

interface UserRegisterRequest {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
}

interface UserUpdateRequest {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    tagList?: string[];
    userRole?: string;
}

interface UserWxUpdateRequest {
    id?: number;
    imageUrl?: string;
    userName?: string;
    userProfile?: string;
    tagList?: string[];
    gender?: number
    constellation?: string
}

interface Page<T> {
    current: number;
    pages: number;
    records: T[];
    size: number;
    total: number;
}
interface WxUserVO {
    id: number;
    userName: string;
    gender: number;
    constellation: string;
    imageUrl: string;
    userProfile: string;
    userRole: string;
    tagList?: string[];
    editTime: string;
    createTime: string;
    updateTime: string;
}

// 用户相关接口封装
export function addUser(data: UserAddRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/user/add',
        method: 'POST',
        data: data
    });
}

export function deleteUser(data: DeleteRequest): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: '/api/user/delete',
        method: 'POST',
        data: data
    });
}

export function getUserById(id?: number): Promise<BaseResponse<User>> {
    return request<BaseResponse<User>>({
        url: `/api/user/get${id ? `?id=${id}` : ''}`,
        method: 'GET'
    });
}



export function getLoginUser(): Promise<BaseResponse<LoginUserVo>> {
    return request<BaseResponse<LoginUserVo>>({
        url: '/api/user/get/login',
        method: 'GET'
    });
}

export function getUserVOById(id?: number): Promise<BaseResponse<UserVO>> {
    return request<BaseResponse<UserVO>>({
        url: `/api/user/get/vo${id ? `?id=${id}` : ''}`,
        method: 'GET'
    });
}

export function listUserVOByPage(data: UserQueryRequest): Promise<BaseResponse<Page<UserVO>>> {
    return request<BaseResponse<Page<UserVO>>>({
        url: '/api/user/list/page/vo',
        method: 'POST',
        data: data
    });
}

export function userLogin(data: UserLoginRequest): Promise<BaseResponse<LoginUserVo>> {
    return request<BaseResponse<LoginUserVo>>({
        url: '/api/user/login',
        method: 'POST',
        data: data
    });
}

export function userLogout(): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: '/api/user/logout',
        method: 'GET'
    });
}

export function userRegister(data: UserRegisterRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/user/register',
        method: 'POST',
        data: data
    });
}

export function updateUser(data: UserUpdateRequest): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: '/api/user/update',
        method: 'POST',
        data: data
    });
}
export function updateWxUser(data: UserWxUpdateRequest): Promise<BaseResponse<WxUserVO>> {
    return request<BaseResponse<WxUserVO>>({
        url: '/api/user/update/wx',
        method: 'POST',
        data: data
    });
}

export function wxLogin(code: string): Promise<BaseResponse<LoginUserVo>> {
    return request<BaseResponse<LoginUserVo>>({
        url: `/api/user/wx/login?code=${code}`,
        method: 'POST'
    });
}