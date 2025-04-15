package com.xiaoyu.campus.article;

import com.github.houbb.sensitive.word.bs.SensitiveWordBs;
import com.xiaoyu.campus.config.SensitiveWordConfig;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.annotation.Resource;
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

    @Resource
    private UploadFilesService uploadFilesService;

    @Resource
    private SensitiveWordBs sensitiveWordBs;

    @Test
    public void articleReportTest(){
        String text = "测试我的页面同步更新文章信息";
        List<String> allWords = sensitiveWordBs.enableNumCheck(false).findAll(text);
        System.out.println("所有敏感词: " + allWords);
    }

    @Test
    public void testStringToJson(){
        List<String> list = Arrays.asList("abc", "bcz", "aaa");
        String string = list.toString();
        System.out.println(string);
    }

    @Test
    public void testRemoveFile(){
        String path = "oLVGRAmxedr059d8084868d79c9b3aa19644e705d2a6.webp";
        uploadFilesService.deleteFile(path);
    }
}
