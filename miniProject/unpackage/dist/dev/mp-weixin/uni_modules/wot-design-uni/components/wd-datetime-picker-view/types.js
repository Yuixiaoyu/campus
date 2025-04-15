"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
function getPickerValue(value, type) {
  const values = [];
  const date = new Date(value);
  if (type === "time") {
    const pair = String(value).split(":");
    values.push(parseInt(pair[0]), parseInt(pair[1]));
  } else {
    values.push(date.getFullYear(), date.getMonth() + 1);
    if (type === "date") {
      values.push(date.getDate());
    } else if (type === "datetime") {
      values.push(date.getDate(), date.getHours(), date.getMinutes());
    }
  }
  return values;
}
const datetimePickerViewProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([String, Number]),
  /**
   * 加载中
   */
  loading: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写
   */
  loadingColor: uni_modules_wotDesignUni_components_common_props.makeStringProp("#4D80F0"),
  /**
   * picker内部滚筒高
   */
  columnsHeight: uni_modules_wotDesignUni_components_common_props.makeNumberProp(217),
  valueKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("value"),
  labelKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("label"),
  /**
   * 选择器类型，可选值：date / year-month / time
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("datetime"),
  /**
   * 自定义过滤选项的函数，返回列的选项数组
   */
  filter: Function,
  /**
   * 自定义弹出层选项文案的格式化函数，返回一个字符串
   */
  formatter: Function,
  /**
   * 自定义列的格式化函数
   */
  columnFormatter: Function,
  /**
   * 最小日期
   */
  minDate: uni_modules_wotDesignUni_components_common_props.makeNumberProp(new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime()),
  /**
   * 最大日期
   */
  maxDate: uni_modules_wotDesignUni_components_common_props.makeNumberProp(new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 11, 31).getTime()),
  /**
   * 最小小时，time类型时生效
   */
  minHour: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 最大小时，time类型时生效
   */
  maxHour: uni_modules_wotDesignUni_components_common_props.makeNumberProp(23),
  /**
   * 最小分钟，time类型时生效
   */
  minMinute: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 最大分钟，time类型时生效
   */
  maxMinute: uni_modules_wotDesignUni_components_common_props.makeNumberProp(59),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  startSymbol: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.datetimePickerViewProps = datetimePickerViewProps;
exports.getPickerValue = getPickerValue;
