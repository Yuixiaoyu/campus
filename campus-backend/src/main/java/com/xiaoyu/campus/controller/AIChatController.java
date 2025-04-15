package com.xiaoyu.campus.controller;

import cn.hutool.core.util.StrUtil;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.exception.ThrowUtils;
import com.xiaoyu.campus.model.entity.ChatRoom;
import com.xiaoyu.campus.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import retrofit2.adapter.rxjava2.Result;

import javax.annotation.Resource;
import java.util.List;

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


    /**
     * 聊天
     * @param roomId
     * @param message
     * @return
     */
    @GetMapping(value = "/{roomId}/chat",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public BaseResponse<Flux<String>> doChat(@PathVariable Long roomId, String message) {
        Flux<String> result = chatService.streamChat(roomId, message);
        //ThrowUtils.throwIf(StrUtil.isBlank(result), ErrorCode.SYSTEM_ERROR,"AI响应错误");
        return ResultUtils.success(result);
    }


    /**
     * 获取所有聊天室列表
     * @return
     */
    @GetMapping("/rooms")
    public BaseResponse<List<ChatRoom>> getChatRoomList(){
        List<ChatRoom> chatRoomList = chatService.getChatRoomList();
        return ResultUtils.success(chatRoomList);
    }

}
