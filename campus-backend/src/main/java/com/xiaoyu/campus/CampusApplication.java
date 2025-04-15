package com.xiaoyu.campus;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.security.Security;

@MapperScan("com.xiaoyu.campus.mapper")
@EnableAsync
@EnableScheduling
@EnableAspectJAutoProxy(exposeProxy = true) //代理
@SpringBootApplication
public class CampusApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusApplication.class, args);
    }
}
