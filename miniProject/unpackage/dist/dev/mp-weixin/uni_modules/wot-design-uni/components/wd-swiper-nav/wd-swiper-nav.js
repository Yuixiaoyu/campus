"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdSwiperNav_types = require("./types.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "wd-swiper-nav",
  props: uni_modules_wotDesignUni_components_wdSwiperNav_types.swiperNavprops,
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function handleNav(dir) {
      const source = "nav";
      emit("change", { dir, source });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showControls
      }, _ctx.showControls ? {
        b: common_vendor.o(($event) => handleNav("prev")),
        c: common_vendor.o(($event) => handleNav("next"))
      } : {}, {
        d: _ctx.total >= _ctx.minShowNum
      }, _ctx.total >= _ctx.minShowNum ? common_vendor.e({
        e: _ctx.type === "dots" || _ctx.type === "dots-bar"
      }, _ctx.type === "dots" || _ctx.type === "dots-bar" ? {
        f: common_vendor.f(_ctx.total, (_, index, i0) => {
          return {
            a: index,
            b: common_vendor.n(`wd-swiper-nav__item--${_ctx.type} ${_ctx.current === index ? "is-active" : ""} is-${_ctx.direction}`)
          };
        })
      } : {}, {
        g: _ctx.type === "fraction"
      }, _ctx.type === "fraction" ? {
        h: common_vendor.t(_ctx.current + 1),
        i: common_vendor.t(_ctx.total)
      } : {}, {
        j: common_vendor.s(_ctx.customStyle),
        k: common_vendor.n(`wd-swiper-nav wd-swiper-nav--${_ctx.direction} wd-swiper-nav--${_ctx.type} wd-swiper-nav--${_ctx.indicatorPosition} ${_ctx.customClass}`)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7a2b7438"]]);
wx.createComponent(Component);
