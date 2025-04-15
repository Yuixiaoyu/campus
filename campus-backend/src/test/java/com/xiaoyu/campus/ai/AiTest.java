package com.xiaoyu.campus.ai;

import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionResult;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
import okhttp3.ConnectionPool;
import okhttp3.Dispatcher;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * ClassName: AiTest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-28 20:10
 * @version: 1.0
 */
@SpringBootTest
public class AiTest {

    @Value("${AI.apiKey}")
    private String apiKey;

    @Test
    public void doTest() {
        // 此为默认路径，您可根据业务所在地域进行配置
        String baseUrl = "https://ark.cn-beijing.volces.com/api/v3";
        ConnectionPool connectionPool = new ConnectionPool(5, 1, TimeUnit.SECONDS);
        Dispatcher dispatcher = new Dispatcher();
        ArkService service = ArkService.builder().dispatcher(dispatcher).connectionPool(connectionPool).baseUrl(baseUrl).apiKey(apiKey).build();

        //直接输出
        System.out.println("\n----- standard request -----");
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content("你是DeepSeek，是一个 AI 人工智能助手").build();
        final ChatMessage userMessage = ChatMessage.builder().role(ChatMessageRole.USER).content("常见的十字花科植物有哪些？").build();
        messages.add(systemMessage);
        messages.add(userMessage);

        BotChatCompletionRequest chatCompletionRequest = BotChatCompletionRequest.builder()
                .botId("bot-20250328192459-wzlgj")
                .messages(messages)
                .build();

        BotChatCompletionResult chatCompletionResult = service.createBotChatCompletion(chatCompletionRequest);
        chatCompletionResult.getChoices().forEach(choice -> System.out.println(choice.getMessage().getContent()));
        // the references example
        if (chatCompletionResult.getReferences() != null) {
            chatCompletionResult.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
        }

        // 对于R1模型，输出reasoning content
        chatCompletionResult.getChoices().forEach(choice -> System.out.println(choice.getMessage().getReasoningContent()));

        //流式输出
        System.out.println("\n----- streaming request -----");
        final List<ChatMessage> streamMessages = new ArrayList<>();
        final ChatMessage streamSystemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content("你是DeepSeek，是一个 AI 人工智能助手").build();
        final ChatMessage streamUserMessage = ChatMessage.builder().role(ChatMessageRole.USER).content("常见的十字花科植物有哪些？").build();
        streamMessages.add(streamSystemMessage);
        streamMessages.add(streamUserMessage);

        BotChatCompletionRequest streamChatCompletionRequest = BotChatCompletionRequest.builder()
                .botId("bot-20250328192459-wzlgj")
                .messages(streamMessages)
                .build();

        service.streamBotChatCompletion(streamChatCompletionRequest)
                .doOnError(Throwable::printStackTrace)
                .blockingForEach(
                        choice -> {
                            if (choice.getReferences() != null && !choice.getReferences().isEmpty()) {
                                choice.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
                            }
                            if (!choice.getChoices().isEmpty()) {
                                if (choice.getChoices().get(0).getMessage().getReasoningContent() != null) {
                                    System.out.print(choice.getChoices().get(0).getMessage().getReasoningContent()); // 对于R1模型，输出reasoning content
                                }
                                System.out.print(choice.getChoices().get(0).getMessage().getContent());
                            }
                        }
                );

        // shutdown service after all requests is finished
        service.shutdownExecutor();
    }

}
