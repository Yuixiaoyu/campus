"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const CHECKBOX_GROUP_KEY = Symbol("wd-checkbox-group");
const checkboxGroupProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 绑定值
   */
  modelValue: {
    type: Array,
    default: () => []
  },
  /**
   * 表单模式
   */
  cell: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 单选框形状，可选值：circle / square / button
   */
  shape: uni_modules_wotDesignUni_components_common_props.makeStringProp("circle"),
  /**
   * 选中的颜色
   */
  checkedColor: String,
  /**
   * 禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 最小选中的数量
   */
  min: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 最大选中的数量，0 为无限数量，默认为 0
   */
  max: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 同行展示
   */
  inline: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置大小，可选值：large
   */
  size: String
};
exports.CHECKBOX_GROUP_KEY = CHECKBOX_GROUP_KEY;
exports.checkboxGroupProps = checkboxGroupProps;
