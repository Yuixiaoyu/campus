"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdSwiper_types = require("./types.js");
if (!Math) {
  wdSwiperNav();
}
const wdSwiperNav = () => "../wd-swiper-nav/wd-swiper-nav.js";
const __default__ = {
  name: "wd-swiper",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSwiper_types.swiperProps,
  emits: ["click", "change", "animationfinish", "update:current"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const navCurrent = common_vendor.ref(props.current);
    const currentValue = common_vendor.ref(props.current);
    const updateCurrent = (current, force = false) => {
      currentValue.value = current;
      if (force) {
        navCurrent.value = current;
      }
      emit("update:current", current);
    };
    const videoPlaying = common_vendor.ref(false);
    const { proxy } = common_vendor.getCurrentInstance();
    const uid = common_vendor.ref(uni_modules_wotDesignUni_components_common_util.uuid());
    common_vendor.watch(
      () => props.current,
      (val) => {
        if (val < 0) {
          props.loop ? goToEnd() : goToStart();
        } else if (val >= props.list.length) {
          props.loop ? goToStart() : goToEnd();
        } else {
          navTo(val);
        }
      }
    );
    const swiperIndicator = common_vendor.computed(() => {
      const { list, direction, indicatorPosition, indicator } = props;
      const swiperIndicator2 = {
        current: currentValue.value || 0,
        total: list.length || 0,
        direction: direction || "horizontal",
        indicatorPosition: indicatorPosition || "bottom"
      };
      if (uni_modules_wotDesignUni_components_common_util.isObj(indicator)) {
        swiperIndicator2.type = indicator.type || "dots";
        swiperIndicator2.minShowNum = indicator.minShowNum || 2;
        swiperIndicator2.showControls = indicator.showControls || false;
      }
      return swiperIndicator2;
    });
    const getMediaType = (item, type) => {
      const checkType = (url) => type === "video" ? uni_modules_wotDesignUni_components_common_util.isVideoUrl(url) : uni_modules_wotDesignUni_components_common_util.isImageUrl(url);
      if (uni_modules_wotDesignUni_components_common_util.isObj(item)) {
        return item.type && ["video", "image"].includes(item.type) ? item.type === type : checkType(item[props.valueKey]);
      } else {
        return checkType(item);
      }
    };
    const isVideo = (item) => {
      return getMediaType(item, "video");
    };
    function navTo(index) {
      if (index === currentValue.value)
        return;
      updateCurrent(index, true);
    }
    function goToStart() {
      navTo(0);
    }
    function goToEnd() {
      navTo(props.list.length - 1);
    }
    function handleVideoPaly() {
      props.stopAutoplayWhenVideoPlay && (videoPlaying.value = true);
    }
    function handleVideoPause() {
      videoPlaying.value = false;
    }
    function isPrev(current, index, list) {
      return (current - 1 + list.length) % list.length === index;
    }
    function isNext(current, index, list) {
      return (current + 1 + list.length) % list.length === index;
    }
    function getCustomItemClass(current, index, list) {
      let customItemClass = "";
      if (isPrev(current, index, list)) {
        customItemClass = props.customPrevClass || props.customPrevImageClass;
      }
      if (isNext(current, index, list)) {
        customItemClass = props.customNextClass || props.customNextImageClass;
      }
      return customItemClass;
    }
    function handleChange(e) {
      const { current, source } = e.detail;
      const previous = currentValue.value;
      emit("change", { current, source });
      if (current !== currentValue.value) {
        const forceUpdate = source === "autoplay" || source === "touch";
        updateCurrent(current, forceUpdate);
      }
      handleVideoChange(previous, current);
    }
    function handleVideoChange(previous, current) {
      handleStopVideoPaly(previous);
      handleStartVideoPaly(current);
    }
    function handleStartVideoPaly(index) {
      if (props.autoplayVideo) {
        const currentItem = props.list[index];
        if (uni_modules_wotDesignUni_components_common_util.isDef(currentItem) && isVideo(currentItem)) {
          const video = common_vendor.index.createVideoContext(`video-${index}-${uid.value}`, proxy);
          video.play();
        }
      }
    }
    function handleStopVideoPaly(index) {
      if (props.stopPreviousVideo) {
        const previousItem = props.list[index];
        if (uni_modules_wotDesignUni_components_common_util.isDef(previousItem) && isVideo(previousItem)) {
          const video = common_vendor.index.createVideoContext(`video-${index}-${uid.value}`, proxy);
          video.pause();
        }
      } else if (props.stopAutoplayWhenVideoPlay) {
        handleVideoPause();
      }
    }
    function handleAnimationfinish(e) {
      const { current, source } = e.detail;
      if (current !== currentValue.value) {
        const forceUpdate = source === "autoplay" || source === "touch";
        updateCurrent(current, forceUpdate);
      }
      emit("animationfinish", { current, source });
    }
    function handleClick(index, item) {
      emit("click", { index, item });
    }
    function handleIndicatorChange({ dir }) {
      const { list, loop } = props;
      const total = list.length;
      let nextPos = dir === "next" ? currentValue.value + 1 : currentValue.value - 1;
      if (loop) {
        nextPos = dir === "next" ? (currentValue.value + 1) % total : (currentValue.value - 1 + total) % total;
      } else {
        nextPos = nextPos < 0 || nextPos >= total ? currentValue.value : nextPos;
      }
      if (nextPos === currentValue.value)
        return;
      navTo(nextPos);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(_ctx.list, (item, index, i0) => {
          return common_vendor.e({
            a: isVideo(item)
          }, isVideo(item) ? {
            b: `video-${index}-${uid.value}`,
            c: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.height),
            d: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(item) ? item[_ctx.valueKey] : item,
            e: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(item) ? item.poster : "",
            f: common_vendor.n(`wd-swiper__video ${_ctx.customItemClass} ${getCustomItemClass(currentValue.value, index, _ctx.list)}`),
            g: common_vendor.o(handleVideoPaly, index),
            h: common_vendor.o(handleVideoPause, index),
            i: _ctx.videoLoop,
            j: _ctx.muted,
            k: _ctx.autoplayVideo,
            l: common_vendor.o(($event) => handleClick(index, item), index)
          } : {
            m: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(item) ? item[_ctx.valueKey] : item,
            n: common_vendor.n(`wd-swiper__image ${_ctx.customImageClass} ${_ctx.customItemClass} ${getCustomItemClass(currentValue.value, index, _ctx.list)}`),
            o: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.height),
            p: _ctx.imageMode,
            q: common_vendor.o(($event) => handleClick(index, item), index)
          }, {
            r: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(item) && item[_ctx.textKey]
          }, common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(item) && item[_ctx.textKey] ? {
            s: common_vendor.t(item[_ctx.textKey]),
            t: common_vendor.n(`wd-swiper__text ${_ctx.customTextClass}`),
            v: common_vendor.s(_ctx.customTextStyle)
          } : {}, {
            w: index
          });
        }),
        b: _ctx.adjustHeight,
        c: _ctx.adjustVerticalHeight,
        d: _ctx.autoplay && !videoPlaying.value,
        e: navCurrent.value,
        f: _ctx.interval,
        g: _ctx.duration,
        h: _ctx.loop,
        i: _ctx.direction == "vertical",
        j: _ctx.easingFunction,
        k: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.previousMargin),
        l: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.nextMargin),
        m: _ctx.snapToEdge,
        n: _ctx.displayMultipleItems,
        o: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.height),
        p: common_vendor.o(handleChange),
        q: common_vendor.o(handleAnimationfinish),
        r: _ctx.indicator
      }, _ctx.indicator ? common_vendor.e({
        s: common_vendor.r("indicator", {
          current: currentValue.value,
          total: _ctx.list.length
        }),
        t: !_ctx.$slots.indicator
      }, !_ctx.$slots.indicator ? {
        v: common_vendor.o(handleIndicatorChange),
        w: common_vendor.p({
          ["custom-class"]: _ctx.customIndicatorClass,
          type: swiperIndicator.value.type,
          current: swiperIndicator.value.current,
          total: swiperIndicator.value.total,
          direction: swiperIndicator.value.direction,
          ["indicator-position"]: swiperIndicator.value.indicatorPosition,
          ["min-show-num"]: swiperIndicator.value.minShowNum,
          ["show-controls"]: swiperIndicator.value.showControls
        })
      } : {}) : {}, {
        x: common_vendor.n(`wd-swiper ${_ctx.customClass}`),
        y: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f903ae98"]]);
wx.createComponent(Component);
