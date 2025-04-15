"use strict";
const common_vendor = require("../../common/vendor.js");
const api_itemsApi = require("../../api/itemsApi.js");
const utils_enum = require("../../utils/enum.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  (_easycom_wd_search2 + _easycom_wd_tag2 + _easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_icon2 + _easycom_wd_toast2 + _easycom_wd_loading2)();
}
const _easycom_wd_search = () => "../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_tab = () => "../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
if (!Math) {
  (_easycom_wd_search + _easycom_wd_tag + _easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_icon + _easycom_wd_toast + _easycom_wd_loading)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "lostFound",
  setup(__props, { expose: __expose }) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const activeTab = common_vendor.ref("lost");
    const loading = common_vendor.ref(false);
    const itemsList = common_vendor.ref([]);
    const pageParams = common_vendor.ref({
      current: 1,
      size: 10,
      itemType: utils_enum.ItemType.LOST
    });
    const needRefresh = common_vendor.ref(false);
    const getList = async () => {
      try {
        loading.value = true;
        const res = await api_itemsApi.getItemsList(pageParams.value);
        if (res.code === 200) {
          itemsList.value = res.data.records;
        } else {
          toast.error(res.message || "获取数据失败");
        }
      } catch (error) {
        console.error("获取列表错误:", error);
        toast.error("获取数据失败");
      } finally {
        loading.value = false;
      }
    };
    const handleTabChange = (tab) => {
      pageParams.value = {
        ...pageParams.value,
        current: 1,
        itemType: tab === "lost" ? utils_enum.ItemType.LOST : utils_enum.ItemType.FOUND
      };
    };
    common_vendor.watch(() => activeTab.value, (newTab) => {
      handleTabChange(newTab);
      getList();
    });
    common_vendor.onMounted(() => {
      getList();
    });
    const goToDetail = (id) => {
      console.log(id);
      common_vendor.index.navigateTo({
        url: `/pages/lostFoundDetail/lostFoundDetail?id=${id}`
      });
    };
    const handlePublish = (type = 1) => {
      console.log("发布类型:", type);
      common_vendor.index.navigateTo({
        url: `/pages/lostFoundPublish/lostFoundPublish?type=${type}`
      });
    };
    const setNeedRefresh = () => {
      console.log("设置刷新标记");
      needRefresh.value = true;
    };
    common_vendor.onShow(() => {
      console.log("onShow triggered, needRefresh:", needRefresh.value);
      if (needRefresh.value) {
        pageParams.value = {
          ...pageParams.value,
          current: 1
        };
        itemsList.value = [];
        getList();
        needRefresh.value = false;
      }
    });
    __expose({
      setNeedRefresh
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
        a: common_vendor.o(($event) => handlePublish(1)),
        b: common_vendor.o(($event) => handlePublish(2)),
        c: common_vendor.p({
          placeholder: "请输入物品名称",
          ["placeholder-left"]: true,
          ["cancel-txt"]: "搜索"
        }),
        d: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        e: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        f: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        g: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        h: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        i: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        j: common_vendor.p({
          round: true,
          color: "#333",
          ["bg-color"]: "#808080",
          plain: true
        }),
        k: common_vendor.p({
          title: "寻物启事",
          name: "lost"
        }),
        l: common_vendor.p({
          title: "招领启事",
          name: "found"
        }),
        m: common_vendor.o(($event) => activeTab.value = $event),
        n: common_vendor.p({
          modelValue: activeTab.value
        }),
        o: common_vendor.f(itemsList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.status === 1 ? "已解决" : "未解决"),
            c: common_vendor.n(item.status === 1 ? "resolved" : "pending"),
            d: common_vendor.t(item.description),
            e: "2be17064-11-" + i0,
            f: common_vendor.t(item.location),
            g: "2be17064-12-" + i0,
            h: common_vendor.t(item.eventTime),
            i: "2be17064-13-" + i0,
            j: common_vendor.t(item.category),
            k: item.id,
            l: common_vendor.o(($event) => goToDetail(item.id), item.id)
          };
        }),
        p: common_vendor.p({
          name: "location",
          size: "28rpx"
        }),
        q: common_vendor.p({
          name: "time",
          size: "28rpx"
        }),
        r: common_vendor.p({
          name: "category",
          size: "28rpx"
        }),
        s: loading.value
      }, loading.value ? {} : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-2be17064"]]);
wx.createPage(MiniProgramPage);
