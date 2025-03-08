"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_userStorage = require("../../utils/userStorage.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../../uni_modules/wot-design-uni/components/composables/useQueue.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_articleApi = require("../../api/articleApi.js");
if (!Array) {
  const _easycom_wd_notice_bar2 = common_vendor.resolveComponent("wd-notice-bar");
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_popover2 = common_vendor.resolveComponent("wd-popover");
  const _easycom_wd_fab2 = common_vendor.resolveComponent("wd-fab");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  (_easycom_wd_notice_bar2 + _easycom_wd_search2 + _easycom_wd_img2 + _easycom_wd_icon2 + _easycom_wd_popover2 + _easycom_wd_fab2 + _easycom_wd_toast2 + _easycom_wd_loadmore2)();
}
const _easycom_wd_notice_bar = () => "../../uni_modules/wot-design-uni/components/wd-notice-bar/wd-notice-bar.js";
const _easycom_wd_search = () => "../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_popover = () => "../../uni_modules/wot-design-uni/components/wd-popover/wd-popover.js";
const _easycom_wd_fab = () => "../../uni_modules/wot-design-uni/components/wd-fab/wd-fab.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_loadmore = () => "../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
if (!Math) {
  (_easycom_wd_notice_bar + _easycom_wd_search + _easycom_wd_img + _easycom_wd_icon + _easycom_wd_popover + _easycom_wd_fab + _easycom_wd_toast + _easycom_wd_loadmore)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const { closeOutside } = uni_modules_wotDesignUni_components_composables_useQueue.useQueue();
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const searchValue = common_vendor.ref("");
    const onSearch = (value) => {
      console.log("搜索:", value);
    };
    const onActivity = () => {
      console.log("点击活动模块");
      common_vendor.index.navigateTo({
        url: "/pages/activity/activity"
      });
    };
    const onClub = () => {
      console.log("点击社团圈模块");
    };
    const onStudy = () => {
      console.log("点击学习圈模块");
    };
    const articleList = common_vendor.ref([]);
    const pagination = common_vendor.reactive({
      current: 1,
      pageSize: 2,
      total: 0,
      hasMore: true
    });
    const loadStatus = common_vendor.ref("loading");
    const getImageLayoutClass = (count) => {
      return count === 4 ? "two-columns" : "three-columns";
    };
    const getImageWrapperStyle = (count, index) => {
      if (count === 4 && index === 3) {
        return "margin-top: 10rpx;";
      }
      return "";
    };
    common_vendor.onReachBottom(() => {
      console.log("到底部了");
      console.log(articleList.value);
      fetchArticles();
    });
    common_vendor.onLoad(() => {
      fetchArticles();
    });
    const fetchArticles = async () => {
      if (!pagination.hasMore)
        return;
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      try {
        loadStatus.value = "loading";
        const res = await api_articleApi.getArticleList({
          current: pagination.current,
          pageSize: pagination.pageSize
        });
        if (res.code === 200) {
          articleList.value = [...articleList.value, ...res.data.records];
          pagination.total = res.data.total;
          console.log("**>", pagination.current * pagination.pageSize);
          console.log("max", res.data.total);
          pagination.hasMore = pagination.current * pagination.pageSize < res.data.total;
          if (pagination.hasMore) {
            pagination.current++;
            loadStatus.value = "loading";
          } else {
            loadStatus.value = "finished";
          }
        }
      } catch (err) {
        console.error("加载失败:", err);
        loadStatus.value = "error";
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const retryLoad = () => {
      console.log("加载......");
      loadStatus.value = "loading";
      fetchArticles();
    };
    const handlePublishArticle = () => {
      const user = utils_userStorage.getUserInfo();
      console.log(user);
      if (!user) {
        toast.show({
          iconClass: "info-circle",
          position: "middle",
          msg: "请先登录"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/login/login"
          });
        }, 1e3);
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/publishArticle/publishArticle"
        });
      }
    };
    const menu = common_vendor.ref([
      {
        iconClass: "warning",
        content: "举报"
      }
    ]);
    function link(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        // url: "/pages/reportArticle/reportArticle?articleId="+id
        url: `/pages/reportArticle/reportArticle?articleId=${id}`
        //跳转到举报页面
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.p({
          text: "这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息",
          prefix: "check-outline",
          type: "info",
          ["custom-class"]: "space"
        }),
        d: common_vendor.o(onSearch),
        e: common_vendor.o(($event) => searchValue.value = $event),
        f: common_vendor.p({
          placeholder: "搜索",
          ["hide-cancel"]: true,
          modelValue: searchValue.value
        }),
        g: common_vendor.o(onActivity),
        h: common_vendor.o(onClub),
        i: common_vendor.o(onStudy),
        j: common_vendor.o(onStudy),
        k: common_vendor.f(articleList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "1cf27b2a-2-" + i0,
            b: common_vendor.p({
              src: item.userVO.imageUrl,
              width: 45,
              height: 45,
              round: true,
              mode: "scaleToFill"
            }),
            c: common_vendor.t(item.userVO.userName),
            d: common_vendor.t(item.createTime.split("T")[0]),
            e: common_vendor.t(item.content),
            f: item.imagesList != null
          }, item.imagesList != null ? {
            g: common_vendor.f(item.imagesList.slice(0, 9), (url, index2, i1) => {
              return common_vendor.e({
                a: "1cf27b2a-3-" + i0 + "-" + i1,
                b: common_vendor.p({
                  width: "100%",
                  height: "100%",
                  mode: "aspectFill",
                  radius: "5px",
                  ["enable-preview"]: true,
                  src: url
                }),
                c: index2 === 8 && item.imagesList.length > 9
              }, index2 === 8 && item.imagesList.length > 9 ? {
                d: common_vendor.t(item.imagesList.length - 9)
              } : {}, {
                e: index2,
                f: common_vendor.s(getImageWrapperStyle(item.imagesList.length, index2))
              });
            }),
            h: common_vendor.n(getImageLayoutClass(item.imagesList.length))
          } : {}, {
            i: "1cf27b2a-4-" + i0,
            j: common_vendor.t(item.viewCount),
            k: "1cf27b2a-5-" + i0,
            l: common_vendor.t(item.likeCount),
            m: "1cf27b2a-6-" + i0,
            n: common_vendor.t(item.commentCount),
            o: "1cf27b2a-8-" + i0 + "," + ("1cf27b2a-7-" + i0),
            p: common_vendor.o(($event) => link(item.id), index),
            q: "1cf27b2a-7-" + i0,
            r: common_vendor.o(
              //@ts-ignore
              (...args) => common_vendor.unref(closeOutside) && common_vendor.unref(closeOutside)(...args),
              index
            ),
            s: index
          });
        }),
        l: common_vendor.p({
          name: "view",
          size: "16px"
        }),
        m: common_vendor.p({
          name: "thumb-up",
          size: "16px"
        }),
        n: common_vendor.p({
          name: "chat",
          size: "16px"
        }),
        o: common_vendor.p({
          name: "more",
          size: "16px"
        }),
        p: common_vendor.p({
          mode: "menu",
          content: menu.value
        }),
        q: common_vendor.o(handlePublishArticle),
        r: common_vendor.p({
          expandable: false,
          inactiveIcon: "edit-outline",
          position: `right-bottom`
        }),
        s: articleList.value.length > 0
      }, articleList.value.length > 0 ? {
        t: common_vendor.o(retryLoad),
        v: common_vendor.p({
          ["custom-class"]: "loadmore",
          state: loadStatus.value,
          ["loading-text"]: "别急在跑了...",
          ["finished-text"]: "已经没有啦~",
          ["error-text"]: "与火星断联了~，点击重试"
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
