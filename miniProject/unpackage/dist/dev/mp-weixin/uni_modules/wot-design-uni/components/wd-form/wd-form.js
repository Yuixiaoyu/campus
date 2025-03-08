"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../wd-toast/index.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("./types.js");
if (!Math) {
  wdToast();
}
const wdToast = () => "../wd-toast/wd-toast.js";
const __default__ = {
  name: "wd-form",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdForm_types.formProps,
  setup(__props, { expose: __expose }) {
    const { show: showToast } = uni_modules_wotDesignUni_components_wdToast_index.useToast("wd-form-toast");
    const props = __props;
    const { children, linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdForm_types.FORM_KEY);
    let errorMessages = common_vendor.reactive({});
    linkChildren({ props, errorMessages });
    common_vendor.watch(
      () => props.model,
      () => {
        if (props.resetOnChange) {
          clearMessage();
        }
      },
      { immediate: true, deep: true }
    );
    async function validate(prop) {
      const errors = [];
      let valid = true;
      const promises = [];
      const formRules = getMergeRules();
      const propsToValidate = uni_modules_wotDesignUni_components_common_util.isArray(prop) ? prop : uni_modules_wotDesignUni_components_common_util.isDef(prop) ? [prop] : [];
      const rulesToValidate = propsToValidate.length > 0 ? propsToValidate.reduce((acc, key) => {
        if (formRules[key]) {
          acc[key] = formRules[key];
        }
        return acc;
      }, {}) : formRules;
      for (const propName in rulesToValidate) {
        const rules = rulesToValidate[propName];
        const value = uni_modules_wotDesignUni_components_common_util.getPropByPath(props.model, propName);
        if (rules && rules.length > 0) {
          for (const rule of rules) {
            if (rule.required && (!uni_modules_wotDesignUni_components_common_util.isDef(value) || value === "")) {
              errors.push({
                prop: propName,
                message: rule.message
              });
              valid = false;
              break;
            }
            if (rule.pattern && !rule.pattern.test(value)) {
              errors.push({
                prop: propName,
                message: rule.message
              });
              valid = false;
              break;
            }
            const { validator, ...ruleWithoutValidator } = rule;
            if (validator) {
              const result = validator(value, ruleWithoutValidator);
              if (uni_modules_wotDesignUni_components_common_util.isPromise(result)) {
                promises.push(
                  result.then((res) => {
                    if (typeof res === "string") {
                      errors.push({
                        prop: propName,
                        message: res
                      });
                      valid = false;
                    } else if (typeof res === "boolean" && !res) {
                      errors.push({
                        prop: propName,
                        message: rule.message
                      });
                      valid = false;
                    }
                  }).catch((error) => {
                    const message = uni_modules_wotDesignUni_components_common_util.isDef(error) ? uni_modules_wotDesignUni_components_common_util.isString(error) ? error : error.message || rule.message : rule.message;
                    errors.push({ prop: propName, message });
                    valid = false;
                  })
                );
              } else {
                if (!result) {
                  errors.push({
                    prop: propName,
                    message: rule.message
                  });
                  valid = false;
                }
              }
            }
          }
        }
      }
      await Promise.all(promises);
      showMessage(errors);
      if (valid) {
        if (propsToValidate.length) {
          propsToValidate.forEach(clearMessage);
        } else {
          clearMessage();
        }
      }
      return {
        valid,
        errors
      };
    }
    function getMergeRules() {
      const mergedRules = uni_modules_wotDesignUni_components_common_util.deepClone(props.rules);
      const childrenProps = children.map((child) => child.prop);
      Object.keys(mergedRules).forEach((key) => {
        if (!childrenProps.includes(key)) {
          delete mergedRules[key];
        }
      });
      children.forEach((item) => {
        if (uni_modules_wotDesignUni_components_common_util.isDef(item.prop) && uni_modules_wotDesignUni_components_common_util.isDef(item.rules) && item.rules.length) {
          if (mergedRules[item.prop]) {
            mergedRules[item.prop] = [...mergedRules[item.prop], ...item.rules];
          } else {
            mergedRules[item.prop] = item.rules;
          }
        }
      });
      return mergedRules;
    }
    function showMessage(errors) {
      const childrenProps = children.map((e) => e.prop).filter(Boolean);
      const messages = errors.filter((error) => error.message && childrenProps.includes(error.prop));
      if (messages.length) {
        messages.sort((a, b) => {
          return childrenProps.indexOf(a.prop) - childrenProps.indexOf(b.prop);
        });
        if (props.errorType === "toast") {
          showToast(messages[0].message);
        } else if (props.errorType === "message") {
          messages.forEach((error) => {
            errorMessages[error.prop] = error.message;
          });
        }
      }
    }
    function clearMessage(prop) {
      if (prop) {
        errorMessages[prop] = "";
      } else {
        Object.keys(errorMessages).forEach((key) => {
          errorMessages[key] = "";
        });
      }
    }
    function reset() {
      clearMessage();
    }
    __expose({ validate, reset });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.errorType === "toast"
      }, props.errorType === "toast" ? {
        b: common_vendor.p({
          selector: "wd-form-toast"
        })
      } : {}, {
        c: common_vendor.n(`wd-form ${_ctx.customClass}`),
        d: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6504e7d0"]]);
wx.createComponent(Component);
