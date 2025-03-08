"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdImg_types = require("./types.js");
const __default__ = {
  name: "wd-img",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdImg_types.imgProps,
  emits: ["error", "click", "load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootStyle = common_vendor.computed(() => {
      const style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.height)) {
        style["height"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.height);
      }
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.width)) {
        style["width"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.width);
      }
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.radius)) {
        style["border-radius"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.radius);
        style["overflow"] = "hidden";
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};${props.customStyle}`;
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-img  ${props.round ? "is-round" : ""} ${props.customClass}`;
    });
    const status = common_vendor.ref("loading");
    function handleError(event) {
      status.value = "error";
      emit("error", event);
    }
    function handleClick(event) {
      if (props.enablePreview && props.src && status.value == "success") {
        common_vendor.index.previewImage({
          urls: [props.src]
        });
      }
      emit("click", event);
    }
    function handleLoad(event) {
      status.value = "success";
      emit("load", event);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(`wd-img__image ${_ctx.customImage}`),
        b: common_vendor.s(status.value !== "success" ? "width: 0;height: 0;" : ""),
        c: _ctx.src,
        d: _ctx.mode,
        e: _ctx.showMenuByLongpress,
        f: _ctx.lazyLoad,
        g: common_vendor.o(handleLoad),
        h: common_vendor.o(handleError),
        i: status.value === "loading"
      }, status.value === "loading" ? {} : {}, {
        j: status.value === "error"
      }, status.value === "error" ? {} : {}, {
        k: common_vendor.n(rootClass.value),
        l: common_vendor.o(handleClick),
        m: common_vendor.s(rootStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb0c5dbc"]]);
wx.createComponent(Component);
