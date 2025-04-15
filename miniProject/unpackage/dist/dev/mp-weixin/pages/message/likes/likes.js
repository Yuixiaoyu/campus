"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  (_easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_img2)();
}
const _easycom_wd_tab = () => "../../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_img = () => "../../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
if (!Math) {
  (_easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_img)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "likes",
  setup(__props) {
    const activeTab = common_vendor.ref(0);
    const likeList = common_vendor.ref([
      {
        id: 1,
        userName: "小明",
        userAvatar: "/static/avatar.jpg",
        time: "刚刚",
        type: "帖子",
        content: "这是一个非常有趣的话题...",
        image: "https://minio.fybreeze.cn/campus/tmp_f4748c1c384f7acb2240ce3cd7000943.webp"
      },
      {
        id: 2,
        userName: "小红",
        userAvatar: "/static/avatar.jpg",
        time: "10分钟前",
        type: "评论",
        content: "说得很对，我也是这么认为的！"
      }
    ]);
    const favoriteList = common_vendor.ref([
      {
        id: 3,
        userName: "小华",
        userAvatar: "/static/avatar.jpg",
        time: "30分钟前",
        type: "帖子",
        content: "关于期末考试复习的一些建议...",
        image: "https://bpic.588ku.com/back_origin_min_pic/19/10/22/7d5760a4e3926576c237d950d5964db1.jpg"
      }
    ]);
    const navigateToDetail = (item) => {
      if (item.type === "帖子") {
        common_vendor.index.navigateTo({
          url: `/pages/post/detail?id=${item.id}`
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/comment/detail?id=${item.id}`
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "收到的赞"
        }),
        b: common_vendor.p({
          title: "收到的收藏"
        }),
        c: common_vendor.o(($event) => activeTab.value = $event),
        d: common_vendor.p({
          sticky: true,
          animated: true,
          modelValue: activeTab.value
        }),
        e: common_vendor.f(likeList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "e86f8f41-3-" + i0,
            b: common_vendor.p({
              width: 80,
              height: 80,
              round: true,
              src: item.userAvatar
            }),
            c: common_vendor.t(item.userName),
            d: common_vendor.t(item.time),
            e: common_vendor.t(item.type),
            f: common_vendor.t(item.content),
            g: item.image
          }, item.image ? {
            h: item.image
          } : {}, {
            i: index,
            j: common_vendor.o(($event) => navigateToDetail(item), index)
          });
        }),
        f: likeList.value.length === 0
      }, likeList.value.length === 0 ? {
        g: common_assets._imports_0$3
      } : {}, {
        h: activeTab.value === 0,
        i: common_vendor.f(favoriteList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "e86f8f41-4-" + i0,
            b: common_vendor.p({
              width: 80,
              height: 80,
              round: true,
              src: item.userAvatar
            }),
            c: common_vendor.t(item.userName),
            d: common_vendor.t(item.time),
            e: common_vendor.t(item.type),
            f: common_vendor.t(item.content),
            g: item.image
          }, item.image ? {
            h: item.image
          } : {}, {
            i: index,
            j: common_vendor.o(($event) => navigateToDetail(item), index)
          });
        }),
        j: favoriteList.value.length === 0
      }, favoriteList.value.length === 0 ? {
        k: common_assets._imports_1$1
      } : {}, {
        l: activeTab.value === 1
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e86f8f41"]]);
wx.createPage(MiniProgramPage);
