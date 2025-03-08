"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const overlayProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 是否展示遮罩层
   */
  show: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 动画时长，单位毫秒
   */
  duration: {
    type: [Object, Number, Boolean],
    default: 300
  },
  /**
   * 是否锁定滚动
   */
  lockScroll: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(10)
};
exports.overlayProps = overlayProps;
