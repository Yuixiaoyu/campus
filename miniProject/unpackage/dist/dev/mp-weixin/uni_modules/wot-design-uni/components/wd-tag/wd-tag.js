"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdTag_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-tag",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTag_types.tagProps,
  emits: ["click", "close", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("tag");
    const tagClass = common_vendor.ref("");
    const dynamicValue = common_vendor.ref("");
    const dynamicInput = common_vendor.ref(false);
    common_vendor.watch(
      [() => props.useIconSlot, () => props.icon, () => props.plain, () => props.dynamic, () => props.round, () => props.mark],
      () => {
        computeTagClass();
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.type,
      (newValue) => {
        if (!newValue)
          return;
        const type = ["primary", "danger", "warning", "success", "default"];
        if (type.indexOf(newValue) === -1)
          console.error(`type must be one of ${type.toString()}`);
        computeTagClass();
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => dynamicInput.value,
      () => {
        computeTagClass();
      },
      { deep: true, immediate: true }
    );
    const rootClass = common_vendor.computed(() => {
      return `wd-tag ${props.customClass} ${tagClass.value}`;
    });
    const rootStyle = common_vendor.computed(() => {
      const rootStyle2 = {};
      if (!props.plain && props.bgColor) {
        rootStyle2["background"] = props.bgColor;
      }
      if (props.bgColor) {
        rootStyle2["border-color"] = props.bgColor;
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(rootStyle2)};${props.customStyle}`;
    });
    const textStyle = common_vendor.computed(() => {
      const textStyle2 = {};
      if (props.color) {
        textStyle2["color"] = props.color;
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle(textStyle2);
    });
    function computeTagClass() {
      const { type, plain, round, mark, dynamic, icon, useIconSlot } = props;
      let tagClassList = [];
      type && tagClassList.push(`is-${type}`);
      plain && tagClassList.push("is-plain");
      round && tagClassList.push("is-round");
      mark && tagClassList.push("is-mark");
      dynamic && tagClassList.push("is-dynamic");
      dynamicInput.value && tagClassList.push("is-dynamic-input");
      if (icon || useIconSlot)
        tagClassList.push("is-icon");
      tagClass.value = tagClassList.join(" ");
    }
    function handleClick(event) {
      emit("click", event);
    }
    function handleClose(event) {
      emit("close", event);
    }
    function handleAdd() {
      dynamicInput.value = true;
      dynamicValue.value = "";
    }
    function handleBlur() {
      setDynamicInput();
    }
    function handleConfirm(event) {
      setDynamicInput();
      emit("confirm", {
        value: event.detail.value
      });
    }
    function setDynamicInput() {
      dynamicInput.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.useIconSlot
      }, _ctx.useIconSlot ? {} : _ctx.icon ? {
        c: common_vendor.p({
          name: _ctx.icon,
          ["custom-class"]: "wd-tag__icon"
        })
      } : {}, {
        b: _ctx.icon,
        d: common_vendor.s(textStyle.value),
        e: _ctx.closable && _ctx.round
      }, _ctx.closable && _ctx.round ? {
        f: common_vendor.p({
          name: "error-fill"
        }),
        g: common_vendor.o(handleClose)
      } : {}, {
        h: dynamicInput.value && _ctx.dynamic
      }, dynamicInput.value && _ctx.dynamic ? {
        i: common_vendor.unref(translate)("placeholder"),
        j: common_vendor.o(handleBlur),
        k: common_vendor.o(handleConfirm),
        l: dynamicValue.value,
        m: common_vendor.o(($event) => dynamicValue.value = $event.detail.value)
      } : _ctx.dynamic ? common_vendor.e({
        o: _ctx.$slots.add
      }, _ctx.$slots.add ? {} : {
        p: common_vendor.p({
          name: "add",
          ["custom-class"]: "wd-tag__add wd-tag__icon"
        }),
        q: common_vendor.t(common_vendor.unref(translate)("add"))
      }, {
        r: common_vendor.s(textStyle.value),
        s: common_vendor.o(handleAdd)
      }) : {}, {
        n: _ctx.dynamic,
        t: common_vendor.n(rootClass.value),
        v: common_vendor.s(rootStyle.value),
        w: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-97328e6e"]]);
wx.createComponent(Component);
