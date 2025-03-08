"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_userStorage = require("../../utils/userStorage.js");
if (!Array) {
  const _easycom_wd_notice_bar2 = common_vendor.resolveComponent("wd-notice-bar");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_notice_bar2 + _easycom_wd_input2 + _easycom_wd_textarea2 + _easycom_wd_upload2 + _easycom_wd_cell2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_wd_toast2)();
}
const _easycom_wd_notice_bar = () => "../../uni_modules/wot-design-uni/components/wd-notice-bar/wd-notice-bar.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_notice_bar + _easycom_wd_input + _easycom_wd_textarea + _easycom_wd_upload + _easycom_wd_cell + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "reportArticle",
  setup(__props) {
    const { success: showSuccess } = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const model = common_vendor.reactive({
      userId: "",
      articleId: "",
      reason: "",
      images: []
    });
    const form = common_vendor.ref();
    function handleSubmit() {
      form.value.validate().then(({ valid, errors }) => {
        if (valid) {
          showSuccess({
            msg: "校验通过"
          });
        }
      }).catch((error) => {
        console.log(error, "error");
      });
    }
    common_vendor.onLoad((options) => {
      console.log("接收到的数据：", options);
      model.articleId = options.articleId;
      console.log("model.articleId：", model.articleId);
      const user = utils_userStorage.getUserInfo();
      model.userId = user == null ? void 0 : user.id;
    });
    const imageList = common_vendor.ref([]);
    const handleUploadImage = (file) => {
      console.log("files:", file);
      imageList.value = file;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "请如实填写举报信息及相关材料。经管理员审核后，将给予答复。若发现用户恶意举报，将封禁该用户的举报功能。",
          prefix: "wifi-error",
          type: "danger"
        }),
        b: common_vendor.o(($event) => model.userId = $event),
        c: common_vendor.p({
          label: "用户ID",
          ["label-width"]: "100px",
          prop: "userId",
          disabled: true,
          modelValue: model.userId
        }),
        d: common_vendor.o(($event) => model.articleId = $event),
        e: common_vendor.p({
          label: "文章ID",
          ["label-width"]: "100px",
          prop: "articleId",
          disabled: true,
          modelValue: model.articleId
        }),
        f: common_vendor.o(($event) => model.reason = $event),
        g: common_vendor.p({
          ["label-width"]: "100px",
          placeholder: "请输入原因...",
          label: "原因",
          required: true,
          maxlength: 240,
          clearable: true,
          ["show-word-limit"]: true,
          modelValue: model.reason
        }),
        h: common_vendor.o(handleUploadImage),
        i: common_vendor.o(($event) => imageList.value = $event),
        j: common_vendor.p({
          accept: "image",
          ["image-mode"]: "aspectFill",
          action: "http://localhost:8090/api/article/uploadImages",
          ["file-list"]: imageList.value
        }),
        k: common_vendor.p({
          title: "证明材料",
          ["title-width"]: "100px",
          required: true
        }),
        l: common_vendor.p({
          border: true
        }),
        m: common_vendor.o(handleSubmit),
        n: common_vendor.p({
          type: "primary",
          size: "large",
          block: true
        }),
        o: common_vendor.sr(form, "e79f0db3-1", {
          "k": "form"
        }),
        p: common_vendor.p({
          model
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e79f0db3"]]);
wx.createPage(MiniProgramPage);
