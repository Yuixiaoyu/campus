"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
const uni_modules_wotDesignUni_components_common_dayjs = require("../../uni_modules/wot-design-uni/components/common/dayjs.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_articleApi = require("../../api/articleApi.js");
const api_commentApi = require("../../api/commentApi.js");
const utils_userStorage = require("../../utils/userStorage.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_divider2 = common_vendor.resolveComponent("wd-divider");
  const _easycom_wd_status_tip2 = common_vendor.resolveComponent("wd-status-tip");
  const _easycom_wd_gap2 = common_vendor.resolveComponent("wd-gap");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_img2 + _easycom_wd_icon2 + _easycom_wd_divider2 + _easycom_wd_status_tip2 + _easycom_wd_gap2 + _easycom_wd_input2 + _easycom_wd_button2 + _easycom_wd_toast2)();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_divider = () => "../../uni_modules/wot-design-uni/components/wd-divider/wd-divider.js";
const _easycom_wd_status_tip = () => "../../uni_modules/wot-design-uni/components/wd-status-tip/wd-status-tip.js";
const _easycom_wd_gap = () => "../../uni_modules/wot-design-uni/components/wd-gap/wd-gap.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_icon + _easycom_wd_divider + _easycom_wd_status_tip + _easycom_wd_gap + _easycom_wd_input + _easycom_wd_button + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "articleInfo",
  setup(__props) {
    const articleId = common_vendor.ref();
    const userInfo = common_vendor.ref();
    const commentList = common_vendor.ref();
    const text = common_vendor.ref("写下你的想法");
    const articleInfo = common_vendor.ref();
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const commentText = common_vendor.ref();
    const parentId = common_vendor.ref(0);
    const user = common_vendor.ref();
    common_vendor.onLoad((options) => {
      console.log("接收到的数据：", options == null ? void 0 : options.articleId);
      articleId.value = options == null ? void 0 : options.articleId;
      getArticleInfo();
      getCommentList();
      user.value = utils_userStorage.getUserInfo();
    });
    const getArticleInfo = async () => {
      console.log("获取文章详情");
      const res = await api_articleApi.getArticleByArticleId(articleId.value);
      if (res.code == 200) {
        console.log(res);
        articleInfo.value = res.data;
        userInfo.value = articleInfo.value.userVO;
      } else {
        toast.show(res.message);
      }
    };
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
    const previewImage = (url, urlList) => {
      console.log(urlList);
      common_vendor.index.previewImage({
        current: url,
        // 当前显示图片的http链接
        urls: urlList
        // 需要预览的图片http链接列表
      });
    };
    const getCommentList = async () => {
      const res = await api_commentApi.getCommentListByArticleId(articleId.value);
      if (res.code == 200) {
        console.log(res);
        commentList.value = res.data;
      } else {
        toast.show(res.message);
      }
    };
    const handleComment = (comment) => {
      console.log(comment.userVO.userName);
      text.value = "回复@" + comment.userVO.userName + "：";
      console.log(comment);
      parentId.value = comment.id;
    };
    const submitComment = async () => {
      const data = {
        articleId: articleId.value,
        content: commentText.value,
        userId: user.value.id,
        parentId: parentId.value
      };
      console.log("发布评论", data);
      const res = await api_commentApi.addComment(data);
      if (res.code == 200) {
        toast.show("评论成功");
        commentText.value = "";
        parentId.value = 0;
        getCommentList();
      } else {
        toast.show(res.message);
      }
    };
    const handleDeleteArticle = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定删除该文章吗？",
        success: async function(res) {
          if (res.confirm) {
            const res2 = await api_articleApi.deleteArticle(articleId.value);
            if (res2.code == 200) {
              toast.show("删除成功");
              setTimeout(() => {
                const pages = getCurrentPages();
                const indexPage = pages.find((page) => page.route === "pages/index/index");
                if (indexPage) {
                  indexPage.$vm.setNeedRefresh();
                }
                common_vendor.index.switchTab({
                  url: "/pages/index/index"
                });
              }, 1e3);
            } else {
              toast.show(res2.message);
            }
          }
        }
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
    const formatContent = (content) => {
      if (!content)
        return "";
      return content.split("\n").map((text2) => `<div class="content-paragraph">${text2}</div>`).join("");
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
      return common_vendor.e({
        a: common_vendor.p({
          width: 60,
          height: 60,
          src: (_a = userInfo.value) == null ? void 0 : _a.imageUrl,
          round: true
        }),
        b: ((_b = user.value) == null ? void 0 : _b.id) == ((_c = articleInfo.value) == null ? void 0 : _c.userId)
      }, ((_d = user.value) == null ? void 0 : _d.id) == ((_e = articleInfo.value) == null ? void 0 : _e.userId) ? {} : {}, {
        c: common_vendor.t((_f = userInfo.value) == null ? void 0 : _f.userName),
        d: common_vendor.t(common_vendor.unref(uni_modules_wotDesignUni_components_common_dayjs.dayjs)((_g = articleInfo.value) == null ? void 0 : _g.createTime).format("MM月DD日 HH:mm")),
        e: formatContent((_h = articleInfo.value) == null ? void 0 : _h.content),
        f: (_j = (_i = articleInfo.value) == null ? void 0 : _i.imagesList) == null ? void 0 : _j.length
      }, ((_l = (_k = articleInfo.value) == null ? void 0 : _k.imagesList) == null ? void 0 : _l.length) ? {
        g: common_vendor.f((_m = articleInfo.value) == null ? void 0 : _m.imagesList, (url, index, i0) => {
          return common_vendor.e({
            a: "e87f28a7-1-" + i0,
            b: common_vendor.p({
              width: "100%",
              height: "100%",
              mode: "aspectFill",
              ["show-menu-by-longpress"]: true,
              radius: "12px",
              src: url
            }),
            c: index === 0 && articleInfo.value.imagesList.length > 1
          }, index === 0 && articleInfo.value.imagesList.length > 1 ? {
            d: "e87f28a7-2-" + i0,
            e: common_vendor.p({
              name: "picture",
              size: "14px",
              color: "#fff"
            }),
            f: common_vendor.t(articleInfo.value.imagesList.length)
          } : {}, {
            g: index,
            h: common_vendor.o(($event) => previewImage(url, articleInfo.value.imagesList), index)
          });
        }),
        h: common_vendor.n(getImageLayoutClass((_n = articleInfo.value) == null ? void 0 : _n.imagesList.length))
      } : {}, {
        i: ((_o = user.value) == null ? void 0 : _o.id) == ((_p = articleInfo.value) == null ? void 0 : _p.userId)
      }, ((_q = user.value) == null ? void 0 : _q.id) == ((_r = articleInfo.value) == null ? void 0 : _r.userId) ? common_vendor.e({
        j: ((_s = user.value) == null ? void 0 : _s.id) == ((_t = articleInfo.value) == null ? void 0 : _t.userId)
      }, ((_u = user.value) == null ? void 0 : _u.id) == ((_v = articleInfo.value) == null ? void 0 : _v.userId) ? {
        k: common_vendor.p({
          name: "delete",
          size: "16px",
          color: "#FF5252"
        }),
        l: common_vendor.o(handleDeleteArticle)
      } : {}) : {}, {
        m: common_vendor.t(((_w = articleInfo.value) == null ? void 0 : _w.commentCount) || 0),
        n: (_x = commentList.value) == null ? void 0 : _x.length
      }, ((_y = commentList.value) == null ? void 0 : _y.length) ? {
        o: common_vendor.f(commentList.value, (item, k0, i0) => {
          var _a2, _b2, _c2;
          return common_vendor.e({
            a: "e87f28a7-5-" + i0,
            b: common_vendor.p({
              width: 50,
              height: 50,
              src: item.userVO.imageUrl,
              round: true
            }),
            c: common_vendor.t((_a2 = item.userVO) == null ? void 0 : _a2.userName),
            d: common_vendor.t(item.createTime),
            e: common_vendor.t(item.content),
            f: common_vendor.o(($event) => handleComment(item), item.id),
            g: (_b2 = item.replies) == null ? void 0 : _b2.length
          }, ((_c2 = item.replies) == null ? void 0 : _c2.length) ? {
            h: common_vendor.f(item.replies, (sub, k1, i1) => {
              var _a3, _b3;
              return {
                a: common_vendor.t((_a3 = sub.userVO) == null ? void 0 : _a3.userName),
                b: common_vendor.t((_b3 = sub.parentUserVO) == null ? void 0 : _b3.userName),
                c: common_vendor.t(sub.content),
                d: common_vendor.o(($event) => handleComment(sub), sub.id),
                e: common_vendor.t(sub.createTime),
                f: sub.id
              };
            })
          } : {}, {
            i: item.id
          });
        })
      } : {
        p: common_vendor.p({
          image: "content",
          tip: "暂无评论"
        })
      }, {
        q: common_vendor.p({
          ["safe-area-bottom"]: true,
          height: "120"
        }),
        r: common_vendor.o(submitComment),
        s: common_vendor.o(($event) => commentText.value = $event),
        t: common_vendor.p({
          placeholder: text.value,
          clearable: true,
          ["no-border"]: true,
          ["prefix-icon"]: "edit-1",
          ["placeholder-style"]: "color: #999;",
          modelValue: commentText.value
        }),
        v: common_vendor.o(submitComment),
        w: common_vendor.p({
          type: "primary",
          size: "small",
          disabled: !commentText.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-e87f28a7"]]);
wx.createPage(MiniProgramPage);
