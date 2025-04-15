// article.ts
import request from '@/utils/request';

// 类型定义
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

interface ArticleAddRequest {
    content?: string;
    images?: string[];
    tags?: string[];
}

interface ArticleQueryRequest {
    content?: string;
    userId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
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
    userProfile?: string;
    userRole?: string;
}


interface ArticleVO {
    commentCount?: number;
    content?: string;
    createTime?: string;
    id?: number;
    imagesList?: string[];
    likeCount?: number;
    tags?: string[];
    userId?: number;
    userVO?: UserVO;
    viewCount?: number;
    isLike?: boolean;
}

interface Page<T> {
    current: number;
    pages: number;
    records: T[];
    size: number;
    total: number;
}

// 接口封装
export function addArticle(data: ArticleAddRequest): Promise<BaseResponse<number>> {
    return request<BaseResponse<number>>({
        url: '/api/article/add',
        method: 'POST',
        data: data
    });
}

export function getArticleList(data: ArticleQueryRequest): Promise<BaseResponse<Page<ArticleVO>>> {
    return request<BaseResponse<Page<ArticleVO>>>({
        url: '/api/article/articleList/page',
        method: 'POST',
        data: data
    });
}

export function getArticleVOLikeListByUserId(id: number): Promise<BaseResponse<ArticleVO[]>> {
    return request<BaseResponse<ArticleVO[]>>({
        url: `/api/article/articleLike/${id}`,
        method: 'GET'
    });
}

export function getArticleByUserId(id: number): Promise<BaseResponse<ArticleVO[]>> {
    return request<BaseResponse<ArticleVO[]>>({
        url: `/api/article/get?id=${id}`,
        method: 'GET'
    });
}
export function likeArticle(id: number): Promise<BaseResponse<Boolean>> {
    return request<BaseResponse<Boolean>>({
        url: `/api/article/like/`+id,
        method: 'GET'
    });
}

export function getArticleByArticleId(id: number): Promise<BaseResponse<ArticleVO>> {
    return request<BaseResponse<ArticleVO>>({
        url: `/api/article/get/detail?articleId=${id}`,
        method: 'GET'
    });
}

export function getArticleTags(): Promise<BaseResponse<string[]>> {
    return request<BaseResponse<string[]>>({
        url: '/api/article/tags',
        method: 'GET'
    });
}
/**
 * 删除文章接口
 * @param id 文章ID (通过query参数传递)
 */
export function deleteArticle(id: number): Promise<BaseResponse<boolean>> {
    return request<BaseResponse<boolean>>({
        url: `/api/article/delete?id=${encodeURIComponent(id)}`,
        method: 'POST'
    });
}
