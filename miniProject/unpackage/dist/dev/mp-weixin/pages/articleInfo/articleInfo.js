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
  const _easycom_wd_text2 = common_vendor.resolveComponent("wd-text");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_divider2 = common_vendor.resolveComponent("wd-divider");
  const _easycom_wd_status_tip2 = common_vendor.resolveComponent("wd-status-tip");
  const _easycom_wd_gap2 = common_vendor.resolveComponent("wd-gap");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_img2 + _easycom_wd_text2 + _easycom_wd_icon2 + _easycom_wd_divider2 + _easycom_wd_status_tip2 + _easycom_wd_gap2 + _easycom_wd_input2 + _easycom_wd_button2 + _easycom_wd_toast2)();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_text = () => "../../uni_modules/wot-design-uni/components/wd-text/wd-text.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_divider = () => "../../uni_modules/wot-design-uni/components/wd-divider/wd-divider.js";
const _easycom_wd_status_tip = () => "../../uni_modules/wot-design-uni/components/wd-status-tip/wd-status-tip.js";
const _easycom_wd_gap = () => "../../uni_modules/wot-design-uni/components/wd-gap/wd-gap.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_text + _easycom_wd_icon + _easycom_wd_divider + _easycom_wd_status_tip + _easycom_wd_gap + _easycom_wd_input + _easycom_wd_button + _easycom_wd_toast)();
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
      console.log("接收到的数据：", options.articleId);
      articleId.value = options.articleId;
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
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      return common_vendor.e({
        a: common_vendor.p({
          width: 40,
          height: 40,
          src: (_a = userInfo.value) == null ? void 0 : _a.imageUrl,
          radius: "5"
        }),
        b: common_vendor.t((_b = userInfo.value) == null ? void 0 : _b.userName),
        c: common_vendor.p({
          size: "16px",
          color: "#5e5e5e",
          text: (_c = articleInfo.value) == null ? void 0 : _c.content
        }),
        d: ((_d = articleInfo.value) == null ? void 0 : _d.imagesList) != null
      }, ((_e = articleInfo.value) == null ? void 0 : _e.imagesList) != null ? {
        e: common_vendor.f((_f = articleInfo.value) == null ? void 0 : _f.imagesList, (url, index, i0) => {
          return {
            a: common_vendor.o(($event) => previewImage(url, articleInfo.value.imagesList), index),
            b: "e87f28a7-2-" + i0,
            c: common_vendor.p({
              width: "100%",
              height: "100%",
              mode: "aspectFill",
              ["show-menu-by-longpress"]: true,
              radius: "5px",
              src: url
            }),
            d: index
          };
        }),
        f: common_vendor.n(getImageLayoutClass((_g = articleInfo.value) == null ? void 0 : _g.imagesList.length))
      } : {}, {
        g: common_vendor.p({
          size: "12px",
          text: common_vendor.unref(uni_modules_wotDesignUni_components_common_dayjs.dayjs)((_h = articleInfo.value) == null ? void 0 : _h.createTime).format("YYYY年MM月DD日HH:mm")
        }),
        h: ((_i = user.value) == null ? void 0 : _i.id) == ((_j = articleInfo.value) == null ? void 0 : _j.userId)
      }, ((_k = user.value) == null ? void 0 : _k.id) == ((_l = articleInfo.value) == null ? void 0 : _l.userId) ? {
        i: common_vendor.o(handleDeleteArticle),
        j: common_vendor.p({
          name: "delete",
          size: "14px",
          color: "#5A6C8F"
        })
      } : {}, {
        k: common_vendor.p({
          text: `评论(` + ((_m = articleInfo.value) == null ? void 0 : _m.commentCount) + `)`
        }),
        l: ((_n = commentList.value) == null ? void 0 : _n.length) != 0
      }, ((_o = commentList.value) == null ? void 0 : _o.length) != 0 ? {
        m: common_vendor.f(commentList.value, (item, k0, i0) => {
          var _a2;
          return {
            a: "e87f28a7-7-" + i0,
            b: common_vendor.p({
              width: 40,
              height: 40,
              src: item.userVO.imageUrl,
              round: true
            }),
            c: common_vendor.t((_a2 = item.userVO) == null ? void 0 : _a2.userName),
            d: "e87f28a7-8-" + i0,
            e: common_vendor.p({
              text: item.createTime,
              size: "12px"
            }),
            f: common_vendor.t(item.content),
            g: common_vendor.o(($event) => handleComment(item), item.id),
            h: common_vendor.f(item.replies, (sub, k1, i1) => {
              var _a3, _b2;
              return {
                a: common_vendor.t((_a3 = sub.userVO) == null ? void 0 : _a3.userName),
                b: "e87f28a7-9-" + i0 + "-" + i1,
                c: common_vendor.t((_b2 = sub.parentUserVO) == null ? void 0 : _b2.userName),
                d: common_vendor.t(sub.content),
                e: common_vendor.o(($event) => handleComment(sub), sub.id),
                f: "e87f28a7-10-" + i0 + "-" + i1,
                g: common_vendor.p({
                  text: sub.createTime,
                  size: "12px"
                }),
                h: sub.id
              };
            }),
            i: item.id
          };
        }),
        n: common_vendor.p({
          text: "回复"
        })
      } : {
        o: common_vendor.p({
          image: "content",
          tip: "暂无评论"
        })
      }, {
        p: common_vendor.p({
          ["safe-area-bottom"]: true,
          height: "60"
        }),
        q: common_vendor.o(submitComment),
        r: common_vendor.o(($event) => commentText.value = $event),
        s: common_vendor.p({
          placeholder: text.value,
          clearable: true,
          ["no-border"]: true,
          ["prefix-icon"]: "edit-1",
          ["placeholder-style"]: "color: #999;",
          modelValue: commentText.value
        }),
        t: common_vendor.o(submitComment),
        v: common_vendor.p({
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
