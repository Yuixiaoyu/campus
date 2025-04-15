"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdMessageBox_types = require("./types.js");
const uni_modules_wotDesignUni_components_wdMessageBox_index = require("./index.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
if (!Math) {
  (wdInput + wdButton + wdPopup)();
}
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdButton = () => "../wd-button/wd-button.js";
const wdInput = () => "../wd-input/wd-input.js";
const __default__ = {
  name: "wd-message-box",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdMessageBox_types.messageBoxProps,
  setup(__props) {
    const props = __props;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("message-box");
    const rootClass = common_vendor.computed(() => {
      return `wd-message-box__container ${props.customClass}`;
    });
    const bodyClass = common_vendor.computed(() => {
      return `wd-message-box__body ${!messageState.title ? "is-no-title" : ""} ${messageState.type === "prompt" ? "is-prompt" : ""}`;
    });
    const messageOptionKey = uni_modules_wotDesignUni_components_wdMessageBox_index.getMessageDefaultOptionKey(props.selector);
    const messageOption = common_vendor.inject(messageOptionKey, common_vendor.ref(uni_modules_wotDesignUni_components_wdMessageBox_index.defaultOptions));
    const messageState = common_vendor.reactive({
      msg: "",
      // 消息内容
      show: false,
      // 是否显示弹框
      title: "",
      // 标题
      showCancelButton: false,
      // 是否展示取消按钮
      closeOnClickModal: true,
      // 是否支持点击蒙层关闭
      confirmButtonText: "",
      // 确定按钮文案
      cancelButtonText: "",
      // 取消按钮文案
      type: "alert",
      // 弹框类型
      inputType: "text",
      // 输入框类型
      inputValue: "",
      // 输入框初始值
      inputPlaceholder: "",
      // 输入框placeholder
      inputError: "",
      // 输入框错误提示文案
      showErr: false,
      // 是否显示错误提示
      zIndex: 99,
      // 弹窗层级
      lazyRender: true
      // 弹层内容懒渲染
    });
    const customConfirmProps = common_vendor.computed(() => {
      const buttonProps = uni_modules_wotDesignUni_components_common_util.deepAssign(
        {
          block: true
        },
        uni_modules_wotDesignUni_components_common_util.isDef(messageState.confirmButtonProps) ? uni_modules_wotDesignUni_components_common_util.omitBy(messageState.confirmButtonProps, uni_modules_wotDesignUni_components_common_util.isUndefined) : {}
      );
      buttonProps.customClass = `${buttonProps.customClass || ""} wd-message-box__actions-btn`;
      return buttonProps;
    });
    const customCancelProps = common_vendor.computed(() => {
      const buttonProps = uni_modules_wotDesignUni_components_common_util.deepAssign(
        {
          block: true,
          type: "info"
        },
        uni_modules_wotDesignUni_components_common_util.isDef(messageState.cancelButtonProps) ? uni_modules_wotDesignUni_components_common_util.omitBy(messageState.cancelButtonProps, uni_modules_wotDesignUni_components_common_util.isUndefined) : {}
      );
      buttonProps.customClass = `${buttonProps.customClass || ""} wd-message-box__actions-btn`;
      return buttonProps;
    });
    common_vendor.watch(
      () => messageOption.value,
      (newVal) => {
        reset(newVal);
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => messageState.show,
      (newValue) => {
        resetErr(!!newValue);
      },
      {
        deep: true,
        immediate: true
      }
    );
    function toggleModal(action) {
      if (action === "modal" && !messageState.closeOnClickModal) {
        return;
      }
      if (messageState.type === "prompt" && action === "confirm" && !validate()) {
        return;
      }
      switch (action) {
        case "confirm":
          if (messageState.beforeConfirm) {
            messageState.beforeConfirm({
              resolve: (isPass) => {
                if (isPass) {
                  handleConfirm({
                    action,
                    value: messageState.inputValue
                  });
                }
              }
            });
          } else {
            handleConfirm({
              action,
              value: messageState.inputValue
            });
          }
          break;
        case "cancel":
          handleCancel({
            action
          });
          break;
        default:
          handleCancel({
            action: "modal"
          });
          break;
      }
    }
    function handleConfirm(result) {
      messageState.show = false;
      if (uni_modules_wotDesignUni_components_common_util.isFunction(messageState.success)) {
        messageState.success(result);
      }
    }
    function handleCancel(result) {
      messageState.show = false;
      if (uni_modules_wotDesignUni_components_common_util.isFunction(messageState.fail)) {
        messageState.fail(result);
      }
    }
    function validate() {
      if (messageState.inputPattern && !messageState.inputPattern.test(String(messageState.inputValue))) {
        messageState.showErr = true;
        return false;
      }
      if (typeof messageState.inputValidate === "function") {
        const validateResult = messageState.inputValidate(messageState.inputValue);
        if (!validateResult) {
          messageState.showErr = true;
          return false;
        }
      }
      messageState.showErr = false;
      return true;
    }
    function resetErr(val) {
      if (val === false) {
        messageState.showErr = false;
      }
    }
    function inputValChange({ value }) {
      if (value === "") {
        messageState.showErr = false;
        return;
      }
      messageState.inputValue = value;
    }
    function reset(option) {
      if (option) {
        messageState.title = uni_modules_wotDesignUni_components_common_util.isDef(option.title) ? option.title : "";
        messageState.showCancelButton = uni_modules_wotDesignUni_components_common_util.isDef(option.showCancelButton) ? option.showCancelButton : false;
        messageState.show = option.show;
        messageState.closeOnClickModal = option.closeOnClickModal;
        messageState.confirmButtonText = option.confirmButtonText;
        messageState.cancelButtonText = option.cancelButtonText;
        messageState.msg = option.msg;
        messageState.type = option.type;
        messageState.inputType = option.inputType;
        messageState.inputSize = option.inputSize;
        messageState.inputValue = option.inputValue;
        messageState.inputPlaceholder = option.inputPlaceholder;
        messageState.inputPattern = option.inputPattern;
        messageState.inputValidate = option.inputValidate;
        messageState.success = option.success;
        messageState.fail = option.fail;
        messageState.beforeConfirm = option.beforeConfirm;
        messageState.inputError = option.inputError;
        messageState.showErr = option.showErr;
        messageState.zIndex = option.zIndex;
        messageState.lazyRender = option.lazyRender;
        messageState.confirmButtonProps = option.confirmButtonProps;
        messageState.cancelButtonProps = option.cancelButtonProps;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: messageState.title
      }, messageState.title ? {
        b: common_vendor.t(messageState.title)
      } : {}, {
        c: messageState.type === "prompt"
      }, messageState.type === "prompt" ? common_vendor.e({
        d: common_vendor.o(inputValChange),
        e: common_vendor.o(($event) => messageState.inputValue = $event),
        f: common_vendor.p({
          type: messageState.inputType,
          size: messageState.inputSize,
          placeholder: messageState.inputPlaceholder,
          modelValue: messageState.inputValue
        }),
        g: messageState.showErr
      }, messageState.showErr ? {
        h: common_vendor.t(messageState.inputError || common_vendor.unref(translate)("inputNoValidate"))
      } : {}) : {}, {
        i: common_vendor.t(messageState.msg),
        j: common_vendor.n(bodyClass.value),
        k: messageState.showCancelButton
      }, messageState.showCancelButton ? {
        l: common_vendor.t(messageState.cancelButtonText || common_vendor.unref(translate)("cancel")),
        m: common_vendor.o(($event) => toggleModal("cancel")),
        n: common_vendor.p({
          ...customCancelProps.value
        })
      } : {}, {
        o: common_vendor.t(messageState.confirmButtonText || common_vendor.unref(translate)("confirm")),
        p: common_vendor.o(($event) => toggleModal("confirm")),
        q: common_vendor.p({
          ...customConfirmProps.value
        }),
        r: common_vendor.n(`wd-message-box__actions ${messageState.showCancelButton ? "wd-message-box__flex" : "wd-message-box__block"}`),
        s: common_vendor.n(rootClass.value),
        t: common_vendor.o(($event) => toggleModal("modal")),
        v: common_vendor.o(($event) => messageState.show = $event),
        w: common_vendor.p({
          transition: "zoom-in",
          ["close-on-click-modal"]: messageState.closeOnClickModal,
          ["lazy-render"]: messageState.lazyRender,
          ["custom-class"]: "wd-message-box",
          ["z-index"]: messageState.zIndex,
          duration: 200,
          modelValue: messageState.show
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c8139c88"]]);
wx.createComponent(Component);
