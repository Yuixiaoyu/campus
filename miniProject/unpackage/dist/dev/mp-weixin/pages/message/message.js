"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  _easycom_wd_img2();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
if (!Math) {
  _easycom_wd_img();
}
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const newAttentionCount = common_vendor.ref(2);
    const newLikeCount = common_vendor.ref(5);
    const newCommentCount = common_vendor.ref(3);
    const messageList = common_vendor.ref([
      {
        id: 1,
        type: "system",
        username: "校园助手",
        avatar: "/static/avatar.jpg",
        message: "欢迎使用校园助手，有什么可以帮您的吗？",
        time: "刚刚",
        isRead: false,
        online: true,
        unreadCount: 1
      },
      {
        id: 3,
        type: "activity",
        activityId: "act001",
        username: "社团活动",
        avatar: "/static/avatar.jpg",
        message: "本周末有趣味运动会活动，欢迎报名参加！",
        time: "30分钟前",
        isRead: false,
        unreadCount: 3
      }
    ]);
    const handleCardClick = (type) => {
      switch (type) {
        case "attention":
          newAttentionCount.value = 0;
          common_vendor.index.navigateTo({
            url: "/pages/message/newFollowers/newFollowers"
          });
          break;
        case "like":
          newLikeCount.value = 0;
          common_vendor.index.navigateTo({
            url: "/pages/message/likes/likes"
          });
          break;
        case "comment":
          newCommentCount.value = 0;
          common_vendor.index.navigateTo({
            url: "/pages/message/comments/comments"
          });
          break;
      }
    };
    const handleMessageClick = (item) => {
      item.isRead = true;
      item.unreadCount = 0;
      switch (item.type) {
        case "system":
          common_vendor.index.navigateTo({
            url: "/pages/message/systemMessage/systemMessage"
          });
          break;
        case "activity":
          common_vendor.index.navigateTo({
            url: `/pages/message/activityMessage/activityMessage?id=${item.activityId}`
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: newAttentionCount.value > 0
      }, newAttentionCount.value > 0 ? {
        c: common_vendor.t(newAttentionCount.value)
      } : {}, {
        d: common_vendor.o(($event) => handleCardClick("attention")),
        e: common_assets._imports_1,
        f: newLikeCount.value > 0
      }, newLikeCount.value > 0 ? {
        g: common_vendor.t(newLikeCount.value)
      } : {}, {
        h: common_vendor.o(($event) => handleCardClick("like")),
        i: common_assets._imports_2,
        j: newCommentCount.value > 0
      }, newCommentCount.value > 0 ? {
        k: common_vendor.t(newCommentCount.value)
      } : {}, {
        l: common_vendor.o(($event) => handleCardClick("comment")),
        m: common_vendor.f(messageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "4c1b26cf-0-" + i0,
            b: common_vendor.p({
              width: 90,
              height: 90,
              round: true,
              src: item.avatar || "/static/avatar.jpg"
            }),
            c: item.online
          }, item.online ? {} : {}, {
            d: common_vendor.t(item.username),
            e: common_vendor.t(item.time),
            f: common_vendor.t(item.message),
            g: item.unreadCount
          }, item.unreadCount ? {
            h: common_vendor.t(item.unreadCount)
          } : {}, {
            i: index,
            j: !item.isRead ? 1 : "",
            k: common_vendor.o(($event) => handleMessageClick(item), index)
          });
        }),
        n: messageList.value.length === 0
      }, messageList.value.length === 0 ? {
        o: common_assets._imports_3
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
