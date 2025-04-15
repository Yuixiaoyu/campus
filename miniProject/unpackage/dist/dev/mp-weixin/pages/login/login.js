"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_userApi = require("../../api/userApi.js");
const utils_userStorage = require("../../utils/userStorage.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_navbar2 + _easycom_wd_button2 + _easycom_wd_toast2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_button + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const login = async (e) => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      const code = e.code;
      const res = await api_userApi.wxLogin(code);
      if (res.code == 200) {
        console.log(res.data);
        common_vendor.index.setStorageSync("token", res.data.token);
        utils_userStorage.setUserInfo(res.data);
        toast.success("登录成功");
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1e3);
      } else {
        console.log(res);
      }
      common_vendor.index.hideLoading();
      toast.error(res.msg);
    };
    common_vendor.onLoad(() => {
      utils_userStorage.clearUserInfo();
    });
    const handleClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClickLeft),
        b: common_vendor.p({
          ["custom-class"]: "navbar",
          bordered: false,
          title: "登陆",
          safeAreaInsetTop: true,
          ["left-arrow"]: true
        }),
        c: common_vendor.o(login),
        d: common_vendor.p({
          icon: "app",
          type: "success",
          block: true,
          ["open-type"]: "getPhoneNumber"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
