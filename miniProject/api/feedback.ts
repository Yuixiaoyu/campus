import request from '@/utils/request';

// 类型定义
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

interface FeedBackAddRequest {
    userId?: number;
    content?: string;
    imageList?: string[];
    relation?: string;
}


export function addFeedBack(data: FeedBackAddRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/feedback/add',
        method: 'POST',
        data: data
    });
}