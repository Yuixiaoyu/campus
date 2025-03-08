"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_base64 = require("../common/base64.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("./index.js");
const uni_modules_wotDesignUni_components_wdToast_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
if (!Math) {
  (wdOverlay + wdLoading + wdIcon + wdTransition)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdLoading = () => "../wd-loading/wd-loading.js";
const wdOverlay = () => "../wd-overlay/wd-overlay.js";
const wdTransition = () => "../wd-transition/wd-transition.js";
const __default__ = {
  name: "wd-toast",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdToast_types.toastProps,
  setup(__props) {
    const props = __props;
    const iconName = common_vendor.ref("");
    const msg = common_vendor.ref("");
    const position = common_vendor.ref("middle");
    const show = common_vendor.ref(false);
    const zIndex = common_vendor.ref(100);
    const loadingType = common_vendor.ref("outline");
    const loadingColor = common_vendor.ref("#4D80F0");
    const iconSize = common_vendor.ref();
    const loadingSize = common_vendor.ref();
    const svgStr = common_vendor.ref("");
    const cover = common_vendor.ref(false);
    const classPrefix = common_vendor.ref("wd-icon");
    const iconClass = common_vendor.ref("");
    const direction = common_vendor.ref("horizontal");
    let opened = null;
    let closed = null;
    const toastOptionKey = uni_modules_wotDesignUni_components_wdToast_index.getToastOptionKey(props.selector);
    const toastOption = common_vendor.inject(toastOptionKey, common_vendor.ref(uni_modules_wotDesignUni_components_wdToast_index.defaultOptions));
    common_vendor.watch(
      () => toastOption.value,
      (newVal) => {
        reset(newVal);
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => iconName.value,
      () => {
        buildSvg();
      },
      {
        deep: true,
        immediate: true
      }
    );
    const transitionStyle = common_vendor.computed(() => {
      const style = {
        "z-index": zIndex.value,
        position: "fixed",
        top: "50%",
        left: 0,
        width: "100%",
        transform: "translate(0, -50%)",
        "text-align": "center",
        "pointer-events": "none"
      };
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-toast ${props.customClass} wd-toast--${position.value} ${(iconName.value !== "loading" || msg.value) && (iconName.value || iconClass.value) ? "wd-toast--with-icon" : ""} ${iconName.value === "loading" && !msg.value ? "wd-toast--loading" : ""} ${direction.value === "vertical" ? "is-vertical" : ""}`;
    });
    const svgStyle = common_vendor.computed(() => {
      const style = {
        backgroundImage: `url(${svgStr.value})`
      };
      if (uni_modules_wotDesignUni_components_common_util.isDef(iconSize.value)) {
        style.width = iconSize.value;
        style.height = iconSize.value;
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    common_vendor.onBeforeMount(() => {
      buildSvg();
    });
    function handleAfterEnter() {
      if (uni_modules_wotDesignUni_components_common_util.isFunction(opened)) {
        opened();
      }
    }
    function handleAfterLeave() {
      if (uni_modules_wotDesignUni_components_common_util.isFunction(closed)) {
        closed();
      }
    }
    function buildSvg() {
      if (iconName.value !== "success" && iconName.value !== "warning" && iconName.value !== "info" && iconName.value !== "error")
        return;
      const iconSvg = uni_modules_wotDesignUni_components_wdToast_index.toastIcon[iconName.value]();
      const iconSvgStr = `"data:image/svg+xml;base64,${uni_modules_wotDesignUni_components_common_base64.encode(iconSvg)}"`;
      svgStr.value = iconSvgStr;
    }
    function reset(option) {
      show.value = uni_modules_wotDesignUni_components_common_util.isDef(option.show) ? option.show : false;
      if (show.value) {
        mergeOptionsWithProps(option, props);
      }
    }
    function mergeOptionsWithProps(option, props2) {
      iconName.value = uni_modules_wotDesignUni_components_common_util.isDef(option.iconName) ? option.iconName : props2.iconName;
      iconClass.value = uni_modules_wotDesignUni_components_common_util.isDef(option.iconClass) ? option.iconClass : props2.iconClass;
      msg.value = uni_modules_wotDesignUni_components_common_util.isDef(option.msg) ? option.msg : props2.msg;
      position.value = uni_modules_wotDesignUni_components_common_util.isDef(option.position) ? option.position : props2.position;
      zIndex.value = uni_modules_wotDesignUni_components_common_util.isDef(option.zIndex) ? option.zIndex : props2.zIndex;
      loadingType.value = uni_modules_wotDesignUni_components_common_util.isDef(option.loadingType) ? option.loadingType : props2.loadingType;
      loadingColor.value = uni_modules_wotDesignUni_components_common_util.isDef(option.loadingColor) ? option.loadingColor : props2.loadingColor;
      iconSize.value = uni_modules_wotDesignUni_components_common_util.isDef(option.iconSize) ? uni_modules_wotDesignUni_components_common_util.addUnit(option.iconSize) : uni_modules_wotDesignUni_components_common_util.isDef(props2.iconSize) ? uni_modules_wotDesignUni_components_common_util.addUnit(props2.iconSize) : void 0;
      loadingSize.value = uni_modules_wotDesignUni_components_common_util.isDef(option.loadingSize) ? uni_modules_wotDesignUni_components_common_util.addUnit(option.loadingSize) : uni_modules_wotDesignUni_components_common_util.isDef(props2.loadingSize) ? uni_modules_wotDesignUni_components_common_util.addUnit(props2.loadingSize) : void 0;
      cover.value = uni_modules_wotDesignUni_components_common_util.isDef(option.cover) ? option.cover : props2.cover;
      classPrefix.value = uni_modules_wotDesignUni_components_common_util.isDef(option.classPrefix) ? option.classPrefix : props2.classPrefix;
      direction.value = uni_modules_wotDesignUni_components_common_util.isDef(option.direction) ? option.direction : props2.direction;
      closed = uni_modules_wotDesignUni_components_common_util.isFunction(option.closed) ? option.closed : uni_modules_wotDesignUni_components_common_util.isFunction(props2.closed) ? props2.closed : null;
      opened = uni_modules_wotDesignUni_components_common_util.isFunction(option.opened) ? option.opened : uni_modules_wotDesignUni_components_common_util.isFunction(props2.opened) ? props2.opened : null;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: cover.value
      }, cover.value ? {
        b: common_vendor.p({
          ["z-index"]: zIndex.value,
          ["lock-scroll"]: true,
          show: show.value,
          ["custom-style"]: "background-color: transparent;pointer-events: auto;"
        })
      } : {}, {
        c: iconName.value === "loading"
      }, iconName.value === "loading" ? {
        d: common_vendor.p({
          type: loadingType.value,
          color: loadingColor.value,
          size: loadingSize.value,
          ["custom-class"]: `wd-toast__icon ${direction.value === "vertical" ? "is-vertical" : ""}`
        })
      } : iconName.value === "success" || iconName.value === "warning" || iconName.value === "info" || iconName.value === "error" ? {
        f: common_vendor.s(svgStyle.value),
        g: common_vendor.n(`wd-toast__iconWrap wd-toast__icon ${direction.value === "vertical" ? "is-vertical" : ""}`)
      } : iconClass.value ? {
        i: common_vendor.p({
          ["custom-class"]: `wd-toast__icon ${direction.value === "vertical" ? "is-vertical" : ""}`,
          size: iconSize.value,
          ["class-prefix"]: classPrefix.value,
          name: iconClass.value
        })
      } : {}, {
        e: iconName.value === "success" || iconName.value === "warning" || iconName.value === "info" || iconName.value === "error",
        h: iconClass.value,
        j: msg.value
      }, msg.value ? {
        k: common_vendor.t(msg.value)
      } : {}, {
        l: common_vendor.n(rootClass.value),
        m: common_vendor.o(handleAfterEnter),
        n: common_vendor.o(handleAfterLeave),
        o: common_vendor.p({
          name: "fade",
          show: show.value,
          ["custom-style"]: transitionStyle.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fce8c80a"]]);
wx.createComponent(Component);
