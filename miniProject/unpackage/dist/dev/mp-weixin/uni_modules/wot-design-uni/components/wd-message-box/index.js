"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const messageDefaultOptionKey = "__MESSAGE_OPTION__";
const None = Symbol("None");
const defaultOptions = {
  title: "",
  showCancelButton: false,
  show: false,
  closeOnClickModal: true,
  msg: "",
  type: "alert",
  inputType: "text",
  inputValue: "",
  showErr: false,
  zIndex: 99,
  lazyRender: true,
  inputError: ""
};
function useMessage(selector = "") {
  const messageOptionKey = selector ? messageDefaultOptionKey + selector : messageDefaultOptionKey;
  const messageOption = common_vendor.inject(messageOptionKey, common_vendor.ref(None));
  if (messageOption.value === None) {
    messageOption.value = defaultOptions;
    common_vendor.provide(messageOptionKey, messageOption);
  }
  const createMethod = (type) => {
    return (options) => {
      const messageOptions = uni_modules_wotDesignUni_components_common_util.deepMerge({ type }, typeof options === "string" ? { title: options } : options);
      if (messageOptions.type === "confirm" || messageOptions.type === "prompt") {
        messageOptions.showCancelButton = true;
      } else {
        messageOptions.showCancelButton = false;
      }
      return show(messageOptions);
    };
  };
  const show = (option) => {
    return new Promise((resolve, reject) => {
      const options = uni_modules_wotDesignUni_components_common_util.deepMerge(defaultOptions, typeof option === "string" ? { title: option } : option);
      messageOption.value = uni_modules_wotDesignUni_components_common_util.deepMerge(options, {
        show: true,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  };
  const alert = createMethod("alert");
  const confirm = createMethod("confirm");
  const prompt = createMethod("prompt");
  const close = () => {
    if (messageOption.value !== None) {
      messageOption.value.show = false;
    }
  };
  return {
    show,
    alert,
    confirm,
    prompt,
    close
  };
}
const getMessageDefaultOptionKey = (selector) => {
  return selector ? `${messageDefaultOptionKey}${selector}` : messageDefaultOptionKey;
};
exports.defaultOptions = defaultOptions;
exports.getMessageDefaultOptionKey = getMessageDefaultOptionKey;
exports.useMessage = useMessage;
