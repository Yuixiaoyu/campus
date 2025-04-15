package com.xiaoyu.campus.ai;

import com.xiaoyu.campus.manager.ai.AiManager;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * ClassName: AiManagerTest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-28 21:39
 * @version: 1.0
 */
@SpringBootTest
public class AiManagerTest {

    @Resource
    private AiManager aiManager;

    @Test
    public void doChat(){
        String sysPrompt = "你是一个学生助理，请根据我的需求回答问题";
        String userPrompt = "我需要你帮我写一篇关于校园生活的文章,50字左右";
        aiManager.doChat(sysPrompt, userPrompt);

    }

}
