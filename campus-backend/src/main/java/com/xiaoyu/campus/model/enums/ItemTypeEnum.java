package com.xiaoyu.campus.model.enums;
import lombok.Getter;

@Getter
public enum ItemTypeEnum {
    LOST(1, "丢失"),
    FOUND(2, "招领");

    private final Integer code;
    private final String desc;

    ItemTypeEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    // 根据code获取枚举
    public static ItemTypeEnum getByCode(Integer code) {
        for (ItemTypeEnum type : values()) {
            if (type.code.equals(code)) {
                return type;
            }
        }
        return null;
    }
}