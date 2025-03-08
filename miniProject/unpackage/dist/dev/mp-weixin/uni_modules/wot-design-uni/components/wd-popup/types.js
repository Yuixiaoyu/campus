"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const popupProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 动画类型，参见 wd-transition 组件的name
   * 类型：string
   * 可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in
   */
  transition: String,
  /**
   * 关闭按钮
   * 类型：boolean
   * 默认值：false
   */
  closable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 弹出框的位置
   * 类型：string
   * 默认值：center
   * 可选值：center / top / right / bottom / left
   */
  position: uni_modules_wotDesignUni_components_common_props.makeStringProp("center"),
  /**
   * 点击遮罩是否关闭
   * 类型：boolean
   * 默认值：true
   */
  closeOnClickModal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 动画持续时间
   * 类型：number | boolean
   * 默认值：300
   */
  duration: {
    type: [Number, Boolean],
    default: 300
  },
  /**
   * 是否显示遮罩
   * 类型：boolean
   * 默认值：true
   */
  modal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 设置层级
   * 类型：number
   * 默认值：10
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(10),
  /**
   * 是否当关闭时将弹出层隐藏（display: none)
   * 类型：boolean
   * 默认值：true
   */
  hideWhenClose: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 遮罩样式
   * 类型：string
   * 默认值：''
   */
  modalStyle: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * 类型：boolean
   * 默认值：false
   */
  safeAreaInsetBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 弹出层是否显示
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型：boolean
   * 默认值：true
   */
  lazyRender: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否锁定滚动
   * 类型：boolean
   * 默认值：true
   */
  lockScroll: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
exports.popupProps = popupProps;
