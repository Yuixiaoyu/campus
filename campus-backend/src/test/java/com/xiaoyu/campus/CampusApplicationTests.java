package com.xiaoyu.campus;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class CampusApplicationTests {

    @Test
    void contextLoads() {
        String urlString = "https://pic1.zhimg.com/v2-2c8cb13d158d32708beced95e715e012_r.jpg";
        // 使用正则表达式替换掉查询参数部分
        String baseUrl = urlString.replaceAll("\\?.*$", "");
        System.out.println("URL without params: " + baseUrl);
    }

    @Test
    void testDate() {
        System.out.println(new Date().toString());
    }

}
