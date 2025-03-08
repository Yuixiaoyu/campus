"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const actionSheetProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * header 头部样式
   * @default ''
   * @type {string}
   */
  customHeaderClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 设置菜单显示隐藏
   * @default false
   * @type {boolean}
   */
  modelValue: { ...uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false), ...uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Boolean) },
  /**
   * 菜单选项
   * @default []
   * @type {Action[]}
   */
  actions: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示
   * @default []
   * @type {Array<Panel | Panel[]>}
   */
  panels: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 标题
   * @type {string}
   */
  title: String,
  /**
   * 取消按钮文案
   * @type {string}
   */
  cancelText: String,
  /**
   * 点击选项后是否关闭菜单
   * @default true
   * @type {boolean}
   */
  closeOnClickAction: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 点击遮罩是否关闭
   * @default true
   * @type {boolean}
   */
  closeOnClickModal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 弹框动画持续时间
   * @default 200
   * @type {number}
   */
  duration: uni_modules_wotDesignUni_components_common_props.makeNumberProp(200),
  /**
   * 菜单层级
   * @default 10
   * @type {number}
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(10),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * @default true
   * @type {boolean}
   */
  lazyRender: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * @default true
   * @type {boolean}
   */
  safeAreaInsetBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
exports.actionSheetProps = actionSheetProps;
