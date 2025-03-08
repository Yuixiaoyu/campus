"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const tagProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 是否开启图标插槽
   * 类型：boolean
   * 默认值：false
   */
  useIconSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 标签类型
   * 类型：string
   * 可选值：'default' / 'primary' / 'danger' / 'warning' / 'success'
   * 默认值：'default'
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("default"),
  /**
   * 左侧图标
   * 类型：string
   * 默认值：空字符串
   */
  icon: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否可关闭（只对圆角类型支持）
   * 类型：boolean
   * 默认值：false
   */
  closable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 幽灵类型
   * 类型：boolean
   * 默认值：false
   */
  plain: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否为新增标签
   * 类型：boolean
   * 默认值：false
   */
  dynamic: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 文字颜色
   * 类型：string
   * 默认值：空字符串
   */
  color: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 背景色和边框色
   * 类型：string
   * 默认值：空字符串
   */
  bgColor: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 圆角类型
   * 类型：boolean
   * 默认值：false
   */
  round: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 标记类型
   * 类型：boolean
   * 默认值：false
   */
  mark: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.tagProps = tagProps;
