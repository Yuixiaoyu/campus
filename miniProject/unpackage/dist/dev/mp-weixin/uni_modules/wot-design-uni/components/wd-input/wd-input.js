"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useCell = require("../composables/useCell.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("../wd-form/types.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdInput_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-input",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdInput_types.inputProps,
  emits: [
    "update:modelValue",
    "clear",
    "blur",
    "focus",
    "input",
    "keyboardheightchange",
    "confirm",
    "clicksuffixicon",
    "clickprefixicon",
    "click"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = common_vendor.useSlots();
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("input");
    const isPwdVisible = common_vendor.ref(false);
    const clearing = common_vendor.ref(false);
    const focused = common_vendor.ref(false);
    const focusing = common_vendor.ref(false);
    const inputValue = common_vendor.ref(getInitValue());
    const cell = uni_modules_wotDesignUni_components_composables_useCell.useCell();
    common_vendor.watch(
      () => props.focus,
      (newValue) => {
        focused.value = newValue;
      },
      { immediate: true, deep: true }
    );
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        inputValue.value = uni_modules_wotDesignUni_components_common_util.isDef(newValue) ? String(newValue) : "";
      }
    );
    const { parent: form } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdForm_types.FORM_KEY);
    const placeholderValue = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_common_util.isDef(props.placeholder) ? props.placeholder : translate("placeholder");
    });
    const showClear = common_vendor.computed(() => {
      const { disabled, readonly, clearable, clearTrigger } = props;
      if (clearable && !readonly && !disabled && inputValue.value && (clearTrigger === "always" || props.clearTrigger === "focus" && focusing.value)) {
        return true;
      } else {
        return false;
      }
    });
    const showWordCount = common_vendor.computed(() => {
      const { disabled, readonly, maxlength, showWordLimit } = props;
      return Boolean(!disabled && !readonly && uni_modules_wotDesignUni_components_common_util.isDef(maxlength) && maxlength > -1 && showWordLimit);
    });
    const errorMessage = common_vendor.computed(() => {
      if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
        return form.errorMessages[props.prop];
      } else {
        return "";
      }
    });
    const isRequired = common_vendor.computed(() => {
      let formRequired = false;
      if (form && form.props.rules) {
        const rules = form.props.rules;
        for (const key in rules) {
          if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
            formRequired = rules[key].some((rule) => rule.required);
          }
        }
      }
      return props.required || props.rules.some((rule) => rule.required) || formRequired;
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-input  ${props.label || slots.label ? "is-cell" : ""} ${props.center ? "is-center" : ""} ${cell.border.value ? "is-border" : ""} ${props.size ? "is-" + props.size : ""} ${props.error ? "is-error" : ""} ${props.disabled ? "is-disabled" : ""}  ${inputValue.value && String(inputValue.value).length > 0 ? "is-not-empty" : ""}  ${props.noBorder ? "is-no-border" : ""} ${props.customClass}`;
    });
    const labelClass = common_vendor.computed(() => {
      return `wd-input__label ${props.customLabelClass} ${isRequired.value ? "is-required" : ""}`;
    });
    const inputPlaceholderClass = common_vendor.computed(() => {
      return `wd-input__placeholder  ${props.placeholderClass}`;
    });
    const labelStyle = common_vendor.computed(() => {
      return props.labelWidth ? uni_modules_wotDesignUni_components_common_util.objToStyle({
        "min-width": props.labelWidth,
        "max-width": props.labelWidth
      }) : "";
    });
    function getInitValue() {
      const formatted = formatValue(props.modelValue);
      if (!isValueEqual(formatted, props.modelValue)) {
        emit("update:modelValue", formatted);
      }
      return formatted;
    }
    function formatValue(value) {
      const { maxlength } = props;
      if (uni_modules_wotDesignUni_components_common_util.isDef(maxlength) && maxlength !== -1 && String(value).length > maxlength) {
        return value.toString().slice(0, maxlength);
      }
      return value;
    }
    function togglePwdVisible() {
      isPwdVisible.value = !isPwdVisible.value;
    }
    async function handleClear() {
      clearing.value = true;
      focusing.value = false;
      inputValue.value = "";
      if (props.focusWhenClear) {
        focused.value = false;
      }
      await uni_modules_wotDesignUni_components_common_util.pause();
      if (props.focusWhenClear) {
        focused.value = true;
        focusing.value = true;
      }
      emit("update:modelValue", inputValue.value);
      emit("clear");
    }
    async function handleBlur() {
      await uni_modules_wotDesignUni_components_common_util.pause(150);
      if (clearing.value) {
        clearing.value = false;
        return;
      }
      focusing.value = false;
      emit("blur", {
        value: inputValue.value
      });
    }
    function handleFocus({ detail }) {
      focusing.value = true;
      emit("focus", detail);
    }
    function handleInput({ detail }) {
      emit("update:modelValue", inputValue.value);
      emit("input", detail);
    }
    function handleKeyboardheightchange({ detail }) {
      emit("keyboardheightchange", detail);
    }
    function handleConfirm({ detail }) {
      emit("confirm", detail);
    }
    function onClickSuffixIcon() {
      emit("clicksuffixicon");
    }
    function onClickPrefixIcon() {
      emit("clickprefixicon");
    }
    function handleClick(event) {
      emit("click", event);
    }
    function isValueEqual(value1, value2) {
      return uni_modules_wotDesignUni_components_common_util.isEqual(String(value1), String(value2));
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.label || _ctx.$slots.label
      }, _ctx.label || _ctx.$slots.label ? common_vendor.e({
        b: _ctx.prefixIcon || _ctx.$slots.prefix
      }, _ctx.prefixIcon || _ctx.$slots.prefix ? common_vendor.e({
        c: _ctx.prefixIcon && !_ctx.$slots.prefix
      }, _ctx.prefixIcon && !_ctx.$slots.prefix ? {
        d: common_vendor.o(onClickPrefixIcon),
        e: common_vendor.p({
          ["custom-class"]: "wd-input__icon",
          name: _ctx.prefixIcon
        })
      } : {}) : {}, {
        f: _ctx.label && !_ctx.$slots.label
      }, _ctx.label && !_ctx.$slots.label ? {
        g: common_vendor.t(_ctx.label)
      } : {}, {
        h: common_vendor.n(labelClass.value),
        i: common_vendor.s(labelStyle.value)
      }) : {}, {
        j: (_ctx.prefixIcon || _ctx.$slots.prefix) && !_ctx.label
      }, (_ctx.prefixIcon || _ctx.$slots.prefix) && !_ctx.label ? common_vendor.e({
        k: _ctx.prefixIcon && !_ctx.$slots.prefix
      }, _ctx.prefixIcon && !_ctx.$slots.prefix ? {
        l: common_vendor.o(onClickPrefixIcon),
        m: common_vendor.p({
          ["custom-class"]: "wd-input__icon",
          name: _ctx.prefixIcon
        })
      } : {}) : {}, {
        n: common_vendor.n(_ctx.prefixIcon ? "wd-input__inner--prefix" : ""),
        o: common_vendor.n(showWordCount.value ? "wd-input__inner--count" : ""),
        p: common_vendor.n(_ctx.alignRight ? "is-align-right" : ""),
        q: common_vendor.n(_ctx.customInputClass),
        r: _ctx.type,
        s: _ctx.showPassword && !isPwdVisible.value,
        t: placeholderValue.value,
        v: _ctx.disabled || _ctx.readonly,
        w: _ctx.maxlength,
        x: focused.value,
        y: _ctx.confirmType,
        z: _ctx.confirmHold,
        A: _ctx.cursor,
        B: _ctx.cursorSpacing,
        C: _ctx.placeholderStyle,
        D: _ctx.selectionStart,
        E: _ctx.selectionEnd,
        F: _ctx.adjustPosition,
        G: _ctx.holdKeyboard,
        H: _ctx.alwaysEmbed,
        I: inputPlaceholderClass.value,
        J: _ctx.ignoreCompositionEvent,
        K: _ctx.inputmode,
        L: common_vendor.o([($event) => inputValue.value = $event.detail.value, handleInput]),
        M: common_vendor.o(handleFocus),
        N: common_vendor.o(handleBlur),
        O: common_vendor.o(handleConfirm),
        P: common_vendor.o(handleKeyboardheightchange),
        Q: inputValue.value,
        R: _ctx.readonly
      }, _ctx.readonly ? {} : {}, {
        S: showClear.value || _ctx.showPassword || _ctx.suffixIcon || showWordCount.value || _ctx.$slots.suffix
      }, showClear.value || _ctx.showPassword || _ctx.suffixIcon || showWordCount.value || _ctx.$slots.suffix ? common_vendor.e({
        T: showClear.value
      }, showClear.value ? {
        U: common_vendor.o(handleClear),
        V: common_vendor.p({
          ["custom-class"]: "wd-input__clear",
          name: "error-fill"
        })
      } : {}, {
        W: _ctx.showPassword
      }, _ctx.showPassword ? {
        X: common_vendor.o(togglePwdVisible),
        Y: common_vendor.p({
          ["custom-class"]: "wd-input__icon",
          name: isPwdVisible.value ? "view" : "eye-close"
        })
      } : {}, {
        Z: showWordCount.value
      }, showWordCount.value ? {
        aa: common_vendor.t(String(inputValue.value).length),
        ab: common_vendor.n(inputValue.value && String(inputValue.value).length > 0 ? "wd-input__count-current" : ""),
        ac: common_vendor.n(String(inputValue.value).length > _ctx.maxlength ? "is-error" : ""),
        ad: common_vendor.t(_ctx.maxlength)
      } : {}, {
        ae: _ctx.suffixIcon && !_ctx.$slots.suffix
      }, _ctx.suffixIcon && !_ctx.$slots.suffix ? {
        af: common_vendor.o(onClickSuffixIcon),
        ag: common_vendor.p({
          ["custom-class"]: "wd-input__icon",
          name: _ctx.suffixIcon
        })
      } : {}) : {}, {
        ah: errorMessage.value
      }, errorMessage.value ? {
        ai: common_vendor.t(errorMessage.value)
      } : {}, {
        aj: common_vendor.n(rootClass.value),
        ak: common_vendor.s(_ctx.customStyle),
        al: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4e0c9774"]]);
wx.createComponent(Component);
