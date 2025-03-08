"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const switchProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 绑定值
   */
  modelValue: {
    type: [Boolean, String, Number],
    required: true,
    default: false
  },
  /**
   * 是否禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 激活值
   */
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  /**
   * 非激活值
   */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /**
   * 激活颜色
   */
  activeColor: String,
  /**
   * 非激活颜色
   */
  inactiveColor: String,
  /**
   * 大小
   */
  size: {
    type: uni_modules_wotDesignUni_components_common_props.numericProp
  },
  /**
   * 在改变前执行的函数
   */
  beforeChange: Function
};
exports.switchProps = switchProps;
