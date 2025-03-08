"use strict";
const common_vendor = require("../../common/vendor.js");
const api_articleApi = require("../../api/articleApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_switch2 = common_vendor.resolveComponent("wd-switch");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_gap2 = common_vendor.resolveComponent("wd-gap");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_action_sheet2 = common_vendor.resolveComponent("wd-action-sheet");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_navbar2 + _easycom_wd_textarea2 + _easycom_wd_upload2 + _easycom_wd_tag2 + _easycom_wd_icon2 + _easycom_wd_cell2 + _easycom_wd_switch2 + _easycom_wd_cell_group2 + _easycom_wd_gap2 + _easycom_wd_button2 + _easycom_wd_action_sheet2 + _easycom_wd_toast2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_switch = () => "../../uni_modules/wot-design-uni/components/wd-switch/wd-switch.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_gap = () => "../../uni_modules/wot-design-uni/components/wd-gap/wd-gap.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_action_sheet = () => "../../uni_modules/wot-design-uni/components/wd-action-sheet/wd-action-sheet.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_textarea + _easycom_wd_upload + _easycom_wd_tag + _easycom_wd_icon + _easycom_wd_cell + _easycom_wd_switch + _easycom_wd_cell_group + _easycom_wd_gap + _easycom_wd_button + _easycom_wd_action_sheet + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "publishArticle",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const fileList = common_vendor.ref([]);
    const isAnonymity = common_vendor.ref(false);
    const showActionSheet = common_vendor.ref(false);
    const publishArticleParams = common_vendor.ref({
      content: "",
      tags: [],
      images: []
    });
    const actions = common_vendor.ref([]);
    const onClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    const getTags = () => {
      api_articleApi.getArticleTags().then((res) => {
        actions.value = res.data.map((item) => ({ name: item }));
        console.log(actions.value);
      });
    };
    const handleSelectedClose = (index) => {
      publishArticleParams.value.tags.splice(index, 1);
    };
    const showAction = () => {
      getTags();
      showActionSheet.value = !showActionSheet.value;
    };
    const selectAction = (item) => {
      console.log(publishArticleParams.value.tags);
      publishArticleParams.value.tags.push(item.item.name);
    };
    const handleAnonymityChange = () => {
      isAnonymity.value = !isAnonymity.value;
    };
    const uploadSuccess = (res) => {
      console.log("上传成功res", res.file.response);
      const result = JSON.parse(res.file.response);
      console.log("上传成功result.data", result.data);
      publishArticleParams.value.images.push(...result.data);
      console.log(publishArticleParams.value);
    };
    const handleChange = (file) => {
      console.log("files:", file);
      console.log(fileList.value);
      fileList.value = file;
    };
    const beforeImageRemove = (res) => {
      fileList.value.splice(res.index, 1);
      publishArticleParams.value.images.splice(res.index, 1);
      console.log("publishArticleParams>>>", publishArticleParams);
    };
    const setTime = () => {
    };
    const setVisibility = () => {
    };
    const publishArticle = async () => {
      console.log("发布文章参数：", publishArticleParams.value);
      const res = await api_articleApi.addArticle(publishArticleParams.value);
      console.log("发布文章接口返回结果：", res);
      if (res.code == 200) {
        toast.show("发布成功");
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 2e3);
      } else {
        toast.error(res.message);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickLeft),
        b: common_vendor.p({
          title: "写说说",
          leftText: "取消",
          fixed: true,
          placeholder: true,
          safeAreaInsetTop: true
        }),
        c: common_vendor.o(($event) => publishArticleParams.value.content = $event),
        d: common_vendor.p({
          maxlength: 2e3,
          ["show-word-limit"]: true,
          placeholderStyle: "font-size:18px;",
          ["show-count"]: true,
          clearable: true,
          placeholder: "分享新鲜事~",
          size: "large",
          rows: 5,
          modelValue: publishArticleParams.value.content
        }),
        e: common_vendor.sr("uploadFile", "cfdfbfe7-2"),
        f: common_vendor.o(handleChange),
        g: common_vendor.o(uploadSuccess),
        h: common_vendor.o(($event) => fileList.value = $event),
        i: common_vendor.p({
          limit: 9,
          multiple: true,
          accept: "image",
          action: "http://localhost:8090/api/article/uploadImages",
          ["before-remove"]: beforeImageRemove,
          ["file-list"]: fileList.value
        }),
        j: publishArticleParams.value.tags.length != 0
      }, publishArticleParams.value.tags.length != 0 ? {
        k: common_vendor.f(publishArticleParams.value.tags, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => handleSelectedClose(index)),
            c: "cfdfbfe7-3-" + i0
          };
        }),
        l: common_vendor.p({
          closable: true,
          round: true,
          type: "primary"
        })
      } : {}, {
        m: common_vendor.p({
          round: true,
          ["bg-color"]: "#eee"
        }),
        n: common_vendor.p({
          name: "discount"
        }),
        o: common_vendor.o(showAction),
        p: common_vendor.p({
          ["custom-class"]: "space",
          round: true,
          ["use-icon-slot"]: true,
          ["bg-color"]: "#eee"
        }),
        q: common_vendor.p({
          name: "location"
        }),
        r: common_vendor.p({
          ["custom-class"]: "space",
          round: true,
          ["use-icon-slot"]: true,
          ["bg-color"]: "#eee"
        }),
        s: common_vendor.o(setVisibility),
        t: common_vendor.p({
          title: "谁可以看",
          ["is-link"]: true,
          icon: "view",
          value: "所有人可见"
        }),
        v: common_vendor.o(setTime),
        w: common_vendor.p({
          title: "定时",
          ["is-link"]: true,
          icon: "clock"
        }),
        x: common_vendor.o(handleAnonymityChange),
        y: common_vendor.o(($event) => isAnonymity.value = $event),
        z: common_vendor.p({
          modelValue: isAnonymity.value
        }),
        A: common_vendor.p({
          title: "匿名",
          center: true,
          icon: "note"
        }),
        B: common_vendor.p({
          height: "60px"
        }),
        C: common_vendor.o(publishArticle),
        D: common_vendor.p({
          block: true,
          type: "primary"
        }),
        E: common_vendor.o(selectAction),
        F: common_vendor.o(($event) => !showActionSheet.value),
        G: common_vendor.o(($event) => showActionSheet.value = $event),
        H: common_vendor.p({
          actions: actions.value,
          ["cancel-text"]: "取消",
          modelValue: showActionSheet.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cfdfbfe7"]]);
wx.createPage(MiniProgramPage);
