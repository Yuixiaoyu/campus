"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useCell = require("../composables/useCell.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("../wd-form/types.js");
const uni_modules_wotDesignUni_components_wdCell_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-cell",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdCell_types.cellProps,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const cell = uni_modules_wotDesignUni_components_composables_useCell.useCell();
    const isBorder = common_vendor.computed(() => {
      return Boolean(uni_modules_wotDesignUni_components_common_util.isDef(props.border) ? props.border : cell.border.value);
    });
    const { parent: form } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdForm_types.FORM_KEY);
    const errorMessage = common_vendor.computed(() => {
      if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
        return form.errorMessages[props.prop];
      } else {
        return "";
      }
    });
    const isRequired = common_vendor.computed(() => {
      let formRequired = false;
      if (form && form.props.rules) {
        const rules = form.props.rules;
        for (const key in rules) {
          if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
            formRequired = rules[key].some((rule) => rule.required);
          }
        }
      }
      return props.required || props.rules.some((rule) => rule.required) || formRequired;
    });
    function onClick() {
      const url = props.to;
      if (props.clickable || props.isLink) {
        emit("click");
      }
      if (url && props.isLink) {
        if (props.replace) {
          common_vendor.index.redirectTo({ url });
        } else {
          common_vendor.index.navigateTo({ url });
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.icon
      }, _ctx.icon ? {
        b: common_vendor.p({
          name: _ctx.icon,
          ["custom-class"]: `wd-cell__icon  ${_ctx.customIconClass}`
        })
      } : {}, {
        c: _ctx.title
      }, _ctx.title ? {
        d: common_vendor.t(_ctx.title),
        e: common_vendor.n(_ctx.customTitleClass)
      } : {}, {
        f: _ctx.label
      }, _ctx.label ? {
        g: common_vendor.t(_ctx.label),
        h: common_vendor.n(`wd-cell__label ${_ctx.customLabelClass}`)
      } : {}, {
        i: common_vendor.n(isRequired.value ? "is-required" : ""),
        j: common_vendor.s(_ctx.titleWidth ? "min-width:" + _ctx.titleWidth + ";max-width:" + _ctx.titleWidth + ";" : ""),
        k: common_vendor.t(_ctx.value),
        l: common_vendor.n(`wd-cell__value ${_ctx.customValueClass}`),
        m: _ctx.isLink
      }, _ctx.isLink ? {
        n: common_vendor.p({
          ["custom-class"]: "wd-cell__arrow-right",
          name: "arrow-right"
        })
      } : {}, {
        o: errorMessage.value
      }, errorMessage.value ? {
        p: common_vendor.t(errorMessage.value)
      } : {}, {
        q: common_vendor.n(_ctx.vertical ? "is-vertical" : ""),
        r: common_vendor.n(isBorder.value ? "is-border" : ""),
        s: common_vendor.n(_ctx.size ? "is-" + _ctx.size : ""),
        t: common_vendor.n(_ctx.center ? "is-center" : ""),
        v: common_vendor.n(_ctx.customClass),
        w: common_vendor.s(_ctx.customStyle),
        x: _ctx.isLink || _ctx.clickable ? "is-hover" : "none",
        y: common_vendor.o(onClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f1c5bbe2"]]);
wx.createComponent(Component);
