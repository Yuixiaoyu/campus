"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const CELL_GROUP_KEY = Symbol("wd-cell-group");
const cellGroupProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 分组标题
   */
  title: String,
  /**
   * 分组右侧内容
   */
  value: String,
  /**
   * 分组启用插槽
   */
  useSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否展示边框线
   */
  border: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.CELL_GROUP_KEY = CELL_GROUP_KEY;
exports.cellGroupProps = cellGroupProps;
