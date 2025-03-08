"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdPopup_types = require("./types.js");
if (!Math) {
  (wdOverlay + wdIcon + wdTransition)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdOverlay = () => "../wd-overlay/wd-overlay.js";
const wdTransition = () => "../wd-transition/wd-transition.js";
const __default__ = {
  name: "wd-popup",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdPopup_types.popupProps,
  emits: [
    "update:modelValue",
    "before-enter",
    "enter",
    "before-leave",
    "leave",
    "after-leave",
    "after-enter",
    "click-modal",
    "close"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const transitionName = common_vendor.computed(() => {
      if (props.transition) {
        return props.transition;
      }
      if (props.position === "center") {
        return ["zoom-in", "fade"];
      }
      if (props.position === "left") {
        return "slide-left";
      }
      if (props.position === "right") {
        return "slide-right";
      }
      if (props.position === "bottom") {
        return "slide-up";
      }
      if (props.position === "top") {
        return "slide-down";
      }
      return "slide-up";
    });
    const safeBottom = common_vendor.ref(0);
    const style = common_vendor.computed(() => {
      return `z-index:${props.zIndex}; padding-bottom: ${safeBottom.value}px;${props.customStyle}`;
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-popup wd-popup--${props.position} ${!props.transition && props.position === "center" ? "is-deep" : ""} ${props.customClass || ""}`;
    });
    common_vendor.onBeforeMount(() => {
      if (props.safeAreaInsetBottom) {
        const { safeArea, screenHeight, safeAreaInsets } = common_vendor.index.getSystemInfoSync();
        if (safeArea) {
          safeBottom.value = screenHeight - (safeArea.bottom || 0);
        } else {
          safeBottom.value = 0;
        }
      }
    });
    function handleClickModal() {
      emit("click-modal");
      if (props.closeOnClickModal) {
        close();
      }
    }
    function close() {
      emit("close");
      emit("update:modelValue", false);
    }
    function noop() {
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.modal
      }, _ctx.modal ? {
        b: common_vendor.o(handleClickModal),
        c: common_vendor.o(noop),
        d: common_vendor.p({
          show: _ctx.modelValue,
          ["z-index"]: _ctx.zIndex,
          ["lock-scroll"]: _ctx.lockScroll,
          duration: _ctx.duration,
          ["custom-style"]: _ctx.modalStyle
        })
      } : {}, {
        e: _ctx.closable
      }, _ctx.closable ? {
        f: common_vendor.o(close),
        g: common_vendor.p({
          ["custom-class"]: "wd-popup__close",
          name: "add"
        })
      } : {}, {
        h: common_vendor.o(($event) => emit("before-enter")),
        i: common_vendor.o(($event) => emit("enter")),
        j: common_vendor.o(($event) => emit("after-enter")),
        k: common_vendor.o(($event) => emit("before-leave")),
        l: common_vendor.o(($event) => emit("leave")),
        m: common_vendor.o(($event) => emit("after-leave")),
        n: common_vendor.p({
          ["lazy-render"]: _ctx.lazyRender,
          ["custom-class"]: rootClass.value,
          ["custom-style"]: style.value,
          duration: _ctx.duration,
          show: _ctx.modelValue,
          name: transitionName.value,
          destroy: _ctx.hideWhenClose
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-25a8a9f7"]]);
wx.createComponent(Component);
