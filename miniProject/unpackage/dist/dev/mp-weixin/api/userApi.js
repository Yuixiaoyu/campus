"use strict";
const utils_request = require("../utils/request.js");
function wxLogin(code) {
  return utils_request.request({
    url: `/api/user/wx/login?code=${code}`,
    method: "POST"
  });
}
exports.wxLogin = wxLogin;
