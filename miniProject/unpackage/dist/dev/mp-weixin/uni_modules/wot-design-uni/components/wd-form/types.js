"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const FORM_KEY = Symbol("wd-form");
const formProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 表单数据对象
   */
  model: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Object),
  /**
   * 表单验证规则
   */
  rules: {
    type: Object,
    default: () => ({})
  },
  /**
   * 是否在输入时重置表单校验信息
   */
  resetOnChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 错误提示类型
   */
  errorType: {
    type: String,
    default: "message"
  }
};
exports.FORM_KEY = FORM_KEY;
exports.formProps = formProps;
