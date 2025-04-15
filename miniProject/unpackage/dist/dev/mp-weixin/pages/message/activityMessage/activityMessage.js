"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  _easycom_wd_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "activityMessage",
  setup(__props) {
    const messages = common_vendor.ref([
      {
        id: 1,
        type: "invite",
        title: "编程技术交流会",
        time: "2024-01-25 14:00-16:00",
        location: "图书馆三楼会议室",
        content: "诚邀您参加本周四下午的编程技术交流会，届时将讨论前端开发的最新趋势。",
        status: "pending",
        isRead: false
      },
      {
        id: 2,
        type: "update",
        title: "校园歌手大赛",
        time: "2024-01-28 19:00-21:00",
        location: "大学生活动中心",
        content: "您报名的校园歌手大赛时间已调整，请查看最新安排。",
        status: "confirmed",
        isRead: true
      },
      {
        id: 3,
        type: "reminder",
        title: "篮球友谊赛",
        time: "2024-01-22 15:00-17:00",
        location: "体育馆主场",
        content: "提醒：您报名的篮球友谊赛将在明天下午开始，请准时到场。",
        status: "declined",
        isRead: false
      }
    ]);
    const getStatusText = (status) => {
      const statusMap = {
        pending: "待确认",
        confirmed: "已确认",
        declined: "已婉拒",
        canceled: "已取消"
      };
      return statusMap[status] || "待确认";
    };
    const getNoticeLabel = (type) => {
      const labels = {
        invite: "活动邀请",
        update: "活动更新",
        reminder: "活动提醒",
        cancel: "活动取消"
      };
      return labels[type] || "活动通知";
    };
    const getActionText = (status) => {
      const actionMap = {
        confirmed: "您已确认参加",
        declined: "您已婉拒参加",
        canceled: "活动已取消"
      };
      return actionMap[status] || "";
    };
    const handleMessageClick = (item) => {
      item.isRead = true;
      common_vendor.index.navigateTo({
        url: `/pages/activity/detail?id=${item.id}`
      });
    };
    const handleConfirm = (item) => {
      item.status = "confirmed";
      common_vendor.index.showToast({
        title: "已确认参加",
        icon: "success"
      });
    };
    const handleDecline = (item) => {
      item.status = "declined";
      common_vendor.index.showToast({
        title: "已婉拒参加",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(messages.value.length),
        b: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(getStatusText(item.status)),
            b: common_vendor.n(item.status),
            c: common_vendor.t(item.title),
            d: "82ff9c19-0-" + i0,
            e: common_vendor.t(item.time),
            f: "82ff9c19-1-" + i0,
            g: common_vendor.t(item.location),
            h: common_vendor.t(getNoticeLabel(item.type)),
            i: common_vendor.t(item.content),
            j: item.status === "pending"
          }, item.status === "pending" ? {
            k: common_vendor.o(($event) => handleConfirm(item), index)
          } : {}, {
            l: item.status === "pending"
          }, item.status === "pending" ? {
            m: common_vendor.o(($event) => handleDecline(item), index)
          } : {
            n: common_vendor.t(getActionText(item.status))
          }, {
            o: index,
            p: !item.isRead ? 1 : "",
            q: common_vendor.o(($event) => handleMessageClick(item), index)
          });
        }),
        c: common_vendor.p({
          name: "time",
          size: "28rpx",
          color: "#999"
        }),
        d: common_vendor.p({
          name: "location",
          size: "28rpx",
          color: "#999"
        }),
        e: messages.value.length === 0
      }, messages.value.length === 0 ? {
        f: common_assets._imports_0$6
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-82ff9c19"]]);
wx.createPage(MiniProgramPage);
