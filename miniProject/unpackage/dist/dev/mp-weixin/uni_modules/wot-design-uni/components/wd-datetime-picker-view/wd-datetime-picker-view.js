"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdDatetimePickerView_types = require("./types.js");
if (!Math) {
  wdPickerView();
}
const wdPickerView = () => "../wd-picker-view/wd-picker-view.js";
const __default__ = {
  name: "wd-datetime-picker-view",
  virtualHost: true,
  addGlobalClass: true,
  styleIsolation: "shared"
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdDatetimePickerView_types.datetimePickerViewProps,
  emits: ["change", "pickstart", "pickend", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const isValidDate = (date) => uni_modules_wotDesignUni_components_common_util.isDef(date) && !Number.isNaN(date);
    const times = (n, iteratee) => {
      let index = -1;
      const length = n < 0 ? 0 : n;
      const result = Array(length);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    };
    const getMonthEndDay = (year, month) => {
      return 32 - new Date(year, month - 1, 32).getDate();
    };
    const props = __props;
    const emit = __emit;
    const datePickerview = common_vendor.ref();
    const innerValue = common_vendor.ref(null);
    const columns = common_vendor.ref([]);
    const pickerValue = common_vendor.ref([]);
    const created = common_vendor.ref(false);
    const { proxy } = common_vendor.getCurrentInstance();
    __expose({
      updateColumns,
      setColumns,
      getSelects,
      correctValue,
      getPickerValue: uni_modules_wotDesignUni_components_wdDatetimePickerView_types.getPickerValue,
      getOriginColumns,
      ...props
    });
    const updateValue = uni_modules_wotDesignUni_components_common_util.debounce(() => {
      if (!created.value)
        return;
      const val = correctValue(props.modelValue);
      const isEqual = val === innerValue.value;
      if (!isEqual) {
        updateColumnValue(val);
      } else {
        columns.value = updateColumns();
      }
    }, 50);
    common_vendor.watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (val === oldVal)
          return;
        const value = correctValue(val);
        updateColumnValue(value);
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.type,
      (target) => {
        const type = ["date", "year-month", "time", "datetime", "year"];
        if (type.indexOf(target) === -1) {
          console.error(`type must be one of ${type}`);
        }
        updateValue();
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.filter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of filter must be Function");
        }
        updateValue();
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.formatter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of formatter must be Function");
        }
        updateValue();
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      () => props.columnFormatter,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of columnFormatter must be Function");
        }
        updateValue();
      },
      { deep: true, immediate: true }
    );
    common_vendor.watch(
      [
        () => props.minDate,
        () => props.maxDate,
        () => props.minHour,
        () => props.maxHour,
        () => props.minMinute,
        () => props.minMinute,
        () => props.maxMinute
      ],
      () => {
        updateValue();
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.onBeforeMount(() => {
      created.value = true;
      const innerValue2 = correctValue(props.modelValue);
      updateColumnValue(innerValue2);
    });
    function onChange({ value }) {
      pickerValue.value = value;
      const result = updateInnerValue();
      emit("update:modelValue", result);
      emit("change", {
        value: result,
        picker: proxy.$.exposed
      });
    }
    function updateColumns() {
      const { formatter, columnFormatter } = props;
      if (columnFormatter) {
        return columnFormatter(proxy.$.exposed);
      } else {
        return getOriginColumns().map((column) => {
          return column.values.map((value) => {
            return {
              label: formatter ? formatter(column.type, uni_modules_wotDesignUni_components_common_util.padZero(value)) : uni_modules_wotDesignUni_components_common_util.padZero(value),
              value
            };
          });
        });
      }
    }
    function setColumns(columnList) {
      columns.value = columnList;
    }
    function getOriginColumns() {
      const { filter } = props;
      return getRanges().map(({ type, range: range2 }) => {
        let values = times(range2[1] - range2[0] + 1, (index) => {
          return range2[0] + index;
        });
        if (filter) {
          values = filter(type, values);
        }
        return {
          type,
          values
        };
      });
    }
    function getRanges() {
      if (props.type === "time") {
        return [
          {
            type: "hour",
            range: [props.minHour, props.maxHour]
          },
          {
            type: "minute",
            range: [props.minMinute, props.maxMinute]
          }
        ];
      }
      const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary("max", innerValue.value);
      const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary("min", innerValue.value);
      const result = [
        {
          type: "year",
          range: [minYear, maxYear]
        },
        {
          type: "month",
          range: [minMonth, maxMonth]
        },
        {
          type: "date",
          range: [minDate, maxDate]
        },
        {
          type: "hour",
          range: [minHour, maxHour]
        },
        {
          type: "minute",
          range: [minMinute, maxMinute]
        }
      ];
      if (props.type === "date")
        result.splice(3, 2);
      if (props.type === "year-month")
        result.splice(2, 3);
      if (props.type === "year")
        result.splice(1, 4);
      return result;
    }
    function correctValue(value) {
      const isDateType = props.type !== "time";
      if (isDateType && !isValidDate(value)) {
        value = props.minDate;
      } else if (!isDateType && !value) {
        value = `${uni_modules_wotDesignUni_components_common_util.padZero(props.minHour)}:00`;
      }
      if (!isDateType) {
        let [hour, minute] = value.split(":");
        hour = uni_modules_wotDesignUni_components_common_util.padZero(uni_modules_wotDesignUni_components_common_util.range(Number(hour), props.minHour, props.maxHour));
        minute = uni_modules_wotDesignUni_components_common_util.padZero(uni_modules_wotDesignUni_components_common_util.range(Number(minute), props.minMinute, props.maxMinute));
        return `${hour}:${minute}`;
      }
      value = Math.min(Math.max(Number(value), props.minDate), props.maxDate);
      return value;
    }
    function getBoundary(type, innerValue2) {
      const value = new Date(innerValue2);
      const boundary = new Date(props[`${type}Date`]);
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }
      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    }
    function updateColumnValue(value) {
      const values = uni_modules_wotDesignUni_components_wdDatetimePickerView_types.getPickerValue(value, props.type);
      if (props.modelValue !== value) {
        emit("update:modelValue", value);
        emit("change", {
          value,
          picker: proxy.$.exposed
        });
      }
      innerValue.value = value;
      columns.value = updateColumns();
      pickerValue.value = values;
    }
    function updateInnerValue() {
      var _a;
      const { type } = props;
      let innerValue2 = "";
      const pickerVal = ((_a = datePickerview.value) == null ? void 0 : _a.getValues()) || [];
      const values = uni_modules_wotDesignUni_components_common_util.isArray(pickerVal) ? pickerVal : [pickerVal];
      if (type === "time") {
        innerValue2 = `${uni_modules_wotDesignUni_components_common_util.padZero(values[0])}:${uni_modules_wotDesignUni_components_common_util.padZero(values[1])}`;
        return innerValue2;
      }
      const year = values[0] && parseInt(values[0]);
      const month = type === "year" ? 1 : values[1] && parseInt(values[1]);
      const maxDate = getMonthEndDay(Number(year), Number(month));
      let date = 1;
      if (type !== "year-month" && type !== "year") {
        date = (Number(values[2]) && parseInt(String(values[2]))) > maxDate ? maxDate : values[2] && parseInt(String(values[2]));
      }
      let hour = 0;
      let minute = 0;
      if (type === "datetime") {
        hour = Number(values[3]) && parseInt(values[3]);
        minute = Number(values[4]) && parseInt(values[4]);
      }
      const value = new Date(Number(year), Number(month) - 1, Number(date), hour, minute).getTime();
      innerValue2 = correctValue(value);
      return innerValue2;
    }
    function columnChange(picker) {
      if (props.type === "time" || props.type === "year-month" || props.type === "year") {
        return;
      }
      const values = picker.getValues();
      const year = Number(values[0]);
      const month = Number(values[1]);
      const maxDate = getMonthEndDay(year, month);
      let date = Number(values[2]);
      date = date > maxDate ? maxDate : date;
      let hour = 0;
      let minute = 0;
      if (props.type === "datetime") {
        hour = Number(values[3]);
        minute = Number(values[4]);
      }
      const value = new Date(year, month - 1, date, hour, minute).getTime();
      innerValue.value = correctValue(value);
      const newColumns = updateColumns();
      const selectedIndex = picker.getSelectedIndex().slice(0);
      newColumns.forEach((_columns, index) => {
        const nextColumnIndex = index + 1;
        const nextColumnData = newColumns[nextColumnIndex];
        if (nextColumnIndex > newColumns.length - 1)
          return;
        picker.setColumnData(
          nextColumnIndex,
          nextColumnData,
          selectedIndex[nextColumnIndex] <= nextColumnData.length - 1 ? selectedIndex[nextColumnIndex] : 0
        );
      });
    }
    function onPickStart() {
      emit("pickstart");
    }
    function onPickEnd() {
      emit("pickend");
    }
    function getSelects() {
      var _a;
      const pickerVal = (_a = datePickerview.value) == null ? void 0 : _a.getSelects();
      if (pickerVal == null)
        return void 0;
      if (uni_modules_wotDesignUni_components_common_util.isArray(pickerVal))
        return pickerVal;
      return [pickerVal];
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(datePickerview, "db34fecd-0", {
          "k": "datePickerview"
        }),
        b: common_vendor.o(onChange),
        c: common_vendor.o(onPickStart),
        d: common_vendor.o(onPickEnd),
        e: common_vendor.o(($event) => pickerValue.value = $event),
        f: common_vendor.p({
          ["custom-class"]: _ctx.customClass,
          ["custom-style"]: _ctx.customStyle,
          ["immediate-change"]: _ctx.immediateChange,
          columns: columns.value,
          ["columns-height"]: _ctx.columnsHeight,
          columnChange,
          loading: _ctx.loading,
          ["loading-color"]: _ctx.loadingColor,
          modelValue: pickerValue.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-db34fecd"]]);
wx.createComponent(Component);
