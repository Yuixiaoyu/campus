"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const navbarProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 标题文字
   */
  title: String,
  /**
   * 左侧文案
   */
  leftText: String,
  /**
   * 右侧文案
   */
  rightText: String,
  /**
   * 是否显示左侧箭头
   */
  leftArrow: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否显示下边框
   */
  bordered: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否固定到顶部
   */
  fixed: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 固定在顶部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 导航栏 z-index
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(500),
  /**
   * 是否开启顶部安全区适配
   */
  safeAreaInsetTop: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否禁用左侧按钮，禁用时透明度降低，且无法点击
   */
  leftDisabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否禁用右侧按钮，禁用时透明度降低，且无法点击
   */
  rightDisabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.navbarProps = navbarProps;
