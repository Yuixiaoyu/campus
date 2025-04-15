"use strict";
const common_vendor = require("../../common/vendor.js");
const api_articleApi = require("../../api/articleApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_uploadApi = require("../../api/uploadApi.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_notice_bar2 = common_vendor.resolveComponent("wd-notice-bar");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_gap2 = common_vendor.resolveComponent("wd-gap");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_action_sheet2 = common_vendor.resolveComponent("wd-action-sheet");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_navbar2 + _easycom_wd_notice_bar2 + _easycom_wd_textarea2 + _easycom_wd_upload2 + _easycom_wd_tag2 + _easycom_wd_icon2 + _easycom_wd_cell2 + _easycom_wd_cell_group2 + _easycom_wd_gap2 + _easycom_wd_button2 + _easycom_wd_action_sheet2 + _easycom_wd_toast2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_notice_bar = () => "../../uni_modules/wot-design-uni/components/wd-notice-bar/wd-notice-bar.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_gap = () => "../../uni_modules/wot-design-uni/components/wd-gap/wd-gap.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_action_sheet = () => "../../uni_modules/wot-design-uni/components/wd-action-sheet/wd-action-sheet.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_notice_bar + _easycom_wd_textarea + _easycom_wd_upload + _easycom_wd_tag + _easycom_wd_icon + _easycom_wd_cell + _easycom_wd_cell_group + _easycom_wd_gap + _easycom_wd_button + _easycom_wd_action_sheet + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "publishArticle",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const fileList = common_vendor.ref([]);
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
      const url = publishArticleParams.value.images[res.index];
      console.log("删除前置处理", url);
      api_uploadApi.deleteFile(url).then((response) => {
        if (response.code === 200) {
          console.log("删除成功", response);
          fileList.value.splice(res.index, 1);
          publishArticleParams.value.images.splice(res.index, 1);
          console.log("publishArticleParams>>>", publishArticleParams);
        } else {
          console.log("删除失败", response);
        }
      });
    };
    const setTime = () => {
      toast.show("暂不支持哦~");
    };
    const setVisibility = () => {
      toast.show("暂不支持哦~");
    };
    const publishArticle = common_vendor.lodashExports.debounce(async () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      console.log("发布文章参数：", publishArticleParams.value);
      const res = await api_articleApi.addArticle(publishArticleParams.value);
      if (res.code == 200) {
        toast.show({
          msg: "发布成功，等待审核~",
          cover: true
        });
        setTimeout(() => {
          const pages = getCurrentPages();
          const indexPage = pages.find((page) => page.route === "pages/index/index");
          if (indexPage) {
            indexPage.$vm.setNeedRefresh();
          }
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1500);
      } else {
        toast.error(res.message);
      }
    }, 500);
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
        a: common_vendor.o(onClickLeft),
        b: common_vendor.p({
          title: "写说说",
          leftText: "取消",
          fixed: true,
          placeholder: true,
          safeAreaInsetTop: true
        }),
        c: common_vendor.p({
          text: "帖子发布公告：帖子内容禁止有关任何政治立场、色情、暴力等一系列非法言论，如有发现将封禁发布功能",
          prefix: "check-outline",
          color: "#34D19D",
          ["background-color"]: "#f0f9eb",
          ["custom-class"]: "space"
        }),
        d: common_vendor.o(($event) => publishArticleParams.value.content = $event),
        e: common_vendor.p({
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
        f: common_vendor.sr("uploadFile", "cfdfbfe7-3"),
        g: common_vendor.o(handleChange),
        h: common_vendor.o(uploadSuccess),
        i: common_vendor.o(($event) => fileList.value = $event),
        j: common_vendor.p({
          limit: 9,
          multiple: true,
          accept: "image",
          action: "https://campus.fybreeze.cn/api/article/uploadImages",
          ["before-remove"]: beforeImageRemove,
          ["file-list"]: fileList.value
        }),
        k: publishArticleParams.value.tags.length != 0
      }, publishArticleParams.value.tags.length != 0 ? {
        l: common_vendor.f(publishArticleParams.value.tags, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => handleSelectedClose(index)),
            c: "cfdfbfe7-4-" + i0
          };
        }),
        m: common_vendor.p({
          closable: true,
          round: true,
          type: "primary"
        })
      } : {}, {
        n: common_vendor.p({
          round: true,
          ["bg-color"]: "#eee"
        }),
        o: common_vendor.p({
          name: "discount"
        }),
        p: common_vendor.o(showAction),
        q: common_vendor.p({
          ["custom-class"]: "space",
          round: true,
          ["use-icon-slot"]: true,
          ["bg-color"]: "#eee"
        }),
        r: common_vendor.p({
          name: "location"
        }),
        s: common_vendor.p({
          ["custom-class"]: "space",
          round: true,
          ["use-icon-slot"]: true,
          ["bg-color"]: "#eee"
        }),
        t: common_vendor.o(setVisibility),
        v: common_vendor.p({
          title: "谁可以看",
          ["is-link"]: true,
          icon: "view",
          value: "所有人可见"
        }),
        w: common_vendor.o(setTime),
        x: common_vendor.p({
          title: "定时",
          ["is-link"]: true,
          icon: "clock"
        }),
        y: common_vendor.p({
          height: "60px"
        }),
        z: common_vendor.o(common_vendor.unref(publishArticle)),
        A: common_vendor.p({
          block: true,
          type: "primary"
        }),
        B: common_vendor.o(selectAction),
        C: common_vendor.o(($event) => !showActionSheet.value),
        D: common_vendor.o(($event) => showActionSheet.value = $event),
        E: common_vendor.p({
          actions: actions.value,
          ["cancel-text"]: "取消",
          modelValue: showActionSheet.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-cfdfbfe7"]]);
wx.createPage(MiniProgramPage);
