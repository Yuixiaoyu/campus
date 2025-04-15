"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const segmentedProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 当前选中的值
   * 类型: string | number
   * 最低版本: 0.1.23
   */
  value: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([String, Number]),
  /**
   * 是否禁用分段器
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.23
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 控件尺寸
   * 类型: string
   * 可选值: 'large' | 'middle' | 'small'
   * 默认值: 'middle'
   * 最低版本: 0.1.23
   */
  size: uni_modules_wotDesignUni_components_common_props.makeStringProp("middle"),
  /**
   * 数据集合
   * 类型: string[] | number[] | SegmentedOption[]
   * 必需: 是
   * 默认值: []
   * 最低版本: 0.1.23
   */
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  /**
   * 切换选项时是否振动
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.23
   */
  vibrateShort: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.segmentedProps = segmentedProps;
