package com.xiaoyu.campus.model.entity;

import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import lombok.Data;

import java.util.List;

/**
 * ClassName: ChatRoom
 * Description:
 *  聊天房间
 * @Author: fy
 * @create: 2025-03-29 20:12
 * @version: 1.0
 */
@Data
public class ChatRoom {

    private Long rommId;

    private List<ChatMessage> chatMessageList;


}
