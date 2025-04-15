// commentApi.ts
import request from '@/utils/request';

// 类型定义
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

interface CommentAddRequest {
    articleId?: number;
    content?: string;
    parentId?: number;
    userId?: number;
}

interface CommentVO {
    articleId?: number;
    content?: string;
    id?: number;
    parentUserVO?: UserVO;
    replies?: CommentVO[];
    userVO?: UserVO;
}

interface UserVO {
    createTime?: string;
    id?: number;
    imageUrl?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
}

// 接口封装
export function addComment(data: CommentAddRequest): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: '/api/comment/add',
        method: 'POST',
        data: data
    });
}

export function getCommentListByArticleId(articleId: number): Promise<BaseResponse<CommentVO[]>> {
    return request<BaseResponse<CommentVO[]>>({
        url: `/api/comment/list?articleId=${articleId}`,
        method: 'GET'
    });
}