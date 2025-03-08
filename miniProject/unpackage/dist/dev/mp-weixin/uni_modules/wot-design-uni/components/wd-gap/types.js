"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const gapProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 背景颜色
   */
  bgColor: uni_modules_wotDesignUni_components_common_props.makeStringProp("transparent"),
  /**
   * 是否开启底部安全区
   */
  safeAreaBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 高度
   */
  height: uni_modules_wotDesignUni_components_common_props.makeNumericProp(15)
};
exports.gapProps = gapProps;
