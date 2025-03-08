"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const dividerProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 自定义颜色
   */
  color: String,
  /**
   * 内容位置，可选值为 `left` `right` `center`
   * 默认值：`center`
   */
  contentPosition: uni_modules_wotDesignUni_components_common_props.makeStringProp("center"),
  /**
   * 是否显示为虚线
   * 默认值：`false`
   */
  dashed: Boolean,
  /**
   * 是否为垂直分割线
   * 默认值：`false`
   */
  vertical: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否显示为 0.5px 的线
   * 默认值：`true`
   */
  hairline: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
exports.dividerProps = dividerProps;
