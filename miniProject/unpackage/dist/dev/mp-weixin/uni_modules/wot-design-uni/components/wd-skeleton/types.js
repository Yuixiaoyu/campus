"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const skeletonProps = {
  /**
   * 骨架图风格，有基础、头像组合等两大类
   */
  theme: uni_modules_wotDesignUni_components_common_props.makeStringProp("text"),
  /**
   * 用于设置行列数量、宽度高度、间距等。
   * @example
   * 【示例一】，`[1, 1, 2]` 表示输出三行骨架图，第一行一列，第二行一列，第三行两列。
   * 【示例二】，`[1, 1, { width: '100px' }]` 表示自定义第三行的宽度为 `100px`。
   * 【示例三】，`[1, 2, [{ width, height }, { width, height, marginLeft }]]` 表示第三行有两列，且自定义宽度、高度和间距
   */
  rowCol: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 是否为加载状态，如果是则显示骨架图，如果不是则显示加载完成的内容
   * @default true
   */
  loading: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 动画效果，有「渐变加载动画」和「闪烁加载动画」两种。值为空则表示没有动画
   */
  animation: {
    type: String,
    default: ""
  },
  // 自定义类名
  customClass: {
    type: [String, Array, Object],
    default: ""
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default() {
      return {};
    }
  }
};
exports.skeletonProps = skeletonProps;
