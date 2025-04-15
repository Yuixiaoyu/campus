"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdCheckboxGroup_types = require("../wd-checkbox-group/types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdCheckbox_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-checkbox",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdCheckbox_types.checkboxProps,
  emits: ["change", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    __expose({
      toggle
    });
    const { parent: checkboxGroup, index } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdCheckboxGroup_types.CHECKBOX_GROUP_KEY);
    const isChecked = common_vendor.computed(() => {
      if (checkboxGroup) {
        return checkboxGroup.props.modelValue.indexOf(props.modelValue) > -1;
      } else {
        return props.modelValue === props.trueValue;
      }
    });
    const isFirst = common_vendor.computed(() => {
      return index.value === 0;
    });
    const isLast = common_vendor.computed(() => {
      const children = uni_modules_wotDesignUni_components_common_util.isDef(checkboxGroup) ? checkboxGroup.children : [];
      return index.value === children.length - 1;
    });
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.watch(
      () => props.modelValue,
      () => {
        if (checkboxGroup) {
          checkName();
        }
      }
    );
    common_vendor.watch(
      () => props.shape,
      (newValue) => {
        const type = ["circle", "square", "button"];
        if (uni_modules_wotDesignUni_components_common_util.isDef(newValue) && type.indexOf(newValue) === -1)
          console.error(`shape must be one of ${type.toString()}`);
      }
    );
    const innerShape = common_vendor.computed(() => {
      return props.shape || uni_modules_wotDesignUni_components_common_util.getPropByPath(checkboxGroup, "props.shape") || "circle";
    });
    const innerCheckedColor = common_vendor.computed(() => {
      return props.checkedColor || uni_modules_wotDesignUni_components_common_util.getPropByPath(checkboxGroup, "props.checkedColor");
    });
    const innerDisabled = common_vendor.computed(() => {
      if (!checkboxGroup) {
        return props.disabled;
      }
      const { max, min, modelValue, disabled } = checkboxGroup.props;
      if (max && modelValue.length >= max && !isChecked.value || min && modelValue.length <= min && isChecked.value || props.disabled === true || disabled && props.disabled === null) {
        return true;
      }
      return props.disabled;
    });
    const innerInline = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_common_util.getPropByPath(checkboxGroup, "props.inline") || false;
    });
    const innerCell = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_common_util.getPropByPath(checkboxGroup, "props.cell") || false;
    });
    const innerSize = common_vendor.computed(() => {
      return props.size || uni_modules_wotDesignUni_components_common_util.getPropByPath(checkboxGroup, "props.size");
    });
    common_vendor.onBeforeMount(() => {
      if (props.modelValue === null)
        console.error("checkbox's value must be set");
    });
    function checkName() {
      checkboxGroup && checkboxGroup.children && checkboxGroup.children.forEach((child) => {
        if (child.$.uid !== proxy.$.uid && child.modelValue === props.modelValue) {
          console.error(`The checkbox's bound value: ${props.modelValue} has been used`);
        }
      });
    }
    function toggle() {
      if (innerDisabled.value)
        return;
      if (checkboxGroup) {
        emit("change", {
          value: !isChecked.value
        });
        checkboxGroup.changeSelectState(props.modelValue);
      } else {
        const newVal = props.modelValue === props.trueValue ? props.falseValue : props.trueValue;
        emit("update:modelValue", newVal);
        emit("change", {
          value: newVal
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: innerShape.value !== "button"
      }, innerShape.value !== "button" ? {
        b: common_vendor.p({
          ["custom-class"]: "wd-checkbox__check",
          name: "check-bold"
        }),
        c: common_vendor.n(`wd-checkbox__shape ${innerShape.value === "square" ? "is-square" : ""} ${_ctx.customShapeClass}`),
        d: common_vendor.s(isChecked.value && !innerDisabled.value && innerCheckedColor.value ? "color :" + innerCheckedColor.value : "")
      } : {}, {
        e: innerShape.value === "button" && isChecked.value
      }, innerShape.value === "button" && isChecked.value ? {
        f: common_vendor.p({
          ["custom-class"]: "wd-checkbox__btn-check",
          name: "check-bold"
        })
      } : {}, {
        g: common_vendor.s(_ctx.maxWidth ? "max-width:" + _ctx.maxWidth : ""),
        h: common_vendor.n(`wd-checkbox__label ${_ctx.customLabelClass}`),
        i: common_vendor.s(isChecked.value && innerShape.value === "button" && !innerDisabled.value && innerCheckedColor.value ? "color:" + innerCheckedColor.value : ""),
        j: common_vendor.n(`wd-checkbox ${innerCell.value ? "is-cell-box" : ""} ${innerShape.value === "button" ? "is-button-box" : ""} ${isChecked.value ? "is-checked" : ""} ${isFirst.value ? "is-first-child" : ""} ${isLast.value ? "is-last-child" : ""} ${innerInline.value ? "is-inline" : ""} ${innerShape.value === "button" ? "is-button" : ""} ${innerDisabled.value ? "is-disabled" : ""} ${innerSize.value ? "is-" + innerSize.value : ""} ${_ctx.customClass}`),
        k: common_vendor.s(_ctx.customStyle),
        l: common_vendor.o(toggle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-66fc790e"]]);
wx.createComponent(Component);
