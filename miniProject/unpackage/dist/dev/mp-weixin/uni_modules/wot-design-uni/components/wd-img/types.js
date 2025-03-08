"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const imgProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  customImage: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 图片链接
   */
  src: String,
  /**
   * 是否显示为圆形
   */
  round: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 填充模式：'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill'
   */
  mode: uni_modules_wotDesignUni_components_common_props.makeStringProp("scaleToFill"),
  /**
   * 是否懒加载
   */
  lazyLoad: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 宽度，默认单位为px
   */
  width: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 高度，默认单位为px
   */
  height: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 圆角大小，默认单位为px
   */
  radius: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 是否允许预览
   */
  enablePreview: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效
   */
  showMenuByLongpress: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.imgProps = imgProps;
