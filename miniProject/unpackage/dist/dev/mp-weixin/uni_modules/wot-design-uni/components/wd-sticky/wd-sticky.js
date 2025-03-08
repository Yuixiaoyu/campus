"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdSticky_types = require("./types.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdStickyBox_types = require("../wd-sticky-box/types.js");
if (!Math) {
  wdResize();
}
const wdResize = () => "../wd-resize/wd-resize.js";
const __default__ = {
  name: "wd-sticky",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSticky_types.stickyProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const styckyId = common_vendor.ref(`wd-sticky${uni_modules_wotDesignUni_components_common_util.uuid()}`);
    const observerList = common_vendor.ref([]);
    const stickyState = common_vendor.reactive({
      position: "absolute",
      boxLeaved: false,
      top: 0,
      height: 0,
      width: 0,
      state: ""
    });
    const { parent: stickyBox } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdStickyBox_types.STICKY_BOX_KEY);
    const { proxy } = common_vendor.getCurrentInstance();
    const rootStyle = common_vendor.computed(() => {
      const style = {
        "z-index": props.zIndex,
        height: uni_modules_wotDesignUni_components_common_util.addUnit(stickyState.height),
        width: uni_modules_wotDesignUni_components_common_util.addUnit(stickyState.width)
      };
      if (!stickyState.boxLeaved) {
        style["position"] = "relative";
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};${props.customStyle}`;
    });
    const stickyStyle = common_vendor.computed(() => {
      const style = {
        "z-index": props.zIndex,
        height: uni_modules_wotDesignUni_components_common_util.addUnit(stickyState.height),
        width: uni_modules_wotDesignUni_components_common_util.addUnit(stickyState.width)
      };
      if (!stickyState.boxLeaved) {
        style["position"] = "relative";
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};`;
    });
    const containerStyle = common_vendor.computed(() => {
      const style = {
        position: stickyState.position,
        top: uni_modules_wotDesignUni_components_common_util.addUnit(stickyState.top)
      };
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const innerOffsetTop = common_vendor.computed(() => {
      let top = 0;
      return top + props.offsetTop;
    });
    function clearObserver() {
      while (observerList.value.length !== 0) {
        observerList.value.pop().disconnect();
      }
    }
    function createObserver() {
      const observer = common_vendor.index.createIntersectionObserver(proxy, { thresholds: [0, 0.5] });
      observerList.value.push(observer);
      return observer;
    }
    async function handleResize(detail) {
      stickyState.width = detail.width;
      stickyState.height = detail.height;
      await uni_modules_wotDesignUni_components_common_util.pause();
      observerContentScroll();
      if (!stickyBox || !stickyBox.observerForChild)
        return;
      stickyBox.observerForChild(proxy);
    }
    function observerContentScroll() {
      if (stickyState.height === 0 && stickyState.width === 0)
        return;
      const offset = innerOffsetTop.value + stickyState.height;
      clearObserver();
      createObserver().relativeToViewport({
        top: -offset
      }).observe(`#${styckyId.value}`, (result) => {
        handleRelativeTo(result);
      });
      uni_modules_wotDesignUni_components_common_util.getRect(`#${styckyId.value}`, false, proxy).then((res) => {
        if (Number(res.bottom) <= offset)
          handleRelativeTo({ boundingClientRect: res });
      });
    }
    function handleRelativeTo({ boundingClientRect }) {
      if (stickyBox && stickyState.height >= stickyBox.boxStyle.height) {
        stickyState.position = "absolute";
        stickyState.top = 0;
        return;
      }
      let isStycky = boundingClientRect.top <= innerOffsetTop.value;
      if (isStycky) {
        stickyState.state = "sticky";
        stickyState.boxLeaved = false;
        stickyState.position = "fixed";
        stickyState.top = innerOffsetTop.value;
      } else {
        stickyState.state = "normal";
        stickyState.boxLeaved = false;
        stickyState.position = "absolute";
        stickyState.top = 0;
      }
    }
    function setPosition(boxLeaved, position, top) {
      stickyState.boxLeaved = boxLeaved;
      stickyState.position = position;
      stickyState.top = top;
    }
    __expose({
      setPosition,
      stickyState,
      offsetTop: props.offsetTop
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleResize),
        b: common_vendor.p({
          ["custom-style"]: "display: inline-block;"
        }),
        c: common_vendor.s(containerStyle.value),
        d: common_vendor.n(`wd-sticky ${_ctx.customClass}`),
        e: common_vendor.s(stickyStyle.value),
        f: styckyId.value,
        g: common_vendor.s(`${rootStyle.value};display: inline-block;`)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2722b5fd"]]);
wx.createComponent(Component);
