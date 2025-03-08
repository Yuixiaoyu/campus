"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const loadingProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 加载指示器类型，可选值：'outline' | 'ring'
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("ring"),
  /**
   * 设置加载指示器颜色
   */
  color: uni_modules_wotDesignUni_components_common_props.makeStringProp("#4D80F0"),
  /**
   * 设置加载指示器大小
   */
  size: uni_modules_wotDesignUni_components_common_props.makeNumericProp("")
};
exports.loadingProps = loadingProps;
