package com.xiaoyu.campus.manager.ai;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionResult;
import com.volcengine.ark.runtime.model.completion.chat.ChatCompletionChoice;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

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
    @Deprecated
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
    public String doChat(List<ChatMessage> messageList) {

        BotChatCompletionRequest chatCompletionRequest = BotChatCompletionRequest.builder()
                .botId("bot-20250328192459-wzlgj")
                .messages(messageList)
                .build();
        List<ChatCompletionChoice> choiceList = arkService.createBotChatCompletion(chatCompletionRequest).getChoices();
        // the references example
        if (CollectionUtil.isEmpty(choiceList)) {
           throw new BusinessException(ErrorCode.SYSTEM_ERROR,"AI返回结果为空");
        }
        String content = (String) choiceList.get(0).getMessage().getContent();
        System.out.println("AI返回内容："+content);
        return content;
    }



    /**
     * 更通用的方法，允许用户传入任意条的消息列表
     *
     * @param messageList
     * @return
     */
    public Flux<String> streamChat(List<ChatMessage> messageList) {
        BotChatCompletionRequest request = BotChatCompletionRequest.builder()
                .model("bot-20250328192459-wzlgj")
                .messages(messageList)
                .build();

        // 将 Flowable 转换为 Flux
        return Flux.from(arkService.streamBotChatCompletion(request))
                .doOnError(Throwable::printStackTrace)
                .flatMap(choice -> {
                    if (choice.getReferences() != null) {
                        choice.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
                    }
                    String content = !choice.getChoices().isEmpty()
                            ? (String) choice.getChoices().get(0).getMessage().getContent()
                            : "";
                    return Flux.just(content);
                });
    }



}
