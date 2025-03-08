"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const cellProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 标题
   */
  title: String,
  /**
   * 右侧内容
   */
  value: uni_modules_wotDesignUni_components_common_props.makeNumericProp(""),
  /**
   * 图标类名
   */
  icon: String,
  /**
   * 描述信息
   */
  label: String,
  /**
   * 是否为跳转链接
   */
  isLink: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 跳转地址
   */
  to: String,
  /**
   * 跳转时是否替换栈顶页面
   */
  replace: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 开启点击反馈，is-link 默认开启
   */
  clickable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置单元格大小，可选值：large
   */
  size: String,
  /**
   * 是否展示边框线
   */
  border: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(void 0),
  /**
   * 设置左侧标题宽度
   */
  titleWidth: String,
  /**
   * 是否垂直居中，默认顶部居中
   */
  center: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否必填
   */
  required: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 表单属性，上下结构
   */
  vertical: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * icon 使用 slot 时的自定义样式
   */
  customIconClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * label 使用 slot 时的自定义样式
   */
  customLabelClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * value 使用 slot 时的自定义样式
   */
  customValueClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * title 使用 slot 时的自定义样式
   */
  customTitleClass: uni_modules_wotDesignUni_components_common_props.makeStringProp("")
};
exports.cellProps = cellProps;
