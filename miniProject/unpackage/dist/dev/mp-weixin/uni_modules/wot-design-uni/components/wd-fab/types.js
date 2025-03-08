"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const fabProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 是否激活
   */
  active: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 类型，可选值为 default primary info success warning error
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("primary"),
  /**
   * 悬浮按钮位置，可选值为 left-top right-top left-bottom right-bottom
   */
  position: uni_modules_wotDesignUni_components_common_props.makeStringProp("right-bottom"),
  /**
   * 悬浮按钮菜单弹出方向，可选值为 top bottom left right
   */
  direction: uni_modules_wotDesignUni_components_common_props.makeStringProp("top"),
  /**
   * 是否禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 悬浮按钮未展开时的图标
   */
  inactiveIcon: uni_modules_wotDesignUni_components_common_props.makeStringProp("add"),
  /**
   * 悬浮按钮展开时的图标
   */
  activeIcon: uni_modules_wotDesignUni_components_common_props.makeStringProp("close"),
  /**
   * 自定义悬浮按钮层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(99),
  /**
   * 是否可拖动
   */
  draggable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  gap: {
    type: Object,
    default: () => ({})
  },
  /**
   * 用于控制点击时是否展开菜单
   */
  expandable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
exports.fabProps = fabProps;
