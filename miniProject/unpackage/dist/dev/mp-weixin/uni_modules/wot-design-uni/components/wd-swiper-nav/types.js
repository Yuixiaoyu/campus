"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const swiperNavprops = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 当前轮播在哪一项（下标）
   */
  current: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   */
  direction: uni_modules_wotDesignUni_components_common_props.makeStringProp("horizontal"),
  /**
   * 小于这个数字不会显示导航器
   */
  minShowNum: uni_modules_wotDesignUni_components_common_props.makeNumberProp(2),
  /**
   * 指示器位置
   */
  indicatorPosition: uni_modules_wotDesignUni_components_common_props.makeStringProp("bottom"),
  /**
   * 是否显示两侧的控制按钮
   */
  showControls: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 总共的项数
   */
  total: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 指示器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("dots")
};
exports.swiperNavprops = swiperNavprops;
