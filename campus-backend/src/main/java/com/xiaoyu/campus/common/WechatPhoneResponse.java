package com.xiaoyu.campus.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * 微信手机号信息响应实体
 */
@Data
public class WechatPhoneResponse {
    /**
     * 错误码
     */
    @JsonProperty("errcode")
    private Integer errCode;
    
    /**
     * 错误信息
     */
    @JsonProperty("errmsg")
    private String errMsg;
    
    /**
     * 手机号信息
     */
    @JsonProperty("phone_info")
    private PhoneInfo phoneInfo;



    /**
     * 手机号信息实体
     */
    @Data
    public static class PhoneInfo {
        /**
         * 带区号的完整手机号
         * 示例值: "+8613123456789"
         */
        @JsonProperty("phoneNumber")
        private String phoneNumber;

        /**
         * 不带区号的手机号
         * 示例值: "13123456789"
         */
        @JsonProperty("purePhoneNumber")
        private String purePhoneNumber;

        /**
         * 国家码
         * 示例值: "86"
         */
        @JsonProperty("countryCode")
        private String countryCode;
    }
}