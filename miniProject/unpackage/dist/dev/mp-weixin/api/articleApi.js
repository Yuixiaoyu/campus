"use strict";
const utils_request = require("../utils/request.js");
function addArticle(data) {
  return utils_request.request({
    url: "/api/article/add",
    method: "POST",
    data
  });
}
function getArticleList(data) {
  return utils_request.request({
    url: "/api/article/articleList/page",
    method: "POST",
    data
  });
}
function getArticleByUserId(id) {
  return utils_request.request({
    url: `/api/article/get?id=${id}`,
    method: "GET"
  });
}
function getArticleTags() {
  return utils_request.request({
    url: "/api/article/tags",
    method: "GET"
  });
}
exports.addArticle = addArticle;
exports.getArticleByUserId = getArticleByUserId;
exports.getArticleList = getArticleList;
exports.getArticleTags = getArticleTags;
