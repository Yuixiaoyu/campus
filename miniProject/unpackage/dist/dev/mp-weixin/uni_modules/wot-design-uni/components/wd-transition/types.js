"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const transitionProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 是否展示组件
   * 类型：boolean
   * 默认值：false
   */
  show: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 动画执行时间
   * 类型：number | boolean | Record<string, number>
   * 默认值：300 (毫秒)
   */
  duration: {
    type: [Object, Number, Boolean],
    default: 300
  },
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型：boolean
   * 默认值：false
   */
  lazyRender: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 动画类型
   * 类型：string
   * 可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in
   * 默认值：'fade'
   */
  name: [String, Array],
  /**
   * 是否在动画结束时销毁子节点（display: none)
   * 类型：boolean
   * 默认值：false
   */
  destroy: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 进入过渡的开始状态
   * 类型：string
   */
  enterClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 进入过渡的激活状态
   * 类型：string
   */
  enterActiveClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 进入过渡的结束状态
   * 类型：string
   */
  enterToClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 离开过渡的开始状态
   * 类型：string
   */
  leaveClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 离开过渡的激活状态
   * 类型：string
   */
  leaveActiveClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 离开过渡的结束状态
   * 类型：string
   */
  leaveToClass: uni_modules_wotDesignUni_components_common_props.makeStringProp("")
};
exports.transitionProps = transitionProps;
