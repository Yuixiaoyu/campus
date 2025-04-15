"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_userStorage = require("../../utils/userStorage.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
const uni_modules_wotDesignUni_components_wdMessageBox_index = require("../../uni_modules/wot-design-uni/components/wd-message-box/index.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../../uni_modules/wot-design-uni/components/composables/useQueue.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_articleApi = require("../../api/articleApi.js");
if (!Array) {
  const _easycom_wd_skeleton2 = common_vendor.resolveComponent("wd-skeleton");
  const _easycom_wd_notice_bar2 = common_vendor.resolveComponent("wd-notice-bar");
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_text2 = common_vendor.resolveComponent("wd-text");
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_popover2 = common_vendor.resolveComponent("wd-popover");
  const _easycom_wd_status_tip2 = common_vendor.resolveComponent("wd-status-tip");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  const _easycom_wd_fab2 = common_vendor.resolveComponent("wd-fab");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  (_easycom_wd_skeleton2 + _easycom_wd_notice_bar2 + _easycom_wd_search2 + _easycom_wd_img2 + _easycom_wd_text2 + _easycom_wd_loading2 + _easycom_wd_icon2 + _easycom_wd_popover2 + _easycom_wd_status_tip2 + _easycom_wd_loadmore2 + _easycom_wd_fab2 + _easycom_wd_toast2 + _easycom_wd_message_box2)();
}
const _easycom_wd_skeleton = () => "../../uni_modules/wot-design-uni/components/wd-skeleton/wd-skeleton.js";
const _easycom_wd_notice_bar = () => "../../uni_modules/wot-design-uni/components/wd-notice-bar/wd-notice-bar.js";
const _easycom_wd_search = () => "../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_text = () => "../../uni_modules/wot-design-uni/components/wd-text/wd-text.js";
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_popover = () => "../../uni_modules/wot-design-uni/components/wd-popover/wd-popover.js";
const _easycom_wd_status_tip = () => "../../uni_modules/wot-design-uni/components/wd-status-tip/wd-status-tip.js";
const _easycom_wd_loadmore = () => "../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
const _easycom_wd_fab = () => "../../uni_modules/wot-design-uni/components/wd-fab/wd-fab.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_message_box = () => "../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
if (!Math) {
  (_easycom_wd_skeleton + _easycom_wd_notice_bar + _easycom_wd_search + _easycom_wd_img + _easycom_wd_text + _easycom_wd_loading + _easycom_wd_icon + _easycom_wd_popover + _easycom_wd_status_tip + _easycom_wd_loadmore + _easycom_wd_fab + _easycom_wd_toast + _easycom_wd_message_box)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    uni_modules_wotDesignUni_components_wdMessageBox_index.useMessage();
    const { closeOutside } = uni_modules_wotDesignUni_components_composables_useQueue.useQueue();
    const banner = common_vendor.ref(true);
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const searchValue = common_vendor.ref("");
    const onSearch = (value) => {
      console.log("搜索:", value);
    };
    const successLoadBanner = () => {
      banner.value = false;
    };
    const onActivity = () => {
      console.log("点击活动模块");
      common_vendor.index.navigateTo({
        url: "/pages/activity/activity"
      });
    };
    const onClub = () => {
      console.log("点击社团圈模块");
      common_vendor.index.navigateTo({
        url: "/pages/club/club"
      });
    };
    const onStudy = () => {
      common_vendor.index.navigateTo({
        url: "/pages/study/study"
      });
      console.log("点击学习圈模块");
    };
    const lostFound = () => {
      common_vendor.index.navigateTo({
        url: "/pages/lostFound/lostFound"
      });
      console.log("点击失物招领模块");
    };
    const articleList = common_vendor.ref([]);
    const pagination = common_vendor.reactive({
      current: 1,
      pageSize: 5,
      total: 0,
      hasMore: true,
      // 新增刷新锁防止重复请求
      isRefreshing: false
    });
    const loadStatus = common_vendor.ref("loading");
    const needRefresh = common_vendor.ref(false);
    const getImageLayoutClass = (count) => {
      switch (count) {
        case 1:
          return "one-column";
        case 2:
        case 4:
          return "two-columns";
        case 3:
          return "three-columns";
        default:
          return "three-columns";
      }
    };
    common_vendor.onReachBottom(() => {
      console.log("到底部了");
      console.log(articleList.value);
      fetchArticles();
    });
    common_vendor.onPullDownRefresh(() => {
      if (!pagination.isRefreshing) {
        fetchArticles(true).then(() => {
          toast.show("加载成功");
        }).finally(() => {
          setTimeout(() => {
            common_vendor.index.stopPullDownRefresh();
          }, 500);
        });
      }
    });
    const fetchArticles = async (isRefresh = false) => {
      if (pagination.isRefreshing)
        return;
      pagination.isRefreshing = true;
      try {
        if (isRefresh) {
          pagination.current = 1;
          pagination.hasMore = true;
          articleList.value = [];
          common_vendor.index.showNavigationBarLoading();
        }
        if (!pagination.hasMore) {
          loadStatus.value = "finished";
          return;
        }
        const res = await api_articleApi.getArticleList({
          current: pagination.current,
          pageSize: pagination.pageSize
        });
        if (res.code === 200) {
          articleList.value = isRefresh ? res.data.records : [...articleList.value, ...res.data.records];
          pagination.total = res.data.total;
          pagination.hasMore = pagination.current * pagination.pageSize < res.data.total;
          pagination.current += 1;
          loadStatus.value = pagination.hasMore ? "loading" : "finished";
        }
      } catch (err) {
        console.error("加载失败:", err);
        loadStatus.value = "error";
      } finally {
        pagination.isRefreshing = false;
        common_vendor.index.hideNavigationBarLoading();
        common_vendor.index.stopPullDownRefresh();
      }
    };
    const retryLoad = () => {
      console.log("加载......");
      loadStatus.value = "loading";
      fetchArticles();
    };
    const handleArticleInfo = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/articleInfo/articleInfo?articleId=${id}`
      });
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
    common_vendor.onShow(() => {
      if (needRefresh.value) {
        console.log("需要刷新页面");
        const pages = getCurrentPages();
        console.log("当前页面栈:", pages.map((p) => p.route));
        pagination.current = 1;
        pagination.hasMore = true;
        articleList.value = [];
        fetchArticles(true);
        needRefresh.value = false;
      }
    });
    common_vendor.onLoad(() => {
      fetchArticles();
    });
    const previewImage = (url, urlList) => {
      common_vendor.index.previewImage({
        current: url,
        // 当前显示图片的http链接
        urls: urlList
        // 需要预览的图片http链接列表
      });
    };
    const handleLikeItem = async (id, index) => {
      console.log(id, index);
      const res = await api_articleApi.likeArticle(id);
      if (res.code == 200) {
        if (articleList.value[index].isLike) {
          articleList.value[index].likeCount -= 1;
          articleList.value[index].isLike = false;
        } else {
          articleList.value[index].likeCount += 1;
          articleList.value[index].isLike = true;
        }
      } else {
        toast.show(res.message);
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
      toast.show("敬请期待");
    }
    const handleToDetail = (id) => {
      console.log("id", id);
      common_vendor.index.navigateTo({
        url: `/pages/userDetail/userDetail?userId=${id}`
      });
    };
    common_vendor.onLoad(() => {
      fetchArticles();
    });
    const setNeedRefresh = () => {
      needRefresh.value = true;
    };
    __expose({
      setNeedRefresh
    });
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
      return common_vendor.e({
        a: common_vendor.o(successLoadBanner),
        b: common_vendor.p({
          theme: "image",
          animation: "flashed",
          loading: banner.value
        }),
        c: common_vendor.p({
          text: "声明公告：平台内禁止发布任何有关政治立场、色情、暴力等一系列非法言论，如有发现将封禁处理，所有用户均可发布内容，谁发布谁负责",
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
        j: common_vendor.o(lostFound),
        k: common_vendor.f(articleList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "1cf27b2a-3-" + i0,
            b: common_vendor.p({
              src: item.userVO.imageUrl,
              width: 45,
              height: 45,
              round: true,
              mode: "scaleToFill"
            }),
            c: common_vendor.t(item.userVO.userName),
            d: common_vendor.t(item.createTime),
            e: common_vendor.o(($event) => handleToDetail(item.userVO.id), index),
            f: "1cf27b2a-4-" + i0,
            g: common_vendor.p({
              text: item.content,
              color: "#565756",
              size: "14px",
              lines: 4
            }),
            h: common_vendor.o(($event) => handleArticleInfo(item.id), index),
            i: item.imagesList != null
          }, item.imagesList != null ? {
            j: common_vendor.f(item.imagesList.slice(0, 9), (url, index2, i1) => {
              return common_vendor.e({
                a: "1cf27b2a-6-" + i0 + "-" + i1 + "," + ("1cf27b2a-5-" + i0 + "-" + i1),
                b: common_vendor.o(($event) => previewImage(url, item.imagesList), index2),
                c: "1cf27b2a-5-" + i0 + "-" + i1,
                d: common_vendor.p({
                  width: "100%",
                  height: "100%",
                  mode: "aspectFill",
                  ["show-menu-by-longpress"]: true,
                  radius: "5px",
                  src: url
                }),
                e: index2 === 8 && item.imagesList.length > 9
              }, index2 === 8 && item.imagesList.length > 9 ? {
                f: common_vendor.t(item.imagesList.length - 9)
              } : {}, {
                g: index2
              });
            }),
            k: common_vendor.o(($event) => handleArticleInfo(item.id), index),
            l: common_vendor.n(getImageLayoutClass(item.imagesList.length))
          } : {}, {
            m: "1cf27b2a-7-" + i0,
            n: common_vendor.t(item.viewCount),
            o: item.isLike
          }, item.isLike ? {} : {}, {
            p: common_vendor.t(item.likeCount),
            q: common_vendor.o(($event) => handleLikeItem(item.id, index), index),
            r: "1cf27b2a-8-" + i0,
            s: common_vendor.t(item.commentCount),
            t: common_vendor.o(($event) => handleArticleInfo(item.id), index),
            v: "1cf27b2a-10-" + i0 + "," + ("1cf27b2a-9-" + i0),
            w: common_vendor.o(($event) => link(item.id), index),
            x: "1cf27b2a-9-" + i0,
            y: common_vendor.o(
              //@ts-ignore
              (...args) => common_vendor.unref(closeOutside) && common_vendor.unref(closeOutside)(...args),
              index
            ),
            z: index
          });
        }),
        l: common_vendor.p({
          name: "view",
          size: "16px"
        }),
        m: common_vendor.p({
          name: "chat",
          size: "16px"
        }),
        n: common_vendor.p({
          name: "more",
          size: "16px"
        }),
        o: common_vendor.p({
          mode: "menu",
          content: menu.value
        }),
        p: articleList.value.length == 0
      }, articleList.value.length == 0 ? {
        q: common_vendor.p({
          image: "content",
          tip: "暂无内容"
        })
      } : {}, {
        r: articleList.value.length > 0
      }, articleList.value.length > 0 ? {
        s: common_vendor.o(retryLoad),
        t: common_vendor.p({
          ["custom-class"]: "loadmore",
          state: loadStatus.value,
          ["loading-text"]: "别急在跑了...",
          ["finished-text"]: "已经没有啦~",
          ["error-text"]: "与火星断联了~，点击重试"
        })
      } : {}, {
        v: common_vendor.o(handlePublishArticle),
        w: common_vendor.p({
          expandable: false,
          inactiveIcon: "edit-outline",
          position: `right-bottom`
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
