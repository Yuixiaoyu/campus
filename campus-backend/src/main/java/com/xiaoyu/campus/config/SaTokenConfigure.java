package com.xiaoyu.campus.config;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.jwt.StpLogicJwtForSimple;
import cn.dev33.satoken.stp.StpLogic;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // 注册 Sa-Token 拦截器，打开注解式鉴权功能 
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册 Sa-Token 拦截器，打开注解式鉴权功能 
        registry.addInterceptor(new SaInterceptor(handle -> StpUtil.checkLogin()))
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/**/health",
                        "/**/user/login",
                        "/**/user/wx/login",
                        "/**/article/uploadImages",
                        "/**/article/articleList/page",
                        "/**/doc.*",
                        "/**/swagger-ui.*",
                        "/**/swagger-resources",
                        "/**/webjars/**", // 允许加载前端资源
                        "/**/v2/api-docs/**",
                        "/**/doc.html",
                        "/v3/api-docs",      // 添加Swagger3文档路径
                        "/swagger-ui.html"    // 添加SwaggerUI页面路径
                );
    }

    // Sa-Token 整合 jwt (Simple 简单模式)
    @Bean
    public StpLogic getStpLogicJwt() {
        return new StpLogicJwtForSimple();
    }

}
