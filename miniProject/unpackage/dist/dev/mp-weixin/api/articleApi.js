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
function getArticleVOLikeListByUserId(id) {
  return utils_request.request({
    url: `/api/article/articleLike/${id}`,
    method: "GET"
  });
}
function likeArticle(id) {
  return utils_request.request({
    url: `/api/article/like/` + id,
    method: "GET"
  });
}
function getArticleByArticleId(id) {
  return utils_request.request({
    url: `/api/article/get/detail?articleId=${id}`,
    method: "GET"
  });
}
function getArticleTags() {
  return utils_request.request({
    url: "/api/article/tags",
    method: "GET"
  });
}
function deleteArticle(id) {
  return utils_request.request({
    url: `/api/article/delete?id=${encodeURIComponent(id)}`,
    method: "POST"
  });
}
exports.addArticle = addArticle;
exports.deleteArticle = deleteArticle;
exports.getArticleByArticleId = getArticleByArticleId;
exports.getArticleList = getArticleList;
exports.getArticleTags = getArticleTags;
exports.getArticleVOLikeListByUserId = getArticleVOLikeListByUserId;
exports.likeArticle = likeArticle;
