"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdActionSheet_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
if (!Math) {
  (wdIcon + wdLoading + wdPopup)();
}
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdLoading = () => "../wd-loading/wd-loading.js";
const __default__ = {
  name: "wd-action-sheet",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdActionSheet_types.actionSheetProps,
  emits: ["select", "click-modal", "cancel", "closed", "close", "open", "opened", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatPanels = common_vendor.ref([]);
    const showPopup = common_vendor.ref(false);
    common_vendor.watch(() => props.panels, computedValue, { deep: true, immediate: true });
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        showPopup.value = newValue;
      },
      { deep: true, immediate: true }
    );
    function isPanelArray() {
      return props.panels.length && !uni_modules_wotDesignUni_components_common_util.isArray(props.panels[0]);
    }
    function computedValue() {
      formatPanels.value = isPanelArray() ? [props.panels] : props.panels;
    }
    function select(rowIndex, type, colIndex) {
      if (type === "action") {
        if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
          return;
        }
        emit("select", {
          item: props.actions[rowIndex],
          index: rowIndex
        });
      } else if (isPanelArray()) {
        emit("select", {
          item: props.panels[Number(colIndex)],
          index: colIndex
        });
      } else {
        emit("select", {
          item: props.panels[rowIndex][Number(colIndex)],
          rowIndex,
          colIndex
        });
      }
      if (props.closeOnClickAction) {
        close();
      }
    }
    function handleClickModal() {
      emit("click-modal");
    }
    function handleCancel() {
      emit("cancel");
      close();
    }
    function close() {
      emit("update:modelValue", false);
      emit("close");
    }
    function handleOpen() {
      emit("open");
    }
    function handleOpened() {
      emit("opened");
    }
    function handleClosed() {
      emit("closed");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.title
      }, _ctx.title ? {
        b: common_vendor.t(_ctx.title),
        c: common_vendor.o(close),
        d: common_vendor.p({
          ["custom-class"]: "wd-action-sheet__close",
          name: "add"
        }),
        e: common_vendor.n(`wd-action-sheet__header ${_ctx.customHeaderClass}`)
      } : {}, {
        f: _ctx.actions && _ctx.actions.length
      }, _ctx.actions && _ctx.actions.length ? {
        g: common_vendor.f(_ctx.actions, (action, rowIndex, i0) => {
          return common_vendor.e({
            a: action.loading
          }, action.loading ? {
            b: "03619ba9-2-" + i0 + ",03619ba9-0",
            c: common_vendor.p({
              ["custom-class"]: "`wd-action-sheet__action-loading"
            })
          } : {
            d: common_vendor.t(action.name)
          }, {
            e: !action.loading && action.subname
          }, !action.loading && action.subname ? {
            f: common_vendor.t(action.subname)
          } : {}, {
            g: rowIndex,
            h: common_vendor.n(`wd-action-sheet__action ${action.disabled ? "wd-action-sheet__action--disabled" : ""}  ${action.loading ? "wd-action-sheet__action--loading" : ""}`),
            i: common_vendor.s(`color: ${action.color}`),
            j: common_vendor.o(($event) => select(rowIndex, "action"), rowIndex)
          });
        })
      } : {}, {
        h: formatPanels.value && formatPanels.value.length
      }, formatPanels.value && formatPanels.value.length ? {
        i: common_vendor.f(formatPanels.value, (panel, rowIndex, i0) => {
          return {
            a: common_vendor.f(panel, (col, colIndex, i1) => {
              return {
                a: col.iconUrl,
                b: common_vendor.t(col.title),
                c: colIndex,
                d: common_vendor.o(($event) => select(rowIndex, "panels", colIndex), colIndex)
              };
            }),
            b: rowIndex
          };
        })
      } : {}, {
        j: _ctx.cancelText
      }, _ctx.cancelText ? {
        k: common_vendor.t(_ctx.cancelText),
        l: common_vendor.o(handleCancel)
      } : {}, {
        m: common_vendor.n(`wd-action-sheet ${_ctx.customClass}`),
        n: common_vendor.s(`${_ctx.actions && _ctx.actions.length || _ctx.panels && _ctx.panels.length ? "margin: 0 10px calc(var(--window-bottom) + 10px) 10px; border-radius: 16px;" : "margin-bottom: var(--window-bottom);"} ${_ctx.customStyle}`),
        o: common_vendor.o(handleOpen),
        p: common_vendor.o(close),
        q: common_vendor.o(handleOpened),
        r: common_vendor.o(handleClosed),
        s: common_vendor.o(handleClickModal),
        t: common_vendor.o(($event) => showPopup.value = $event),
        v: common_vendor.p({
          ["custom-class"]: "wd-action-sheet__popup",
          ["custom-style"]: `${_ctx.actions && _ctx.actions.length || _ctx.panels && _ctx.panels.length ? "background: transparent;" : ""}`,
          duration: _ctx.duration,
          position: "bottom",
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["lazy-render"]: _ctx.lazyRender,
          ["z-index"]: _ctx.zIndex,
          modelValue: showPopup.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-03619ba9"]]);
wx.createComponent(Component);
