"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const checkboxProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  customLabelClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  customShapeClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 单选框选中时的值
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
    default: false
  },
  /**
   * 单选框形状，可选值：circle / square / button
   */
  shape: {
    type: String
  },
  /**
   * 选中的颜色
   */
  checkedColor: String,
  /**
   * 禁用
   */
  disabled: {
    type: [Boolean, null],
    default: null
  },
  /**
   * 选中值，在 checkbox-group 中使用无效，需同 false-value 一块使用
   */
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  /**
   * 非选中时的值，在 checkbox-group 中使用无效，需同 true-value 一块使用
   */
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  /**
   * 设置大小，可选值：large
   */
  size: String,
  /**
   * 文字位置最大宽度
   */
  maxWidth: String
};
exports.checkboxProps = checkboxProps;
