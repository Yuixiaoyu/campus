// aichat.ts
import request from '@/utils/request';

/**
 * 基础响应类型
 */
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

/**
 * 聊天工具调用类型
 */
interface ChatToolCall {
    function: ChatFunctionCall;
    id: string;
    index: number;
    type: string;
}

/**
 * 函数调用类型
 */
interface ChatFunctionCall {
    arguments: string;
    name: string;
}

/**
 * 聊天消息类型
 */
interface ChatMessage {
    content?: any;  // 可以是任意类型
    function_call?: ChatFunctionCall;
    name?: string;
    reasoning_content?: string;
    role?: 'SYSTEM' | 'USER' | 'ASSISTANT' | 'FUNCTION' | 'TOOL';
    tool_call_id?: string;
    tool_calls?: ChatToolCall[];
}

/**
 * 聊天室类型
 */
interface ChatRoom {
    chatMessageList: ChatMessage[];
    rommId: number;  // 注意文档中字段名为 rommId（疑似 roomId 的拼写错误）
}


interface ChatRequestParams {
    roomId: number;
    message?: string;
}


export function doChat(params: ChatRequestParams): Promise<BaseResponse<string>> {
    return request<BaseResponse<string>>({
        url: `/api/ai/${params.roomId}/chat`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            message: params.message
        }
    });
}

/**
 * 获取聊天室列表接口
 */
export function getChatRoomList(): Promise<BaseResponse<ChatRoom[]>> {
    return request<BaseResponse<ChatRoom[]>>({
        url: '/api/ai/rooms',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
