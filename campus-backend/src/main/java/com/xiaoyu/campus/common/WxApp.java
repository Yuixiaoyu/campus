package com.xiaoyu.campus.common;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * ClassName: WxApp
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-02 16:55
 * @version: 1.0
 */
@Component
@ConfigurationProperties(prefix = "wx")
@Data
public class WxApp {

    @Value("${wx.appid}")
    private String appid;

    @Value("${wx.appSecret}")
    private String appSecret;
}
