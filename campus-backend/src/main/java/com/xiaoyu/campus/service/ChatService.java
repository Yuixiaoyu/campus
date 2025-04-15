package com.xiaoyu.campus.service;

import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.xiaoyu.campus.model.entity.ChatRoom;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

/**
 * ClassName: ChatService
 * Description:
 *  聊天服务
 * @Author: fy
 * @create: 2025-03-29 19:45
 * @version: 1.0
 */

public interface ChatService {
    /**
     * 和AI对话
     *
     * @param message
     * @return
     */
    String doChat(Long roomId, String message);



    /**
     * 和AI对话，支持流式返回
     *
     * @param message
     * @return
     */
    Flux<String> streamChat(Long roomId, String message);

    /**
     * 获取聊天室列表
     *
     * @return
     */
    List<ChatRoom> getChatRoomList();

}