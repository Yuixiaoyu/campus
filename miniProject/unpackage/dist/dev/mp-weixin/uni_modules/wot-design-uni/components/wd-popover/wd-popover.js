"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_usePopover = require("../composables/usePopover.js");
const uni_modules_wotDesignUni_components_common_clickoutside = require("../common/clickoutside.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../composables/useQueue.js");
const uni_modules_wotDesignUni_components_wdPopover_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
if (!Math) {
  (wdIcon + wdTransition)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdTransition = () => "../wd-transition/wd-transition.js";
const __default__ = {
  name: "wd-popover",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdPopover_types.popoverProps,
  emits: ["update:modelValue", "menuclick", "change", "open", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const queue = common_vendor.inject(uni_modules_wotDesignUni_components_composables_useQueue.queueKey, null);
    const selector = "popover";
    const { proxy } = common_vendor.getCurrentInstance();
    const popover = uni_modules_wotDesignUni_components_composables_usePopover.usePopover(props.visibleArrow);
    const showPopover = common_vendor.ref(false);
    common_vendor.watch(
      () => props.content,
      (newVal) => {
        const { mode } = props;
        if (mode === "normal" && typeof newVal !== "string") {
          console.error("The value type must be a string type in normal mode");
        } else if (mode === "menu" && !uni_modules_wotDesignUni_components_common_util.isArray(newVal)) {
          console.error("The value type must be a Array type in menu mode");
        }
      }
    );
    common_vendor.watch(
      () => props.placement,
      () => {
        popover.init(props.placement, props.visibleArrow, selector);
      }
    );
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        showPopover.value = newValue;
      }
    );
    common_vendor.watch(
      () => showPopover.value,
      (newValue) => {
        if (newValue) {
          popover.control(props.placement, props.offset);
          if (queue && queue.closeOther) {
            queue.closeOther(proxy);
          } else {
            uni_modules_wotDesignUni_components_common_clickoutside.closeOther(proxy);
          }
        }
        popover.showStyle.value = newValue ? "display: inline-block;" : "display: none;";
        emit("change", { show: newValue });
        emit(`${newValue ? "open" : "close"}`);
      }
    );
    common_vendor.onMounted(() => {
      popover.init(props.placement, props.visibleArrow, selector);
    });
    common_vendor.onBeforeMount(() => {
      if (queue && queue.pushToQueue) {
        queue.pushToQueue(proxy);
      } else {
        uni_modules_wotDesignUni_components_common_clickoutside.pushToQueue(proxy);
      }
      popover.showStyle.value = showPopover.value ? "opacity: 1;" : "opacity: 0;";
    });
    common_vendor.onBeforeUnmount(() => {
      if (queue && queue.removeFromQueue) {
        queue.removeFromQueue(proxy);
      } else {
        uni_modules_wotDesignUni_components_common_clickoutside.removeFromQueue(proxy);
      }
    });
    function menuClick(index) {
      updateModelValue(false);
      emit("menuclick", {
        item: props.content[index],
        index
      });
    }
    function toggle() {
      if (props.disabled)
        return;
      updateModelValue(!showPopover.value);
    }
    function open() {
      updateModelValue(true);
    }
    function close() {
      updateModelValue(false);
    }
    function updateModelValue(value) {
      showPopover.value = value;
      emit("update:modelValue", value);
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.useContentSlot && _ctx.mode === "normal"
      }, !_ctx.useContentSlot && _ctx.mode === "normal" ? {
        b: common_vendor.t(_ctx.content)
      } : {}, {
        c: !_ctx.useContentSlot && _ctx.mode === "menu" && typeof _ctx.content === "object"
      }, !_ctx.useContentSlot && _ctx.mode === "menu" && typeof _ctx.content === "object" ? {
        d: common_vendor.f(_ctx.content, (item, index, i0) => {
          return common_vendor.e({
            a: item.iconClass
          }, item.iconClass ? {
            b: "690215fc-0-" + i0,
            c: common_vendor.p({
              name: item.iconClass,
              ["custom-class"]: "wd-popover__icon"
            })
          } : {}, {
            d: common_vendor.t(item.content),
            e: index,
            f: common_vendor.o(($event) => menuClick(index), index)
          });
        })
      } : {}, {
        e: common_vendor.n(`wd-popover__container ${_ctx.customPop}`),
        f: props.visibleArrow
      }, props.visibleArrow ? {
        g: common_vendor.n(`wd-popover__arrow ${common_vendor.unref(popover).arrowClass.value} ${_ctx.customArrow}`),
        h: common_vendor.s(common_vendor.unref(popover).arrowStyle.value)
      } : {}, {
        i: !_ctx.useContentSlot && _ctx.mode === "normal"
      }, !_ctx.useContentSlot && _ctx.mode === "normal" ? {
        j: common_vendor.t(_ctx.content)
      } : {}, {
        k: !_ctx.useContentSlot && _ctx.mode === "menu"
      }, !_ctx.useContentSlot && _ctx.mode === "menu" ? {
        l: common_vendor.f(_ctx.content, (item, index, i0) => {
          return common_vendor.e({
            a: typeof item === "object" && item.iconClass
          }, typeof item === "object" && item.iconClass ? {
            b: "690215fc-2-" + i0 + ",690215fc-1",
            c: common_vendor.p({
              name: item.iconClass,
              ["custom-class"]: "wd-popover__icon"
            })
          } : {}, {
            d: common_vendor.t(typeof item === "object" && item.content ? item.content : ""),
            e: index,
            f: common_vendor.o(($event) => menuClick(index), index),
            g: common_vendor.s(index === 0 ? "border-top: none" : "")
          });
        })
      } : {}, {
        m: common_vendor.n(`wd-popover__container ${_ctx.customPop}`),
        n: _ctx.showClose
      }, _ctx.showClose ? {
        o: common_vendor.o(toggle),
        p: common_vendor.p({
          name: "close",
          ["custom-class"]: "wd-popover__close-icon"
        })
      } : {}, {
        q: common_vendor.p({
          ["custom-class"]: "wd-popover__pos",
          ["custom-style"]: common_vendor.unref(popover).popStyle.value,
          show: showPopover.value,
          name: "fade",
          duration: 200
        }),
        r: common_vendor.o(toggle),
        s: common_vendor.n(`wd-popover ${_ctx.customClass}`),
        t: common_vendor.s(_ctx.customStyle),
        v: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(popover).noop && common_vendor.unref(popover).noop(...args)
        )
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-690215fc"]]);
wx.createComponent(Component);
