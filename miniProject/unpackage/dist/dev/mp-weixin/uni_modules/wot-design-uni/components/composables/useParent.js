"use strict";
const common_vendor = require("../../../../common/vendor.js");
function useParent(key) {
  const parent = common_vendor.inject(key, null);
  if (parent) {
    const instance = common_vendor.getCurrentInstance();
    const { link, unlink, internalChildren } = parent;
    link(instance);
    common_vendor.onUnmounted(() => unlink(instance));
    const index = common_vendor.computed(() => internalChildren.indexOf(instance));
    return {
      parent,
      index
    };
  }
  return {
    parent: null,
    index: common_vendor.ref(-1)
  };
}
exports.useParent = useParent;
