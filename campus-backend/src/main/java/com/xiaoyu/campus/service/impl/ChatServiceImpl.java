package com.xiaoyu.campus.service.impl;

import cn.hutool.core.thread.ThreadUtil;
import cn.hutool.core.util.ObjUtil;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.xiaoyu.campus.manager.ai.AiManager;
import com.xiaoyu.campus.model.entity.ChatRoom;
import com.xiaoyu.campus.service.ChatService;
import com.xiaoyu.campus.utils.SseUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

/**
 * ClassName: ChatServiceImpl
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-29 19:46
 * @version: 1.0
 */
@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    @Resource
    private AiManager aiManager;

    @Resource
    private SseUtils sseUtils;

    final Map<Long, List<ChatMessage>> globalMessagesMap = new ConcurrentHashMap<>();

    // 新增最后活跃时间跟踪
    private final Map<Long, Long> lastActiveTimeMap = new ConcurrentHashMap<>();

    // 清理线程池（单线程）
    private final ScheduledExecutorService cleanupScheduler = Executors.newSingleThreadScheduledExecutor();

    // 过期时间（分钟）
    private static final long INACTIVE_TIMEOUT_MINUTES = 10;

    public ChatServiceImpl() {
        // 初始化定时清理任务（每分钟检查一次）
        cleanupScheduler.scheduleAtFixedRate(this::cleanupInactiveRooms,
                1, 1, TimeUnit.MINUTES);
    }

    @Override
    public String doChat(Long roomId, String message) {
        lastActiveTimeMap.put(roomId, System.currentTimeMillis());

        String systemPrompt = "【身份声明】\n" +
                "您好！我是「青春共享站」小程序的AI智能助手，你可以叫我小鱼，是由西安市雁塔区星河云端软件开发俱乐部公司技术支持。专注于解决校园生活与学习问题，当前暂未接入教务系统，随时为您解答心理健康与学习相关问题。我的主要功能是帮助在校学生和老师解决生活、学习、工作等方面遇到的困难";
        final ChatMessage systemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content(systemPrompt).build();
        final ChatMessage userMessage = ChatMessage.builder().role(ChatMessageRole.USER).content(message).build();
        //准备消息列表（关联历史上下文）
        List<ChatMessage> messages = new ArrayList<>();
        //首次与AI对话,需要初始化消息列表，并额外添加系统消息到记录中
        if (!globalMessagesMap.containsKey(roomId)) {
            globalMessagesMap.put(roomId, messages);
            messages.add(systemMessage);
        } else {
            //之后不用重复初始化而是获取过去的消息列表
            messages = globalMessagesMap.get(roomId);
        }
        messages.add(userMessage);
        //调用Ai
        String answer = aiManager.doChat(messages);

        final ChatMessage assistantMessage = ChatMessage.builder().role(ChatMessageRole.ASSISTANT).content(answer).build();
        messages.add(assistantMessage);
        //返回消息
        return answer;
    }

    @Override
    public void streamChat(Long userId,Long roomId, String message) throws ExecutionException, InterruptedException {
        lastActiveTimeMap.put(roomId, System.currentTimeMillis());
        String systemPrompt = "【身份声明】\n" +
                "您好！我是「青春共享站」小程序的AI智能助手，" +
                "你可以叫我小鱼，是由西安市雁塔区星河云端软件开发俱乐部公司技术支持。" +
                "专注于解决校园生活与学习问题，当前暂未接入教务系统，随时为您解答心理健康与学习相关问题。" +
                "我的主要功能是帮助在校学生和老师解决生活、学习、工作等方面遇到的困难";
        final ChatMessage streamSystemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content(systemPrompt).build();
        final ChatMessage streamUserMessage = ChatMessage.builder().role(ChatMessageRole.USER).content(message).build();
        //准备消息列表（关联历史上下文）
        List<ChatMessage> messages;
        //首次与AI对话,需要初始化消息列表，并额外添加系统消息到记录中
        if (!globalMessagesMap.containsKey(roomId)) {
            messages = new ArrayList<>();
            globalMessagesMap.put(roomId, messages);
            messages.add(streamSystemMessage);
        } else {
            //之后不用重复初始化而是获取过去的消息列表
            messages = globalMessagesMap.get(roomId);
        }
        messages.add(streamUserMessage);

        //异步请求
        Future<?> future = ThreadUtil.execAsync(() -> {
            Flux<String> result = aiManager.streamChat(messages);
            //将流式数据返回给用户
            result.subscribe(
                    data -> sseUtils.sendMessage(userId,String.valueOf(roomId), data.toString()),  // 处理每个字符串
                    error -> log.error(error.getMessage()),  // 错误处理
                    () -> sseUtils.deleteUser(userId)  // 流完成后的回调
            );
        });
        if (ObjUtil.isNotNull(future.get())) {
            log.info("异步请求成功");
            final ChatMessage assistantMessage = ChatMessage.builder().role(ChatMessageRole.ASSISTANT).content(future.get().toString()).build();
            messages.add(assistantMessage);
        }

    }

    @Override
    public List<ChatRoom> getChatRoomList() {
        List<ChatRoom> chatRoomList = new ArrayList<>();
        for (Map.Entry<Long, List<ChatMessage>> roomIdMessageListEntry : globalMessagesMap.entrySet()) {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setRommId(roomIdMessageListEntry.getKey());
            chatRoom.setChatMessageList(roomIdMessageListEntry.getValue());
            chatRoomList.add(chatRoom);
        }
        return chatRoomList;
    }
    /**
     * 清理闲置房间的方法
     */
    private void cleanupInactiveRooms() {
        long currentTime = System.currentTimeMillis();

        globalMessagesMap.keySet().removeIf(roomId -> {
            Long lastActive = lastActiveTimeMap.get(roomId);
            if (lastActive == null) {
                return true; // 无记录的直接移除
            }
            // 计算闲置时间（分钟）
            long inactiveMinutes = TimeUnit.MILLISECONDS.toMinutes(currentTime - lastActive);
            if (inactiveMinutes >= INACTIVE_TIMEOUT_MINUTES) {
                lastActiveTimeMap.remove(roomId); // 清理时间记录
                System.out.println("清理闲置房间: " + roomId);
                return true;
            }
            return false;
        });
    }

    @PreDestroy
    public void shutdown() {
        cleanupScheduler.shutdown();
        try {
            // 优雅关闭：等待现有任务完成
            if (!cleanupScheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                cleanupScheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            // 重新设置中断状态
            Thread.currentThread().interrupt();
        }
    }
}
