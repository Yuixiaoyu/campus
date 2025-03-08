"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const tabProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 唯一标识符
   */
  name: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * tab的标题
   */
  title: String,
  /**
   *  是否禁用，无法点击
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否懒加载，切换到该tab时才加载内容
   * @default true
   */
  lazy: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 徽标属性，透传给 Badge 组件
   */
  badgeProps: Object
};
exports.tabProps = tabProps;
