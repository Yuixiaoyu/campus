package com.xiaoyu.campus.manager.ai;

import cn.hutool.core.collection.CollectionUtil;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionChunk;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.completion.chat.ChatCompletionChoice;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import io.reactivex.disposables.Disposable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * ClassName: AiManager
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-28 20:33
 * @version: 1.0
 */
@Service
public class AiManager {

    @Resource
    private ArkService arkService;


    /**
     * 聊天
     *
     * @param systemPrompt
     * @param userPrompt
     * @return
     */
    public String doChat(String systemPrompt, String userPrompt) {

        final List<ChatMessage> streamMessages = new ArrayList<>();
        final ChatMessage streamSystemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content(systemPrompt).build();
        final ChatMessage streamUserMessage = ChatMessage.builder().role(ChatMessageRole.USER).content(userPrompt).build();
        streamMessages.add(streamSystemMessage);
        streamMessages.add(streamUserMessage);
        return doChat(streamMessages);
    }

    /**
     * 更通用的方法，允许用户传入任意条的消息列表
     *
     * @param messageList
     * @return
     */
    @Deprecated
    public String doChat(List<ChatMessage> messageList) {

        BotChatCompletionRequest chatCompletionRequest = BotChatCompletionRequest.builder()
                .botId("bot-20250328192459-wzlgj")
                .messages(messageList)
                .build();
        List<ChatCompletionChoice> choiceList = arkService.createBotChatCompletion(chatCompletionRequest).getChoices();
        // the references example
        if (CollectionUtil.isEmpty(choiceList)) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "AI返回结果为空");
        }
        String content = (String) choiceList.get(0).getMessage().getContent();
        System.out.println("AI返回内容：" + content);
        return content;
    }


    /**
     * 更通用的方法，支持流式返回
     * @param messageList 消息列表
     * @return Flux流式响应
     */
    public Flux<String> doChatStream(List<ChatMessage> messageList) {
        BotChatCompletionRequest request = BotChatCompletionRequest.builder()
                .botId("bot-20250328192459-wzlgj")
                .messages(messageList)
                .build();

        return Flux.create(emitter -> {
            try {
                arkService.streamBotChatCompletion(request)
                        .doOnError(emitter::error)
                        .blockingForEach(choice -> {
                            // 处理参考文献
                            if (CollectionUtil.isNotEmpty(choice.getReferences())) {
                                choice.getReferences().forEach(ref ->
                                        emitter.next("[REF] " + ref.getUrl())
                                );
                            }

                            // 处理消息内容
                            if (CollectionUtil.isNotEmpty(choice.getChoices())) {
                                String content = (String) choice.getChoices().get(0).getMessage().getContent();
                                emitter.next(content);
                            }
                        });

                emitter.complete();
            } catch (Exception e) {
                emitter.error(e);
            } finally {
                arkService.shutdownExecutor();
            }
        });
    }


    public List<ChatMessage> buildMessages(String systemPrompt,String userInput) {
        ChatMessage systemMsg = ChatMessage.builder()
                .role(ChatMessageRole.SYSTEM)
                .content(systemPrompt)
                .build();

        ChatMessage userMsg = ChatMessage.builder()
                .role(ChatMessageRole.USER)
                .content(userInput)
                .build();

        return Arrays.asList(systemMsg, userMsg);
    }



}
