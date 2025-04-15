"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const pickerViewProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 加载状态
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
  /**
   * 选项对象中，value对应的 key
   */
  valueKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("value"),
  /**
   * 选项对象中，展示的文本对应的 key
   */
  labelKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("label"),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 选中项，如果为多列选择器，则其类型应为数组
   */
  modelValue: {
    type: [String, Number, Boolean, Array, Array, Array],
    default: "",
    required: true
  },
  /**
   * 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器
   */
  columns: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 setColumnData 方法修改其他列的数据源。
   */
  columnChange: Function
};
function formatArray(array, valueKey, labelKey) {
  let tempArray = uni_modules_wotDesignUni_components_common_util.isArray(array) ? array : [array];
  const firstLevelTypeList = new Set(array.map(uni_modules_wotDesignUni_components_common_util.getType));
  if (firstLevelTypeList.size !== 1 && firstLevelTypeList.has("object")) {
    throw Error("The columns are correct");
  }
  if (!uni_modules_wotDesignUni_components_common_util.isArray(array[0])) {
    tempArray = [tempArray];
  }
  const result = tempArray.map((col) => {
    return col.map((row) => {
      if (!uni_modules_wotDesignUni_components_common_util.isObj(row)) {
        return {
          [valueKey]: row,
          [labelKey]: row
        };
      }
      if (!row.hasOwnProperty(valueKey) && !row.hasOwnProperty(labelKey)) {
        throw Error("Can't find valueKey and labelKey in columns");
      }
      if (!row.hasOwnProperty(labelKey)) {
        row[labelKey] = row[valueKey];
      }
      if (!row.hasOwnProperty(valueKey)) {
        row[valueKey] = row[labelKey];
      }
      return row;
    });
  });
  return result;
}
exports.formatArray = formatArray;
exports.pickerViewProps = pickerViewProps;
