"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const radioProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /** 选中时的值 */
  value: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([String, Number, Boolean]),
  /** 单选框的形状 */
  shape: String,
  /** 选中的颜色 */
  checkedColor: String,
  /** 禁用 */
  disabled: {
    type: [Boolean, null],
    default: null
  },
  /** 单元格 */
  cell: {
    type: [Boolean, null],
    default: null
  },
  /** 大小 */
  size: String,
  /** 内联 */
  inline: {
    type: [Boolean, null],
    default: null
  },
  /** 最大宽度 */
  maxWidth: String,
  /**
   * 图标位置
   * 可选值: 'left' | 'right' | 'auto'
   */
  iconPlacement: {
    type: String
  }
};
exports.radioProps = radioProps;
