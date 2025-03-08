"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdResize_types = require("./types.js");
const __default__ = {
  name: "wd-resize",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdResize_types.resizeProps,
  emits: ["resize"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const expandScrollTop = common_vendor.ref(0);
    const shrinkScrollTop = common_vendor.ref(0);
    const expandScrollLeft = common_vendor.ref(0);
    const shrinkScrollLeft = common_vendor.ref(0);
    const height = common_vendor.ref(0);
    const width = common_vendor.ref(0);
    const scrollEventCount = common_vendor.ref(0);
    const rootStyle = common_vendor.computed(() => {
      const style = {
        width: uni_modules_wotDesignUni_components_common_util.addUnit(width.value),
        height: uni_modules_wotDesignUni_components_common_util.addUnit(height.value)
      };
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};${props.customStyle}`;
    });
    let onScrollHandler = () => {
    };
    const { proxy } = common_vendor.getCurrentInstance();
    const resizeId = common_vendor.ref(`resize${uni_modules_wotDesignUni_components_common_util.uuid()}`);
    common_vendor.onMounted(() => {
      const query = common_vendor.index.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect();
      query.exec(([res]) => {
        let lastHeight = res.height;
        let lastWidth = res.width;
        height.value = lastHeight;
        width.value = lastWidth;
        onScrollHandler = () => {
          const query2 = common_vendor.index.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect();
          query2.exec(([res2]) => {
            if (scrollEventCount.value++ === 0) {
              const result = {};
              ["bottom", "top", "left", "right", "height", "width"].forEach((propName) => {
                result[propName] = res2[propName];
              });
              emit("resize", result);
            }
            if (scrollEventCount.value < 3)
              return;
            const newHeight = res2.height;
            const newWidth = res2.width;
            height.value = newHeight;
            width.value = newWidth;
            const emitStack = [];
            if (newHeight !== lastHeight) {
              lastHeight = newHeight;
              emitStack.push(1);
            }
            if (newWidth !== lastWidth) {
              lastWidth = newWidth;
              emitStack.push(1);
            }
            if (emitStack.length !== 0) {
              const result = {};
              ["bottom", "top", "left", "right", "height", "width"].forEach((propName) => {
                result[propName] = res2[propName];
              });
              emit("resize", result);
            }
            scrollToBottom({
              lastWidth,
              lastHeight
            });
          });
        };
        scrollToBottom({
          lastWidth,
          lastHeight
        });
      });
    });
    function scrollToBottom({ lastWidth, lastHeight }) {
      expandScrollTop.value = 1e5 + lastHeight;
      shrinkScrollTop.value = 3 * height.value + lastHeight;
      expandScrollLeft.value = 1e5 + lastWidth;
      shrinkScrollLeft.value = 3 * width.value + lastWidth;
    }
    return (_ctx, _cache) => {
      return {
        a: expandScrollTop.value,
        b: expandScrollLeft.value,
        c: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onScrollHandler) && common_vendor.unref(onScrollHandler)(...args)
        ),
        d: shrinkScrollTop.value,
        e: shrinkScrollLeft.value,
        f: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onScrollHandler) && common_vendor.unref(onScrollHandler)(...args)
        ),
        g: resizeId.value,
        h: common_vendor.n(`wd-resize__container ${_ctx.customContainerClass}`),
        i: common_vendor.n(`wd-resize ${_ctx.customClass}`),
        j: common_vendor.s(rootStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d3c1eae"]]);
wx.createComponent(Component);
