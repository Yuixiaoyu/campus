"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdCheckboxGroup_types = require("./types.js");
const __default__ = {
  name: "wd-checkbox-group",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdCheckboxGroup_types.checkboxGroupProps,
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdCheckboxGroup_types.CHECKBOX_GROUP_KEY);
    linkChildren({ props, changeSelectState });
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        if (new Set(newValue).size !== newValue.length) {
          console.error("checkboxGroup's bound value includes same value");
        }
        if (newValue.length < props.min) {
          console.error("checkboxGroup's bound value's length can't be less than min");
        }
        if (props.max !== 0 && newValue.length > props.max) {
          console.error("checkboxGroup's bound value's length can't be large than max");
        }
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.shape,
      (newValue) => {
        const type = ["circle", "square", "button"];
        if (type.indexOf(newValue) === -1)
          console.error(`shape must be one of ${type.toString()}`);
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.min,
      (newValue) => {
        uni_modules_wotDesignUni_components_common_util.checkNumRange(newValue, "min");
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.max,
      (newValue) => {
        uni_modules_wotDesignUni_components_common_util.checkNumRange(newValue, "max");
      },
      { deep: true, immediate: true }
    );
    function changeSelectState(value) {
      const temp = uni_modules_wotDesignUni_components_common_util.deepClone(props.modelValue);
      const index = temp.indexOf(value);
      if (index > -1) {
        temp.splice(index, 1);
      } else {
        temp.push(value);
      }
      emit("update:modelValue", temp);
      emit("change", {
        value: temp
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-checkbox-group ${_ctx.shape === "button" && _ctx.cell ? "is-button" : ""} ${_ctx.customClass}`),
        b: common_vendor.s(_ctx.customStyle)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-395de5f2"]]);
wx.createComponent(Component);
