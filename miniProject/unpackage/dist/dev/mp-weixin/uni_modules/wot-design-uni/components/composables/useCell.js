"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("./useParent.js");
const uni_modules_wotDesignUni_components_wdCellGroup_types = require("../wd-cell-group/types.js");
function useCell() {
  const { parent: cellGroup, index } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdCellGroup_types.CELL_GROUP_KEY);
  const border = common_vendor.computed(() => {
    return cellGroup && cellGroup.props.border && index.value;
  });
  return { border };
}
exports.useCell = useCell;
