"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_userStorage = require("../../utils/userStorage.js");
const api_userApi = require("../../api/userApi.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const api_uploadApi = require("../../api/uploadApi.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_select_picker2 = common_vendor.resolveComponent("wd-select-picker");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_gap2 = common_vendor.resolveComponent("wd-gap");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_navbar2 + _easycom_wd_img2 + _easycom_wd_icon2 + _easycom_wd_button2 + _easycom_wd_input2 + _easycom_wd_cell2 + _easycom_wd_select_picker2 + _easycom_wd_textarea2 + _easycom_wd_gap2 + _easycom_wd_toast2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_select_picker = () => "../../uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_gap = () => "../../uni_modules/wot-design-uni/components/wd-gap/wd-gap.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_img + _easycom_wd_icon + _easycom_wd_button + _easycom_wd_input + _easycom_wd_cell + _easycom_wd_select_picker + _easycom_wd_textarea + _easycom_wd_gap + _easycom_wd_toast)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "updateUserInfo",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const user = common_vendor.ref({
      tagList: []
      // 初始化空标签列表
    });
    const oldImage = common_vendor.ref("");
    const genderColumns = common_vendor.ref([
      {
        value: 0,
        label: "男"
      },
      {
        value: 1,
        label: "女"
      },
      {
        value: 2,
        label: "保密"
      }
    ]);
    const constellationColumns = common_vendor.ref([
      {
        value: "熬夜冠军座",
        label: "熬夜冠军座"
      },
      {
        value: "秃然焦虑座",
        label: "秃然焦虑座"
      },
      {
        value: "奶茶续命座",
        label: "奶茶续命座"
      },
      {
        value: "地铁迷路座",
        label: "地铁迷路座"
      },
      {
        value: "社畜进化座",
        label: "社畜进化座"
      },
      {
        value: "通宵赶工座",
        label: "通宵赶工座"
      },
      {
        value: "表情包王座",
        label: "表情包王座"
      },
      {
        value: "社恐晚期座",
        label: "社恐晚期座"
      },
      {
        value: "香菜毁灭座",
        label: "香菜毁灭座"
      },
      {
        value: "锦鲤附体座",
        label: "锦鲤附体座"
      },
      {
        value: "电量焦虑座",
        label: "电量焦虑座"
      }
    ]);
    const tagList = common_vendor.ref([
      {
        value: "运动达人",
        label: "运动达人"
      },
      {
        value: "学习狂魔",
        label: "学习狂魔"
      },
      {
        value: "社交达人",
        label: "社交达人"
      },
      {
        value: "文艺青年",
        label: "文艺青年"
      },
      {
        value: "技术宅",
        label: "技术宅"
      },
      {
        value: "美食家",
        label: "美食家"
      },
      {
        value: "旅行者",
        label: "旅行者"
      },
      {
        value: "音乐控",
        label: "音乐控"
      },
      {
        value: "电影迷",
        label: "电影迷"
      },
      {
        value: "摄影师",
        label: "摄影师"
      },
      {
        value: "创意咖",
        label: "创意咖"
      },
      {
        value: "志愿者",
        label: "志愿者"
      }
    ]);
    common_vendor.onLoad(() => {
      user.value = utils_userStorage.getUserInfo();
      console.log(user.value);
    });
    const handleClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    const handleGender = (e) => {
      user.value.constellation = e.value;
      console.log(user.value);
      console.log(e);
    };
    const updateUserInfo = async () => {
      console.log(user.value);
      const updateData = {
        id: user.value.id,
        imageUrl: user.value.imageUrl,
        userName: user.value.userName,
        userProfile: user.value.userProfile,
        gender: user.value.gender,
        constellation: user.value.constellation,
        tagList: user.value.tagList
      };
      if (oldImage.value) {
        const fileRes = await api_uploadApi.deleteFile(oldImage.value);
        if (fileRes.code === 200) {
          console.log("删除旧图片成功");
        } else {
          console.log("删除旧图片失败");
        }
      }
      const res = await api_userApi.updateWxUser(updateData);
      if (res.code === 200) {
        toast.show("更新成功");
        user.value = {
          ...res.data,
          ...user.value
        };
        utils_userStorage.clearUserInfo();
        console.log("user-value:", user.value);
        utils_userStorage.setUserInfo(user.value);
        console.log("getuserinfo", utils_userStorage.getUserInfo());
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } else {
        toast.show(res.message);
      }
    };
    const chooseAvatar = (e) => {
      var _a;
      console.log("选择头像:", e);
      const avatarUrl = ((_a = e.detail) == null ? void 0 : _a.avatarUrl) || e.avatarUrl;
      if (!avatarUrl) {
        toast.error("获取头像失败");
        return;
      }
      common_vendor.index.showLoading({
        title: "上传中..."
      });
      common_vendor.index.uploadFile({
        url: "https://campus.fybreeze.cn/api/article/uploadImages",
        filePath: avatarUrl,
        name: "file",
        formData: {
          "user": "test"
        },
        success(res) {
          var _a2, _b;
          try {
            const data = JSON.parse(res.data);
            if (data.code === 200 && ((_a2 = data.data) == null ? void 0 : _a2[0])) {
              oldImage.value = ((_b = user.value) == null ? void 0 : _b.imageUrl) || "";
              user.value.imageUrl = data.data[0];
              toast.show("上传成功");
            } else {
              toast.error("上传失败：" + (data.message || "未知错误"));
            }
          } catch (error) {
            console.error("解析响应失败:", error);
            toast.error("上传失败：数据格式错误");
          }
        },
        fail(err) {
          console.error("上传失败:", err);
          toast.error("上传失败：" + (err.errMsg || "网络错误"));
        },
        complete() {
          common_vendor.index.hideLoading();
        }
      });
    };
    const handleChangeName = (e) => {
      console.log(e);
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
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.o(handleClickLeft),
        b: common_vendor.p({
          ["custom-class"]: "navbar",
          bordered: false,
          title: "修改信息",
          safeAreaInsetTop: true,
          ["left-arrow"]: true
        }),
        c: (_a = user.value) == null ? void 0 : _a.imageUrl
      }, ((_b = user.value) == null ? void 0 : _b.imageUrl) ? {
        d: common_vendor.p({
          width: 100,
          height: 100,
          round: true,
          src: user.value.imageUrl
        })
      } : {
        e: common_vendor.p({
          name: "person",
          size: "50px",
          color: "#acc4f9"
        })
      }, {
        f: common_vendor.p({
          name: "camera",
          size: "20px",
          color: "#fff"
        }),
        g: common_vendor.o(chooseAvatar),
        h: common_vendor.p({
          ["custom-class"]: "userAvatar",
          type: "text",
          ["open-type"]: "chooseAvatar"
        }),
        i: common_vendor.o(handleChangeName),
        j: common_vendor.o(($event) => user.value.userName = $event),
        k: common_vendor.p({
          type: "nickname",
          ["no-border"]: true,
          placeholder: "请输入用户名",
          modelValue: user.value.userName
        }),
        l: common_vendor.p({
          title: "昵称",
          center: true
        }),
        m: common_vendor.o(handleGender),
        n: common_vendor.o(($event) => user.value.gender = $event),
        o: common_vendor.p({
          type: "radio",
          label: "性别",
          columns: genderColumns.value,
          modelValue: user.value.gender
        }),
        p: common_vendor.o(handleGender),
        q: common_vendor.o(($event) => user.value.constellation = $event),
        r: common_vendor.p({
          type: "radio",
          label: "星座",
          columns: constellationColumns.value,
          modelValue: user.value.constellation
        }),
        s: common_vendor.o(($event) => user.value.tagList = $event),
        t: common_vendor.p({
          label: "标签",
          prop: "tagList",
          type: "checkbox",
          max: 3,
          columns: tagList.value,
          placeholder: "请选择个性标签",
          modelValue: user.value.tagList
        }),
        v: common_vendor.o(($event) => user.value.userProfile = $event),
        w: common_vendor.p({
          label: "简介",
          clearable: true,
          placeholder: "请输入简介",
          ["show-word-limit"]: true,
          maxlength: 100,
          modelValue: user.value.userProfile
        }),
        x: common_vendor.o(updateUserInfo),
        y: common_vendor.p({
          ["custom-class"]: "btn",
          block: true,
          type: "primary"
        }),
        z: common_vendor.p({
          height: "60rpx"
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-f1eb7df2"]]);
wx.createPage(MiniProgramPage);
