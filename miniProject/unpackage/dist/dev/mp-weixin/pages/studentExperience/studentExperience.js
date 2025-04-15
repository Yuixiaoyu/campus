"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "studentExperience",
  setup(__props) {
    const url = common_vendor.ref();
    common_vendor.onLoad((option) => {
      console.log(option);
      url.value = option.param;
    });
    return (_ctx, _cache) => {
      return {
        a: url.value
      };
    };
  }
});
wx.createPage(_sfc_main);
