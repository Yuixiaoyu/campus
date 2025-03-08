"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdLoadmore_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
if (!Math) {
  (wdDivider + wdIcon + wdLoading)();
}
const wdDivider = () => "../wd-divider/wd-divider.js";
const wdLoading = () => "../wd-loading/wd-loading.js";
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-loadmore",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdLoadmore_types.loadmoreProps,
  emits: ["reload"],
  setup(__props, { emit: __emit }) {
    const customLoadingProps = common_vendor.computed(() => {
      const loadingProps = uni_modules_wotDesignUni_components_common_util.isDef(props.loadingProps) ? uni_modules_wotDesignUni_components_common_util.omitBy(props.loadingProps, uni_modules_wotDesignUni_components_common_util.isUndefined) : {};
      loadingProps.customClass = `wd-loadmore__loading ${loadingProps.customClass || ""}`;
      return loadingProps;
    });
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("loadmore");
    const currentState = common_vendor.ref(null);
    function reload() {
      if (props.state !== "error")
        return;
      currentState.value = "loading";
      emit("reload");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.state === "finished"
      }, _ctx.state === "finished" ? {
        b: common_vendor.t(_ctx.finishedText || common_vendor.unref(translate)("finished"))
      } : {}, {
        c: _ctx.state === "error"
      }, _ctx.state === "error" ? {
        d: common_vendor.t(_ctx.errorText || common_vendor.unref(translate)("error")),
        e: common_vendor.t(common_vendor.unref(translate)("retry")),
        f: common_vendor.p({
          name: "refresh",
          ["custom-class"]: "wd-loadmore__refresh"
        })
      } : {}, {
        g: _ctx.state === "loading"
      }, _ctx.state === "loading" ? {
        h: common_vendor.p({
          ...customLoadingProps.value
        }),
        i: common_vendor.t(_ctx.loadingText || common_vendor.unref(translate)("loading"))
      } : {}, {
        j: common_vendor.n(_ctx.customClass),
        k: common_vendor.s(_ctx.customStyle),
        l: common_vendor.o(reload)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ce79f90"]]);
wx.createComponent(Component);
