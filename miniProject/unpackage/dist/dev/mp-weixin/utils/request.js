"use strict";
const common_vendor = require("../common/vendor.js");
const base_url = "http://localhost:8090";
const timeout = 5e3;
const defaultHeader = {
  "Content-Type": "application/json;charset=UTF-8",
  "Authorization": "Basic c2FiZXI6c2FiZXJfc2VjcmV0"
};
const handleLogin = () => {
  common_vendor.index.clearStorageSync();
  common_vendor.index.showModal({
    title: "提示",
    content: "请登录",
    showCancel: false,
    success() {
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }, 1e3);
    }
  });
};
const request = (params) => {
  let url = params.url;
  let method = params.method || "GET";
  let data = params.data || {};
  let header = {
    "sa-Token": common_vendor.index.getStorageSync("token") || "",
    ...defaultHeader,
    ...params.header
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: base_url + url,
      method,
      header,
      data,
      timeout,
      withCredentials: true,
      success(response) {
        const res = response;
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          switch (res.statusCode) {
            case 40100:
              handleLogin();
              break;
            case 40400:
              common_vendor.index.showToast({
                title: "请求地址不存在...",
                duration: 2e3
              });
              break;
            default:
              common_vendor.index.showToast({
                title: "请重试...",
                duration: 2e3
              });
              break;
          }
        }
      },
      fail(err) {
        console.log(err);
        if (err.errMsg.includes("request:fail")) {
          common_vendor.index.showToast({
            title: "网络异常",
            icon: "error",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: "未知异常",
            duration: 2e3
          });
        }
        reject(err);
      },
      complete() {
        common_vendor.index.hideLoading();
        common_vendor.index.hideToast();
      }
    });
  });
};
exports.request = request;
