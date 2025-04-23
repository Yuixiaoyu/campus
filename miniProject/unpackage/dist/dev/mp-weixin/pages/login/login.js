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
      if (!e.code) {
        toast.error("未授权手机号，请重试");
        return;
      }
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      try {
        const res = await api_userApi.wxLogin(e.code);
        if (res.code === 200) {
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
          toast.error(res.message || "登录失败");
        }
      } catch (error) {
        console.error("登录错误:", error);
        toast.error("登录失败，请重试");
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const handleCancel = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const openUserAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/agreement/user"
      });
    };
    const openPrivacyPolicy = () => {
      common_vendor.index.navigateTo({
        url: "/pages/agreement/privacy"
      });
    };
    common_vendor.onLoad(() => {
      utils_userStorage.clearUserInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["custom-class"]: "navbar",
          bordered: false,
          title: "登录",
          safeAreaInsetTop: true
        }),
        b: common_vendor.o(login),
        c: common_vendor.p({
          icon: "wechat",
          type: "success",
          block: true,
          ["open-type"]: "getPhoneNumber"
        }),
        d: common_vendor.o(handleCancel),
        e: common_vendor.p({
          type: "info",
          block: true,
          plain: true
        }),
        f: common_vendor.o(openUserAgreement),
        g: common_vendor.o(openPrivacyPolicy)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
