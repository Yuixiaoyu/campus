package com.xiaoyu.campus.controller;

import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.utils.SseUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.Resource;
import java.util.Map;
 
/**
 * SseController
 *
 * @author joker
 * @version 1.0
 * 2023/8/9 11:18
 **/
@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/sse")
public class SseController {
 
    @Resource
    private SseUtils sseUtils;
 
 
    @GetMapping(value = "/createSseConnect", produces="text/event-stream;charset=UTF-8")
    public SseEmitter createSseConnect(@RequestParam(name = "clientId", required = false) Long clientId) {
        return sseUtils.connect(clientId);
    }

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestParam("clientId") Long clientId, @RequestParam("message")  String message){
        sseUtils.sendMessage(clientId, "123456789", message);
    }
 
    @GetMapping(value = "/listSseConnect")
    public BaseResponse<Map<Long, SseEmitter>> listSseConnect(){
        Map<Long, SseEmitter> sseEmitterMap = sseUtils.listSseConnect();
        return ResultUtils.success(sseEmitterMap);
    }
 
 
    /**
     * 关闭SSE连接
     *
     * @param clientId 客户端ID
     **/
    @GetMapping("/closeSseConnect")
    public BaseResponse<Boolean> closeSseConnect(Long clientId) {
        sseUtils.deleteUser(clientId);
        return ResultUtils.success(true);
    }
 
}