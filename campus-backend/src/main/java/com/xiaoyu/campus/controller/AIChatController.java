package com.xiaoyu.campus.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.thread.ThreadUtil;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.entity.ChatRoom;
import com.xiaoyu.campus.service.ChatService;
import com.xiaoyu.campus.utils.SseUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * ClassName: AIChatController
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-29 20:17
 * @version: 1.0
 */
@RestController
@Slf4j
@RequestMapping("/ai")
public class AIChatController {

    @Resource
    private ChatService chatService;

    @Resource
    private SseUtils sseUtils;


    /**
     * 聊天,流式输出
     *
     * @param clientId 用户id
     * @param roomId   房间id
     * @param message  消息
     * @return
     */
    @GetMapping(value = "/{roomId}/streamChat", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter streamChat(@PathVariable Long roomId, Long clientId, String message) throws ExecutionException, InterruptedException {
        if (clientId== null||clientId<=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户id不能为空");
        }
        //建立链接
        SseEmitter sseEmitter = sseUtils.connect(clientId);
        chatService.streamChat(clientId,roomId, message);
        return sseEmitter;
    }

    /**
     * 聊天，非流式
     *
     * @param roomId  房间id
     * @param message 消息
     * @return
     */
    @GetMapping(value = "/{roomId}/chat")
    @SaCheckLogin
    public BaseResponse<String> doChat(@PathVariable Long roomId, String message) {
        String res = chatService.doChat(roomId, message);
        return ResultUtils.success(res);
    }

    /**
     * 获取所有聊天室列表
     *
     * @return
     */
    @GetMapping("/rooms")
    @SaCheckLogin
    public BaseResponse<List<ChatRoom>> getChatRoomList() {
        List<ChatRoom> chatRoomList = chatService.getChatRoomList();
        return ResultUtils.success(chatRoomList);
    }


}
