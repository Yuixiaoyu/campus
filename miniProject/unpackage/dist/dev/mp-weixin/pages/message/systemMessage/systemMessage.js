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
  __name: "systemMessage",
  setup(__props) {
    const messages = common_vendor.ref([
      {
        id: 1,
        type: "sound",
        title: "系统维护通知",
        content: "亲爱的用户，系统将于本周六凌晨2:00-4:00进行例行维护，期间可能影响部分功能的使用。",
        time: "2024-01-20 10:00",
        isRead: false
      },
      {
        id: 2,
        type: "update",
        title: "版本更新提醒",
        content: "校园社区2.0版本已发布，新增动态表情功能，欢迎体验！",
        time: "2024-01-19 15:30",
        isRead: true
      },
      {
        id: 3,
        type: "internet",
        title: "账号安全提醒",
        content: "检测到您的账号在新设备上登录，如非本人操作，请及时修改密码。",
        time: "2024-01-18 20:15",
        isRead: false
      }
    ]);
    const getTypeIcon = (type) => {
      const icons = {
        sound: "sound",
        update: "refresh",
        internet: "internet"
      };
      return icons[type] || "sound";
    };
    const getTypeColor = (type) => {
      const colors = {
        notice: "#409EFF",
        update: "#67C23A",
        security: "#E6A23C"
      };
      return colors[type] || "#409EFF";
    };
    const handleMessageClick = (item) => {
      item.isRead = true;
      common_vendor.index.navigateTo({
        url: `/pages/message/detail?id=${item.id}&type=system`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(messages.value.length),
        b: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: "f9e2dd3f-0-" + i0,
            b: common_vendor.p({
              name: getTypeIcon(item.type),
              size: "48rpx",
              color: getTypeColor(item.type)
            }),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.content),
            e: common_vendor.t(item.time),
            f: !item.isRead
          }, !item.isRead ? {} : {}, {
            g: index,
            h: !item.isRead ? 1 : "",
            i: common_vendor.o(($event) => handleMessageClick(item), index)
          });
        }),
        c: messages.value.length === 0
      }, messages.value.length === 0 ? {
        d: common_assets._imports_0$5
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f9e2dd3f"]]);
wx.createPage(MiniProgramPage);
