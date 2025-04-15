"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdSegmented_types = require("./types.js");
const __default__ = {
  name: "wd-segmented",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSegmented_types.segmentedProps,
  emits: ["update:value", "change", "click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const $item = ".wd-segmented__item";
    const props = __props;
    const emit = __emit;
    const state = common_vendor.reactive({
      activeIndex: 0,
      // 选中项
      activeStyle: ""
      // 选中样式
    });
    const activeDisabled = common_vendor.computed(() => {
      return props.disabled || (props.options[0] && uni_modules_wotDesignUni_components_common_util.isObj(props.options[0]) ? props.options[0].disabled : false);
    });
    common_vendor.watch(
      () => props.value,
      () => {
        updateCurrentIndex();
        updateActiveStyle();
        if (props.vibrateShort) {
          common_vendor.index.vibrateShort({});
        }
      },
      {
        immediate: false
      }
    );
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.onMounted(async () => {
      updateCurrentIndex();
      await uni_modules_wotDesignUni_components_common_util.pause();
      updateActiveStyle(false);
    });
    function updateActiveStyle(animation = true) {
      uni_modules_wotDesignUni_components_common_util.getRect($item, true, proxy).then((rects) => {
        const rect = rects[state.activeIndex];
        const style = {
          position: "absolute",
          width: uni_modules_wotDesignUni_components_common_util.addUnit(rect.width),
          "z-index": 0
        };
        const left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0);
        if (left) {
          style.transform = `translateX(${left}px)`;
        }
        if (animation) {
          style.transition = "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)";
        }
        state.activeStyle = uni_modules_wotDesignUni_components_common_util.objToStyle(style);
      });
    }
    function updateCurrentIndex() {
      const index = props.options.findIndex((option) => {
        const value = uni_modules_wotDesignUni_components_common_util.isObj(option) ? option.value : option;
        return value == props.value;
      });
      if (index >= 0) {
        state.activeIndex = index;
      } else {
        const value = uni_modules_wotDesignUni_components_common_util.isObj(props.options[0]) ? props.options[0].value : props.options[0];
        emit("update:value", value);
        emit("change", uni_modules_wotDesignUni_components_common_util.isObj(props.options[0]) ? props.options[0] : { value });
      }
    }
    function handleClick(option, index) {
      const disabled = props.disabled || (uni_modules_wotDesignUni_components_common_util.isObj(option) ? option.disabled : false);
      if (disabled) {
        return;
      }
      const value = uni_modules_wotDesignUni_components_common_util.isObj(option) ? option.value : option;
      state.activeIndex = index;
      updateActiveStyle();
      emit("update:value", value);
      emit("change", uni_modules_wotDesignUni_components_common_util.isObj(option) ? option : { value });
      emit("click", uni_modules_wotDesignUni_components_common_util.isObj(option) ? option : { value });
    }
    __expose({
      updateActiveStyle
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.options, (option, index, i0) => {
          return common_vendor.e(_ctx.$slots.label ? {
            a: "label-" + i0,
            b: common_vendor.r("label", {
              option: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(option) ? option : {
                value: option
              }
            }, i0)
          } : {
            c: common_vendor.t(common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(option) ? option.value : option)
          }, {
            d: common_vendor.n(`wd-segmented__item is-${_ctx.size} ${state.activeIndex === index ? "is-active" : ""} ${_ctx.disabled || (common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(option) ? option.disabled : false) ? "is-disabled" : ""}`),
            e: common_vendor.o(($event) => handleClick(option, index), index),
            f: index
          });
        }),
        b: _ctx.$slots.label,
        c: common_vendor.n(`wd-segmented__item--active ${activeDisabled.value ? "is-disabled" : ""}`),
        d: common_vendor.s(state.activeStyle),
        e: common_vendor.n(`wd-segmented ${_ctx.customClass}`),
        f: common_vendor.s(_ctx.customStyle)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a53f024"]]);
wx.createComponent(Component);
