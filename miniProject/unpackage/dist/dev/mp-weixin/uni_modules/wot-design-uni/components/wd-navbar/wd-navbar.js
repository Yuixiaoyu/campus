"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdNavbar_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-navbar",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdNavbar_types.navbarProps,
  emits: ["click-left", "click-right"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const height = common_vendor.ref("");
    const { statusBarHeight } = common_vendor.index.getSystemInfoSync();
    common_vendor.watch(
      [() => props.fixed, () => props.placeholder],
      () => {
        setPlaceholderHeight();
      },
      { deep: true, immediate: false }
    );
    const rootStyle = common_vendor.computed(() => {
      const style = {};
      if (props.fixed && uni_modules_wotDesignUni_components_common_util.isDef(props.zIndex)) {
        style["z-index"] = props.zIndex;
      }
      if (props.safeAreaInsetTop) {
        style["padding-top"] = uni_modules_wotDesignUni_components_common_util.addUnit(statusBarHeight || 0);
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};${props.customStyle}`;
    });
    common_vendor.onMounted(() => {
      if (props.fixed && props.placeholder) {
        common_vendor.nextTick$1(() => {
          setPlaceholderHeight();
        });
      }
    });
    function handleClickLeft() {
      if (!props.leftDisabled) {
        emit("click-left");
      }
    }
    function handleClickRight() {
      if (!props.rightDisabled) {
        emit("click-right");
      }
    }
    const { proxy } = common_vendor.getCurrentInstance();
    function setPlaceholderHeight() {
      if (!props.fixed || !props.placeholder) {
        return;
      }
      uni_modules_wotDesignUni_components_common_util.getRect(".wd-navbar", false, proxy).then((res) => {
        height.value = res.height;
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.$slots.capsule
      }, _ctx.$slots.capsule ? {} : !_ctx.$slots.left ? common_vendor.e({
        c: _ctx.leftArrow
      }, _ctx.leftArrow ? {
        d: common_vendor.p({
          name: "arrow-left",
          ["custom-class"]: "wd-navbar__arrow"
        })
      } : {}, {
        e: _ctx.leftText
      }, _ctx.leftText ? {
        f: common_vendor.t(_ctx.leftText)
      } : {}, {
        g: common_vendor.n(`wd-navbar__left ${_ctx.leftDisabled ? "is-disabled" : ""}`),
        h: common_vendor.o(handleClickLeft)
      }) : {
        i: common_vendor.n(`wd-navbar__left ${_ctx.leftDisabled ? "is-disabled" : ""}`),
        j: common_vendor.o(handleClickLeft)
      }, {
        b: !_ctx.$slots.left,
        k: !_ctx.$slots.title && _ctx.title
      }, !_ctx.$slots.title && _ctx.title ? {
        l: common_vendor.t(_ctx.title)
      } : {}, {
        m: _ctx.$slots.right || _ctx.rightText
      }, _ctx.$slots.right || _ctx.rightText ? common_vendor.e({
        n: !_ctx.$slots.right && _ctx.rightText
      }, !_ctx.$slots.right && _ctx.rightText ? {
        o: common_vendor.t(_ctx.rightText)
      } : {}, {
        p: common_vendor.n(`wd-navbar__right ${_ctx.rightDisabled ? "is-disabled" : ""}`),
        q: common_vendor.o(handleClickRight)
      }) : {}, {
        r: common_vendor.n(`wd-navbar ${_ctx.customClass} ${_ctx.fixed ? "is-fixed" : ""} ${_ctx.bordered ? "is-border" : ""}`),
        s: common_vendor.s(rootStyle.value),
        t: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(height.value)
      });
    };
  }
});
wx.createComponent(_sfc_main);
