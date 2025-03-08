"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const statusTipProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 缺省图片类型，支持传入图片 URL。
   * 类型: string
   * 可选值: search, network, content, collect, comment, halo, message
   * 默认值: network
   */
  image: uni_modules_wotDesignUni_components_common_props.makeStringProp("network"),
  /**
   * 图片大小，默认单位为 `px`。
   * 类型: string 或 number 或 ImageSize
   * 默认值: 空字符串
   */
  imageSize: {
    type: [String, Number, Object],
    default: ""
  },
  /**
   * 提示文案。
   * 类型: string
   * 默认值: 空字符串
   */
  tip: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 图片裁剪、缩放的模式
   * 类型：string
   * 默认值：'aspectFill'
   */
  imageMode: uni_modules_wotDesignUni_components_common_props.makeStringProp("aspectFill"),
  /**
   * 图片路径前缀，指向图片所在目录，用于拼接图片 URL。推荐将图片放到自己的服务器上，并设置此属性。
   * 类型: string
   * 默认值: https://registry.npmmirror.com/wot-design-uni-assets/*\/files/
   */
  urlPrefix: uni_modules_wotDesignUni_components_common_props.makeStringProp("https://registry.npmmirror.com/wot-design-uni-assets/*/files/")
};
exports.statusTipProps = statusTipProps;
