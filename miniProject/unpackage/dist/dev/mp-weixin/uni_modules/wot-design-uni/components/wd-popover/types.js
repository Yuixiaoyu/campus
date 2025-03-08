"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const popoverProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  customArrow: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  customPop: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否显示 popover 箭头
   */
  visibleArrow: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 显示的内容，也可以通过 slot#content 传入
   */
  content: [String, Object],
  /**
   * 指定 popover 的放置位置：top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
   */
  placement: uni_modules_wotDesignUni_components_common_props.makeStringProp("bottom"),
  /**
   * 偏移量
   */
  offset: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 是否使用内容插槽
   */
  useContentSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否禁用 popover
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否显示关闭按钮
   */
  showClose: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 控制 popover 的显示状态
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 当前显示的模式，决定内容的展现形式，可选值：normal（普通模式）/ menu（菜单模式）
   */
  mode: uni_modules_wotDesignUni_components_common_props.makeStringProp("normal")
};
exports.popoverProps = popoverProps;
