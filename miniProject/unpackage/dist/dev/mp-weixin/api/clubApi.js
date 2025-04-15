"use strict";
const utils_request = require("../utils/request.js");
function getClubList(data) {
  return utils_request.request({
    url: "/api/club/clubList/page",
    method: "POST",
    data
  });
}
function getClubDetail(id) {
  return utils_request.request({
    url: `/api/club/${id}`,
    method: "POST"
  });
}
exports.getClubDetail = getClubDetail;
exports.getClubList = getClubList;
