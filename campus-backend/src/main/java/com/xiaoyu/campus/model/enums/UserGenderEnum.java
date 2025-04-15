package com.xiaoyu.campus.model.enums;

import lombok.Getter;
@Getter
public enum UserGenderEnum {
    MALE(0, "男"),
    FEMALE(1, "女"),
    SECRET(2, "保密");

    private final int value;
    private final String description;

    UserGenderEnum(int value, String description) {
        this.value = value;
        this.description = description;
    }

    /**
     * 根据数值获取对应的枚举实例
     * @param value 数据库存储的数值
     * @return 对应的枚举实例，找不到时返回null
     */
    public static UserGenderEnum fromValue(int value) {
        for (UserGenderEnum gender : UserGenderEnum.values()) {
            if (gender.getValue() == value) {
                return gender;
            }
        }
        return null;
    }

    /**
     * 根据描述获取对应的枚举实例
     * @param description 性别描述
     * @return 对应的枚举实例，找不到时返回null
     */
    public static UserGenderEnum fromDescription(String description) {
        for (UserGenderEnum gender : UserGenderEnum.values()) {
            if (gender.getDescription().equals(description)) {
                return gender;
            }
        }
        return null;
    }


}