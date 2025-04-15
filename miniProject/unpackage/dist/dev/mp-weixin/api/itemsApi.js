"use strict";
const utils_request = require("../utils/request.js");
function getItemsById(id) {
  return utils_request.request({
    url: `/api/items/items/${id}`,
    // 使用模板字符串处理路径参数
    method: "GET"
  });
}
function addMatchRecords(data) {
  return utils_request.request({
    url: "/api/items/matchRecords",
    method: "POST",
    data
    // 通过请求体传递JSON参数
  });
}
function addItems(data) {
  return utils_request.request({
    url: "/api/items/publish",
    method: "POST",
    data
    // 通过请求体传递JSON参数
  });
}
function getItemsList(data) {
  return utils_request.request({
    url: "/api/items/itemsList/page",
    method: "POST",
    data
  });
}
exports.addItems = addItems;
exports.addMatchRecords = addMatchRecords;
exports.getItemsById = getItemsById;
exports.getItemsList = getItemsList;
