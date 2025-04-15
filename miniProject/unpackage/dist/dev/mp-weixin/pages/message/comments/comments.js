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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comments",
  setup(__props) {
    const comments = common_vendor.ref([
      {
        id: 1,
        userName: "小明",
        userAvatar: "/static/avatar.jpg",
        gender: "male",
        time: "刚刚",
        content: "这个观点说得很好，我也是这么认为的！",
        sourceType: "post",
        sourceId: 101,
        sourceContent: "关于如何提高学习效率，我有以下几点建议...",
        sourceImage: "https://bpic.588ku.com/back_origin_min_pic/19/10/22/7d5760a4e3926576c237d950d5964db1.jpg",
        isLiked: false,
        likeCount: 3
      },
      {
        id: 2,
        userName: "小红",
        userAvatar: "/static/avatar.jpg",
        gender: "female",
        time: "10分钟前",
        content: "同学你好，请问这个活动具体在哪个教室举办？",
        sourceType: "activity",
        sourceId: 202,
        sourceContent: "欢迎参加本周六下午的编程交流会...",
        isLiked: true,
        likeCount: 1
      }
    ]);
    const getTypeIcon = (type) => {
      const icons = {
        post: "document",
        activity: "calendar",
        course: "education"
      };
      return icons[type] || "document";
    };
    const getTypeText = (type) => {
      const texts = {
        post: "帖子",
        activity: "活动",
        course: "课程"
      };
      return texts[type] || "帖子";
    };
    const navigateToDetail = (item) => {
      const routes = {
        post: `/pages/post/detail?id=${item.sourceId}`,
        activity: `/pages/activity/detail?id=${item.sourceId}`,
        course: `/pages/course/detail?id=${item.sourceId}`
      };
      common_vendor.index.navigateTo({
        url: routes[item.sourceType] || routes.post
      });
    };
    const handleLike = (item) => {
      item.isLiked = !item.isLiked;
      item.likeCount += item.isLiked ? 1 : -1;
      common_vendor.index.showToast({
        title: item.isLiked ? "已点赞" : "已取消点赞",
        icon: "none"
      });
    };
    const handleReply = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/comment/reply?id=${item.id}&userName=${item.userName}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(comments.value.length),
        b: common_vendor.f(comments.value, (item, index, i0) => {
          return common_vendor.e({
            a: "2ffb9542-0-" + i0,
            b: common_vendor.p({
              width: 80,
              height: 80,
              round: true,
              src: item.userAvatar
            }),
            c: "2ffb9542-1-" + i0,
            d: common_vendor.p({
              name: item.gender === "male" ? "male" : "female",
              size: "24rpx"
            }),
            e: common_vendor.n(item.gender),
            f: common_vendor.t(item.userName),
            g: common_vendor.t(item.time),
            h: common_vendor.t(item.content),
            i: "2ffb9542-2-" + i0,
            j: common_vendor.p({
              name: getTypeIcon(item.sourceType),
              size: "28rpx"
            }),
            k: common_vendor.t(getTypeText(item.sourceType)),
            l: common_vendor.t(item.sourceContent),
            m: item.sourceImage
          }, item.sourceImage ? {
            n: item.sourceImage
          } : {}, {
            o: "2ffb9542-3-" + i0,
            p: common_vendor.p({
              name: item.isLiked ? "like-fill" : "like",
              size: "32rpx",
              color: item.isLiked ? "#409EFF" : "#999"
            }),
            q: common_vendor.t(item.likeCount || "点赞"),
            r: item.isLiked ? 1 : "",
            s: common_vendor.o(($event) => handleLike(item), index),
            t: "2ffb9542-4-" + i0,
            v: common_vendor.o(($event) => handleReply(item), index),
            w: index,
            x: common_vendor.o(($event) => navigateToDetail(item), index)
          });
        }),
        c: common_vendor.p({
          name: "comment",
          size: "32rpx",
          color: "#999"
        }),
        d: comments.value.length === 0
      }, comments.value.length === 0 ? {
        e: common_assets._imports_0$4
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ffb9542"]]);
wx.createPage(MiniProgramPage);
