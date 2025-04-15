"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_wd_img2 + _easycom_wd_icon2)();
}
const _easycom_wd_img = () => "../../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_icon)();
}
const _sfc_main = {
  __name: "newFollowers",
  setup(__props) {
    const followers = common_vendor.ref([
      {
        id: 1,
        nickname: "小明同学",
        avatar: "/static/avatar.jpg",
        gender: "male",
        signature: "热爱生活，热爱学习",
        isFollowing: false
      },
      {
        id: 2,
        nickname: "小红同学",
        avatar: "/static/avatar.jpg",
        gender: "female",
        signature: "追求进步，永不止步",
        isFollowing: true
      },
      {
        id: 3,
        nickname: "小华同学",
        avatar: "/static/avatar.jpg",
        gender: "male",
        signature: "计算机科学与技术专业在读",
        isFollowing: false
      }
    ]);
    const handleFollow = (user) => {
      user.isFollowing = !user.isFollowing;
      common_vendor.index.showToast({
        title: user.isFollowing ? "已关注" : "已取消关注",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(followers.value.length),
        b: common_vendor.f(followers.value, (item, index, i0) => {
          return {
            a: "d3064bbf-0-" + i0,
            b: common_vendor.p({
              width: 100,
              height: 100,
              round: true,
              src: item.avatar
            }),
            c: "d3064bbf-1-" + i0,
            d: common_vendor.p({
              name: item.gender === "male" ? "male" : "female",
              size: "28rpx"
            }),
            e: common_vendor.n(item.gender),
            f: common_vendor.t(item.nickname),
            g: common_vendor.t(item.signature),
            h: common_vendor.t(item.isFollowing ? "已关注" : "关注"),
            i: item.isFollowing ? 1 : "",
            j: common_vendor.o(($event) => handleFollow(item), index),
            k: index
          };
        }),
        c: followers.value.length === 0
      }, followers.value.length === 0 ? {
        d: common_assets._imports_0$2
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3064bbf"]]);
wx.createPage(MiniProgramPage);
