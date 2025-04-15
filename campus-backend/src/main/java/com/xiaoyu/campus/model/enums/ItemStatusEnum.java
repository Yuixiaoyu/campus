package com.xiaoyu.campus.model.enums;

import lombok.Getter;

@Getter
public enum ItemStatusEnum {
    PENDING(0, "待找回"),
    RETRIEVED(1, "已找回");

    private final Integer code;
    private final String desc;

    ItemStatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    // 根据code获取枚举
    public static ItemStatusEnum getByCode(Integer code) {
        for (ItemStatusEnum status : values()) {
            if (status.code.equals(code)) {
                return status;
            }
        }
        return null;
    }
}