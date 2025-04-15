// aiChat.ts
import request from '@/utils/request';

// 类型定义
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}

interface ChatFunctionCall {
    arguments?: string;
    name?: string;
}

interface ChatToolCall {
    function?: ChatFunctionCall;
    id?: string;
    index?: number;
    type?: string;
}

interface ChatMessage {
    content?: any;
    function_call?: ChatFunctionCall;
    name?: string;
    reasoning_content?: string;
    role?: 'SYSTEM' | 'USER' | 'ASSISTANT' | 'FUNCTION' | 'TOOL';
    tool_call_id?: string;
    tool_calls?: ChatToolCall[];
}

interface ChatRoom {
    chatMessageList?: ChatMessage[];
    rommId?: number;  // 注意文档中可能存在拼写错误 rommId -> roomId
}

// 获取聊天室列表
export function getChatRoomList(): Promise<BaseResponse<ChatRoom[]>> {
    return request<BaseResponse<ChatRoom[]>>({
        url: '/api/ai/rooms',
        method: 'GET'
    });
}

// 发送聊天消息（非流式）
export function doChat(roomId: number, message?: string): Promise<BaseResponse<string>> {
    return request<BaseResponse<string>>({
        url: `/api/ai/${roomId}/chat?message=${message}`,
        method: 'GET'
    });
}

// 发送聊天消息（流式）
export function doChatStream(roomId: number, message: string):Promise<BaseResponse<any>>  {
    return request<BaseResponse<any>>({
        url : `/api/ai/${roomId}/chat?message=${encodeURIComponent(message)}`,
        method: 'GET',
        enableChunked: true
    });
}