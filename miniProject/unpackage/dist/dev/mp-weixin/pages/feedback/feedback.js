"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_userStorage = require("../../utils/userStorage.js");
const api_feedback = require("../../api/feedback.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_navbar2 + _easycom_wd_textarea2 + _easycom_wd_upload2 + _easycom_wd_input2 + _easycom_wd_button2 + _easycom_wd_toast2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_textarea + _easycom_wd_upload + _easycom_wd_input + _easycom_wd_button + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "feedback",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const fileList = common_vendor.ref([]);
    const feedbackData = common_vendor.ref({
      userId: 0,
      imageList: [],
      content: "",
      relation: ""
    });
    const handleClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad(() => {
      const user = utils_userStorage.getUserInfo();
      if (user) {
        feedbackData.value.userId = user.id;
      } else {
        toast.show({
          type: "warning",
          message: "请先登录"
        });
      }
      console.log(user);
    });
    const handleChange = (file) => {
      console.log("files:", file);
      console.log(fileList.value);
      fileList.value = file;
    };
    const beforeImageRemove = (res) => {
      fileList.value.splice(res.index, 1);
      feedbackData.value.imageList.splice(res.index, 1);
      console.log("publishArticleParams>>>", feedbackData);
    };
    const uploadSuccess = (res) => {
      console.log("上传成功res", res.file.response);
      const result = JSON.parse(res.file.response);
      console.log("上传成功result.data", result.data);
      feedbackData.value.imageList.push(...result.data);
      console.log(feedbackData.value);
    };
    const submitFeedback = async () => {
      const res = await api_feedback.addFeedBack(feedbackData.value);
      if (res.code === 200) {
        toast.show("提交成功~感谢您的反馈");
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      }
      console.log("提交反馈", feedbackData.value);
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
      return {
        a: common_vendor.o(handleClickLeft),
        b: common_vendor.p({
          ["custom-class"]: "navbar",
          bordered: false,
          title: "意见反馈",
          safeAreaInsetTop: true,
          ["left-arrow"]: true
        }),
        c: common_vendor.o(($event) => feedbackData.value.content = $event),
        d: common_vendor.p({
          placeholder: "请填写10个字以上内容，以便我们提供更好的内容",
          maxlength: 2e3,
          placeholderStyle: "font-size:14px;",
          ["show-count"]: true,
          clearable: true,
          rows: 5,
          modelValue: feedbackData.value.content
        }),
        e: common_vendor.sr("uploadFile", "a24b82f2-2"),
        f: common_vendor.o(handleChange),
        g: common_vendor.o(uploadSuccess),
        h: common_vendor.o(($event) => fileList.value = $event),
        i: common_vendor.p({
          multiple: true,
          accept: "image",
          action: "https://campus.fybreeze.cn/api/article/uploadImages",
          ["before-remove"]: beforeImageRemove,
          ["file-list"]: fileList.value
        }),
        j: common_vendor.o(($event) => feedbackData.value.relation = $event),
        k: common_vendor.p({
          type: "text",
          ["no-border"]: true,
          placeholder: "输入手机号/邮箱",
          modelValue: feedbackData.value.relation
        }),
        l: common_vendor.o(submitFeedback),
        m: common_vendor.p({
          ["custom-class"]: "btn",
          type: "primary",
          block: true
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-a24b82f2"]]);
wx.createPage(MiniProgramPage);
