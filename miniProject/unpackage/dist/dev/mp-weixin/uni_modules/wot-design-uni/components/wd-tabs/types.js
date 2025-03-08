"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const TABS_KEY = Symbol("wd-tabs");
const tabsProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 绑定值
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeNumericProp(0),
  /**
   * 标签数超过阈值可滑动
   */
  slidableNum: uni_modules_wotDesignUni_components_common_props.makeNumberProp(6),
  /**
   * 标签数超过阈值显示导航地图
   */
  mapNum: uni_modules_wotDesignUni_components_common_props.makeNumberProp(10),
  /**
   * 导航地图的标题
   */
  mapTitle: String,
  /**
   * 粘性布局
   */
  sticky: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 粘性布局吸顶位置
   */
  offsetTop: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 开启手势滑动
   */
  swipeable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 自动调整底部条宽度，设置了 lineWidth 后无效
   */
  autoLineWidth: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 底部条宽度，单位像素
   */
  lineWidth: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 底部条高度，单位像素
   */
  lineHeight: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 颜色
   */
  color: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 非活动状态颜色
   */
  inactiveColor: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否开启切换标签内容时的过渡动画
   */
  animated: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 切换动画过渡时间，单位毫秒
   */
  duration: uni_modules_wotDesignUni_components_common_props.makeNumberProp(300),
  /**
   * 是否开启滚动导航
   * 可选值：'auto' | 'always'
   * @default auto
   */
  slidable: uni_modules_wotDesignUni_components_common_props.makeStringProp("auto")
};
exports.TABS_KEY = TABS_KEY;
exports.tabsProps = tabsProps;
