"use strict";
const utils_request = require("../utils/request.js");
function getUserVOById(id) {
  return utils_request.request({
    url: `/api/user/get/vo${id ? `?id=${id}` : ""}`,
    method: "GET"
  });
}
function updateWxUser(data) {
  return utils_request.request({
    url: "/api/user/update/wx",
    method: "POST",
    data
  });
}
function wxLogin(code) {
  return utils_request.request({
    url: `/api/user/wx/login?code=${code}`,
    method: "POST"
  });
}
exports.getUserVOById = getUserVOById;
exports.updateWxUser = updateWxUser;
exports.wxLogin = wxLogin;
