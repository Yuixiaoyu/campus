"use strict";
const utils_request = require("../utils/request.js");
function getActivityList(data) {
  return utils_request.request({
    url: "/api/activity/activityList/page",
    method: "POST",
    data
  });
}
function registrationActivity(data) {
  return utils_request.request({
    url: "/api/activity/registration",
    method: "POST",
    data
  });
}
function getActivityVOByJoinUserId(id) {
  return utils_request.request({
    url: `/api/activity/get/${id}`,
    method: "POST"
  });
}
exports.getActivityList = getActivityList;
exports.getActivityVOByJoinUserId = getActivityVOByJoinUserId;
exports.registrationActivity = registrationActivity;
