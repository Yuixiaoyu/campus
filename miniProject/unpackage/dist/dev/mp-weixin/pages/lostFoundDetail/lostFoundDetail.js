"use strict";
const common_vendor = require("../../common/vendor.js");
const api_itemsApi = require("../../api/itemsApi.js");
const api_uploadApi = require("../../api/uploadApi.js");
const utils_userStorage = require("../../utils/userStorage.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_overlay2 = common_vendor.resolveComponent("wd-overlay");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_icon2 + _easycom_wd_swiper2 + _easycom_wd_img2 + _easycom_wd_button2 + _easycom_wd_upload2 + _easycom_wd_textarea2 + _easycom_wd_overlay2 + _easycom_wd_toast2)();
}
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_overlay = () => "../../uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_icon + _easycom_wd_swiper + _easycom_wd_img + _easycom_wd_button + _easycom_wd_upload + _easycom_wd_textarea + _easycom_wd_overlay + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "lostFoundDetail",
  setup(__props) {
    const show = common_vendor.ref(false);
    common_vendor.ref("");
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const itemsDetail = common_vendor.ref({});
    const fileList = common_vendor.ref([]);
    const paramsMatch = common_vendor.ref({
      urlList: [],
      userId: 0,
      description: "",
      foundItemId: 0
    });
    const handleChange = (file) => {
      console.log("files:", file);
      console.log(fileList.value);
      fileList.value = file;
    };
    const beforeImageRemove = (res) => {
      const url = paramsMatch.value.urlList[res.index];
      console.log("删除前置处理", url);
      api_uploadApi.deleteFile(url).then((response) => {
        if (response.code === 200) {
          console.log("删除成功", response);
          fileList.value.splice(res.index, 1);
          paramsMatch.value.urlList.splice(res.index, 1);
          console.log("paramsMatch>>>", paramsMatch);
        } else {
          console.log("删除失败", response);
        }
      });
    };
    const uploadSuccess = (res) => {
      console.log("上传成功res", res.file.response);
      const result = JSON.parse(res.file.response);
      console.log("上传成功result.data", result.data);
      paramsMatch.value.urlList.push(...result.data);
      console.log(paramsMatch.value);
    };
    const handleSubmit = async () => {
      console.log(paramsMatch.value);
      const res = await api_itemsApi.addMatchRecords(paramsMatch.value);
      if (res.code === 200) {
        console.log(res);
        toast.success({
          msg: "等待对方审核~",
          zIndex: 1e3,
          cover: true
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } else {
        toast.error({
          msg: res.message,
          zIndex: 1e3,
          cover: true
        });
      }
    };
    function handleClick(e) {
    }
    function onChange(e) {
    }
    const getLostFoundDetail = async (id) => {
      console.log(id);
      const res = await api_itemsApi.getItemsById(id);
      if (res.code === 200) {
        console.log(res.data);
        itemsDetail.value = res.data;
      } else {
        console.log(res.message);
      }
    };
    common_vendor.onLoad((options) => {
      console.log(options);
      getLostFoundDetail(options.id);
      paramsMatch.value.foundItemId = options.id;
      paramsMatch.value.userId = utils_userStorage.getUserInfo().id;
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
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: common_vendor.t(itemsDetail.value.title),
        b: common_vendor.t(itemsDetail.value.eventTime),
        c: common_vendor.p({
          name: "discount",
          size: "18px",
          color: "#b0a0e6"
        }),
        d: common_vendor.t(itemsDetail.value.category),
        e: common_vendor.p({
          name: "view",
          size: "18px",
          color: "#b0a0e6"
        }),
        f: common_vendor.p({
          name: "location",
          size: "18px",
          color: "#b0a0e6"
        }),
        g: common_vendor.t(itemsDetail.value.location),
        h: ((_a = itemsDetail.value.url) == null ? void 0 : _a.length) != 0
      }, ((_b = itemsDetail.value.url) == null ? void 0 : _b.length) != 0 ? {
        i: common_vendor.o(handleClick),
        j: common_vendor.o(onChange),
        k: common_vendor.p({
          list: (_c = itemsDetail.value) == null ? void 0 : _c.url,
          indicator: {
            type: "fraction"
          },
          autoplay: true,
          indicatorPosition: "bottom-right"
        })
      } : {}, {
        l: common_vendor.t(itemsDetail.value.description),
        m: common_vendor.p({
          width: 50,
          height: 50,
          round: true,
          src: (_e = (_d = itemsDetail.value) == null ? void 0 : _d.userVO) == null ? void 0 : _e.imageUrl
        }),
        n: common_vendor.t((_g = (_f = itemsDetail.value) == null ? void 0 : _f.userVO) == null ? void 0 : _g.userName),
        o: common_vendor.o(($event) => show.value = true),
        p: common_vendor.p({
          type: "primary"
        }),
        q: common_vendor.sr("uploadFile", "3b1cb06c-7,3b1cb06c-6"),
        r: common_vendor.o(handleChange),
        s: common_vendor.o(uploadSuccess),
        t: common_vendor.o(($event) => fileList.value = $event),
        v: common_vendor.p({
          limit: 6,
          multiple: true,
          accept: "image",
          action: "https://campus.fybreeze.cn/api/article/uploadImages",
          ["before-remove"]: beforeImageRemove,
          ["file-list"]: fileList.value
        }),
        w: common_vendor.o(($event) => paramsMatch.value.description = $event),
        x: common_vendor.p({
          placeholder: "请填写物品的信息",
          modelValue: paramsMatch.value.description
        }),
        y: common_vendor.o(($event) => show.value = false),
        z: common_vendor.p({
          type: "info"
        }),
        A: common_vendor.o(handleSubmit),
        B: common_vendor.o(() => {
        }),
        C: common_vendor.o(($event) => show.value = false),
        D: common_vendor.p({
          show: show.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-3b1cb06c"]]);
wx.createPage(MiniProgramPage);
