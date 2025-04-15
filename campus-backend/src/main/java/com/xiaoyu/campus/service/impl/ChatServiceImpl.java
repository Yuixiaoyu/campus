package com.xiaoyu.campus.service.impl;

import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionChunk;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
import com.xiaoyu.campus.manager.ai.AiManager;
import com.xiaoyu.campus.model.entity.ChatRoom;
import com.xiaoyu.campus.service.ChatService;
import io.reactivex.disposables.Disposable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * ClassName: ChatServiceImpl
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-29 19:46
 * @version: 1.0
 */
@Service
public class ChatServiceImpl implements ChatService {

    @Resource
    private AiManager aiManager;

    @Resource
    private ArkService arkService;

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
    @Deprecated
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
    public Flux<String> streamChat(Long roomId, String message) {
        lastActiveTimeMap.put(roomId, System.currentTimeMillis());

        String systemPrompt = "【身份声明】\n" +
                "您好！我是「青春共享站」小程序的AI智能助手，你可以叫我小鱼，是由西安市雁塔区星河云端软件开发俱乐部公司技术支持。" +
                "专注于解决校园生活与学习问题，当前暂未接入教务系统，随时为您解答心理健康与学习相关问题。" +
                "我的主要功能是帮助在校学生和老师解决生活、学习、工作等方面遇到的困难";

        List<ChatMessage> messages = aiManager.buildMessages(systemPrompt, message);
        //准备消息列表（关联历史上下文）
        //List<ChatMessage> messages = new ArrayList<>();
        //首次与AI对话,需要初始化消息列表，并额外添加系统消息到记录中
        //if (!globalMessagesMap.containsKey(roomId)) {
        //    globalMessagesMap.put(roomId, messages);
        //    messages.add(systemMessage);
        //} else {
        //    //之后不用重复初始化而是获取过去的消息列表
        //    messages = globalMessagesMap.get(roomId);
        //}
        //messages.add(userMessage);
        BotChatCompletionRequest request = BotChatCompletionRequest.builder()
                .botId("bot-20250328192459-wzlgj")
                .messages(messages)
                .build();

        return Flux.create(emitter -> {
            Disposable subscription = arkService.streamBotChatCompletion(request)
                    .subscribe(
                            choice -> processChoice(choice, emitter),
                            emitter::error,
                            emitter::complete
                    );

            emitter.onCancel(subscription::dispose);
        }, FluxSink.OverflowStrategy.BUFFER);
    }


    private void processChoice(BotChatCompletionChunk choice, FluxSink<String> emitter) {
        // 处理参考文献
        Optional.ofNullable(choice.getReferences())
                .ifPresent(refs -> refs.forEach(ref ->
                        emitter.next("[REF] " + ref.getUrl())
                ));

        // 处理消息内容
        Optional.ofNullable(choice.getChoices())
                .filter(c -> !c.isEmpty())
                .ifPresent(choices ->
                        emitter.next((String) choices.get(0).getMessage().getContent())
                );
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
