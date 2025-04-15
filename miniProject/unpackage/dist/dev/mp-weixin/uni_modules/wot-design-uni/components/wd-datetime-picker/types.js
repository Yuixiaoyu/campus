"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const datetimePickerProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选择器左侧文案，label可以不传
   */
  label: String,
  /**
   * 选择器占位符
   */
  placeholder: String,
  /**
   * 禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 只读
   */
  readonly: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 加载中
   */
  loading: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写
   */
  loadingColor: uni_modules_wotDesignUni_components_common_props.makeStringProp("#4D80F0"),
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 取消按钮文案
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   */
  confirmButtonText: String,
  /**
   * 是否必填
   */
  required: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 设置选择器大小，可选值：large
   */
  size: String,
  /**
   * 设置左侧标题宽度
   */
  labelWidth: uni_modules_wotDesignUni_components_common_props.makeStringProp("33%"),
  /**
   * 使用默认插槽
   */
  useDefaultSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * label 使用插槽
   */
  useLabelSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否为错误状态，错误状态时右侧内容为红色
   */
  error: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 选择器的值靠右展示
   */
  alignRight: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否超出隐藏
   */
  ellipsis: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * picker内部滚筒高
   */
  columnsHeight: uni_modules_wotDesignUni_components_common_props.makeNumberProp(217),
  valueKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("value"),
  labelKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("label"),
  /**
   * 选中项，当 type 为 time 时，类型为字符串；当 type 为 Array 时，类型为范围选择；否则为 时间戳
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([String, Number, Array]),
  /**
   * 选择器类型，可选值为：date / year-month / time
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("datetime"),
  /**
   * 最小日期
   */
  minDate: uni_modules_wotDesignUni_components_common_props.makeNumberProp(new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime()),
  /**
   * 最大日期
   */
  maxDate: uni_modules_wotDesignUni_components_common_props.makeNumberProp(new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 11, 31, 23, 59, 59).getTime()),
  /**
   * 最小小时，time类型时生效
   */
  minHour: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 最大小时，time类型时生效
   */
  maxHour: uni_modules_wotDesignUni_components_common_props.makeNumberProp(23),
  /**
   * 最小分钟，time类型时生效
   */
  minMinute: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 最大分钟，time类型时生效
   */
  maxMinute: uni_modules_wotDesignUni_components_common_props.makeNumberProp(59),
  /**
   * 自定义过滤选项的函数，返回列的选项数组
   */
  filter: Function,
  /**
   * 自定义弹出层选项文案的格式化函数，返回一个字符串
   */
  formatter: Function,
  /**
   * 自定义展示文案的格式化函数，返回一个字符串
   */
  displayFormat: Function,
  /**
   * 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数
   */
  beforeConfirm: Function,
  /**
   * 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串
   */
  displayFormatTabLabel: Function,
  /**
   * 默认日期，类型保持与 value 一致，打开面板时面板自动选到默认日期
   */
  defaultValue: [String, Number, Array],
  /**
   * 弹窗层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(15),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * picker cell 外部自定义样式
   */
  customCellClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * pickerView 外部自定义样式
   */
  customViewClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * label 外部自定义样式
   */
  customLabelClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * value 外部自定义样式
   */
  customValueClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.datetimePickerProps = datetimePickerProps;
