"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useCell = require("../composables/useCell.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("../wd-form/types.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdSelectPicker_types = require("./types.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  (_easycom_wd_icon2 + _easycom_wd_search2)();
}
const _easycom_wd_icon = () => "../wd-icon/wd-icon.js";
const _easycom_wd_search = () => "../wd-search/wd-search.js";
if (!Math) {
  (_easycom_wd_icon + _easycom_wd_search + wdCheckbox + wdCheckboxGroup + wdRadio + wdRadioGroup + wdLoading + wdButton + wdActionSheet)();
}
const wdActionSheet = () => "../wd-action-sheet/wd-action-sheet.js";
const wdCheckbox = () => "../wd-checkbox/wd-checkbox.js";
const wdCheckboxGroup = () => "../wd-checkbox-group/wd-checkbox-group.js";
const wdRadio = () => "../wd-radio/wd-radio.js";
const wdRadioGroup = () => "../wd-radio-group/wd-radio-group.js";
const wdButton = () => "../wd-button/wd-button.js";
const wdLoading = () => "../wd-loading/wd-loading.js";
const __default__ = {
  name: "wd-select-picker",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSelectPicker_types.selectPickerProps,
  emits: ["change", "cancel", "confirm", "clear", "update:modelValue", "open", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("select-picker");
    const props = __props;
    const emit = __emit;
    const pickerShow = common_vendor.ref(false);
    const selectList = common_vendor.ref([]);
    const isConfirm = common_vendor.ref(false);
    const lastSelectList = common_vendor.ref([]);
    const filterVal = common_vendor.ref("");
    const filterColumns = common_vendor.ref([]);
    const scrollTop = common_vendor.ref(0);
    const cell = uni_modules_wotDesignUni_components_composables_useCell.useCell();
    const showValue = common_vendor.computed(() => {
      const value = valueFormat(props.modelValue);
      let showValueTemp = "";
      if (props.displayFormat) {
        showValueTemp = props.displayFormat(value, props.columns);
      } else {
        const { type, labelKey } = props;
        if (type === "checkbox") {
          const selectedItems = (uni_modules_wotDesignUni_components_common_util.isArray(value) ? value : []).map((item) => {
            return getSelectedItem(item);
          });
          showValueTemp = selectedItems.map((item) => {
            return item[labelKey];
          }).join(", ");
        } else if (type === "radio") {
          const selectedItem = getSelectedItem(value);
          showValueTemp = selectedItem[labelKey];
        } else {
          showValueTemp = value;
        }
      }
      return showValueTemp;
    });
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue === selectList.value)
          return;
        selectList.value = valueFormat(newValue);
        lastSelectList.value = valueFormat(newValue);
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.columns,
      (newValue) => {
        if (props.filterable && filterVal.value) {
          formatFilterColumns(newValue, filterVal.value);
        } else {
          filterColumns.value = newValue;
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.displayFormat,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of displayFormat must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.beforeConfirm,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of beforeConfirm must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const { parent: form } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdForm_types.FORM_KEY);
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
    common_vendor.onBeforeMount(() => {
      selectList.value = valueFormat(props.modelValue);
      filterColumns.value = props.columns;
    });
    const { proxy } = common_vendor.getCurrentInstance();
    async function setScrollIntoView() {
      let wraperSelector = "";
      let selectorPromise = [];
      if (uni_modules_wotDesignUni_components_common_util.isDef(selectList.value) && selectList.value !== "" && !uni_modules_wotDesignUni_components_common_util.isArray(selectList.value)) {
        wraperSelector = "#wd-radio-group";
        selectorPromise = [uni_modules_wotDesignUni_components_common_util.getRect(`#radio${selectList.value}`, false, proxy)];
      } else if (uni_modules_wotDesignUni_components_common_util.isArray(selectList.value) && selectList.value.length > 0) {
        selectList.value.forEach((value) => {
          selectorPromise.push(uni_modules_wotDesignUni_components_common_util.getRect(`#check${value}`, false, proxy));
        });
        wraperSelector = "#wd-checkbox-group";
      }
      if (wraperSelector) {
        await uni_modules_wotDesignUni_components_common_util.pause(2e3 / 30);
        Promise.all([uni_modules_wotDesignUni_components_common_util.getRect(".wd-select-picker__wrapper", false, proxy), uni_modules_wotDesignUni_components_common_util.getRect(wraperSelector, false, proxy), ...selectorPromise]).then((res) => {
          if (uni_modules_wotDesignUni_components_common_util.isDef(res) && uni_modules_wotDesignUni_components_common_util.isArray(res)) {
            const scrollView = res[0];
            const wraper = res[1];
            const target = res.slice(2) || [];
            if (uni_modules_wotDesignUni_components_common_util.isDef(wraper) && uni_modules_wotDesignUni_components_common_util.isDef(scrollView)) {
              const index = target.findIndex((item) => {
                return item.bottom > scrollView.top && item.top < scrollView.bottom;
              });
              if (index < 0) {
                scrollTop.value = -1;
                common_vendor.nextTick$1(() => {
                  scrollTop.value = Math.max(0, target[0].top - wraper.top - scrollView.height / 2);
                });
              }
            }
          }
        });
      }
    }
    function noop() {
    }
    function getSelectedItem(value) {
      const { valueKey, labelKey, columns } = props;
      const selecteds = columns.filter((item) => {
        return item[valueKey] === value;
      });
      if (selecteds.length > 0) {
        return selecteds[0];
      }
      return {
        [valueKey]: value,
        [labelKey]: ""
      };
    }
    function valueFormat(value) {
      return props.type === "checkbox" ? uni_modules_wotDesignUni_components_common_util.isArray(value) ? value : [] : value;
    }
    function handleChange({ value }) {
      selectList.value = value;
      emit("change", { value });
      if (props.type === "radio" && !props.showConfirm) {
        onConfirm();
      }
    }
    function close() {
      pickerShow.value = false;
      if (!isConfirm.value) {
        selectList.value = valueFormat(lastSelectList.value);
      }
      emit("cancel");
      emit("close");
    }
    function open() {
      if (props.disabled || props.readonly)
        return;
      selectList.value = valueFormat(props.modelValue);
      pickerShow.value = true;
      isConfirm.value = false;
      emit("open");
    }
    function onConfirm() {
      if (props.loading) {
        pickerShow.value = false;
        emit("confirm");
        emit("close");
        return;
      }
      if (props.beforeConfirm) {
        props.beforeConfirm(selectList.value, (isPass) => {
          isPass && handleConfirm();
        });
      } else {
        handleConfirm();
      }
    }
    function handleConfirm() {
      isConfirm.value = true;
      pickerShow.value = false;
      lastSelectList.value = valueFormat(selectList.value);
      let selectedItems = {};
      if (props.type === "checkbox") {
        selectedItems = (uni_modules_wotDesignUni_components_common_util.isArray(lastSelectList.value) ? lastSelectList.value : []).map((item) => {
          return getSelectedItem(item);
        });
      } else {
        selectedItems = getSelectedItem(lastSelectList.value);
      }
      emit("update:modelValue", lastSelectList.value);
      emit("confirm", {
        value: lastSelectList.value,
        selectedItems
      });
      emit("close");
    }
    function getFilterText(label, filterVal2) {
      const reg = new RegExp(`(${filterVal2})`, "g");
      return label.split(reg).map((text) => {
        return {
          type: text === filterVal2 ? "active" : "normal",
          label: text
        };
      });
    }
    function handleFilterChange({ value }) {
      if (value === "") {
        filterColumns.value = [];
        filterVal.value = value;
        common_vendor.nextTick$1(() => {
          filterColumns.value = props.columns;
        });
      } else {
        filterVal.value = value;
        formatFilterColumns(props.columns, value);
      }
    }
    function formatFilterColumns(columns, filterVal2) {
      const filterColumnsTemp = columns.filter((item) => {
        return item[props.labelKey].indexOf(filterVal2) > -1;
      });
      const formatFilterColumns2 = filterColumnsTemp.map((item) => {
        return {
          ...item,
          [props.labelKey]: getFilterText(item[props.labelKey], filterVal2)
        };
      });
      filterColumns.value = [];
      common_vendor.nextTick$1(() => {
        filterColumns.value = formatFilterColumns2;
      });
    }
    const showConfirm = common_vendor.computed(() => {
      return props.type === "radio" && props.showConfirm || props.type === "checkbox";
    });
    const showClear = common_vendor.computed(() => {
      return props.clearable && !props.disabled && !props.readonly && showValue.value.length;
    });
    function handleClear() {
      emit("update:modelValue", props.type === "checkbox" ? [] : "");
      emit("clear");
    }
    const showArrow = common_vendor.computed(() => {
      return !props.disabled && !props.readonly && !showClear.value;
    });
    __expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.useDefaultSlot
      }, _ctx.useDefaultSlot ? {} : common_vendor.e({
        b: _ctx.label || _ctx.useLabelSlot
      }, _ctx.label || _ctx.useLabelSlot ? common_vendor.e({
        c: _ctx.label
      }, _ctx.label ? {
        d: common_vendor.t(_ctx.label)
      } : {}, {
        e: common_vendor.n(`wd-select-picker__label ${isRequired.value && "is-required"} ${_ctx.customLabelClass}`),
        f: common_vendor.s(_ctx.labelWidth ? "min-width:" + _ctx.labelWidth + ";max-width:" + _ctx.labelWidth + ";" : "")
      }) : {}, {
        g: common_vendor.t(showValue.value || _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        h: common_vendor.n(`wd-select-picker__value ${_ctx.ellipsis && "is-ellipsis"} ${_ctx.customValueClass} ${showValue.value ? "" : "wd-select-picker__value--placeholder"}`),
        i: showArrow.value
      }, showArrow.value ? {
        j: common_vendor.p({
          ["custom-class"]: "wd-select-picker__arrow",
          name: "arrow-right"
        })
      } : showClear.value ? {
        l: common_vendor.p({
          ["custom-class"]: "wd-select-picker__clear",
          name: "error-fill"
        }),
        m: common_vendor.o(handleClear)
      } : {}, {
        k: showClear.value,
        n: errorMessage.value
      }, errorMessage.value ? {
        o: common_vendor.t(errorMessage.value)
      } : {}, {
        p: common_vendor.n(`wd-select-picker__cell ${_ctx.disabled && "is-disabled"} ${_ctx.readonly && "is-readonly"} ${_ctx.alignRight && "is-align-right"} ${_ctx.error && "is-error"} ${_ctx.size && "is-" + _ctx.size}`)
      }), {
        q: common_vendor.o(open),
        r: _ctx.filterable
      }, _ctx.filterable ? {
        s: common_vendor.o(handleFilterChange),
        t: common_vendor.o(($event) => filterVal.value = $event),
        v: common_vendor.p({
          placeholder: _ctx.filterPlaceholder || common_vendor.unref(translate)("filterPlaceholder"),
          ["hide-cancel"]: true,
          ["placeholder-left"]: true,
          modelValue: filterVal.value
        })
      } : {}, {
        w: _ctx.type === "checkbox" && common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(selectList.value)
      }, _ctx.type === "checkbox" && common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(selectList.value) ? {
        x: common_vendor.f(filterColumns.value, (item, k0, i0) => {
          return common_vendor.e(_ctx.filterable && filterVal.value ? {
            a: common_vendor.f(item[_ctx.labelKey], (text, k1, i1) => {
              return common_vendor.e({
                a: text.type === "active"
              }, text.type === "active" ? {
                b: common_vendor.t(text.label)
              } : {
                c: common_vendor.t(text.label)
              }, {
                d: text.label
              });
            })
          } : {
            b: common_vendor.t(item[_ctx.labelKey])
          }, {
            c: "b8ce50f5-5-" + i0 + ",b8ce50f5-4",
            d: common_vendor.p({
              modelValue: item[_ctx.valueKey],
              disabled: item.disabled
            }),
            e: item[_ctx.valueKey],
            f: "check" + item[_ctx.valueKey]
          });
        }),
        y: _ctx.filterable && filterVal.value,
        z: common_vendor.o(handleChange),
        A: common_vendor.o(($event) => selectList.value = $event),
        B: common_vendor.p({
          cell: true,
          size: _ctx.selectSize,
          ["checked-color"]: _ctx.checkedColor,
          min: _ctx.min,
          max: _ctx.max,
          modelValue: selectList.value
        })
      } : {}, {
        C: _ctx.type === "radio" && !common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(selectList.value)
      }, _ctx.type === "radio" && !common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(selectList.value) ? {
        D: common_vendor.f(filterColumns.value, (item, index, i0) => {
          return common_vendor.e(_ctx.filterable && filterVal.value ? {
            a: common_vendor.f(item[_ctx.labelKey], (text, k1, i1) => {
              return {
                a: common_vendor.t(text.label),
                b: common_vendor.n(`${text.type === "active" ? "wd-select-picker__text-active" : ""}`),
                c: text.label
              };
            })
          } : {
            b: common_vendor.t(item[_ctx.labelKey])
          }, {
            c: "b8ce50f5-7-" + i0 + ",b8ce50f5-6",
            d: common_vendor.p({
              value: item[_ctx.valueKey],
              disabled: item.disabled
            }),
            e: index,
            f: "radio" + item[_ctx.valueKey]
          });
        }),
        E: _ctx.filterable && filterVal.value,
        F: common_vendor.o(handleChange),
        G: common_vendor.o(($event) => selectList.value = $event),
        H: common_vendor.p({
          cell: true,
          size: _ctx.selectSize,
          ["checked-color"]: _ctx.checkedColor,
          modelValue: selectList.value
        })
      } : {}, {
        I: _ctx.loading
      }, _ctx.loading ? {
        J: common_vendor.p({
          color: _ctx.loadingColor
        }),
        K: common_vendor.o(noop)
      } : {}, {
        L: common_vendor.n(`wd-select-picker__wrapper ${_ctx.filterable ? "is-filterable" : ""} ${_ctx.loading ? "is-loading" : ""} ${_ctx.customContentClass}`),
        M: !_ctx.loading,
        N: scrollTop.value,
        O: showConfirm.value
      }, showConfirm.value ? {
        P: common_vendor.t(_ctx.confirmButtonText || common_vendor.unref(translate)("confirm")),
        Q: common_vendor.o(onConfirm),
        R: common_vendor.p({
          block: true,
          size: "large",
          disabled: _ctx.loading
        })
      } : {}, {
        S: common_vendor.o(close),
        T: common_vendor.o(($event) => _ctx.scrollIntoView ? setScrollIntoView() : ""),
        U: common_vendor.o(($event) => pickerShow.value = $event),
        V: common_vendor.p({
          duration: 250,
          title: _ctx.title || common_vendor.unref(translate)("title"),
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["z-index"]: _ctx.zIndex,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["custom-header-class"]: "wd-select-picker__header",
          modelValue: pickerShow.value
        }),
        W: common_vendor.n(`wd-select-picker ${common_vendor.unref(cell).border.value ? "is-border" : ""} ${_ctx.customClass}`),
        X: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b8ce50f5"]]);
wx.createComponent(Component);
