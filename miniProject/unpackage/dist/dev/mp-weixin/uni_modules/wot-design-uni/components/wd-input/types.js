"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const inputProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  customInputClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  customLabelClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  // 原生属性
  /**
   * 占位文本
   */
  placeholder: String,
  /**
   * 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight
   */
  placeholderStyle: String,
  /**
   * 原生属性，指定 placeholder 的样式类
   */
  placeholderClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 原生属性，指定光标与键盘的距离。取 input 距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
   */
  cursorSpacing: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 原生属性，指定focus时的光标位置
   */
  cursor: uni_modules_wotDesignUni_components_common_props.makeNumberProp(-1),
  /**
   * 原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: uni_modules_wotDesignUni_components_common_props.makeNumberProp(-1),
  /**
   * 原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: uni_modules_wotDesignUni_components_common_props.makeNumberProp(-1),
  /**
   * 原生属性，键盘弹起时，是否自动上推页面
   */
  adjustPosition: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * focus时，点击页面的时候不收起键盘
   */
  holdKeyboard: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置键盘右下角按钮的文字，仅在type='text'时生效，可选值：done / go / next / search / send
   */
  confirmType: uni_modules_wotDesignUni_components_common_props.makeStringProp("done"),
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 原生属性，获取焦点
   */
  focus: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 类型，可选值：text / number / digit / idcard
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("text"),
  /**
   * 原生属性，最大长度
   */
  maxlength: {
    type: Number,
    default: -1
  },
  /**
   * 原生属性，禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 微信小程序原生属性，强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
   */
  alwaysEmbed: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  // 原生属性结束
  /**
   * 输入框的值靠右展示
   */
  alignRight: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 绑定值
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeNumericProp(""),
  /**
   * 显示为密码框
   */
  showPassword: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 显示清空按钮
   */
  clearable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 只读
   */
  readonly: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 前置图标，icon组件中的图标类名
   */
  prefixIcon: String,
  /**
   * 后置图标，icon组件中的图标类名
   */
  suffixIcon: String,
  /**
   * 显示字数限制，需要同时设置 maxlength
   */
  showWordLimit: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置左侧标题
   */
  label: String,
  /**
   * 设置左侧标题宽度
   */
  labelWidth: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 设置输入框大小，可选值：large
   */
  size: String,
  /**
   * 设置输入框错误状态，错误状态时为红色
   */
  error: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 当有label属性时，设置标题和输入框垂直居中，默认为顶部居中
   */
  center: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 非 cell 类型下是否隐藏下划线
   */
  noBorder: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否必填
   */
  required: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
   * 类型: "focus" | "always"
   * 默认值: "always"
   */
  clearTrigger: uni_modules_wotDesignUni_components_common_props.makeStringProp("always"),
  /**
   * 是否在点击清除按钮时聚焦输入框
   * 类型: boolean
   * 默认值: true
   */
  focusWhenClear: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   * 类型: boolean
   * 默认值: true
   */
  ignoreCompositionEvent: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 它提供了用户在编辑元素或其内容时可能输入的数据类型的提示。在符合条件的高版本webview里，uni-app的web和app-vue平台中可使用本属性。
   * 类型: InputMode
   * 可选值: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | "password"
   * 默认值: "text"
   */
  inputmode: uni_modules_wotDesignUni_components_common_props.makeStringProp("text")
};
exports.inputProps = inputProps;
