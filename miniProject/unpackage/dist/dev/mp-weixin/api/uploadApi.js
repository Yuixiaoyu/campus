"use strict";
const utils_request = require("../utils/request.js");
function deleteFile(data) {
  return utils_request.request({
    url: `/api/upload/delete?url=${encodeURIComponent(data)}`,
    method: "POST"
  });
}
exports.deleteFile = deleteFile;
