"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdTabs_types = require("../wd-tabs/types.js");
const uni_modules_wotDesignUni_components_wdTab_types = require("./types.js");
const __default__ = {
  name: "wd-tab",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTab_types.tabProps,
  setup(__props) {
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const { parent: tabs, index } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdTabs_types.TABS_KEY);
    const active = common_vendor.computed(() => {
      return uni_modules_wotDesignUni_components_common_util.isDef(tabs) ? tabs.state.activeIndex === index.value : false;
    });
    const painted = common_vendor.ref(active.value);
    const tabBodyStyle = common_vendor.computed(() => {
      const style = {};
      if (!active.value && (!uni_modules_wotDesignUni_components_common_util.isDef(tabs) || !tabs.props.animated)) {
        style.display = "none";
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const shouldBeRender = common_vendor.computed(() => !props.lazy || painted.value || active.value);
    common_vendor.watch(active, (val) => {
      if (val)
        painted.value = true;
    });
    common_vendor.watch(
      () => props.name,
      (newValue) => {
        if (uni_modules_wotDesignUni_components_common_util.isDef(newValue) && !uni_modules_wotDesignUni_components_common_util.isNumber(newValue) && !uni_modules_wotDesignUni_components_common_util.isString(newValue)) {
          console.error("[wot design] error(wd-tab): the type of name should be number or string");
          return;
        }
        if (tabs) {
          checkName(proxy);
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    function checkName(self) {
      const { name: myName } = props;
      if (myName === void 0 || myName === null || myName === "") {
        return;
      }
      tabs && tabs.children.forEach((child) => {
        if (child.$.uid !== self.$.uid && child.name === myName) {
          console.error(`The tab's bound value: ${myName} has been used`);
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: shouldBeRender.value
      }, shouldBeRender.value ? {
        b: common_vendor.n({
          "wd-tab__body--inactive": !active.value
        }),
        c: common_vendor.s(tabBodyStyle.value)
      } : {}, {
        d: common_vendor.n(`wd-tab ${_ctx.customClass}`),
        e: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0ac60957"]]);
wx.createComponent(Component);
