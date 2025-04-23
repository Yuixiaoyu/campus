package com.xiaoyu.campus.utils;
 
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
 
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
 
 
/**
 * sseUtils
 *
 * @author joker
 * @version 1.0
 * 2023/8/9 11:20
 **/
@Slf4j
@Component
public class SseUtils {
 
    private static final Map<Long, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();
 
    /**
     * 创建连接
     */
    public SseEmitter connect(Long userId) {
        if (sseEmitterMap.containsKey(userId)) {
            SseEmitter sseEmitter =sseEmitterMap.get(userId);
            sseEmitterMap.remove(userId);
            sseEmitter.complete();
        }
        try {
            UUID uuid = UUID.randomUUID();
            String str = uuid.toString();
            String temp = str.substring(0, 8) + str.substring(9, 13) + str.substring(14, 18) + str.substring(19, 23) + str.substring(24);
 
            // 设置超时时间，0表示不过期。默认30秒,现在是一天
            SseEmitter sseEmitter = new SseEmitter(60*60*12*1000L);
            sseEmitter.send(SseEmitter.event().id(temp).data(""));
//            reconnectTime(10*1000L)
            // 注册回调
            sseEmitter.onCompletion(completionCallBack(userId));
//            sseEmitter.completeWithError(errorCallBack(userId));
            sseEmitter.onTimeout(timeoutCallBack(userId));
            sseEmitterMap.put(userId, sseEmitter);
            log.info("创建sse连接完成，当前用户：{}", userId);
            return sseEmitter;
        } catch (Exception e) {
            log.info("创建sse连接异常，当前用户：{}", userId);
        }
        return null;
    }
 
    /**
     * 给指定用户发送消息
     *
     */
    public boolean sendMessage(Long userId,String messageId, String message) {
        if (sseEmitterMap.containsKey(userId)) {
            SseEmitter sseEmitter = sseEmitterMap.get(userId);
            try {
                sseEmitter.send(SseEmitter.event().id(messageId).data(message));
//                reconnectTime(10*1000L)
                log.info("用户{},消息id:{},推送成功:{}", userId,messageId, message);
                return true;
            }catch (Exception e) {
                sseEmitterMap.remove(userId);
                log.info("用户{},消息id:{},推送异常:{}", userId,messageId, e.getMessage());
                sseEmitter.complete();
                return false;
            }
        }else {
            log.info("用户{}未上线", userId);
        }
        return false;
    }
 
    /**
     * 删除连接
     * @param userId
     */
    public void deleteUser(Long userId){
        removeUser(userId);
    }
 
    private static Runnable completionCallBack(Long userId) {
        return () -> {
            log.info("结束sse用户连接：{}", userId);
            removeUser(userId);
        };
    }
 
    private static Throwable errorCallBack(Long userId) {
        log.info("sse用户连接异常：{}", userId);
        removeUser(userId);
        return new Throwable();
    }
 
    private static Runnable timeoutCallBack(Long userId) {
        return () -> {
            log.info("连接sse用户超时：{}", userId);
            removeUser(userId);
        };
    }
 
    /**
     * 断开
     * @param userId
     */
    public static void removeUser(Long userId){
        if (sseEmitterMap.containsKey(userId)) {
            SseEmitter sseEmitter = sseEmitterMap.get(userId);
            sseEmitterMap.remove(userId);
            sseEmitter.complete();
        }else {
            log.info("用户{} 连接已关闭",userId);
        }
    }
 
    public Map<Long, SseEmitter> listSseConnect(){
         return sseEmitterMap;
    }
}