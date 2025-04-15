"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const swiperProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 是否自动播放轮播图
   * 类型：boolean
   * 默认值：true
   */
  autoplay: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 当前轮播在哪一项（下标）
   * 类型：number
   * 默认值：0
   */
  current: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 轮播滑动方向，可选值：'horizontal'（水平）或'vertical'（垂直）
   * 类型：string
   * 默认值：'horizontal'
   */
  direction: uni_modules_wotDesignUni_components_common_props.makeStringProp("horizontal"),
  /**
   * 同时显示的滑块数量
   * 类型：number
   * 默认值：1
   */
  displayMultipleItems: uni_modules_wotDesignUni_components_common_props.makeNumberProp(1),
  /**
   * 滑动动画时长，单位为毫秒
   * 类型：number
   * 默认值：300
   */
  duration: uni_modules_wotDesignUni_components_common_props.makeNumberProp(300),
  /**
   * 指定 swiper 切换缓动动画类型
   * 类型：string
   * 默认值：'default'
   */
  easingFunction: uni_modules_wotDesignUni_components_common_props.makeStringProp("default"),
  /**
   * 轮播的高度
   * 类型：number 或 string（数字或可转换为数字的字符串）
   * 默认值：'192'
   */
  height: uni_modules_wotDesignUni_components_common_props.makeNumericProp("192"),
  /**
   * 轮播间隔时间，单位为毫秒
   * 类型：number
   * 默认值：5000
   */
  interval: uni_modules_wotDesignUni_components_common_props.makeNumberProp(5e3),
  /**
   * 图片列表，可以是一个图片对象数组或字符串数组
   * 类型：array
   * 默认值：空数组
   */
  list: {
    type: Array,
    default: () => []
  },
  /**
   * 是否循环播放轮播图
   * 类型：boolean
   * 默认值：true
   */
  loop: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 视频是否循环播放
   * 类型：boolean
   * 默认值：true
   */
  videoLoop: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 视频是否静音播放
   * 类型：boolean
   * 默认值：true
   */
  muted: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 后边距
   * 类型：number 或 string（数字或可转换为数字的字符串）
   * 默认值：'0'
   */
  nextMargin: uni_modules_wotDesignUni_components_common_props.makeNumericProp("0"),
  /**
   * 页码信息展示位置，可选值：'left' | 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'right'
   * 类型：string
   * 默认值：'bottom'
   */
  indicatorPosition: uni_modules_wotDesignUni_components_common_props.makeStringProp("bottom"),
  /**
   * 前边距
   * 类型：number 或 string（数字或可转换为数字的字符串）
   * 默认值：'0'
   */
  previousMargin: uni_modules_wotDesignUni_components_common_props.makeNumericProp("0"),
  /**
   * 是否应用边距到第一个、最后一个元素
   * 类型：boolean
   * 默认值：false
   */
  snapToEdge: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 指示器全部配置，可以是布尔值或指示器配置对象
   * 类型：boolean 或 object
   * 默认值：true
   */
  indicator: {
    type: [Boolean, Object],
    default: true
  },
  /**
   * 图片裁剪、缩放的模式
   * 类型：string
   * 默认值：'aspectFill'
   */
  imageMode: uni_modules_wotDesignUni_components_common_props.makeStringProp("aspectFill"),
  /**
   * 选项对象中，value 对应的 key
   */
  valueKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("value"),
  /**
   * 选项对象中，标题 text 对应的 key
   */
  textKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("text"),
  /**
   * 视频是否自动播放
   * 类型：boolean
   * 默认值：true
   */
  autoplayVideo: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 切换轮播项时是否停止上一个视频的播放
   * 类型：boolean
   * 默认值：true
   */
  stopPreviousVideo: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 视频播放时是否停止自动轮播
   * 类型：boolean
   * 默认值：false
   */
  stopAutoplayWhenVideoPlay: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 自动以指定滑块的高度为整个容器的高度。当 vertical 为 true 时，默认不调整
   * 仅支付宝小程序支持
   * 类型：'first' | 'current' | 'highest' | 'none'
   * 默认值：false
   */
  adjustHeight: uni_modules_wotDesignUni_components_common_props.makeStringProp("highest"),
  /**
   * vertical 为 true 时强制使 adjust-height 生效。
   * 仅支付宝小程序支持
   * 类型：boolean
   * 默认值：false
   */
  adjustVerticalHeight: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 自定义指示器类名
   * 类型：string
   */
  customIndicatorClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义图片类名
   * 类型：string
   */
  customImageClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义上一个图片类名
   * 类型：string
   */
  customPrevImageClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义下一个图片类名
   * 类型：string
   */
  customNextImageClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义swiper子项类名
   * 类型：string
   */
  customItemClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义上一个子项类名
   * 类型：string
   */
  customPrevClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义下一个子项类名
   * 类型：string
   */
  customNextClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义文字标题类名
   * 类型：string
   */
  customTextClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义文字标题样式
   * 类型：string
   */
  customTextStyle: uni_modules_wotDesignUni_components_common_props.makeStringProp("")
};
exports.swiperProps = swiperProps;
