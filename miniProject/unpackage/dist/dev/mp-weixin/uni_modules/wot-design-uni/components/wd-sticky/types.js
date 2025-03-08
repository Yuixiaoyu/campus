"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const stickyProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(1),
  /**
   * 吸顶距离
   */
  offsetTop: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0)
};
exports.stickyProps = stickyProps;
