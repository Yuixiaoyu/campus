"use strict";
const ACTIVITY_STATUS = {
  0: "未开始",
  // 未开始
  1: "进行中",
  // 进行中
  2: "已结束"
  // 已结束
};
function getActivityStatus(code) {
  if (!ACTIVITY_STATUS[code]) {
    return null;
  }
  return ACTIVITY_STATUS[code];
}
exports.getActivityStatus = getActivityStatus;
