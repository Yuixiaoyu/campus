"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdBadge_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const __default__ = {
  name: "wd-badge",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdBadge_types.badgeProps,
  setup(__props) {
    const props = __props;
    const content = common_vendor.computed(() => {
      const { modelValue, max, isDot } = props;
      if (isDot)
        return "";
      let value = modelValue;
      if (value && max && uni_modules_wotDesignUni_components_common_util.isNumber(value) && !Number.isNaN(value) && !Number.isNaN(max)) {
        value = max < value ? `${max}+` : value;
      }
      return value;
    });
    const contentStyle = common_vendor.computed(() => {
      const style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.bgColor)) {
        style.backgroundColor = props.bgColor;
      }
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.top)) {
        style.top = uni_modules_wotDesignUni_components_common_util.addUnit(props.top);
      }
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.right)) {
        style.right = uni_modules_wotDesignUni_components_common_util.addUnit(props.right);
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const shouldShowBadge = common_vendor.computed(() => !props.hidden && (content.value || content.value === 0 && props.showZero || props.isDot));
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: shouldShowBadge.value
      }, shouldShowBadge.value ? {
        b: common_vendor.t(content.value),
        c: common_vendor.n(_ctx.type ? "wd-badge__content--" + _ctx.type : ""),
        d: common_vendor.n(_ctx.isDot ? "is-dot" : ""),
        e: common_vendor.s(contentStyle.value)
      } : {}, {
        f: common_vendor.n(_ctx.customClass),
        g: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ea9b0eb"]]);
wx.createComponent(Component);
