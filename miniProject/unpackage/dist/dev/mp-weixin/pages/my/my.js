"use strict";
const common_vendor = require("../../common/vendor.js");
const api_articleApi = require("../../api/articleApi.js");
const utils_userStorage = require("../../utils/userStorage.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_activityEnum = require("../../utils/activityEnum.js");
const api_activityApi = require("../../api/activityApi.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_popup2 = common_vendor.resolveComponent("wd-popup");
  const _easycom_wd_segmented2 = common_vendor.resolveComponent("wd-segmented");
  const _easycom_wd_text2 = common_vendor.resolveComponent("wd-text");
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  const _easycom_wd_popover2 = common_vendor.resolveComponent("wd-popover");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_img2 + _easycom_wd_icon2 + _easycom_wd_tag2 + _easycom_wd_cell2 + _easycom_wd_cell_group2 + _easycom_wd_popup2 + _easycom_wd_segmented2 + _easycom_wd_text2 + _easycom_wd_loading2 + _easycom_wd_popover2 + _easycom_wd_loadmore2 + _easycom_wd_toast2)();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_popup = () => "../../uni_modules/wot-design-uni/components/wd-popup/wd-popup.js";
const _easycom_wd_segmented = () => "../../uni_modules/wot-design-uni/components/wd-segmented/wd-segmented.js";
const _easycom_wd_text = () => "../../uni_modules/wot-design-uni/components/wd-text/wd-text.js";
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
const _easycom_wd_popover = () => "../../uni_modules/wot-design-uni/components/wd-popover/wd-popover.js";
const _easycom_wd_loadmore = () => "../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_icon + _easycom_wd_tag + _easycom_wd_cell + _easycom_wd_cell_group + _easycom_wd_popup + _easycom_wd_segmented + _easycom_wd_text + _easycom_wd_loading + _easycom_wd_popover + _easycom_wd_loadmore + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const articleList = common_vendor.ref([]);
    const activityList = common_vendor.ref([]);
    const loadStatus = common_vendor.ref("loading");
    const pagination = common_vendor.reactive({
      current: 1,
      pageSize: 5,
      total: 0,
      userId: null,
      hasMore: true,
      isRefreshing: false
    });
    const activityPagination = common_vendor.reactive({
      current: 1,
      pageSize: 5,
      hasMore: true,
      isRefreshing: false
    });
    const list = common_vendor.ref(["投稿", "活动", "收藏", "喜欢"]);
    const current = common_vendor.ref("投稿");
    common_vendor.ref(false);
    const collectList = common_vendor.ref([]);
    const collectPagination = common_vendor.reactive({
      current: 1,
      pageSize: 5,
      hasMore: true,
      isRefreshing: false
    });
    const likeList = common_vendor.ref([]);
    const likePagination = common_vendor.reactive({
      current: 1,
      pageSize: 5,
      hasMore: true,
      isRefreshing: false
    });
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
    const handleArticleInfo = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/articleInfo/articleInfo?articleId=${id}`
      });
    };
    const retryLoad = () => {
      console.log("加载......");
      loadStatus.value = "loading";
      fetchArticles();
    };
    const handleToDetail = (id) => {
      console.log("id", id);
      common_vendor.index.navigateTo({
        url: `/pages/userDetail/userDetail?userId=${id}`
      });
    };
    const handleToInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/updateUserInfo/updateUserInfo"
      });
    };
    const fetchArticles = async (isRefresh = false) => {
      if (!isLogin.value) {
        loadStatus.value = "finished";
        return;
      }
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
          pageSize: pagination.pageSize,
          userId: pagination.userId
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
    const fetchActivityList = async (isRefresh = false) => {
      if (!isLogin.value) {
        loadStatus.value = "finished";
        return;
      }
      if (activityPagination.isRefreshing)
        return;
      activityPagination.isRefreshing = true;
      try {
        if (isRefresh) {
          activityPagination.current = 1;
          activityPagination.hasMore = true;
          activityList.value = [];
          common_vendor.index.showNavigationBarLoading();
        }
        if (!activityPagination.hasMore) {
          loadStatus.value = "finished";
          return;
        }
        const res = await api_activityApi.getActivityVOByJoinUserId(userInfo.value.id);
        if (res.code === 200) {
          activityList.value = isRefresh ? res.data : [...activityList.value, ...res.data];
          activityPagination.hasMore = false;
          loadStatus.value = "finished";
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("获取活动列表失败:", error);
        loadStatus.value = "error";
      } finally {
        activityPagination.isRefreshing = false;
        common_vendor.index.hideNavigationBarLoading();
        common_vendor.index.stopPullDownRefresh();
      }
    };
    const fetchCollectList = async (isRefresh = false) => {
      var _a;
      if (!isLogin.value) {
        loadStatus.value = "finished";
        return;
      }
      if (collectPagination.isRefreshing)
        return;
      collectPagination.isRefreshing = true;
      try {
        if (isRefresh) {
          collectPagination.current = 1;
          collectPagination.hasMore = true;
          collectList.value = [];
          common_vendor.index.showNavigationBarLoading();
        }
        if (!collectPagination.hasMore) {
          loadStatus.value = "finished";
          return;
        }
        console.log("获取收藏列表:", {
          current: collectPagination.current,
          pageSize: collectPagination.pageSize,
          userId: (_a = userInfo.value) == null ? void 0 : _a.id
        });
        loadStatus.value = "finished";
      } catch (error) {
        console.error("获取收藏列表失败:", error);
        loadStatus.value = "error";
      } finally {
        collectPagination.isRefreshing = false;
        common_vendor.index.hideNavigationBarLoading();
        common_vendor.index.stopPullDownRefresh();
      }
    };
    const fetchLikeList = async (isRefresh = false) => {
      var _a;
      if (!isLogin.value) {
        loadStatus.value = "finished";
        return;
      }
      if (likePagination.isRefreshing)
        return;
      likePagination.isRefreshing = true;
      try {
        if (isRefresh) {
          likePagination.current = 1;
          likePagination.hasMore = true;
          likeList.value = [];
          common_vendor.index.showNavigationBarLoading();
        }
        if (!likePagination.hasMore) {
          loadStatus.value = "finished";
          return;
        }
        const res = await api_articleApi.getArticleVOLikeListByUserId((_a = userInfo.value) == null ? void 0 : _a.id);
        console.log(res);
        if (res.code == 200) {
          likeList.value = res.data;
        } else {
          toast.error(res.msg);
        }
        loadStatus.value = "finished";
      } catch (error) {
        console.error("获取点赞列表失败:", error);
        loadStatus.value = "error";
      } finally {
        likePagination.isRefreshing = false;
        common_vendor.index.hideNavigationBarLoading();
        common_vendor.index.stopPullDownRefresh();
      }
    };
    common_vendor.onReachBottom(() => {
      if (current.value === "投稿") {
        if (pagination.hasMore && !pagination.isRefreshing) {
          fetchArticles();
        }
      } else if (current.value === "活动") {
        if (activityPagination.hasMore && !activityPagination.isRefreshing) {
          fetchActivityList();
        }
      } else if (current.value === "收藏") {
        if (collectPagination.hasMore && !collectPagination.isRefreshing) {
          fetchCollectList();
        }
      } else if (current.value === "喜欢") {
        if (likePagination.hasMore && !likePagination.isRefreshing) {
          fetchLikeList();
        }
      }
    });
    common_vendor.onPullDownRefresh(() => {
      if (current.value === "投稿") {
        fetchArticles(true);
      } else if (current.value === "活动") {
        fetchActivityList(true);
      } else if (current.value === "收藏") {
        fetchCollectList(true);
      } else if (current.value === "喜欢") {
        fetchLikeList(true);
      }
    });
    common_vendor.watch(() => current.value, (newValue) => {
      loadStatus.value = "loading";
      if (newValue === "投稿") {
        fetchArticles(true);
      } else if (newValue === "活动") {
        fetchActivityList(true);
      } else if (newValue === "收藏") {
        fetchCollectList(true);
      } else if (newValue === "喜欢") {
        fetchLikeList(true);
      }
    });
    common_vendor.onShow(() => {
      const user = utils_userStorage.getUserInfo();
      if (user) {
        userInfo.value = user;
        pagination.userId = user.id;
      }
      if (current.value === "投稿") {
        fetchArticles(true);
      } else if (current.value === "活动") {
        fetchActivityList(true);
      } else if (current.value === "收藏") {
        fetchCollectList(true);
      } else if (current.value === "喜欢") {
        fetchLikeList(true);
      }
    });
    const isPopupShow = common_vendor.ref(false);
    const handlePopupClose = () => {
      isPopupShow.value = false;
    };
    const handleSet = () => {
      isPopupShow.value = true;
    };
    const handleActivityClick = (index) => {
      console.log("点击活动详情");
      const str = JSON.stringify(activityList.value[index]);
      common_vendor.index.navigateTo({
        url: "/pages/activityDetail/activityDetail?activityInfo=" + str
      });
    };
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
    const getTagType = (index) => {
      const types = ["success", "primary", "warning", "danger"];
      return types[index % types.length];
    };
    const isLogin = common_vendor.computed(() => {
      var _a;
      return !!((_a = userInfo.value) == null ? void 0 : _a.id);
    });
    const handleLoginClick = () => {
      if (!isLogin.value) {
        common_vendor.index.showModal({
          title: "提示",
          content: "登录后可查看更多信息",
          confirmText: "去登录",
          cancelText: "取消",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            }
          }
        });
      } else {
        handleToInfo();
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          src: ((_a = userInfo.value) == null ? void 0 : _a.imageUrl) || "/static/default-avatar.jpg",
          width: "88",
          height: "88",
          round: true
        }),
        b: isLogin.value
      }, isLogin.value ? {
        c: common_vendor.p({
          name: "edit-outline",
          size: "12px",
          color: "#fff"
        })
      } : {}, {
        d: common_vendor.t(isLogin.value ? userInfo.value.userName : "未登录"),
        e: isLogin.value
      }, isLogin.value ? {
        f: common_vendor.p({
          name: "star",
          size: "14px",
          color: "#FFB52B"
        }),
        g: common_vendor.t(((_b = userInfo.value) == null ? void 0 : _b.constellation) || `修仙熬夜座~`)
      } : {}, {
        h: !isLogin.value
      }, !isLogin.value ? {} : {
        i: common_vendor.t(userInfo.value.id || "未设置")
      }, {
        j: common_vendor.o(handleLoginClick),
        k: isLogin.value
      }, isLogin.value ? {
        l: common_vendor.t(userInfo.value.userProfile || "这个人很懒，简介都不想写，估计是没有对象吧"),
        m: common_vendor.f(userInfo.value.tagList, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: "2f1ef635-3-" + i0,
            d: common_vendor.p({
              type: getTagType(index),
              size: "small",
              round: true
            })
          };
        })
      } : {}, {
        n: common_vendor.t(isLogin.value ? userInfo.value.follows || 0 : "-"),
        o: common_vendor.o(handleLoginClick),
        p: common_vendor.t(isLogin.value ? userInfo.value.fans || 0 : "-"),
        q: common_vendor.o(handleLoginClick),
        r: common_vendor.t(isLogin.value ? userInfo.value.likes || 0 : "-"),
        s: common_vendor.o(handleLoginClick),
        t: isLogin.value
      }, isLogin.value ? {
        v: common_vendor.p({
          name: "setting",
          size: "20px",
          color: "#333"
        }),
        w: common_vendor.o(handleSet)
      } : {}, {
        x: common_vendor.p({
          title: "修改个人信息",
          ["title-width"]: "150px",
          icon: "edit-outline",
          ["is-link"]: true,
          to: "/pages/updateUserInfo/updateUserInfo"
        }),
        y: common_vendor.p({
          title: "反馈中心",
          ["title-width"]: "150px",
          icon: "cloud-upload",
          ["is-link"]: true,
          to: "/pages/feedback/feedback"
        }),
        z: common_vendor.p({
          title: "联系我们",
          ["title-width"]: "150px",
          icon: "call",
          ["is-link"]: true,
          to: "/pages/relation/relation"
        }),
        A: common_vendor.p({
          border: true
        }),
        B: common_vendor.o(handlePopupClose),
        C: common_vendor.o(($event) => isPopupShow.value = $event),
        D: common_vendor.p({
          position: "left",
          ["custom-style"]: "height:100vh;width:70%",
          modelValue: isPopupShow.value
        }),
        E: common_vendor.o(($event) => current.value = $event),
        F: common_vendor.p({
          options: list.value,
          value: current.value
        }),
        G: current.value === "投稿"
      }, current.value === "投稿" ? common_vendor.e({
        H: !isLogin.value
      }, !isLogin.value ? {} : {
        I: common_vendor.f(articleList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.createTime.split("T")[0]),
            b: common_vendor.t(item.content),
            c: item.imagesList.length != 0
          }, item.imagesList.length != 0 ? {
            d: common_vendor.f(item.imagesList.slice(0, 3), (url, index2, i1) => {
              return common_vendor.e({
                a: "2f1ef635-11-" + i0 + "-" + i1,
                b: common_vendor.p({
                  width: "100%",
                  height: "100%",
                  mode: "aspectFill",
                  radius: "5px",
                  src: url
                }),
                c: index2 === 2 && item.imagesList.length > 3
              }, index2 === 2 && item.imagesList.length > 3 ? {
                d: common_vendor.t(item.imagesList.length - 3)
              } : {}, {
                e: index2,
                f: index2 === 2 ? 1 : ""
              });
            }),
            e: item.imagesList.length === 1 ? 1 : ""
          } : {}, {
            f: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag,
                c: "2f1ef635-12-" + i0 + "-" + i1
              };
            }),
            g: "2f1ef635-13-" + i0,
            h: common_vendor.t(item.viewCount),
            i: item.isLike
          }, item.isLike ? {
            j: "2f1ef635-14-" + i0,
            k: common_vendor.p({
              ["class-prefix"]: "t-icon",
              name: "like-selected"
            })
          } : {
            l: "2f1ef635-15-" + i0,
            m: common_vendor.p({
              ["class-prefix"]: "t-icon",
              name: "like"
            })
          }, {
            n: common_vendor.t(item.likeCount),
            o: "2f1ef635-16-" + i0,
            p: common_vendor.t(item.commentCount),
            q: index
          });
        }),
        J: userInfo.value.imageUrl,
        K: common_vendor.t(userInfo.value.userName),
        L: common_vendor.p({
          type: "primary",
          plain: true,
          mark: true
        }),
        M: common_vendor.p({
          name: "view",
          size: "16px"
        }),
        N: common_vendor.p({
          name: "chat",
          size: "16px"
        })
      }) : {}, {
        O: current.value === "活动"
      }, current.value === "活动" ? {
        P: common_vendor.f(activityList.value, (item, index, i0) => {
          return {
            a: item.coverPicture,
            b: common_vendor.t(common_vendor.unref(utils_activityEnum.getActivityStatus)(item == null ? void 0 : item.status)),
            c: common_vendor.t(item.title),
            d: "2f1ef635-17-" + i0,
            e: common_vendor.t(item.endTime),
            f: "2f1ef635-18-" + i0,
            g: common_vendor.t(item.position),
            h: index,
            i: common_vendor.o(($event) => handleActivityClick(index), index)
          };
        }),
        Q: common_vendor.p({
          name: "time"
        }),
        R: common_vendor.p({
          name: "location"
        })
      } : {}, {
        S: current.value === "收藏"
      }, current.value === "收藏" ? common_vendor.e({
        T: collectList.value.length === 0
      }, collectList.value.length === 0 ? {} : {}) : {}, {
        U: current.value === "喜欢"
      }, current.value === "喜欢" ? common_vendor.e({
        V: likeList.value.length === 0
      }, likeList.value.length === 0 ? {} : {}, {
        W: common_vendor.f(likeList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "2f1ef635-19-" + i0,
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
            f: "2f1ef635-20-" + i0,
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
                a: "2f1ef635-22-" + i0 + "-" + i1 + "," + ("2f1ef635-21-" + i0 + "-" + i1),
                b: common_vendor.o(($event) => _ctx.previewImage(url, item.imagesList), index2),
                c: "2f1ef635-21-" + i0 + "-" + i1,
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
            m: "2f1ef635-23-" + i0,
            n: common_vendor.t(item.viewCount),
            o: item.isLike
          }, item.isLike ? {} : {}, {
            p: common_vendor.t(item.likeCount),
            q: common_vendor.o(($event) => _ctx.handleLikeItem(item.id, index), index),
            r: "2f1ef635-24-" + i0,
            s: common_vendor.t(item.commentCount),
            t: common_vendor.o(($event) => handleArticleInfo(item.id), index),
            v: "2f1ef635-26-" + i0 + "," + ("2f1ef635-25-" + i0),
            w: common_vendor.o(($event) => _ctx.link(item.id), index),
            x: "2f1ef635-25-" + i0,
            y: common_vendor.o(
              //@ts-ignore
              (...args) => _ctx.closeOutside && _ctx.closeOutside(...args),
              index
            ),
            z: index
          });
        }),
        X: common_vendor.p({
          name: "view",
          size: "16px"
        }),
        Y: common_vendor.p({
          name: "chat",
          size: "16px"
        }),
        Z: common_vendor.p({
          name: "more",
          size: "16px"
        }),
        aa: common_vendor.p({
          mode: "menu",
          content: _ctx.menu
        })
      }) : {}, {
        ab: common_vendor.o(retryLoad),
        ac: common_vendor.p({
          ["custom-class"]: "loadmore",
          state: loadStatus.value,
          ["loading-text"]: "别急在跑了...",
          ["finished-text"]: "已经没有啦~",
          ["error-text"]: "与火星断联了~，点击重试"
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
