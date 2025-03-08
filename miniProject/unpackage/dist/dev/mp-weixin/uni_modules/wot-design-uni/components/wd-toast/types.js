"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const toastProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选择器
   * @type {string}
   * @default ''
   */
  selector: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 提示信息
   * @type {string}
   * @default ''
   */
  msg: {
    type: String,
    default: ""
  },
  /**
   * 排列方向
   * @type {'vertical' | 'horizontal'}
   * @default 'horizontal'
   */
  direction: uni_modules_wotDesignUni_components_common_props.makeStringProp("horizontal"),
  /**
   * 图标名称
   * @type {'success' | 'error' | 'warning' | 'loading' | 'info'}
   * @default ''
   */
  iconName: {
    type: String,
    default: ""
  },
  /**
   * 图标大小
   * @type {number}
   */
  iconSize: Number,
  /**
   * 加载类型
   * @type {'outline' | 'ring'}
   * @default 'outline'
   */
  loadingType: uni_modules_wotDesignUni_components_common_props.makeStringProp("outline"),
  /**
   * 加载颜色
   * @type {string}
   * @default '#4D80F0'
   */
  loadingColor: {
    type: String,
    default: "#4D80F0"
  },
  /**
   * 加载大小
   * @type {number}
   */
  loadingSize: Number,
  /**
   * 图标颜色
   * @type {string}
   */
  iconColor: String,
  /**
   * 位置
   * @type {'top' | 'middle-top' | 'middle' | 'bottom'}
   * @default 'middle-top'
   */
  position: uni_modules_wotDesignUni_components_common_props.makeStringProp("middle-top"),
  /**
   * 层级
   * @type {number}
   * @default 100
   */
  zIndex: {
    type: Number,
    default: 100
  },
  /**
   * 是否存在遮罩层
   * @type {boolean}
   * @default false
   */
  cover: {
    type: Boolean,
    default: false
  },
  /**
   * 图标类名
   * @type {string}
   * @default ''
   */
  iconClass: {
    type: String,
    default: ""
  },
  /**
   * 类名前缀
   * @type {string}
   * @default 'wd-icon'
   */
  classPrefix: {
    type: String,
    default: "wd-icon"
  },
  /**
   * 完全展示后的回调函数
   * @type {Function}
   */
  opened: Function,
  /**
   * 完全关闭时的回调函数
   * @type {Function}
   */
  closed: Function
};
exports.toastProps = toastProps;
