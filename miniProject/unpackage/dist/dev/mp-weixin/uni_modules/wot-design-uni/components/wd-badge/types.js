"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const badgeProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 显示值
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.numericProp,
  /** 当数值为 0 时，是否展示徽标 */
  showZero: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  bgColor: String,
  /**
   * 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
   */
  max: Number,
  /**
   * 是否为红色点状标注
   */
  isDot: Boolean,
  /**
   * 是否隐藏 badge
   */
  hidden: Boolean,
  /**
   * badge类型，可选值primary / success / warning / danger / info
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp(void 0),
  /**
   * 为正时，角标向下偏移对应的像素
   */
  top: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 为正时，角标向左偏移对应的像素
   */
  right: uni_modules_wotDesignUni_components_common_props.numericProp
};
exports.badgeProps = badgeProps;
