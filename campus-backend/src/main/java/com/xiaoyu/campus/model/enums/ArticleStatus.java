package com.xiaoyu.campus.model.enums;

/**
 * 文章状态枚举
 * 
 * 该枚举用于映射数据库中的文章状态字段，对应关系如下：
 * 0: 待审核（PENDING_REVIEW）
 * 1: 已通过（APPROVED）
 * 2: 未通过（REJECTED）
 * 3: 已驳回（DENIED）
 */
public enum ArticleStatus {
    /**
     * 待审核状态（code: 0）
     * 表示文章已提交但尚未审核
     */
    PENDING_REVIEW(0, "待审核"),
    
    /**
     * 已通过状态（code: 1）
     * 表示文章已通过审核并发布
     */
    APPROVED(1, "已通过"),
    
    /**
     * 未通过状态（code: 2）
     * 表示文章未通过初步审核
     */
    REJECTED(2, "未通过"),
    
    /**
     * 已驳回状态（code: 3）
     * 表示文章在复审后被驳回
     */
    DENIED(3, "已驳回");

    private final int code;
    private final String description;

    /**
     * 枚举构造函数
     * @param code 数据库存储的状态码
     * @param description 状态描述
     */
    ArticleStatus(int code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 获取状态码
     * @return 当前枚举对应的状态码
     */
    public int getCode() {
        return code;
    }

    /**
     * 获取状态描述
     * @return 当前枚举对应的中文描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 通过状态码获取对应枚举实例
     * @param code 数据库存储的状态码
     * @return 对应的枚举实例
     * @throws IllegalArgumentException 如果传入无效的状态码
     */
    public static ArticleStatus fromCode(int code) {
        for (ArticleStatus status : values()) {
            if (status.code == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("无效的文章状态码: " + code);
    }

    /**
     * 覆盖toString方法方便日志输出
     * @return 格式：[code]description
     */
    @Override
    public String toString() {
        return "[" + code + "]" + description;
    }
}