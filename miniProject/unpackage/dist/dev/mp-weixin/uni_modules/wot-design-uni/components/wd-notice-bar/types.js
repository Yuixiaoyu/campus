"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const noticeBarProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 设置通知栏文案
   */
  text: {
    type: [String, Array],
    default: ""
  },
  /**
   * 设置通知栏类型，可选值为：'warning' | 'info' | 'danger'
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("warning"),
  /**
   * 是否可滚动
   */
  scrollable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 滚动延迟时间（秒）
   */
  delay: uni_modules_wotDesignUni_components_common_props.makeNumberProp(1),
  /**
   * 滚动速度（px/s）
   */
  speed: uni_modules_wotDesignUni_components_common_props.makeNumberProp(50),
  /**
   * 是否可关闭
   */
  closable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否换行显示
   */
  wrapable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置左侧图标，使用 icon 章节中的图标名
   */
  prefix: String,
  /**
   * 文字、图标颜色
   */
  color: String,
  /**
   * 背景颜色
   */
  backgroundColor: String,
  /**
   * 滚动方向
   */
  direction: uni_modules_wotDesignUni_components_common_props.makeStringProp("horizontal")
};
exports.noticeBarProps = noticeBarProps;
