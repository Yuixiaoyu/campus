"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdStatusTip_types = require("./types.js");
if (!Math) {
  wdImg();
}
const wdImg = () => "../wd-img/wd-img.js";
const __default__ = {
  name: "wd-status-tip",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdStatusTip_types.statusTipProps,
  setup(__props) {
    const props = __props;
    const imgUrl = common_vendor.computed(() => {
      let img = "";
      if (["search", "network", "content", "collect", "comment", "halo", "message"].includes(props.image)) {
        img = `${props.urlPrefix}${props.image}.png`;
      } else {
        img = props.image;
      }
      return img;
    });
    const imgStyle = common_vendor.computed(() => {
      let style = {};
      if (props.imageSize) {
        if (uni_modules_wotDesignUni_components_common_util.isObj(props.imageSize)) {
          uni_modules_wotDesignUni_components_common_util.isDef(props.imageSize.height) && (style.height = uni_modules_wotDesignUni_components_common_util.addUnit(props.imageSize.height));
          uni_modules_wotDesignUni_components_common_util.isDef(props.imageSize.width) && (style.width = uni_modules_wotDesignUni_components_common_util.addUnit(props.imageSize.width));
        } else {
          style = {
            height: uni_modules_wotDesignUni_components_common_util.addUnit(props.imageSize),
            width: uni_modules_wotDesignUni_components_common_util.addUnit(props.imageSize)
          };
        }
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}`;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.$slots.image
      }, _ctx.$slots.image ? {} : imgUrl.value ? {
        c: common_vendor.p({
          mode: _ctx.imageMode,
          src: imgUrl.value,
          ["custom-class"]: "wd-status-tip__image",
          ["custom-style"]: imgStyle.value
        })
      } : {}, {
        b: imgUrl.value,
        d: _ctx.tip
      }, _ctx.tip ? {
        e: common_vendor.t(_ctx.tip)
      } : {}, {
        f: common_vendor.n(`wd-status-tip  ${_ctx.customClass}`),
        g: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f52470e5"]]);
wx.createComponent(Component);
