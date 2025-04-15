"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const textProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 主题类型
   * 类型：string
   * 可选值：'default' /'primary' / 'error' / 'warning' / 'success'
   * 默认值：'default'
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("default"),
  /**
   * 文字
   * 类型：string | number
   * 默认值：'空字符串'
   */
  text: uni_modules_wotDesignUni_components_common_props.makeNumericProp(""),
  /**
   * 字体大小
   * 类型：string
   * 默认值：'空字符串'
   */
  size: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 文本处理的匹配模式
   * 可选值：'text-普通文本' / 'date - 日期' / 'phone - 手机号' / 'name - 姓名' / 'price - 金额'
   * 类型：string
   * 默认值：'text'
   */
  mode: uni_modules_wotDesignUni_components_common_props.makeStringProp("text"),
  /**
   * 文字装饰，下划线，中划线等
   * 可选值：'underline/line-through/overline'
   * 类型：string
   * 默认值：'none'
   */
  decoration: uni_modules_wotDesignUni_components_common_props.makeStringProp("none"),
  /**
   * mode=phone时，点击文本是否拨打电话
   * 类型：boolean
   * 默认值：false
   */
  call: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否粗体，默认normal
   * 类型：boolean
   * 默认值：false
   */
  bold: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否脱敏,当mode为phone和name时生效
   * 类型：boolean
   * 默认值：false
   */
  format: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 文本颜色
   * 类型：string
   * 默认值：''
   */
  color: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 前置插槽
   * 类型：string
   * 默认值：''
   */
  prefix: String,
  /**
   * 后置插槽
   * 类型：string
   * 默认值：''
   */
  suffix: String,
  /**
   * 文本显示的行数，如果设置，超出此行数，将会显示省略号。最大值为5。
   */
  lines: Number,
  /**
   * 文本行高
   * 类型：string
   * 默认值：''
   */
  lineHeight: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义根节点样式
   */
  customStyle: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义根节点样式类
   */
  customClass: uni_modules_wotDesignUni_components_common_props.makeStringProp("")
};
exports.textProps = textProps;
