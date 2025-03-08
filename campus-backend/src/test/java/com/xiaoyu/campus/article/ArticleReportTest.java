package com.xiaoyu.campus.article;

import com.github.houbb.sensitive.word.bs.SensitiveWordBs;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

/**
 * ClassName: ArticleReportTest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-06 20:46
 * @version: 1.0
 */
@SpringBootTest
public class ArticleReportTest {

    @Test
    public void articleReportTest(){
        String text = "这是一个包含敏感词的测试文本，比如包含色情、赌博等词汇。vx:123123123120";
        List<String> allWords = SensitiveWordBs.newInstance().enableNumCheck(false).findAll(text);
        System.out.println("所有敏感词: " + allWords);
    }

    @Test
    public void testStringToJson(){
        List<String> list = Arrays.asList("abc", "bcz", "aaa");
        String string = list.toString();
        System.out.println(string);
    }
}
