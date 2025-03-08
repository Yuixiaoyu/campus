"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdSearch_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-search",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSearch_types.searchProps,
  emits: ["update:modelValue", "change", "clear", "search", "focus", "blur", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("search");
    const isFocused = common_vendor.ref(false);
    const showInput = common_vendor.ref(false);
    const str = common_vendor.ref("");
    const showPlaceHolder = common_vendor.ref(true);
    const clearing = common_vendor.ref(false);
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        str.value = newValue;
        if (newValue) {
          showInput.value = true;
        }
      },
      { immediate: true }
    );
    common_vendor.watch(
      () => props.focus,
      (newValue) => {
        if (newValue) {
          if (props.disabled)
            return;
          closeCover();
        }
      }
    );
    common_vendor.onMounted(() => {
      if (props.focus) {
        closeCover();
      }
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-search  ${props.light ? "is-light" : ""}  ${props.hideCancel ? "is-without-cancel" : ""} ${props.customClass}`;
    });
    const coverStyle = common_vendor.computed(() => {
      const coverStyle2 = {
        display: str.value === "" && showPlaceHolder.value ? "flex" : "none"
      };
      return uni_modules_wotDesignUni_components_common_util.objToStyle(coverStyle2);
    });
    async function hackFocus(focus) {
      showInput.value = focus;
      await uni_modules_wotDesignUni_components_common_util.pause();
      isFocused.value = focus;
    }
    async function closeCover() {
      if (props.disabled)
        return;
      await uni_modules_wotDesignUni_components_common_util.pause(100);
      showPlaceHolder.value = false;
      hackFocus(true);
    }
    function inputValue(event) {
      str.value = event.detail.value;
      emit("update:modelValue", event.detail.value);
      emit("change", {
        value: event.detail.value
      });
    }
    async function clearSearch() {
      str.value = "";
      clearing.value = true;
      if (props.focusWhenClear) {
        isFocused.value = false;
      }
      await uni_modules_wotDesignUni_components_common_util.pause(100);
      if (props.focusWhenClear) {
        showPlaceHolder.value = false;
        hackFocus(true);
      } else {
        showPlaceHolder.value = true;
        hackFocus(false);
      }
      emit("change", {
        value: ""
      });
      emit("update:modelValue", "");
      emit("clear");
    }
    function search({ detail: { value } }) {
      emit("search", {
        value
      });
    }
    function searchFocus() {
      if (clearing.value) {
        clearing.value = false;
        return;
      }
      showPlaceHolder.value = false;
      emit("focus", {
        value: str.value
      });
    }
    function searchBlur() {
      if (clearing.value)
        return;
      showPlaceHolder.value = !str.value;
      showInput.value = !showPlaceHolder.value;
      isFocused.value = false;
      emit("blur", {
        value: str.value
      });
    }
    function handleCancel() {
      emit("cancel", {
        value: str.value
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.placeholderLeft
      }, !_ctx.placeholderLeft ? {
        b: common_vendor.p({
          name: "search",
          ["custom-class"]: "wd-search__search-icon"
        }),
        c: common_vendor.t(_ctx.placeholder || common_vendor.unref(translate)("search")),
        d: common_vendor.n(`wd-search__placeholder-txt ${_ctx.placeholderClass}`),
        e: common_vendor.s(coverStyle.value),
        f: common_vendor.o(closeCover)
      } : {}, {
        g: showInput.value || str.value || _ctx.placeholderLeft
      }, showInput.value || str.value || _ctx.placeholderLeft ? {
        h: common_vendor.p({
          name: "search",
          ["custom-class"]: "wd-search__search-left-icon"
        })
      } : {}, {
        i: showInput.value || str.value || _ctx.placeholderLeft
      }, showInput.value || str.value || _ctx.placeholderLeft ? {
        j: _ctx.placeholder || common_vendor.unref(translate)("search"),
        k: `wd-search__placeholder-txt ${_ctx.placeholderClass}`,
        l: _ctx.placeholderStyle,
        m: common_vendor.n(_ctx.customInputClass),
        n: common_vendor.o(searchFocus),
        o: common_vendor.o([($event) => str.value = $event.detail.value, inputValue]),
        p: common_vendor.o(searchBlur),
        q: common_vendor.o(search),
        r: _ctx.disabled,
        s: _ctx.maxlength,
        t: isFocused.value,
        v: str.value
      } : {}, {
        w: str.value
      }, str.value ? {
        x: common_vendor.o(clearSearch),
        y: common_vendor.p({
          ["custom-class"]: "wd-search__clear wd-search__clear-icon",
          name: "error-fill"
        })
      } : {}, {
        z: !_ctx.hideCancel
      }, !_ctx.hideCancel ? {
        A: common_vendor.t(_ctx.cancelTxt || common_vendor.unref(translate)("cancel")),
        B: common_vendor.o(handleCancel)
      } : {}, {
        C: common_vendor.n(rootClass.value),
        D: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc0202be"]]);
wx.createComponent(Component);
