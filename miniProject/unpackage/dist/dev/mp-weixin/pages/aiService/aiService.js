"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_wd_navbar2 + _easycom_wd_img2 + _easycom_wd_icon2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_img + _easycom_wd_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "aiService",
  setup(__props) {
    const showAIChat = () => {
      common_vendor.index.navigateTo({
        url: "/pages/aiService/aiChat/aiChat"
      });
    };
    const showTurtleSoup = () => {
      common_vendor.index.showToast({
        title: "敬请期待...",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "智能助手",
          fixed: true,
          placeholder: true,
          safeAreaInsetTop: true
        }),
        b: common_vendor.p({
          width: "60",
          height: "60",
          round: true,
          src: "/static/tabbar/deepseek-selected.png"
        }),
        c: common_vendor.p({
          name: "arrow-right",
          size: "20px",
          color: "#666"
        }),
        d: common_vendor.o(showAIChat),
        e: common_vendor.p({
          width: "60",
          height: "60",
          round: true,
          src: "/static/turtle-soup-icon.png"
        }),
        f: common_vendor.p({
          name: "arrow-right",
          size: "20px",
          color: "#666"
        }),
        g: common_vendor.o(showTurtleSoup)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2e1494a4"]]);
wx.createPage(MiniProgramPage);
