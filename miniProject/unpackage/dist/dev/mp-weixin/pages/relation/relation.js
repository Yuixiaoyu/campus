"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  (_easycom_wd_navbar2 + _easycom_wd_img2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_img)();
}
const url = "https://minio.fybreeze.cn/campus/rIfnbyoVsdDmb6b7d81505235520d4f070e8085ef16c.webp";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "relation",
  setup(__props) {
    const handleClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    const previewImage = () => {
      common_vendor.index.previewImage({
        current: url,
        // 当前显示图片的http链接
        urls: [url]
        // 需要预览的图片http链接列表
      });
    };
    common_vendor.onShareAppMessage((res) => {
      console.log(res);
      return {
        title: "青春共享站",
        path: "/pages/index/index",
        imageUrl: "/static/logo.jpg"
        // 分享图片
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "青春共享站",
        path: "/pages/index/index",
        imageUrl: "/static/logo.jpg"
        // 分享图片
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClickLeft),
        b: common_vendor.p({
          ["custom-class"]: "navbar",
          bordered: false,
          title: "联系我们",
          safeAreaInsetTop: true,
          ["left-arrow"]: true
        }),
        c: common_vendor.o(previewImage),
        d: common_vendor.p({
          ["custom-class"]: "img",
          src: url,
          width: 100,
          height: 100,
          mode: "scaleToFill"
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-85e55c19"]]);
wx.createPage(MiniProgramPage);
