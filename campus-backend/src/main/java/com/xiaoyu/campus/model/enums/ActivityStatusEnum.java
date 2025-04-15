package com.xiaoyu.campus.model.enums;
import lombok.Getter;

import java.io.Serializable;

/**
 * 活动状态枚举类
 * 状态码与枚举顺序严格对应：
 * 0 - 未开始
 * 1 - 进行中
 * 2 - 已结束
 */
@Getter
public enum ActivityStatusEnum implements Serializable {
    UNSTARTED(0, "未开始"),
    IN_PROGRESS(1, "进行中"),
    ENDED(2, "已结束");

    // 获取状态码
    private final int code;
    // 获取中文描述
    private final String description;

    // 构造函数私有化（Java enum默认构造函数不可见）
    ActivityStatusEnum(int code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据状态码获取枚举实例
     * @param code 状态码
     * @return 对应的枚举实例
     * @throws IllegalArgumentException 当状态码无效时抛出
     */
    public static ActivityStatusEnum valueOf(int code) {
        for (ActivityStatusEnum status : ActivityStatusEnum.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid activity status code: " + code);
    }

    /**
     * 判断状态是否为进行中
     */
    public boolean isInProgress() {
        return this == IN_PROGRESS;
    }

    /**
     * 判断状态是否已完成
     */
    public boolean isCompleted() {
        return this == ENDED;
    }

    @Override
    public String toString() {
        return description; // 返回中文描述代替默认枚举名称
    }
}