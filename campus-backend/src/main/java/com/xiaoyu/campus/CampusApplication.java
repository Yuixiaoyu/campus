package com.xiaoyu.campus;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;

@MapperScan("com.xiaoyu.campus.mapper")
@EnableAsync
@EnableAspectJAutoProxy(exposeProxy = true) //代理
@SpringBootApplication
public class CampusApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusApplication.class, args);
    }

}
