"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
const uni_modules_wotDesignUni_components_common_dayjs = require("../../uni_modules/wot-design-uni/components/common/dayjs.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_uploadApi = require("../../api/uploadApi.js");
const utils_userStorage = require("../../utils/userStorage.js");
const api_itemsApi = require("../../api/itemsApi.js");
if (!Array) {
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_input2 + _easycom_wd_datetime_picker2 + _easycom_wd_tag2 + _easycom_wd_upload2 + _easycom_wd_button2 + _easycom_wd_toast2)();
}
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_datetime_picker = () => "../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_input + _easycom_wd_datetime_picker + _easycom_wd_tag + _easycom_wd_upload + _easycom_wd_button + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "lostFoundPublish",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const fileList = common_vendor.ref();
    const dateValue = common_vendor.ref(Date.now());
    const categoryTags = common_vendor.ref([
      "手机数码",
      "证件卡片",
      "钱包",
      "钥匙",
      "包包",
      "衣物",
      "首饰配件",
      "图书资料",
      "生活用品",
      "其他"
    ]);
    const lostFoundPublishParams = common_vendor.ref({
      category: "",
      description: "",
      eventTime: "",
      itemType: 1,
      // 1-丢失 2-招领
      location: "",
      currentLocation: "",
      title: "",
      urlList: [],
      userId: 0
    });
    const handleChange = (file) => {
      console.log("files:", file);
      console.log(fileList.value);
      fileList.value = file;
    };
    const beforeImageRemove = (res) => {
      const url = lostFoundPublishParams.value.urlList[res.index];
      console.log("删除前置处理", url);
      api_uploadApi.deleteFile(url).then((response) => {
        if (response.code === 200) {
          console.log("删除成功", response);
          fileList.value.splice(res.index, 1);
          lostFoundPublishParams.value.urlList.splice(res.index, 1);
          console.log("publishArticleParams>>>", lostFoundPublishParams);
        } else {
          console.log("删除失败", response);
        }
      });
    };
    const uploadSuccess = (res) => {
      console.log("上传成功res", res.file.response);
      const result = JSON.parse(res.file.response);
      console.log("上传成功result.data", result.data);
      lostFoundPublishParams.value.urlList.push(...result.data);
      console.log(lostFoundPublishParams.value);
    };
    const handleTagSelect = (tag) => {
      lostFoundPublishParams.value.category = tag;
    };
    const validateForm = () => {
      var _a, _b, _c, _d, _e;
      const params = lostFoundPublishParams.value;
      if (!((_a = params.title) == null ? void 0 : _a.trim())) {
        toast.show("请输入标题");
        return false;
      }
      if (!((_b = params.description) == null ? void 0 : _b.trim())) {
        toast.show("请输入描述");
        return false;
      }
      if (!((_c = params.location) == null ? void 0 : _c.trim())) {
        toast.show("请输入丢失/拾获地点");
        return false;
      }
      if (!dateValue) {
        toast.show("请选择时间");
        return false;
      }
      if (!((_d = params.category) == null ? void 0 : _d.trim())) {
        toast.show("请选择物品类型");
        return false;
      }
      if (params.itemType === 2 && !((_e = params.currentLocation) == null ? void 0 : _e.trim())) {
        toast.show("请输入当前物品位置");
        return false;
      }
      return true;
    };
    const handlePublish = async () => {
      if (!validateForm()) {
        return;
      }
      lostFoundPublishParams.value.eventTime = uni_modules_wotDesignUni_components_common_dayjs.dayjs(dateValue.value).format("YYYY-MM-DD HH:mm:ss");
      common_vendor.index.showLoading({
        title: "发布中",
        mask: true
      });
      try {
        const res = await api_itemsApi.addItems(lostFoundPublishParams.value);
        if (res.code === 200) {
          toast.show({
            msg: "发布成功",
            cover: true
          });
          const pages = getCurrentPages();
          const prevPage = pages[pages.length - 2];
          setTimeout(() => {
            if (prevPage && prevPage.route === "pages/lostFound/lostFound") {
              if (typeof prevPage.$vm.setNeedRefresh === "function") {
                console.log("调用刷新方法");
                prevPage.$vm.setNeedRefresh();
              } else {
                console.error("setNeedRefresh 方法未找到");
              }
            }
            common_vendor.index.navigateBack({
              delta: 1
            });
          }, 1500);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("发布失败:", error);
        toast.error("发布失败，请重试");
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const handleTypeChange = (type) => {
      lostFoundPublishParams.value.itemType = type;
      if (type === 1) {
        lostFoundPublishParams.value.currentLocation = "";
      }
    };
    common_vendor.onLoad((options) => {
      const loginUser = utils_userStorage.getUserInfo();
      lostFoundPublishParams.value.userId = loginUser == null ? void 0 : loginUser.id;
      if (options && options.type) {
        const type = parseInt(options.type);
        console.log("type>>", type);
        lostFoundPublishParams.value.itemType = type;
        if (type === 2) {
          lostFoundPublishParams.value.currentLocation = "";
        }
      }
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
        a: lostFoundPublishParams.value.itemType === 1 ? 1 : "",
        b: common_vendor.o(($event) => {
          handleTypeChange(1);
          lostFoundPublishParams.value.currentLocation = "";
        }),
        c: lostFoundPublishParams.value.itemType === 2 ? 1 : "",
        d: common_vendor.o(($event) => handleTypeChange(2)),
        e: common_vendor.o(($event) => lostFoundPublishParams.value.title = $event),
        f: common_vendor.p({
          placeholder: "请输入标题",
          clearable: true,
          maxlength: 20,
          ["show-word-limit"]: true,
          modelValue: lostFoundPublishParams.value.title
        }),
        g: common_vendor.o(($event) => dateValue.value = $event),
        h: common_vendor.p({
          label: "",
          modelValue: dateValue.value
        }),
        i: common_vendor.o(($event) => lostFoundPublishParams.value.location = $event),
        j: common_vendor.p({
          placeholder: "请输入掉落地点",
          clearable: true,
          modelValue: lostFoundPublishParams.value.location
        }),
        k: common_vendor.o(($event) => lostFoundPublishParams.value.description = $event),
        l: common_vendor.p({
          placeholder: "请输入物品描述",
          type: "textarea",
          rows: 3,
          modelValue: lostFoundPublishParams.value.description
        }),
        m: common_vendor.f(categoryTags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag,
            c: common_vendor.o(($event) => handleTagSelect(tag), tag),
            d: "543fff71-4-" + i0,
            e: common_vendor.p({
              type: lostFoundPublishParams.value.category === tag ? "primary" : "default",
              round: true
            })
          };
        }),
        n: lostFoundPublishParams.value.itemType == 2
      }, lostFoundPublishParams.value.itemType == 2 ? {
        o: common_vendor.o(($event) => lostFoundPublishParams.value.currentLocation = $event),
        p: common_vendor.p({
          placeholder: "请输入物品当前所在地",
          clearable: true,
          modelValue: lostFoundPublishParams.value.currentLocation
        })
      } : {}, {
        q: common_vendor.sr("uploadFile", "543fff71-6"),
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
        w: common_vendor.o(handlePublish),
        x: common_vendor.p({
          type: "primary",
          block: true
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-543fff71"]]);
wx.createPage(MiniProgramPage);
