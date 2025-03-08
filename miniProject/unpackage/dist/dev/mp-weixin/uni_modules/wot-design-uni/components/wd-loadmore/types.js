"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const loadmoreProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 加载状态，可选值：'loading' | 'error' | 'finished'
   */
  state: String,
  /**
   * 加载提示文案
   */
  loadingText: String,
  /**
   * 全部加载完的提示文案
   */
  finishedText: String,
  /**
   * 加载失败的提示文案
   */
  errorText: String,
  /**
   * 加载中loading组件的属性
   * 参考loading组件
   */
  loadingProps: Object
};
exports.loadmoreProps = loadmoreProps;
