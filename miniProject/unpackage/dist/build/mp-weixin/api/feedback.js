"use strict";const e=require("../utils/request.js");exports.addFeedBack=function(t){return e.request({url:"/api/feedback/add",method:"POST",data:t})};
