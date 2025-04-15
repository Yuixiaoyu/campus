// 类型定义区
type ActivityStatusCode = 0 | 1 | 2; // 限定合法状态码类型
type ActivityStatusMap = {
    [key in ActivityStatusCode]: string; // 字符串映射表
};

// 状态配置常量（集中管理，便于维护）
const ACTIVITY_STATUS: ActivityStatusMap = {
    0: '未开始',     // 未开始
    1: '进行中',     // 进行中
    2: '已结束',     // 已结束
};

// 核心工具函数
export function getActivityStatus(
    code: ActivityStatusCode
): string {
    // TypeScript 7.4+ 的类型断言模式
    if (!ACTIVITY_STATUS[code]) {
        return null;
    }
    return ACTIVITY_STATUS[code]!;
}
