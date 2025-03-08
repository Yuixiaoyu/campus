package com.xiaoyu.campus.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController {

    /**
     * 健康检查
     */
    @GetMapping("/health")
    public BaseResponse<String> health() {
        return ResultUtils.success("ok"+ StpUtil.isLogin());
    }
}
