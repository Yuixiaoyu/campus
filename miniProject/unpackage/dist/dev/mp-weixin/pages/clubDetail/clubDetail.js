"use strict";
const common_vendor = require("../../common/vendor.js");
const api_clubApi = require("../../api/clubApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_loading2 + _easycom_wd_icon2 + _easycom_wd_toast2)();
}
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_loading + _easycom_wd_icon + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "clubDetail",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const imageLoaded = common_vendor.ref(false);
    const loading = common_vendor.ref(true);
    const clubInfo = common_vendor.ref({
      id: 0,
      name: "",
      profile: "",
      cover: "",
      avatar: "",
      grandTotal: 0,
      awards: [],
      userVO: {
        imageUrl: "",
        userName: "",
        userAccount: "",
        userProfile: "",
        userRole: ""
      }
    });
    const handleImageLoad = () => {
      imageLoaded.value = true;
    };
    const handleSectionClick = () => {
      common_vendor.index.vibrateShort();
    };
    const fetchClubDetail = async (id) => {
      try {
        loading.value = true;
        const res = await api_clubApi.getClubDetail(id);
        console.log(res);
        if (res.code === 200 && res.data) {
          clubInfo.value = res.data;
        } else {
          toast.error("获取社团详情失败");
        }
      } catch (error) {
        console.error("获取社团详情错误:", error);
        toast.error("获取社团详情失败");
      } finally {
        loading.value = false;
      }
    };
    const previewImage = (url) => {
      common_vendor.index.previewImage({
        urls: clubInfo.value.awards,
        current: url
      });
    };
    const handleActivityClick = (activity) => {
      console.log(activity);
      common_vendor.index.navigateTo({
        url: `/pages/activityDetail/activityDetail?activityInfo=${JSON.stringify(activity)}`
      });
    };
    const getStatusClass = (status) => {
      switch (status) {
        case 0:
          return "status-upcoming";
        case 1:
          return "status-ongoing";
        case 2:
          return "status-ended";
        default:
          return "status-unknown";
      }
    };
    const getStatusText = (status) => {
      switch (status) {
        case 0:
          return "即将开始";
        case 1:
          return "进行中";
        case 2:
          return "已结束";
        default:
          return "未知状态";
      }
    };
    common_vendor.onLoad((option) => {
      if (option == null ? void 0 : option.id) {
        fetchClubDetail(Number(option.id));
      } else {
        toast.error("参数错误");
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : common_vendor.e({
        b: clubInfo.value.cover
      }, clubInfo.value.cover ? {
        c: clubInfo.value.cover
      } : {}, {
        d: clubInfo.value.avatar
      }, clubInfo.value.avatar ? {
        e: clubInfo.value.avatar
      } : {}, {
        f: common_vendor.t(clubInfo.value.name),
        g: common_vendor.t(clubInfo.value.grandTotal || 0),
        h: common_vendor.p({
          name: "info",
          color: "#007AFF"
        }),
        i: common_vendor.t(clubInfo.value.profile || "暂无介绍"),
        j: common_vendor.o(handleSectionClick),
        k: common_vendor.p({
          name: "user",
          color: "#007AFF"
        }),
        l: clubInfo.value.userVO
      }, clubInfo.value.userVO ? common_vendor.e({
        m: clubInfo.value.userVO.imageUrl || "/static/default-avatar.png",
        n: common_vendor.o(handleImageLoad),
        o: !imageLoaded.value
      }, !imageLoaded.value ? {} : {}, {
        p: common_vendor.t(clubInfo.value.userVO.userName || "未设置姓名"),
        q: common_vendor.t(clubInfo.value.userVO.userAccount),
        r: clubInfo.value.userVO.tagList && clubInfo.value.userVO.tagList.length > 0
      }, clubInfo.value.userVO.tagList && clubInfo.value.userVO.tagList.length > 0 ? {
        s: common_vendor.f(clubInfo.value.userVO.tagList, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        })
      } : {}, {
        t: clubInfo.value.userVO.gender !== void 0
      }, clubInfo.value.userVO.gender !== void 0 ? {
        v: common_vendor.p({
          name: clubInfo.value.userVO.gender === 1 ? "male" : "female",
          color: clubInfo.value.userVO.gender === 1 ? "#007AFF" : "#FF69B4",
          size: "28rpx"
        })
      } : {}, {
        w: clubInfo.value.userVO.constellation
      }, clubInfo.value.userVO.constellation ? {
        x: common_vendor.p({
          name: "star",
          color: "#FFB900",
          size: "28rpx"
        }),
        y: common_vendor.t(clubInfo.value.userVO.constellation)
      } : {}, {
        z: common_vendor.t(clubInfo.value.userVO.userProfile || "这个社长很懒，还没有填写简介~")
      }) : {}, {
        A: common_vendor.o(handleSectionClick),
        B: clubInfo.value.awards && clubInfo.value.awards.length > 0
      }, clubInfo.value.awards && clubInfo.value.awards.length > 0 ? {
        C: common_vendor.p({
          name: "trophy",
          color: "#FFB900"
        }),
        D: common_vendor.f(clubInfo.value.awards, (award, index, i0) => {
          return {
            a: award,
            b: "1977119b-6-" + i0,
            c: index,
            d: common_vendor.o(($event) => previewImage(award), index)
          };
        }),
        E: common_vendor.p({
          name: "zoom-in",
          color: "#fff",
          size: "40rpx"
        })
      } : {}, {
        F: clubInfo.value.activityVOList && clubInfo.value.activityVOList.length > 0
      }, clubInfo.value.activityVOList && clubInfo.value.activityVOList.length > 0 ? {
        G: common_vendor.p({
          name: "calendar",
          color: "#007AFF"
        }),
        H: common_vendor.f(clubInfo.value.activityVOList, (activity, index, i0) => {
          return common_vendor.e({
            a: activity.coverPicture
          }, activity.coverPicture ? {
            b: activity.coverPicture
          } : {}, {
            c: common_vendor.t(activity.title),
            d: "1977119b-8-" + i0,
            e: common_vendor.t(activity.startTime),
            f: "1977119b-9-" + i0,
            g: common_vendor.t(activity.position || "暂无地点"),
            h: common_vendor.t(activity.profile || "暂无描述"),
            i: common_vendor.t(getStatusText(activity.status)),
            j: common_vendor.n(getStatusClass(activity.status)),
            k: activity.status !== 2
          }, activity.status !== 2 ? {
            l: common_vendor.t(activity.isRegistration ? "已报名" : "未报名"),
            m: common_vendor.n(activity.isRegistration ? "registered" : "not-registered")
          } : {}, {
            n: index,
            o: common_vendor.o(($event) => handleActivityClick(activity), index)
          });
        }),
        I: common_vendor.p({
          name: "time",
          size: "24rpx",
          color: "#666"
        }),
        J: common_vendor.p({
          name: "location",
          size: "24rpx",
          color: "#666"
        })
      } : {}));
    };
  }
});
wx.createPage(_sfc_main);
