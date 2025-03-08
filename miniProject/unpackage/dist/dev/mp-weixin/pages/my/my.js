"use strict";
const common_vendor = require("../../common/vendor.js");
const api_articleApi = require("../../api/articleApi.js");
const utils_userStorage = require("../../utils/userStorage.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_popup2 = common_vendor.resolveComponent("wd-popup");
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_img2 + _easycom_wd_tag2 + _easycom_wd_icon2 + _easycom_wd_popup2 + _easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_toast2)();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_popup = () => "../../uni_modules/wot-design-uni/components/wd-popup/wd-popup.js";
const _easycom_wd_tab = () => "../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_tag + _easycom_wd_icon + _easycom_wd_popup + _easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const dataList = common_vendor.ref([]);
    const myArticleList = async () => {
      userInfo.value = utils_userStorage.getUserInfo();
      const articleList = await api_articleApi.getArticleByUserId(userInfo.value.id);
      console.log(articleList);
      if (articleList.code === 200) {
        dataList.value = articleList.data;
      } else {
        toast.error(articleList.msg);
      }
      console.log(dataList);
    };
    common_vendor.onLoad(() => {
      myArticleList();
    });
    common_vendor.onPullDownRefresh(() => {
      console.log("触发下拉刷新");
      myArticleList();
      common_vendor.index.stopPullDownRefresh();
    });
    const tab = common_vendor.ref(0);
    const tabs = common_vendor.ref(["投稿", "收藏", "喜欢"]);
    const isPopupShow = common_vendor.ref(true);
    const handlePopupClose = () => {
      isPopupShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: userInfo.value.imageUrl || "http://192.168.34.100:9000/campus/nAH9IwNA5RLPa749104127442e3a91ee3c41c57d8a34.webp",
          width: "80",
          height: "80",
          round: true
        }),
        b: common_vendor.t(userInfo.value.userName),
        c: common_vendor.t(userInfo.value.userProfile || "这个人很懒，简介都不想写，估计是没有对象吧"),
        d: common_vendor.p({
          type: "primary",
          round: true
        }),
        e: common_vendor.p({
          type: "warning",
          round: true
        }),
        f: common_vendor.p({
          type: "success",
          round: true
        }),
        g: common_vendor.t(userInfo.value.follows || 168),
        h: common_vendor.t(userInfo.value.fans || "3.1k"),
        i: common_vendor.t(userInfo.value.likes || 263),
        j: common_vendor.p({
          name: "setting",
          size: "18px",
          color: "#adadad"
        }),
        k: common_vendor.o(($event) => isPopupShow.value = true),
        l: common_vendor.o(handlePopupClose),
        m: common_vendor.o(($event) => isPopupShow.value = $event),
        n: common_vendor.p({
          position: "right",
          ["custom-style"]: "height: 100vh;width:50%",
          modelValue: isPopupShow.value
        }),
        o: common_vendor.f(tabs.value, (item, k0, i0) => {
          return {
            a: common_vendor.f(dataList.value, (item2, index, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item2.createTime.split("T")[0]),
                b: common_vendor.t(item2.content),
                c: item2.imagesList.length != 0
              }, item2.imagesList.length != 0 ? {
                d: common_vendor.f(item2.imagesList.slice(0, 3), (url, index2, i2) => {
                  return common_vendor.e({
                    a: "2f1ef635-8-" + i0 + "-" + i1 + "-" + i2 + "," + ("2f1ef635-7-" + i0),
                    b: common_vendor.p({
                      width: "100%",
                      height: "100%",
                      mode: "aspectFill",
                      radius: "5px",
                      src: url
                    }),
                    c: index2 === 2 && item2.imagesList.length > 3
                  }, index2 === 2 && item2.imagesList.length > 3 ? {
                    d: common_vendor.t(item2.imagesList.length - 3)
                  } : {}, {
                    e: index2,
                    f: index2 === 2 ? 1 : ""
                  });
                }),
                e: item2.imagesList.length === 1 ? 1 : ""
              } : {}, {
                f: common_vendor.f(item2.tags, (tag, k2, i2) => {
                  return {
                    a: common_vendor.t(tag),
                    b: "2f1ef635-9-" + i0 + "-" + i1 + "-" + i2 + "," + ("2f1ef635-7-" + i0)
                  };
                }),
                g: "2f1ef635-10-" + i0 + "-" + i1 + "," + ("2f1ef635-7-" + i0),
                h: common_vendor.t(item2.viewCount),
                i: "2f1ef635-11-" + i0 + "-" + i1 + "," + ("2f1ef635-7-" + i0),
                j: common_vendor.t(item2.likeCount),
                k: "2f1ef635-12-" + i0 + "-" + i1 + "," + ("2f1ef635-7-" + i0),
                l: common_vendor.t(item2.commentCount),
                m: index
              });
            }),
            b: "2f1ef635-7-" + i0 + ",2f1ef635-6",
            c: common_vendor.p({
              title: item,
              name: item
            }),
            d: item
          };
        }),
        p: common_vendor.t(userInfo.value.userName),
        q: common_vendor.p({
          type: "primary",
          plain: true,
          mark: true
        }),
        r: common_vendor.p({
          name: "view",
          size: "16px"
        }),
        s: common_vendor.p({
          name: "thumb-up",
          size: "16px"
        }),
        t: common_vendor.p({
          name: "chat",
          size: "16px"
        }),
        v: common_vendor.o(($event) => tab.value = $event),
        w: common_vendor.p({
          modelValue: tab.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
