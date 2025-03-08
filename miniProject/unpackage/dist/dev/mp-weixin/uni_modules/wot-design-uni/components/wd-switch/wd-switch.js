"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdSwitch_types = require("./types.js");
const __default__ = {
  name: "wd-switch",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSwitch_types.switchProps,
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootClass = common_vendor.computed(() => {
      return `wd-switch ${props.customClass} ${props.disabled ? "is-disabled" : ""} ${props.modelValue === props.activeValue ? "is-checked" : ""}`;
    });
    const rootStyle = common_vendor.computed(() => {
      const rootStyle2 = {
        background: props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor,
        "border-color": props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor
      };
      if (props.size) {
        rootStyle2["font-size"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.size);
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(rootStyle2)};${props.customStyle}`;
    });
    const circleStyle = common_vendor.computed(() => {
      const circleStyle2 = props.modelValue === props.activeValue && props.activeColor || props.modelValue !== props.activeValue && props.inactiveColor ? "box-shadow: none;" : "";
      return circleStyle2;
    });
    function switchValue() {
      if (props.disabled)
        return;
      const newVal = props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue;
      if (props.beforeChange && uni_modules_wotDesignUni_components_common_util.isFunction(props.beforeChange)) {
        props.beforeChange({
          value: newVal,
          resolve: (pass) => {
            if (pass) {
              emit("update:modelValue", newVal);
              emit("change", {
                value: newVal
              });
            }
          }
        });
      } else {
        emit("update:modelValue", newVal);
        emit("change", {
          value: newVal
        });
      }
    }
    common_vendor.onBeforeMount(() => {
      if ([props.activeValue, props.inactiveValue].indexOf(props.modelValue) === -1) {
        emit("update:modelValue", props.inactiveValue);
        emit("change", {
          value: props.inactiveValue
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(circleStyle.value),
        b: common_vendor.n(rootClass.value),
        c: common_vendor.s(rootStyle.value),
        d: common_vendor.o(switchValue)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-751565c9"]]);
wx.createComponent(Component);
