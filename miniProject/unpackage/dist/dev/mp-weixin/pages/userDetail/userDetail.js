"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_userApi = require("../../api/userApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_userStorage = require("../../utils/userStorage.js");
const api_articleApi = require("../../api/articleApi.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_img2 + _easycom_wd_icon2 + _easycom_wd_tag2 + _easycom_wd_button2 + _easycom_wd_loading2 + _easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_toast2)();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
const _easycom_wd_tab = () => "../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_icon + _easycom_wd_tag + _easycom_wd_button + _easycom_wd_loading + _easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "userDetail",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const userInfo = common_vendor.ref(null);
    const articleList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const total = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const currentUserId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      console.log(options);
      if (options == null ? void 0 : options.userId) {
        currentUserId.value = options.userId;
        fetchUser(options.userId);
        fetchArticles(options.userId);
      }
    });
    const fetchUser = async (id) => {
      console.log(id);
      const res = await api_userApi.getUserVOById(id);
      console.log(res);
      if (res.code === 200) {
        userInfo.value = res.data;
      } else {
        toast.error(res.message);
      }
    };
    const fetchArticles = async (userId) => {
      if (loading.value || finished.value)
        return;
      try {
        loading.value = true;
        const res = await api_articleApi.getArticleList({
          pageNum: currentPage.value,
          pageSize: pageSize.value,
          userId
        });
        if (res.code === 200) {
          if (currentPage.value === 1) {
            articleList.value = res.data.records;
          } else {
            articleList.value = [...articleList.value, ...res.data.records];
          }
          total.value = res.data.total;
          if (articleList.value.length >= total.value) {
            finished.value = true;
          } else {
            currentPage.value++;
          }
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("获取文章列表失败:", error);
        toast.error("获取文章列表失败");
      } finally {
        loading.value = false;
      }
    };
    const onLoadMore = () => {
      if (currentUserId.value) {
        fetchArticles(currentUserId.value);
      }
    };
    const isShow = () => {
      const localUserInfo = utils_userStorage.getUserInfo();
      if (!localUserInfo || !userInfo.value)
        return 1;
      if (localUserInfo.id === userInfo.value.id)
        return 3;
      return 2;
    };
    const handleToEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/updateUserInfo/updateUserInfo"
      });
    };
    const handleToArticle = (articleId) => {
      common_vendor.index.navigateTo({
        url: `/pages/articleDetail/articleDetail?articleId=${articleId}`
      });
    };
    const previewImage = (images, current) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[current]
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.p({
          width: "160rpx",
          height: "160rpx",
          round: true,
          src: ((_a = userInfo.value) == null ? void 0 : _a.imageUrl) || "/static/default-avatar.png"
        }),
        c: common_vendor.t(((_b = userInfo.value) == null ? void 0 : _b.userName) || "未设置昵称"),
        d: (_c = userInfo.value) == null ? void 0 : _c.gender
      }, ((_d = userInfo.value) == null ? void 0 : _d.gender) ? {
        e: common_vendor.p({
          name: userInfo.value.gender === 1 ? "male" : "female",
          color: userInfo.value.gender === 1 ? "#007AFF" : "#FF69B4",
          size: "32rpx"
        })
      } : {}, {
        f: common_vendor.p({
          type: "success",
          size: "small"
        }),
        g: common_vendor.p({
          type: "warning",
          size: "small"
        }),
        h: common_vendor.t(((_e = userInfo.value) == null ? void 0 : _e.userProfile) || "这个人很懒，还没有填写简介~"),
        i: common_vendor.p({
          name: "location",
          size: "28rpx",
          color: "#666"
        }),
        j: common_vendor.p({
          plain: true,
          size: "small"
        }),
        k: isShow() == 1
      }, isShow() == 1 ? {
        l: common_vendor.p({
          name: "plus"
        }),
        m: common_vendor.p({
          type: "success",
          size: "small"
        })
      } : isShow() == 2 ? {
        o: common_vendor.p({
          name: "check"
        }),
        p: common_vendor.p({
          type: "info",
          size: "small"
        })
      } : {
        q: common_vendor.p({
          name: "edit"
        }),
        r: common_vendor.o(handleToEdit),
        s: common_vendor.p({
          type: "primary",
          size: "small"
        })
      }, {
        n: isShow() == 2,
        t: articleList.value.length === 0
      }, articleList.value.length === 0 ? {
        v: common_vendor.p({
          name: "comment",
          size: "80rpx",
          color: "#ccc"
        })
      } : common_vendor.e({
        w: common_vendor.f(articleList.value, (article, k0, i0) => {
          return common_vendor.e({
            a: "4887aa7b-15-" + i0 + ",4887aa7b-13",
            b: common_vendor.p({
              width: "60rpx",
              height: "60rpx",
              round: true,
              src: article.userVO.imageUrl
            }),
            c: common_vendor.t(article.userVO.userName),
            d: common_vendor.t(article.createTime),
            e: common_vendor.t(article.content),
            f: article.imagesList && article.imagesList.length > 0
          }, article.imagesList && article.imagesList.length > 0 ? {
            g: common_vendor.f(article.imagesList, (img, index, i1) => {
              return {
                a: index,
                b: img,
                c: common_vendor.o(($event) => previewImage(article.imagesList, index), index)
              };
            }),
            h: article.imagesList.length === 1 ? 1 : "",
            i: article.imagesList.length === 2 ? 1 : "",
            j: article.imagesList.length > 2 ? 1 : "",
            k: common_vendor.n(`image-count-${article.imagesList.length}`)
          } : {}, {
            l: "4887aa7b-16-" + i0 + ",4887aa7b-13",
            m: common_vendor.t(article.viewCount),
            n: common_vendor.n(article.isLike ? "t-icon t-icon-like-selected" : "t-icon t-icon-like"),
            o: common_vendor.t(article.likeCount),
            p: "4887aa7b-17-" + i0 + ",4887aa7b-13",
            q: common_vendor.t(article.commentCount),
            r: article.tags && article.tags.length > 0
          }, article.tags && article.tags.length > 0 ? {
            s: common_vendor.f(article.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag,
                c: "4887aa7b-18-" + i0 + "-" + i1 + ",4887aa7b-13"
              };
            }),
            t: common_vendor.p({
              type: "info",
              size: "small"
            })
          } : {}, {
            v: article.id,
            w: common_vendor.o(($event) => handleToArticle(article.id), article.id)
          });
        }),
        x: common_vendor.p({
          name: "view",
          size: "28rpx",
          color: "#666"
        }),
        y: common_vendor.p({
          name: "chat",
          size: "28rpx",
          color: "#666"
        }),
        z: articleList.value.length > 0
      }, articleList.value.length > 0 ? common_vendor.e({
        A: loading.value
      }, loading.value ? {
        B: common_vendor.p({
          size: "28rpx"
        })
      } : finished.value ? {} : {
        D: common_vendor.o(onLoadMore)
      }, {
        C: finished.value
      }) : {}), {
        E: common_vendor.p({
          title: "发表",
          badge: total.value
        }),
        F: common_vendor.p({
          name: "star",
          size: "80rpx",
          color: "#ccc"
        }),
        G: common_vendor.p({
          title: "收藏",
          badge: 1
        }),
        H: common_vendor.p({
          slidable: "always",
          animated: true,
          ["auto-line-width"]: true,
          sticky: true,
          ["offset-top"]: "0"
        })
      });
    };
  }
});
wx.createPage(_sfc_main);
