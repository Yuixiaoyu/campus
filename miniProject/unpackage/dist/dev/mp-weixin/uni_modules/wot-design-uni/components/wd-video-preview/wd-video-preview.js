"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdVideoPreview_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-video-preview",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdVideoPreview_types.videoPreviewProps,
  setup(__props, { expose: __expose }) {
    const showPopup = common_vendor.ref(false);
    const previdewVideo = common_vendor.reactive({ url: "", poster: "", title: "" });
    function open(video) {
      showPopup.value = true;
      previdewVideo.url = video.url;
      previdewVideo.poster = video.poster;
      previdewVideo.title = video.title;
    }
    function close() {
      showPopup.value = false;
      common_vendor.nextTick$1(() => {
        handleClosed();
      });
    }
    function handleClosed() {
      previdewVideo.url = "";
      previdewVideo.poster = "";
      previdewVideo.title = "";
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showPopup.value
      }, showPopup.value ? common_vendor.e({
        b: previdewVideo.url
      }, previdewVideo.url ? {
        c: previdewVideo.poster,
        d: previdewVideo.title,
        e: previdewVideo.url
      } : {}, {
        f: common_vendor.o(() => {
        }),
        g: common_vendor.o(close),
        h: common_vendor.p({
          name: "close",
          ["custom-class"]: `wd-video-preview__close`
        }),
        i: common_vendor.n(`wd-video-preview ${_ctx.customClass}`),
        j: common_vendor.s(_ctx.customStyle),
        k: common_vendor.o(close)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f37e4d17"]]);
wx.createComponent(Component);
