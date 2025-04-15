"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const RADIO_GROUP_KEY = Symbol("wd-radio-group");
const radioGroupProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /** 会自动选中value对应的单选框 */
  modelValue: [String, Number, Boolean],
  /** 单选框形状，可选值为 dot / button / check，默认为 check */
  shape: uni_modules_wotDesignUni_components_common_props.makeStringProp("check"),
  /** 选中的颜色，默认为 #4D80F0 */
  checkedColor: String,
  /** 是否禁用，默认为 false */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /** 表单模式，默认为 false */
  cell: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /** 设置大小，默认为空 */
  size: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /** 同行展示，默认为 false */
  inline: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /** 图标位置，默认为 left */
  iconPlacement: uni_modules_wotDesignUni_components_common_props.makeStringProp("auto")
};
exports.RADIO_GROUP_KEY = RADIO_GROUP_KEY;
exports.radioGroupProps = radioGroupProps;
