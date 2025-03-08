"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
function useRaf(callback) {
  const requestRef = common_vendor.ref(null);
  const start = () => {
    const handle = (time) => {
      callback(time);
    };
    if (uni_modules_wotDesignUni_components_common_util.isH5) {
      requestRef.value = requestAnimationFrame(handle);
    } else {
      requestRef.value = setTimeout(() => handle(Date.now()), 1e3 / 30);
    }
  };
  const cancel = () => {
    if (uni_modules_wotDesignUni_components_common_util.isH5 && uni_modules_wotDesignUni_components_common_util.isNumber(requestRef.value)) {
      cancelAnimationFrame(requestRef.value);
    } else if (uni_modules_wotDesignUni_components_common_util.isDef(requestRef.value)) {
      clearTimeout(requestRef.value);
    }
  };
  common_vendor.onUnmounted(() => {
    cancel();
  });
  return { start, cancel };
}
exports.useRaf = useRaf;
