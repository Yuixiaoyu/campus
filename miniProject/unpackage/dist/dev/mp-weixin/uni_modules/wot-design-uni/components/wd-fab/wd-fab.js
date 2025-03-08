"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../composables/useQueue.js");
const uni_modules_wotDesignUni_components_common_clickoutside = require("../common/clickoutside.js");
const uni_modules_wotDesignUni_components_wdFab_types = require("./types.js");
const uni_modules_wotDesignUni_components_composables_useRaf = require("../composables/useRaf.js");
if (!Math) {
  (wdIcon + wdButton + wdTransition)();
}
const wdButton = () => "../wd-button/wd-button.js";
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdTransition = () => "../wd-transition/wd-transition.js";
const __default__ = {
  name: "wd-fab",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdFab_types.fabProps,
  emits: ["update:active", "click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inited = common_vendor.ref(false);
    const isActive = common_vendor.ref(false);
    const queue = common_vendor.inject(uni_modules_wotDesignUni_components_composables_useQueue.queueKey, null);
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.watch(
      () => props.active,
      (newValue) => {
        isActive.value = newValue;
      },
      { immediate: true, deep: true }
    );
    common_vendor.watch(
      () => isActive.value,
      (newValue) => {
        if (newValue) {
          if (queue && queue.closeOther) {
            queue.closeOther(proxy);
          } else {
            uni_modules_wotDesignUni_components_common_clickoutside.closeOther(proxy);
          }
        }
      }
    );
    const fabDirection = common_vendor.ref(props.direction);
    common_vendor.watch(
      () => props.direction,
      (direction) => fabDirection.value = direction
    );
    common_vendor.watch(
      () => props.position,
      () => initPosition()
    );
    const top = common_vendor.ref(0);
    const left = common_vendor.ref(0);
    const screen = common_vendor.reactive({ width: 0, height: 0 });
    const fabSize = common_vendor.reactive({ width: 56, height: 56 });
    const bounding = common_vendor.reactive({
      minTop: 0,
      minLeft: 0,
      maxTop: 0,
      maxLeft: 0
    });
    async function getBounding() {
      const sysInfo = common_vendor.index.getSystemInfoSync();
      try {
        const trigerInfo = await uni_modules_wotDesignUni_components_common_util.getRect("#trigger", false, proxy);
        fabSize.width = trigerInfo.width || 56;
        fabSize.height = trigerInfo.height || 56;
      } catch (error) {
        console.log(error);
      }
      const { top: top2 = 16, left: left2 = 16, right = 16, bottom = 16 } = props.gap;
      screen.width = sysInfo.windowWidth;
      screen.height = uni_modules_wotDesignUni_components_common_util.isH5 ? sysInfo.windowTop + sysInfo.windowHeight : sysInfo.windowHeight;
      bounding.minTop = uni_modules_wotDesignUni_components_common_util.isH5 ? sysInfo.windowTop + top2 : top2;
      bounding.minLeft = left2;
      bounding.maxLeft = screen.width - fabSize.width - right;
      bounding.maxTop = screen.height - fabSize.height - bottom;
    }
    function initPosition() {
      const pos = props.position;
      const { minLeft, minTop, maxLeft, maxTop } = bounding;
      if (pos === "left-top") {
        top.value = minTop;
        left.value = minLeft;
      } else if (pos === "right-top") {
        top.value = minTop;
        left.value = maxLeft;
      } else if (pos === "left-bottom") {
        top.value = maxTop;
        left.value = minLeft;
      } else if (pos === "right-bottom") {
        top.value = maxTop;
        left.value = maxLeft;
      }
    }
    const touchOffset = common_vendor.reactive({ x: 0, y: 0 });
    const attractTransition = common_vendor.ref(false);
    function handleTouchStart(e) {
      if (props.draggable === false)
        return;
      const touch = e.touches[0];
      touchOffset.x = touch.clientX - left.value;
      touchOffset.y = touch.clientY - top.value;
      attractTransition.value = false;
    }
    function handleTouchMove(e) {
      if (props.draggable === false)
        return;
      const touch = e.touches[0];
      const { minLeft, minTop, maxLeft, maxTop } = bounding;
      let x = touch.clientX - touchOffset.x;
      let y = touch.clientY - touchOffset.y;
      if (x < minLeft)
        x = minLeft;
      else if (x > maxLeft)
        x = maxLeft;
      if (y < minTop)
        y = minTop;
      else if (y > maxTop)
        y = maxTop;
      top.value = y;
      left.value = x;
    }
    function handleTouchEnd() {
      if (props.draggable === false)
        return;
      const screenCenterX = screen.width / 2;
      const fabCenterX = left.value + fabSize.width / 2;
      attractTransition.value = true;
      if (fabCenterX < screenCenterX) {
        left.value = bounding.minLeft;
        fabDirection.value = "right";
      } else {
        left.value = bounding.maxLeft;
        fabDirection.value = "left";
      }
    }
    const rootStyle = common_vendor.computed(() => {
      const style = {
        top: top.value + "px",
        left: left.value + "px",
        transition: attractTransition.value ? "all ease 0.3s" : "none"
      };
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.zIndex)) {
        style["z-index"] = props.zIndex;
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)};${props.customStyle}`;
    });
    common_vendor.onMounted(() => {
      if (queue && queue.pushToQueue) {
        queue.pushToQueue(proxy);
      } else {
        uni_modules_wotDesignUni_components_common_clickoutside.pushToQueue(proxy);
      }
      const { start } = uni_modules_wotDesignUni_components_composables_useRaf.useRaf(async () => {
        await getBounding();
        initPosition();
        inited.value = true;
      });
      start();
    });
    common_vendor.onBeforeUnmount(() => {
      if (queue && queue.removeFromQueue) {
        queue.removeFromQueue(proxy);
      } else {
        uni_modules_wotDesignUni_components_common_clickoutside.removeFromQueue(proxy);
      }
    });
    function handleClick() {
      if (props.disabled) {
        return;
      }
      if (!props.expandable) {
        emit("click");
        return;
      }
      isActive.value = !isActive.value;
      emit("update:active", isActive.value);
    }
    function open() {
      isActive.value = true;
      emit("update:active", true);
    }
    function close() {
      isActive.value = false;
      emit("update:active", false);
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.$slots.trigger
      }, _ctx.$slots.trigger ? {} : {
        b: common_vendor.p({
          ["custom-class"]: "wd-fab__icon",
          name: isActive.value ? _ctx.activeIcon : _ctx.inactiveIcon
        }),
        c: common_vendor.o(handleClick),
        d: common_vendor.p({
          ["custom-class"]: "wd-fab__trigger",
          round: true,
          type: _ctx.type,
          disabled: _ctx.disabled
        })
      }, {
        e: common_vendor.o(() => {
        }),
        f: inited.value ? "visible" : "hidden",
        g: _ctx.expandable
      }, _ctx.expandable ? {
        h: common_vendor.p({
          ["enter-class"]: `wd-fab__transition-enter--${fabDirection.value}`,
          ["enter-active-class"]: "wd-fab__transition-enter-active",
          ["leave-to-class"]: `wd-fab__transition-leave-to--${fabDirection.value}`,
          ["leave-active-class"]: "wd-fab__transition-leave-active",
          ["custom-class"]: `wd-fab__actions wd-fab__actions--${fabDirection.value}`,
          show: isActive.value,
          duration: 300
        })
      } : {}, {
        i: common_vendor.o(handleTouchMove),
        j: common_vendor.o(handleTouchStart),
        k: common_vendor.o(handleTouchEnd),
        l: common_vendor.n(`wd-fab ${_ctx.customClass}`),
        m: common_vendor.s(rootStyle.value),
        n: common_vendor.o(() => {
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c5c35da7"]]);
wx.createComponent(Component);
