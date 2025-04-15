// src/api/upload.ts
import request from '@/utils/request';

// 基础响应类型
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

// 请求参数类型
interface DeleteFileParams {
    url: string;
}

/**
 * 删除文件接口
 * @param data 请求参数
 */
export function deleteFile(data: string): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: `/api/upload/delete?url=${encodeURIComponent(data)}`,
        method: 'POST',
    });
}