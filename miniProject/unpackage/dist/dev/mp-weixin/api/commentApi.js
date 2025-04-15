"use strict";
const utils_request = require("../utils/request.js");
function addComment(data) {
  return utils_request.request({
    url: "/api/comment/add",
    method: "POST",
    data
  });
}
function getCommentListByArticleId(articleId) {
  return utils_request.request({
    url: `/api/comment/list?articleId=${articleId}`,
    method: "GET"
  });
}
exports.addComment = addComment;
exports.getCommentListByArticleId = getCommentListByArticleId;
