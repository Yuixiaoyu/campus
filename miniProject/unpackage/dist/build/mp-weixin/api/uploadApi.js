"use strict";const e=require("../utils/request.js");exports.deleteFile=function(t){return e.request({url:`/api/upload/delete?url=${encodeURIComponent(t)}`,method:"POST"})};
