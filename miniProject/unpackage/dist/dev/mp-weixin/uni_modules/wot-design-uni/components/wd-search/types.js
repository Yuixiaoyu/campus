"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const searchProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  customInputClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 输入框内容，双向绑定
   * 类型: string
   * 默认值: ''
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否使用输入框右侧插槽
   * 类型: boolean
   * 默认值: false
   * @deprecated 该属性已废弃，将在下一个minor版本被移除，直接使用插槽即可
   */
  useSuffixSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 搜索框占位文本
   * 类型: string
   */
  placeholder: String,
  /**
   * 搜索框右侧文本
   * 类型: string
   */
  cancelTxt: String,
  /**
   * 搜索框亮色（白色）
   * 类型: boolean
   * 默认值: false
   */
  light: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否隐藏右侧文本
   * 类型: boolean
   * 默认值: false
   */
  hideCancel: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否禁用搜索框
   * 类型: boolean
   * 默认值: false
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 原生属性，设置最大长度。-1 表示无限制
   * 类型: string / number
   * 默认值: -1
   */
  maxlength: uni_modules_wotDesignUni_components_common_props.makeNumberProp(-1),
  /**
   * placeholder 居左边
   * 类型: boolean
   * 默认值: false
   */
  placeholderLeft: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否自动聚焦
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.63
   */
  focus: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否在点击清除按钮时聚焦输入框
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.63
   */
  focusWhenClear: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight
   */
  placeholderStyle: String,
  /**
   * 原生属性，指定 placeholder 的样式类
   */
  placeholderClass: uni_modules_wotDesignUni_components_common_props.makeStringProp("")
};
exports.searchProps = searchProps;
