"use strict";
const common_vendor = require("../../common/vendor.js");
const api_activityApi = require("../../api/activityApi.js");
const utils_activityEnum = require("../../utils/activityEnum.js");
if (!Array) {
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_wd_swiper2 + _easycom_wd_img2 + _easycom_wd_icon2)();
}
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_swiper + _easycom_wd_img + _easycom_wd_icon)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "activity",
  setup(__props) {
    const current = common_vendor.ref(0);
    const swiperList = common_vendor.ref([
      "https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11481.webp",
      "https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11482.webp",
      "https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11484.webp",
      "https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11483.webp"
    ]);
    const pagination = common_vendor.reactive({
      current: 1,
      pageSize: 5,
      total: 0,
      userId: null,
      hasMore: true,
      // 新增刷新锁防止重复请求
      isRefreshing: false
    });
    const activityList = common_vendor.ref([]);
    function handleClick(e) {
    }
    function onChange(e) {
    }
    const handleActivityClick = (index) => {
      console.log("点击活动详情");
      const str = JSON.stringify(activityList.value[index]);
      common_vendor.index.navigateTo({
        url: "/pages/activityDetail/activityDetail?activityInfo=" + str
      });
    };
    const fetchActivityList = async () => {
      const res = await api_activityApi.getActivityList(pagination);
      if (res.code == 200) {
        console.log(res);
        activityList.value = res.data.records;
      } else {
        console.log("获取活动列表失败");
      }
    };
    common_vendor.onShow(() => {
      fetchActivityList();
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
      return {
        a: common_vendor.o(handleClick),
        b: common_vendor.o(onChange),
        c: common_vendor.o(($event) => current.value = $event),
        d: common_vendor.p({
          list: swiperList.value,
          previousMargin: "24px",
          duration: 200,
          nextMargin: "24px",
          imageMode: "scaleToFill",
          indicatorPosition: "bottom",
          autoplay: true,
          indicator: {
            type: "dots-bar"
          },
          current: current.value
        }),
        e: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67deadf888c538a9b5c35202.webp"
        }),
        f: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67deadf888c538a9b5c35201.webp"
        }),
        g: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67deadf888c538a9b5c351ff.webp"
        }),
        h: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67deadf888c538a9b5c35200.webp"
        }),
        i: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67deadf888c538a9b5c351fe.webp"
        }),
        j: common_vendor.p({
          name: "heart-filled",
          size: "22px",
          color: "#22a6b3"
        }),
        k: common_vendor.f(activityList.value, (item, index, i0) => {
          return {
            a: item.coverPicture,
            b: common_vendor.t(common_vendor.unref(utils_activityEnum.getActivityStatus)(item == null ? void 0 : item.status)),
            c: common_vendor.t(item.title),
            d: "da48f91d-7-" + i0,
            e: common_vendor.t(item.endTime),
            f: "da48f91d-8-" + i0,
            g: common_vendor.t(item.position),
            h: index,
            i: common_vendor.o(($event) => handleActivityClick(index), index)
          };
        }),
        l: common_vendor.p({
          name: "time"
        }),
        m: common_vendor.p({
          name: "location"
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-da48f91d"]]);
wx.createPage(MiniProgramPage);
