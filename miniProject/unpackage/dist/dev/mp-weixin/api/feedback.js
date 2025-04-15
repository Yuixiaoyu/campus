"use strict";
const utils_request = require("../utils/request.js");
function addFeedBack(data) {
  return utils_request.request({
    url: "/api/feedback/add",
    method: "POST",
    data
  });
}
exports.addFeedBack = addFeedBack;
