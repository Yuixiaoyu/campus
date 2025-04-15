"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useCell = require("../composables/useCell.js");
const uni_modules_wotDesignUni_components_wdDatetimePickerView_types = require("../wd-datetime-picker-view/types.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("../wd-form/types.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdDatetimePicker_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_dayjs = require("../common/dayjs.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_icon + wdDatetimePickerView + wdPopup)();
}
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdDatetimePickerView = () => "../wd-datetime-picker-view/wd-datetime-picker-view.js";
const __default__ = {
  name: "wd-datetime-picker",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdDatetimePicker_types.datetimePickerProps,
  emits: ["change", "open", "toggle", "cancel", "confirm", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("datetime-picker");
    const datetimePickerView = common_vendor.ref();
    const datetimePickerView1 = common_vendor.ref();
    const showValue = common_vendor.ref("");
    const popupShow = common_vendor.ref(false);
    const showStart = common_vendor.ref(true);
    const region = common_vendor.ref(false);
    const showTabLabel = common_vendor.ref([]);
    const innerValue = common_vendor.ref("");
    const endInnerValue = common_vendor.ref("");
    const isPicking = common_vendor.ref(false);
    const hasConfirmed = common_vendor.ref(false);
    const isLoading = common_vendor.ref(false);
    const { proxy } = common_vendor.getCurrentInstance();
    const cell = uni_modules_wotDesignUni_components_composables_useCell.useCell();
    common_vendor.watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (uni_modules_wotDesignUni_components_common_util.isEqual(val, oldVal))
          return;
        if (uni_modules_wotDesignUni_components_common_util.isArray(val)) {
          region.value = true;
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
          endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
        } else {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
        }
        common_vendor.nextTick$1(() => {
          setShowValue(false, false, true);
        });
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
      () => props.filter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of filter must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.formatter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of formatter must be Function");
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
    common_vendor.watch(
      () => props.displayFormatTabLabel,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of displayFormatTabLabel must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.defaultValue,
      (val) => {
        if (uni_modules_wotDesignUni_components_common_util.isArray(val) || region.value) {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
          endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
        } else {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
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
    const customColumnFormatter = (picker) => {
      if (!picker) {
        return [];
      }
      const { type } = props;
      const { startSymbol, formatter } = picker;
      const start = picker.correctValue(innerValue.value);
      const end = picker.correctValue(endInnerValue.value);
      const currentValue = startSymbol ? picker.getPickerValue(start, type) : picker.getPickerValue(end, type);
      const boundary = startSymbol ? picker.getPickerValue(end, type) : picker.getPickerValue(start, type);
      const columns = picker.getOriginColumns();
      return columns.map((column, cIndex) => {
        return column.values.map((value) => {
          const disabled = columnDisabledRules(startSymbol, columns, cIndex, value, currentValue, boundary);
          return {
            label: formatter ? formatter(column.type, uni_modules_wotDesignUni_components_common_util.padZero(value)) : uni_modules_wotDesignUni_components_common_util.padZero(value),
            value,
            disabled
          };
        });
      });
    };
    common_vendor.onBeforeMount(() => {
      const { modelValue: value } = props;
      if (uni_modules_wotDesignUni_components_common_util.isArray(value)) {
        region.value = true;
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
        endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
      } else {
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
      }
    });
    common_vendor.onMounted(() => {
      setShowValue(false, false, true);
    });
    function getSelects(picker) {
      let value = picker === "before" ? innerValue.value : endInnerValue.value;
      let selected = [];
      if (value) {
        selected = uni_modules_wotDesignUni_components_wdDatetimePickerView_types.getPickerValue(value, props.type);
      }
      let selects = selected.map((value2) => {
        return {
          [props.labelKey]: uni_modules_wotDesignUni_components_common_util.padZero(value2),
          [props.valueKey]: value2
        };
      });
      return selects;
    }
    function noop() {
    }
    function getDefaultInnerValue(isRegion, isEnd) {
      const { modelValue: value, defaultValue, maxDate, minDate, type } = props;
      if (isRegion) {
        const index = isEnd ? 1 : 0;
        const targetValue = uni_modules_wotDesignUni_components_common_util.isArray(value) ? value[index] : "";
        const targetDefault = uni_modules_wotDesignUni_components_common_util.isArray(defaultValue) ? defaultValue[index] : "";
        const maxValue = type === "time" ? uni_modules_wotDesignUni_components_common_dayjs.dayjs(maxDate).format("HH:mm") : maxDate;
        const minValue = type === "time" ? uni_modules_wotDesignUni_components_common_dayjs.dayjs(minDate).format("HH:mm") : minDate;
        return targetValue || targetDefault || (isEnd ? maxValue : minValue);
      } else {
        return uni_modules_wotDesignUni_components_common_util.isDef(value || defaultValue) ? value || defaultValue : "";
      }
    }
    function open() {
      showPopup();
    }
    function close() {
      onCancel();
    }
    function showPopup() {
      if (props.disabled || props.readonly)
        return;
      emit("open");
      if (region.value) {
        popupShow.value = true;
        showStart.value = true;
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, false));
        endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
      } else {
        popupShow.value = true;
        innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
      }
      setShowValue(true, false, true);
    }
    function tabChange() {
      showStart.value = !showStart.value;
      const picker = showStart.value ? datetimePickerView.value : datetimePickerView1.value;
      picker.setColumns(picker.updateColumns());
      emit("toggle", showStart.value ? innerValue.value : endInnerValue.value);
    }
    function onChangeStart({ value }) {
      innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(value);
      if (region.value) {
        showTabLabel.value = [setTabLabel(), uni_modules_wotDesignUni_components_common_util.deepClone(showTabLabel.value[1])];
        emit("change", {
          value: [value, endInnerValue.value]
        });
        datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns());
        datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns());
      } else {
        emit("change", {
          value: innerValue.value
        });
      }
    }
    function onChangeEnd({ value }) {
      endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(value);
      showTabLabel.value = [uni_modules_wotDesignUni_components_common_util.deepClone(showTabLabel.value[0]), setTabLabel(1)];
      emit("change", {
        value: [innerValue.value, value]
      });
      datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns());
      datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns());
    }
    function onCancel() {
      popupShow.value = false;
      setTimeout(() => {
        if (region.value) {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true));
          endInnerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue(true, true));
        } else {
          innerValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(getDefaultInnerValue());
        }
      }, 200);
      emit("cancel");
    }
    function onConfirm() {
      if (props.loading || isLoading.value)
        return;
      if (isPicking.value) {
        hasConfirmed.value = true;
        return;
      }
      const { beforeConfirm } = props;
      if (beforeConfirm) {
        beforeConfirm(
          region.value ? [innerValue.value, endInnerValue.value] : innerValue.value,
          (isPass) => {
            isPass && handleConfirm();
          },
          proxy.$.exposed
        );
      } else {
        handleConfirm();
      }
    }
    function onPickStart() {
      isPicking.value = true;
    }
    function onPickEnd() {
      isPicking.value = false;
      setTimeout(() => {
        if (hasConfirmed.value) {
          hasConfirmed.value = false;
          onConfirm();
        }
      }, 50);
    }
    function handleConfirm() {
      if (props.loading || isLoading.value || props.disabled) {
        popupShow.value = false;
        return;
      }
      const value = region.value ? [innerValue.value, endInnerValue.value] : innerValue.value;
      popupShow.value = false;
      emit("update:modelValue", value);
      emit("confirm", {
        value
      });
      setShowValue(false, true);
    }
    function setTabLabel(index = 0) {
      if (region.value) {
        let items = [];
        if (index === 0) {
          items = (datetimePickerView.value ? datetimePickerView.value.getSelects() : void 0) || innerValue.value && getSelects("before");
        } else {
          items = (datetimePickerView1.value ? datetimePickerView1.value.getSelects() : void 0) || endInnerValue.value && getSelects("after");
        }
        return defaultDisplayFormat(items, true);
      } else {
        return "";
      }
    }
    function setShowValue(tab = false, isConfirm = false, beforeMount = false) {
      if (region.value) {
        const items = beforeMount ? innerValue.value && getSelects("before") || [] : datetimePickerView.value && datetimePickerView.value.getSelects && datetimePickerView.value.getSelects() || [];
        const endItems = beforeMount ? endInnerValue.value && getSelects("after") || [] : datetimePickerView1.value && datetimePickerView1.value.getSelects && datetimePickerView1.value.getSelects() || [];
        showValue.value = tab ? showValue.value : [
          props.modelValue[0] || isConfirm ? defaultDisplayFormat(items) : "",
          props.modelValue[1] || isConfirm ? defaultDisplayFormat(endItems) : ""
        ];
        showTabLabel.value = [defaultDisplayFormat(items, true), defaultDisplayFormat(endItems, true)];
      } else {
        const items = beforeMount ? innerValue.value && getSelects("before") || [] : datetimePickerView.value && datetimePickerView.value.getSelects && datetimePickerView.value.getSelects() || [];
        showValue.value = uni_modules_wotDesignUni_components_common_util.deepClone(props.modelValue || isConfirm ? defaultDisplayFormat(items) : "");
      }
    }
    function defaultDisplayFormat(items, tabLabel = false) {
      if (items.length === 0)
        return "";
      if (tabLabel && props.displayFormatTabLabel) {
        return props.displayFormatTabLabel(items);
      }
      if (props.displayFormat) {
        return props.displayFormat(items);
      }
      if (props.formatter) {
        const typeMaps = {
          year: ["year"],
          datetime: ["year", "month", "date", "hour", "minute"],
          date: ["year", "month", "date"],
          time: ["hour", "minute"],
          "year-month": ["year", "month"]
        };
        return items.map((item, index) => {
          return props.formatter(typeMaps[props.type][index], item.value);
        }).join("");
      }
      switch (props.type) {
        case "year":
          return items[0].label;
        case "date":
          return `${items[0].label}-${items[1].label}-${items[2].label}`;
        case "year-month":
          return `${items[0].label}-${items[1].label}`;
        case "time":
          return `${items[0].label}:${items[1].label}`;
        case "datetime":
          return `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`;
      }
    }
    function columnDisabledRules(isStart, columns, cIndex, value, currentValue, boundary) {
      const { type } = props;
      const column = columns[cIndex];
      if (type === "datetime") {
        const year = boundary[0];
        const month = boundary[1];
        const date = boundary[2];
        const hour = boundary[3];
        const minute = boundary[4];
        if (column.type === "year") {
          return isStart ? value > year : value < year;
        }
        if (column.type === "month" && currentValue[0] === year) {
          return isStart ? value > month : value < month;
        }
        if (column.type === "date" && currentValue[0] === year && currentValue[1] === month) {
          return isStart ? value > date : value < date;
        }
        if (column.type === "hour" && currentValue[0] === year && currentValue[1] === month && currentValue[2] === date) {
          return isStart ? value > hour : value < hour;
        }
        if (column.type === "minute" && currentValue[0] === year && currentValue[1] === month && currentValue[2] === date && currentValue[3] === hour) {
          return isStart ? value > minute : value < minute;
        }
      } else if (type === "year-month") {
        const year = boundary[0];
        const month = boundary[1];
        if (column.type === "year") {
          return isStart ? value > year : value < year;
        }
        if (column.type === "month" && currentValue[0] === year) {
          return isStart ? value > month : value < month;
        }
      } else if (type === "year") {
        const year = boundary[0];
        if (column.type === "year") {
          return isStart ? value > year : value < year;
        }
      } else if (type === "date") {
        const year = boundary[0];
        const month = boundary[1];
        const date = boundary[2];
        if (column.type === "year") {
          return isStart ? value > year : value < year;
        }
        if (column.type === "month" && currentValue[0] === year) {
          return isStart ? value > month : value < month;
        }
        if (column.type === "date" && currentValue[0] === year && currentValue[1] === month) {
          return isStart ? value > date : value < date;
        }
      } else if (type === "time") {
        const hour = boundary[0];
        const minute = boundary[1];
        if (column.type === "hour") {
          return isStart ? value > hour : value < hour;
        }
        if (column.type === "minute" && currentValue[0] === hour) {
          return isStart ? value > minute : value < minute;
        }
      }
      return false;
    }
    function setLoading(loading) {
      isLoading.value = loading;
    }
    __expose({
      open,
      close,
      setLoading
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
        e: common_vendor.n(`wd-picker__label ${_ctx.customLabelClass} ${isRequired.value ? "is-required" : ""}`),
        f: common_vendor.s(_ctx.labelWidth ? "min-width:" + _ctx.labelWidth + ";max-width:" + _ctx.labelWidth + ";" : "")
      }) : {}, {
        g: region.value
      }, region.value ? common_vendor.e({
        h: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(showValue.value)
      }, common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(showValue.value) ? {
        i: common_vendor.t(showValue.value[0] ? showValue.value[0] : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        j: common_vendor.n(showValue.value[0] ? "" : "wd-picker__placeholder"),
        k: common_vendor.t(common_vendor.unref(translate)("to")),
        l: common_vendor.t(showValue.value[1] ? showValue.value[1] : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        m: common_vendor.n(showValue.value[1] ? "" : "wd-picker__placeholder")
      } : {
        n: common_vendor.t(_ctx.placeholder || common_vendor.unref(translate)("placeholder"))
      }) : {
        o: common_vendor.t(showValue.value ? showValue.value : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        p: common_vendor.n(showValue.value ? "" : "wd-picker__placeholder")
      }, {
        q: common_vendor.n(`wd-picker__value ${_ctx.customValueClass}`),
        r: !_ctx.disabled && !_ctx.readonly
      }, !_ctx.disabled && !_ctx.readonly ? {
        s: common_vendor.p({
          ["custom-class"]: "wd-picker__arrow",
          name: "arrow-right"
        })
      } : {}, {
        t: errorMessage.value
      }, errorMessage.value ? {
        v: common_vendor.t(errorMessage.value)
      } : {}, {
        w: common_vendor.n(_ctx.customCellClass)
      }), {
        x: common_vendor.o(showPopup),
        y: common_vendor.t(_ctx.cancelButtonText || common_vendor.unref(translate)("cancel")),
        z: common_vendor.o(onCancel),
        A: _ctx.title
      }, _ctx.title ? {
        B: common_vendor.t(_ctx.title)
      } : {}, {
        C: common_vendor.t(_ctx.confirmButtonText || common_vendor.unref(translate)("confirm")),
        D: common_vendor.n(`wd-picker__action ${_ctx.loading || isLoading.value ? "is-loading" : ""}`),
        E: common_vendor.o(onConfirm),
        F: common_vendor.o(noop),
        G: region.value
      }, region.value ? {
        H: common_vendor.t(common_vendor.unref(translate)("start")),
        I: common_vendor.t(showTabLabel.value[0]),
        J: common_vendor.n(`wd-picker__region ${showStart.value ? "is-active" : ""} `),
        K: common_vendor.o(tabChange),
        L: common_vendor.t(common_vendor.unref(translate)("end")),
        M: common_vendor.t(showTabLabel.value[1]),
        N: common_vendor.n(`wd-picker__region ${showStart.value ? "" : "is-active"}`),
        O: common_vendor.o(tabChange)
      } : {}, {
        P: common_vendor.sr(datetimePickerView, "2a8ca3bd-2,2a8ca3bd-1", {
          "k": "datetimePickerView"
        }),
        Q: common_vendor.o(onChangeStart),
        R: common_vendor.o(onPickStart),
        S: common_vendor.o(onPickEnd),
        T: common_vendor.o(($event) => innerValue.value = $event),
        U: common_vendor.p({
          ["custom-class"]: _ctx.customViewClass,
          type: _ctx.type,
          loading: _ctx.loading || isLoading.value,
          ["loading-color"]: _ctx.loadingColor,
          ["columns-height"]: _ctx.columnsHeight,
          ["value-key"]: _ctx.valueKey,
          ["label-key"]: _ctx.labelKey,
          formatter: _ctx.formatter,
          filter: _ctx.filter,
          ["column-formatter"]: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(_ctx.modelValue) ? customColumnFormatter : void 0,
          ["max-hour"]: _ctx.maxHour,
          ["min-hour"]: _ctx.minHour,
          ["max-date"]: _ctx.maxDate,
          ["min-date"]: _ctx.minDate,
          ["max-minute"]: _ctx.maxMinute,
          ["min-minute"]: _ctx.minMinute,
          ["start-symbol"]: true,
          ["immediate-change"]: _ctx.immediateChange,
          modelValue: innerValue.value
        }),
        V: common_vendor.n(showStart.value ? "wd-picker__show" : "wd-picker__hidden"),
        W: common_vendor.sr(datetimePickerView1, "2a8ca3bd-3,2a8ca3bd-1", {
          "k": "datetimePickerView1"
        }),
        X: common_vendor.o(onChangeEnd),
        Y: common_vendor.o(onPickStart),
        Z: common_vendor.o(onPickEnd),
        aa: common_vendor.o(($event) => endInnerValue.value = $event),
        ab: common_vendor.p({
          ["custom-class"]: _ctx.customViewClass,
          type: _ctx.type,
          loading: _ctx.loading || isLoading.value,
          ["loading-color"]: _ctx.loadingColor,
          ["columns-height"]: _ctx.columnsHeight,
          ["value-key"]: _ctx.valueKey,
          ["label-key"]: _ctx.labelKey,
          formatter: _ctx.formatter,
          filter: _ctx.filter,
          ["column-formatter"]: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isArray)(_ctx.modelValue) ? customColumnFormatter : void 0,
          ["max-hour"]: _ctx.maxHour,
          ["min-hour"]: _ctx.minHour,
          ["max-date"]: _ctx.maxDate,
          ["min-date"]: _ctx.minDate,
          ["max-minute"]: _ctx.maxMinute,
          ["min-minute"]: _ctx.minMinute,
          ["start-symbol"]: false,
          ["immediate-change"]: _ctx.immediateChange,
          modelValue: endInnerValue.value
        }),
        ac: common_vendor.n(showStart.value ? "wd-picker__hidden" : "wd-picker__show"),
        ad: common_vendor.o(onCancel),
        ae: common_vendor.o(($event) => popupShow.value = $event),
        af: common_vendor.p({
          position: "bottom",
          ["hide-when-close"]: false,
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["z-index"]: _ctx.zIndex,
          ["custom-class"]: "wd-picker__popup",
          modelValue: popupShow.value
        }),
        ag: common_vendor.n(`wd-picker ${_ctx.disabled ? "is-disabled" : ""} ${_ctx.size ? "is-" + _ctx.size : ""}  ${common_vendor.unref(cell).border.value ? "is-border" : ""} ${_ctx.alignRight ? "is-align-right" : ""} ${_ctx.error ? "is-error" : ""} ${_ctx.customClass}`),
        ah: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a8ca3bd"]]);
wx.createComponent(Component);
