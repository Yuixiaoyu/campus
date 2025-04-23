package com.xiaoyu.campus.service;

import com.xiaoyu.campus.model.entity.ChatRoom;

import java.util.List;
import java.util.concurrent.ExecutionException;

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
     * 和AI对话(流式)
     *
     * @param message
     * @return
     */
    void streamChat(Long userId, Long roomId, String message) throws ExecutionException, InterruptedException;


    /**
     * 获取聊天室列表
     *
     * @return
     */
    List<ChatRoom> getChatRoomList();

}