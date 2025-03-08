"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdDivider_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const __default__ = {
  name: "wd-divider",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdDivider_types.dividerProps,
  setup(__props) {
    const props = __props;
    const slots = common_vendor.useSlots();
    const rootStyle = common_vendor.computed(() => {
      const { color } = props;
      const style = {};
      if (color) {
        style.color = color;
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};${props.customStyle}`;
    });
    const rootClass = common_vendor.computed(() => {
      const prefixCls = "wd-divider";
      const classes = {
        [prefixCls]: true,
        ["is-dashed"]: props.dashed,
        ["is-hairline"]: props.hairline,
        [`${prefixCls}--vertical`]: props.vertical,
        [`${prefixCls}--center`]: !props.vertical && !!slots.default,
        [`${prefixCls}--left`]: !props.vertical && props.contentPosition === "left",
        [`${prefixCls}--right`]: !props.vertical && props.contentPosition === "right",
        [props.customClass]: !!props.customClass
      };
      return classes;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.vertical
      }, !_ctx.vertical ? {} : {}, {
        b: common_vendor.n(rootClass.value),
        c: common_vendor.s(rootStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-86c73a37"]]);
wx.createComponent(Component);
