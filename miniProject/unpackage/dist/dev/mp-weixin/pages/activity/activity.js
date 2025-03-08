"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  (_easycom_wd_navbar2 + _easycom_wd_tab2 + _easycom_wd_tabs2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_tab = () => "../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_tab + _easycom_wd_tabs)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "activity",
  setup(__props) {
    common_vendor.ref(0);
    const tab = common_vendor.ref("例子");
    const tabs = common_vendor.ref([
      {
        name: "文艺类",
        items: []
      },
      {
        name: "体育活动类",
        items: []
      },
      {
        name: "学术思辨",
        items: []
      },
      {
        name: "社会实践与公益类",
        items: []
      },
      {
        name: "特定主题",
        items: []
      }
    ]);
    common_vendor.ref(true);
    const onClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickLeft),
        b: common_vendor.p({
          title: "校园活动",
          leftText: "返回",
          fixed: true,
          placeholder: true,
          safeAreaInsetTop: true
        }),
        c: common_vendor.f(tabs.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "da48f91d-2-" + i0 + ",da48f91d-1",
            c: common_vendor.p({
              title: item.name,
              name: item.name
            }),
            d: index
          };
        }),
        d: common_vendor.o(($event) => tab.value = $event),
        e: common_vendor.p({
          modelValue: tab.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da48f91d"]]);
wx.createPage(MiniProgramPage);
