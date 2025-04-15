"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_activityEnum = require("../../utils/activityEnum.js");
const utils_userStorage = require("../../utils/userStorage.js");
const api_activityApi = require("../../api/activityApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_gap2 = common_vendor.resolveComponent("wd-gap");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_icon2 + _easycom_wd_button2 + _easycom_wd_gap2 + _easycom_wd_toast2)();
}
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_gap = () => "../../uni_modules/wot-design-uni/components/wd-gap/wd-gap.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_icon + _easycom_wd_button + _easycom_wd_gap + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "activityDetail",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const activity = common_vendor.ref({});
    const user = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      console.log(options.activityInfo);
      activity.value = JSON.parse(options.activityInfo);
      user.value = utils_userStorage.getUserInfo();
    });
    const handleRegistration = common_vendor.lodashExports.debounce(async () => {
      console.log("报名");
      const data = {
        activityId: activity.value.id,
        userId: user.value.id
      };
      const res = await api_activityApi.registrationActivity(data);
      if (res.code === 200) {
        const text = activity.value.isRegistration ? "取消报名成功" : "报名成功";
        toast.show({
          msg: text,
          cover: true
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } else {
        toast.error(res.message);
      }
    }, 600);
    common_vendor.onShareAppMessage((res) => {
      console.log(res);
      return {
        title: "青春共享站",
        path: "/pages/index/index",
        imageUrl: "/static/logo.jpg"
        // 分享图片
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "青春共享站",
        path: "/pages/index/index",
        imageUrl: "/static/logo.jpg"
        // 分享图片
      };
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: activity.value.coverPicture,
        b: common_vendor.t(common_vendor.unref(utils_activityEnum.getActivityStatus)((_a = activity.value) == null ? void 0 : _a.status)),
        c: common_vendor.t(activity.value.title),
        d: common_vendor.t(activity.value.endTime),
        e: common_vendor.t(activity.value.maxSignups - activity.value.currentSignups),
        f: common_vendor.t(activity.value.currentSignups),
        g: common_vendor.p({
          name: "circle",
          size: "18px"
        }),
        h: common_vendor.p({
          name: "time",
          size: "18px"
        }),
        i: common_vendor.t(activity.value.startTime),
        j: common_vendor.p({
          name: "location",
          size: "18px"
        }),
        k: common_vendor.t(activity.value.position),
        l: common_vendor.p({
          name: "circle",
          size: "18px"
        }),
        m: common_vendor.p({
          name: "user-avatar",
          size: "18px"
        }),
        n: common_vendor.t(activity.value.targetUsers),
        o: common_vendor.p({
          name: "circle",
          size: "18px"
        }),
        p: common_vendor.p({
          name: "tips",
          size: "18px"
        }),
        q: common_vendor.t(activity.value.organizers),
        r: common_vendor.p({
          name: "circle",
          size: "18px"
        }),
        s: common_vendor.t(activity.value.profile),
        t: common_vendor.t(activity.value.isRegistration ? "取消报名" : "立即报名"),
        v: common_vendor.o(common_vendor.unref(handleRegistration)),
        w: common_vendor.p({
          block: true
        }),
        x: common_vendor.p({
          ["safe-area-bottom"]: true,
          height: "0"
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-3c8aaa9f"]]);
wx.createPage(MiniProgramPage);
