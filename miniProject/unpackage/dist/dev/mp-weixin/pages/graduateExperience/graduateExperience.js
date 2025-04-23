"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  WdImg();
}
const WdImg = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "graduateExperience",
  setup(__props) {
    const url = common_vendor.ref();
    common_vendor.onLoad((option) => {
      console.log(option);
      url.value = option.param;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/temp/img.png",
          width: "100%",
          height: "100vh"
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
