"use strict";
const common_vendor = require("../../common/vendor.js");
const api_clubApi = require("../../api/clubApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_swiper2 + _easycom_wd_img2 + _easycom_wd_icon2 + _easycom_wd_loading2 + _easycom_wd_toast2)();
}
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_swiper + _easycom_wd_img + _easycom_wd_icon + _easycom_wd_loading + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "club",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const current = common_vendor.ref(0);
    const swiperList = common_vendor.ref([
      "https://pic1.imgdb.cn/item/67f61a7b88c538a9b5c7634d.webp"
    ]);
    const loading = common_vendor.ref(false);
    const clubList = common_vendor.ref([]);
    const fetchClubList = async () => {
      try {
        loading.value = true;
        const params = {
          current: 1,
          pageSize: 6
          // 显示6个精选社团
        };
        const res = await api_clubApi.getClubList(params);
        if (res.code == 200) {
          clubList.value = res.data.records;
        } else {
          toast.error(res.message || "获取社团列表失败");
        }
      } catch (error) {
        console.error("获取社团列表错误:", error);
        toast.error("获取社团列表失败");
      } finally {
        loading.value = false;
      }
    };
    const handleClubClick = (club) => {
      common_vendor.index.navigateTo({
        url: `/pages/clubDetail/clubDetail?id=${club.id}`
      });
    };
    function handleClick(e) {
    }
    function onChange(e) {
    }
    common_vendor.onMounted(() => {
      fetchClubList();
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
        a: common_vendor.o(handleClick),
        b: common_vendor.o(onChange),
        c: common_vendor.o(($event) => current.value = $event),
        d: common_vendor.p({
          list: swiperList.value,
          direction: "vertical",
          imageMode: "scaleToFill",
          indicatorPosition: "right",
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
          src: "https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fd7.png"
        }),
        f: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fda.png"
        }),
        g: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fd8.png"
        }),
        h: common_vendor.p({
          width: 65,
          height: 65,
          round: true,
          src: "https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fd9.png"
        }),
        i: common_vendor.p({
          name: "star-on",
          size: "22px",
          color: "#22a6b3"
        }),
        j: common_vendor.f(clubList.value, (club, k0, i0) => {
          return common_vendor.e({
            a: club.cover
          }, club.cover ? {
            b: club.cover
          } : {}, {
            c: common_vendor.t(club.name),
            d: common_vendor.t(club.profile),
            e: club.id,
            f: common_vendor.o(($event) => handleClubClick(club), club.id)
          });
        }),
        k: loading.value
      }, loading.value ? {} : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-3556ad49"]]);
wx.createPage(MiniProgramPage);
