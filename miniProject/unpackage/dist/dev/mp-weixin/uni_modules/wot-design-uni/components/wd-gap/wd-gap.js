"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdGap_types = require("./types.js");
const __default__ = {
  name: "wd-gap",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdGap_types.gapProps,
  setup(__props) {
    const props = __props;
    const rootStyle = common_vendor.computed(() => {
      const rootStyle2 = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.bgColor)) {
        rootStyle2["background"] = props.bgColor;
      }
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.height)) {
        rootStyle2["height"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.height);
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(rootStyle2)};${props.customStyle}`;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-gap ${_ctx.safeAreaBottom ? "wd-gap--safe" : ""} ${_ctx.customClass}`),
        b: common_vendor.s(rootStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f8e8392"]]);
wx.createComponent(Component);
