"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdText_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_dayjs = require("../common/dayjs.js");
const __default__ = {
  name: "wd-text",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdText_types.textProps,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const textClass = common_vendor.ref("");
    common_vendor.watch(
      () => ({
        type: props.type,
        text: props.text,
        mode: props.mode,
        color: props.color,
        bold: props.bold,
        lines: props.lines,
        format: props.format
      }),
      ({ type }) => {
        const types = ["primary", "error", "warning", "success", "default"];
        if (type && !types.includes(type)) {
          console.error(`type must be one of ${types.toString()}`);
        }
        computeTextClass();
      },
      { deep: true, immediate: true }
    );
    const rootClass = common_vendor.computed(() => {
      return `wd-text ${props.customClass} ${textClass.value}`;
    });
    const rootStyle = common_vendor.computed(() => {
      const rootStyle2 = {};
      if (props.color) {
        rootStyle2["color"] = props.color;
      }
      if (props.size) {
        rootStyle2["font-size"] = `${props.size}`;
      }
      if (props.lineHeight) {
        rootStyle2["line-height"] = `${props.lineHeight}`;
      }
      if (props.decoration) {
        rootStyle2["text-decoration"] = `${props.decoration}`;
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(rootStyle2)};${props.customStyle}`;
    });
    function computeTextClass() {
      const { type, color, bold, lines } = props;
      const textClassList = [];
      if (!color) {
        textClassList.push(`is-${type}`);
      }
      if (uni_modules_wotDesignUni_components_common_util.isDef(lines)) {
        textClassList.push(`is-lines-${lines}`);
      }
      bold && textClassList.push("is-bold");
      textClass.value = textClassList.join(" ");
    }
    function formatText(text, format, mode) {
      if (format) {
        if (mode === "phone") {
          return text.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
        } else if (mode === "name") {
          return text.replace(/^(.).*(.)$/, "$1**$2");
        } else {
          throw new Error("mode must be one of phone or name for encryption");
        }
      }
      return text;
    }
    function formatNumber(num) {
      num = Number(num).toFixed(2);
      const x = num.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? "." + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1,$2");
      }
      return x1 + x2;
    }
    const formattedText = common_vendor.computed(() => {
      const { text, mode, format } = props;
      if (mode === "date") {
        return uni_modules_wotDesignUni_components_common_dayjs.dayjs(Number(text)).format("YYYY-MM-DD");
      }
      if (mode === "price") {
        return formatNumber(text);
      }
      return formatText(`${text}`, format, mode);
    });
    function handleClick(event) {
      emit("click", event);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.$slots.prefix || _ctx.prefix
      }, _ctx.$slots.prefix || _ctx.prefix ? {
        b: common_vendor.t(_ctx.prefix)
      } : {}, {
        c: common_vendor.t(formattedText.value),
        d: _ctx.$slots.suffix || _ctx.suffix
      }, _ctx.$slots.suffix || _ctx.suffix ? {
        e: common_vendor.t(_ctx.suffix)
      } : {}, {
        f: common_vendor.o(handleClick),
        g: common_vendor.n(rootClass.value),
        h: common_vendor.s(rootStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24041fa1"]]);
wx.createComponent(Component);
