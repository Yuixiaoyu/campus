"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTouch = require("../composables/useTouch.js");
const uni_modules_wotDesignUni_components_wdTabs_types = require("./types.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
if (!Array) {
  const _easycom_wd_badge2 = common_vendor.resolveComponent("wd-badge");
  _easycom_wd_badge2();
}
const _easycom_wd_badge = () => "../wd-badge/wd-badge.js";
if (!Math) {
  (_easycom_wd_badge + wdIcon + wdSticky + wdStickyBox)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdSticky = () => "../wd-sticky/wd-sticky.js";
const wdStickyBox = () => "../wd-sticky-box/wd-sticky-box.js";
const __default__ = {
  name: "wd-tabs",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTabs_types.tabsProps,
  emits: ["change", "disabled", "click", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const $item = ".wd-tabs__nav-item";
    const $itemText = ".wd-tabs__nav-item-text";
    const $container = ".wd-tabs__nav-container";
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("tabs");
    const state = common_vendor.reactive({
      activeIndex: 0,
      // 选中值的索引，默认第一个
      lineStyle: "display:none;",
      // 激活项边框线样式
      useInnerLine: false,
      // 是否使用内部激活项边框线，当外部激活下划线未成功渲染时显示内部定位的
      inited: false,
      // 是否初始化
      animating: false,
      // 是否动画中
      mapShow: false,
      // map的开关
      scrollLeft: 0
      // scroll-view偏移量
    });
    const { children, linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdTabs_types.TABS_KEY);
    linkChildren({ state, props });
    const { proxy } = common_vendor.getCurrentInstance();
    const touch = uni_modules_wotDesignUni_components_composables_useTouch.useTouch();
    const innerSlidable = common_vendor.computed(() => {
      return props.slidable === "always" || children.length > props.slidableNum;
    });
    const bodyStyle = common_vendor.computed(() => {
      if (!props.animated) {
        return "";
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle({
        left: -100 * state.activeIndex + "%",
        "transition-duration": props.duration + "ms",
        "-webkit-transition-duration": props.duration + "ms"
      });
    });
    const getTabName = (tab, index) => {
      return uni_modules_wotDesignUni_components_common_util.isDef(tab.name) ? tab.name : index;
    };
    const updateActive = (value = 0, init = false, setScroll = true) => {
      if (children.length === 0)
        return;
      value = getActiveIndex(value);
      if (children[value].disabled)
        return;
      state.activeIndex = value;
      if (setScroll) {
        updateLineStyle(init === false);
        scrollIntoView();
      }
      setActiveTab();
    };
    const setActive = uni_modules_wotDesignUni_components_common_util.debounce(updateActive, 100, { leading: true });
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        if (!uni_modules_wotDesignUni_components_common_util.isNumber(newValue) && !uni_modules_wotDesignUni_components_common_util.isString(newValue)) {
          console.error("[wot design] error(wd-tabs): the type of value should be number or string");
        }
        if (newValue === "" || !uni_modules_wotDesignUni_components_common_util.isDef(newValue)) {
          console.error("[wot design] error(wd-tabs): tabs's value cannot be '' null or undefined");
        }
        if (typeof newValue === "number" && newValue < 0) {
          console.error("[wot design] error(wd-tabs): tabs's value cannot be less than zero");
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        const index = getActiveIndex(newValue);
        setActive(newValue, false, index !== state.activeIndex);
      },
      {
        immediate: false,
        deep: true
      }
    );
    common_vendor.watch(
      () => children.length,
      () => {
        if (state.inited) {
          common_vendor.nextTick$1(() => {
            setActive(props.modelValue);
          });
        }
      }
    );
    common_vendor.watch(
      () => props.slidableNum,
      (newValue) => {
        uni_modules_wotDesignUni_components_common_util.checkNumRange(newValue, "slidableNum");
      }
    );
    common_vendor.watch(
      () => props.mapNum,
      (newValue) => {
        uni_modules_wotDesignUni_components_common_util.checkNumRange(newValue, "mapNum");
      }
    );
    common_vendor.onMounted(() => {
      state.inited = true;
      common_vendor.nextTick$1(() => {
        updateActive(props.modelValue, true);
        state.useInnerLine = true;
      });
    });
    function toggleMap() {
      if (state.mapShow) {
        state.animating = false;
        setTimeout(() => {
          state.mapShow = false;
        }, 300);
      } else {
        state.mapShow = true;
        setTimeout(() => {
          state.animating = true;
        }, 100);
      }
    }
    async function updateLineStyle(animation = true) {
      if (!state.inited)
        return;
      const { autoLineWidth, lineWidth, lineHeight } = props;
      try {
        const lineStyle = {};
        if (uni_modules_wotDesignUni_components_common_util.isDef(lineWidth)) {
          lineStyle.width = uni_modules_wotDesignUni_components_common_util.addUnit(lineWidth);
        } else {
          if (autoLineWidth) {
            const textRects = await uni_modules_wotDesignUni_components_common_util.getRect($itemText, true, proxy);
            const textWidth = Number(textRects[state.activeIndex].width);
            lineStyle.width = uni_modules_wotDesignUni_components_common_util.addUnit(textWidth);
          }
        }
        if (uni_modules_wotDesignUni_components_common_util.isDef(lineHeight)) {
          lineStyle.height = uni_modules_wotDesignUni_components_common_util.addUnit(lineHeight);
          lineStyle.borderRadius = `calc(${uni_modules_wotDesignUni_components_common_util.addUnit(lineHeight)} / 2)`;
        }
        const rects = await uni_modules_wotDesignUni_components_common_util.getRect($item, true, proxy);
        const rect = rects[state.activeIndex];
        let left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0) + Number(rect.width) / 2;
        if (left) {
          lineStyle.transform = `translateX(${left}px) translateX(-50%)`;
          if (animation) {
            lineStyle.transition = "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);";
          }
          state.useInnerLine = false;
          state.lineStyle = uni_modules_wotDesignUni_components_common_util.objToStyle(lineStyle);
        }
      } catch (error) {
        console.error("[wot design] error(wd-tabs): update line style failed", error);
      }
    }
    function setActiveTab() {
      if (!state.inited)
        return;
      const name = getTabName(children[state.activeIndex], state.activeIndex);
      if (name !== props.modelValue) {
        emit("change", {
          index: state.activeIndex,
          name
        });
        emit("update:modelValue", name);
      }
    }
    function scrollIntoView() {
      if (!state.inited)
        return;
      Promise.all([uni_modules_wotDesignUni_components_common_util.getRect($item, true, proxy), uni_modules_wotDesignUni_components_common_util.getRect($container, false, proxy)]).then(([navItemsRects, navRect]) => {
        const selectItem = navItemsRects[state.activeIndex];
        const offsetLeft = navItemsRects.slice(0, state.activeIndex).reduce((prev, curr) => prev + curr.width, 0);
        const left = offsetLeft - (navRect.width - Number(selectItem.width)) / 2;
        if (left === state.scrollLeft) {
          state.scrollLeft = left + Math.random() / 1e4;
        } else {
          state.scrollLeft = left;
        }
      });
    }
    function handleSelect(index) {
      if (index === void 0)
        return;
      const { disabled } = children[index];
      const name = getTabName(children[index], index);
      if (disabled) {
        emit("disabled", {
          index,
          name
        });
        return;
      }
      state.mapShow && toggleMap();
      setActive(index);
      emit("click", {
        index,
        name
      });
    }
    function onTouchStart(event) {
      if (!props.swipeable)
        return;
      touch.touchStart(event);
    }
    function onTouchMove(event) {
      if (!props.swipeable)
        return;
      touch.touchMove(event);
    }
    function onTouchEnd() {
      if (!props.swipeable)
        return;
      const { direction, deltaX, offsetX } = touch;
      const minSwipeDistance = 50;
      if (direction.value === "horizontal" && offsetX.value >= minSwipeDistance) {
        if (deltaX.value > 0 && state.activeIndex !== 0) {
          setActive(state.activeIndex - 1);
        } else if (deltaX.value < 0 && state.activeIndex !== children.length - 1) {
          setActive(state.activeIndex + 1);
        }
      }
    }
    function getActiveIndex(value) {
      if (uni_modules_wotDesignUni_components_common_util.isNumber(value) && value >= children.length) {
        console.error("[wot design] warning(wd-tabs): the type of tabs' value is Number shouldn't be less than its children");
        value = 0;
      }
      if (uni_modules_wotDesignUni_components_common_util.isString(value)) {
        const index = children.findIndex((item) => item.name === value);
        value = index === -1 ? 0 : index;
      }
      return value;
    }
    __expose({
      setActive,
      scrollIntoView,
      updateLineStyle
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.sticky
      }, _ctx.sticky ? common_vendor.e({
        b: common_vendor.f(common_vendor.unref(children), (item, index, i0) => {
          return common_vendor.e({
            a: item.badgeProps
          }, item.badgeProps ? {
            b: common_vendor.t(item.title),
            c: "4388d15d-2-" + i0 + ",4388d15d-1",
            d: common_vendor.p({
              ...item.badgeProps
            })
          } : {
            e: common_vendor.t(item.title)
          }, {
            f: state.activeIndex === index && state.useInnerLine
          }, state.activeIndex === index && state.useInnerLine ? {} : {}, {
            g: common_vendor.o(($event) => handleSelect(index), index),
            h: index,
            i: common_vendor.n(`wd-tabs__nav-item  ${state.activeIndex === index ? "is-active" : ""} ${item.disabled ? "is-disabled" : ""}`),
            j: common_vendor.s(state.activeIndex === index ? _ctx.color ? "color:" + _ctx.color : "" : _ctx.inactiveColor ? "color:" + _ctx.inactiveColor : "")
          });
        }),
        c: common_vendor.s(state.lineStyle),
        d: innerSlidable.value,
        e: state.scrollLeft,
        f: _ctx.mapNum < common_vendor.unref(children).length && _ctx.mapNum !== 0
      }, _ctx.mapNum < common_vendor.unref(children).length && _ctx.mapNum !== 0 ? {
        g: common_vendor.p({
          name: "arrow-down"
        }),
        h: common_vendor.n(`wd-tabs__map-arrow  ${state.animating ? "is-open" : ""}`),
        i: common_vendor.n(`wd-tabs__map-btn  ${state.animating ? "is-open" : ""}`),
        j: common_vendor.o(toggleMap),
        k: common_vendor.t(_ctx.mapTitle || common_vendor.unref(translate)("all")),
        l: common_vendor.s(`${state.mapShow ? "" : "display:none;"}  ${state.animating ? "opacity:1;" : ""}`),
        m: common_vendor.f(common_vendor.unref(children), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.n(`wd-tabs__map-nav-btn ${state.activeIndex === index ? "is-active" : ""}  ${item.disabled ? "is-disabled" : ""}`),
            c: common_vendor.s(state.activeIndex === index ? _ctx.color ? "color:" + _ctx.color + ";border-color:" + _ctx.color : "" : _ctx.inactiveColor ? "color:" + _ctx.inactiveColor : ""),
            d: index,
            e: common_vendor.o(($event) => handleSelect(index), index)
          };
        }),
        n: common_vendor.n(`wd-tabs__map-body  ${state.animating ? "is-open" : ""}`),
        o: common_vendor.s(state.mapShow ? "" : "display:none")
      } : {}, {
        p: common_vendor.p({
          ["offset-top"]: _ctx.offsetTop
        }),
        q: common_vendor.n(_ctx.animated ? "is-animated" : ""),
        r: common_vendor.s(bodyStyle.value),
        s: common_vendor.o(onTouchStart),
        t: common_vendor.o(onTouchMove),
        v: common_vendor.o(onTouchEnd),
        w: common_vendor.o(onTouchEnd),
        x: common_vendor.s(`${state.mapShow ? "" : "display:none;"} ${state.animating ? "opacity:1;" : ""}`),
        y: common_vendor.o(toggleMap),
        z: common_vendor.n(`wd-tabs ${_ctx.customClass} ${innerSlidable.value ? "is-slide" : ""} ${_ctx.mapNum < common_vendor.unref(children).length && _ctx.mapNum !== 0 ? "is-map" : ""}`),
        A: common_vendor.s(_ctx.customStyle)
      }) : common_vendor.e({
        B: common_vendor.f(common_vendor.unref(children), (item, index, i0) => {
          return common_vendor.e({
            a: item.badgeProps
          }, item.badgeProps ? {
            b: common_vendor.t(item.title),
            c: "4388d15d-4-" + i0,
            d: common_vendor.p({
              ["custom-class"]: "wd-tabs__nav-item-badge",
              ...item.badgeProps
            })
          } : {
            e: common_vendor.t(item.title)
          }, {
            f: state.activeIndex === index && state.useInnerLine
          }, state.activeIndex === index && state.useInnerLine ? {} : {}, {
            g: common_vendor.o(($event) => handleSelect(index), index),
            h: index,
            i: common_vendor.n(`wd-tabs__nav-item ${state.activeIndex === index ? "is-active" : ""} ${item.disabled ? "is-disabled" : ""}`),
            j: common_vendor.s(state.activeIndex === index ? _ctx.color ? "color:" + _ctx.color : "" : _ctx.inactiveColor ? "color:" + _ctx.inactiveColor : "")
          });
        }),
        C: common_vendor.s(state.lineStyle),
        D: innerSlidable.value,
        E: state.scrollLeft,
        F: _ctx.mapNum < common_vendor.unref(children).length && _ctx.mapNum !== 0
      }, _ctx.mapNum < common_vendor.unref(children).length && _ctx.mapNum !== 0 ? {
        G: common_vendor.p({
          name: "arrow-down"
        }),
        H: common_vendor.n(`wd-tabs__map-arrow ${state.animating ? "is-open" : ""}`),
        I: common_vendor.o(toggleMap),
        J: common_vendor.t(_ctx.mapTitle || common_vendor.unref(translate)("all")),
        K: common_vendor.s(`${state.mapShow ? "" : "display:none;"}  ${state.animating ? "opacity:1;" : ""}`),
        L: common_vendor.f(common_vendor.unref(children), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.n(`wd-tabs__map-nav-btn ${state.activeIndex === index ? "is-active" : ""}  ${item.disabled ? "is-disabled" : ""}`),
            c: index,
            d: common_vendor.o(($event) => handleSelect(index), index)
          };
        }),
        M: common_vendor.n(`wd-tabs__map-body ${state.animating ? "is-open" : ""}`),
        N: common_vendor.s(state.mapShow ? "" : "display:none")
      } : {}, {
        O: common_vendor.n(_ctx.animated ? "is-animated" : ""),
        P: common_vendor.s(bodyStyle.value),
        Q: common_vendor.o(onTouchStart),
        R: common_vendor.o(onTouchMove),
        S: common_vendor.o(onTouchEnd),
        T: common_vendor.o(onTouchEnd),
        U: common_vendor.s(`${state.mapShow ? "" : "display:none;"}  ${state.animating ? "opacity:1" : ""}`),
        V: common_vendor.o(toggleMap),
        W: common_vendor.n(`wd-tabs ${_ctx.customClass} ${innerSlidable.value ? "is-slide" : ""} ${_ctx.mapNum < common_vendor.unref(children).length && _ctx.mapNum !== 0 ? "is-map" : ""}`)
      }));
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4388d15d"]]);
wx.createComponent(Component);
