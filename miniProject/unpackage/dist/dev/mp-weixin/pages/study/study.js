"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_icon2)();
}
const _easycom_wd_tab = () => "../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "study",
  setup(__props) {
    const leftActive = common_vendor.ref(0);
    const rightActive = common_vendor.ref(0);
    const leftTabs = [
      {
        title: "就业",
        list: [
          {
            id: 1,
            title: "互联网大厂面试指南",
            author: "真欣同学",
            url: "https://www.bilibili.com/video/BV18S4y1C7fS/?spm_id_from=333.337.search-card.all.click",
            date: "03-01"
          },
          {
            id: 2,
            title: "简历制作黄金法则",
            author: "取景框看世界",
            url: "https://www.bilibili.com/video/BV1NL4y1878J/?spm_id_from=333.337.search-card.all.click",
            date: "03-02"
          },
          {
            id: 3,
            title: "薪资谈判技巧",
            author: "HR大婷讲求职",
            url: "https://www.bilibili.com/video/BV1N14y1r7tJ/?spm_id_from=333.337.search-card.all.click&vd_source=8f5eaf78f6121694f4dd471819f3772b",
            date: "03-03"
          }
        ]
      },
      {
        title: "考公",
        list: [
          {
            id: 4,
            title: "行测系统课",
            author: "刘文超Vin",
            url: "https://www.bilibili.com/video/BV12t4115735/?spm_id_from=333.337.search-card.all.click",
            date: "03-04"
          },
          {
            id: 5,
            title: "申论系统课",
            author: "公考小马哥",
            url: "https://www.bilibili.com/video/BV1P34y167K4/?spm_id_from=333.337.search-card.all.click&vd_source=8f5eaf78f6121694f4dd471819f3772b",
            date: "03-05"
          },
          {
            id: 6,
            title: "面试技巧",
            author: "心竺公考",
            url: "https://www.bilibili.com/video/BV1uJ411H7w4/?spm_id_from=333.337.search-card.all.click",
            date: "03-06"
          }
        ]
      },
      {
        title: "考研",
        list: [
          {
            id: 7,
            title: "考研时间规划表",
            author: "取景框看世界",
            url: "https://www.bilibili.com/video/BV1qwzdY4EqG/?spm_id_from=333.337.search-card.all.click",
            date: "03-07"
          },
          {
            id: 8,
            title: "考研英语长难句",
            author: "颉斌斌老师",
            url: "https://space.bilibili.com/271970833?spm_id_from=333.337.search-card.all.click",
            date: "03-08"
          },
          {
            id: 9,
            title: "政治背诵手册",
            author: "肖秀荣",
            url: "https://www.bilibili.com/video/BV1KH4y1d7YB/?spm_id_from=333.1387.homepage.video_card.click",
            date: "03-09"
          }
        ]
      }
    ];
    const rightTabs = [
      {
        title: "期末",
        list: [
          {
            id: 10,
            title: "高数期末复习重点",
            author: "框框老师课堂",
            url: "https://www.bilibili.com/video/BV1mN411r7VM/?spm_id_from=333.337.search-card.all.click",
            date: "03-10"
          },
          {
            id: 11,
            title: "英语四级阅读",
            author: "我是瑞斯拜",
            url: "https://www.bilibili.com/video/BV1Ea411i7Da/?spm_id_from=333.337.search-card.all.click",
            date: "03-11"
          },
          {
            id: 12,
            title: "专业课考试技巧",
            author: "清华学姐小琳",
            url: "https://b23.tv/sHOmbvo",
            date: "03-12"
          }
        ]
      },
      {
        title: "实验",
        list: [
          {
            id: 13,
            title: "物理实验注意事项",
            author: "五味666",
            url: "https://b23.tv/5f7xAyF",
            date: "03-13"
          },
          {
            id: 14,
            title: "化学实验安全指南",
            author: "鹰少学姐",
            url: "https://b23.tv/kj5UuzZ",
            date: "03-14"
          },
          {
            id: 15,
            title: "生物实验操作要领",
            author: "生物研零生",
            url: "https://b23.tv/prbT81x",
            date: "03-15"
          }
        ]
      },
      {
        title: "作业",
        list: [
          {
            id: 16,
            title: "作业规范指导",
            author: "眠羊八困",
            url: "https://www.bilibili.com/video/BV1mb4y1x7W1/?spm_id_from=333.337.search-card.all.click",
            date: "03-16"
          },
          {
            id: 17,
            title: "论文写作技巧",
            author: "SCI论文写作",
            url: "https://b23.tv/72e2ldd",
            date: "03-17"
          },
          {
            id: 18,
            title: "实验报告模板",
            author: "奋斗的习习",
            url: "https://www.bilibili.com/video/BV1nU4y1T7tE/?spm_id_from=333.337.search-card.all.click&vd_source=8f5eaf78f6121694f4dd471819f3772b",
            date: "03-18"
          }
        ]
      }
    ];
    const navigateToGraduateDetail = (tabIndex, item) => {
      const routes = [
        "/pages/graduateExperience/graduateExperience?param=",
        "/pages/graduateExperience/graduateExperience?param=",
        "/pages/graduateExperience/graduateExperience?param="
      ];
      common_vendor.index.navigateTo({
        url: `${routes[tabIndex]}${item.url}`
      });
    };
    const navigateToStudentDetail = (tabIndex, item) => {
      const routes = [
        "/pages/studentExperience/studentExperience?param=",
        "/pages/studentExperience/studentExperience?param=",
        "/pages/studentExperience/studentExperience?param="
      ];
      common_vendor.index.navigateTo({
        url: `${routes[tabIndex]}${item.url}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "就业"
        }),
        b: common_vendor.p({
          title: "考公"
        }),
        c: common_vendor.p({
          title: "考研"
        }),
        d: common_vendor.o(($event) => leftActive.value = $event),
        e: common_vendor.p({
          animated: true,
          sticky: true,
          modelValue: leftActive.value
        }),
        f: common_vendor.f(leftTabs, (tab, tabIndex, i0) => {
          return {
            a: common_vendor.f(tab.list, (item, k1, i1) => {
              return {
                a: common_vendor.t(item.title),
                b: item.avatar || "/static/default-avatar.png",
                c: common_vendor.t(item.author),
                d: common_vendor.t(item.date),
                e: "3f273c1e-4-" + i0 + "-" + i1,
                f: item.id,
                g: common_vendor.o(($event) => navigateToGraduateDetail(leftActive.value, item), item.id)
              };
            }),
            b: leftActive.value === tabIndex,
            c: tabIndex
          };
        }),
        g: common_vendor.p({
          name: "read",
          size: "14px"
        }),
        h: common_vendor.p({
          title: "期末"
        }),
        i: common_vendor.p({
          title: "实验"
        }),
        j: common_vendor.p({
          title: "作业"
        }),
        k: common_vendor.o(($event) => rightActive.value = $event),
        l: common_vendor.p({
          animated: true,
          sticky: true,
          modelValue: rightActive.value
        }),
        m: common_vendor.f(rightTabs, (tab, tabIndex, i0) => {
          return {
            a: common_vendor.f(tab.list, (item, k1, i1) => {
              return {
                a: common_vendor.t(item.title),
                b: item.avatar || "/static/default-avatar.png",
                c: common_vendor.t(item.author),
                d: common_vendor.t(item.date),
                e: "3f273c1e-9-" + i0 + "-" + i1,
                f: item.id,
                g: common_vendor.o(($event) => navigateToStudentDetail(rightActive.value, item), item.id)
              };
            }),
            b: rightActive.value === tabIndex,
            c: tabIndex
          };
        }),
        n: common_vendor.p({
          name: "read",
          size: "14px"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f273c1e"]]);
wx.createPage(MiniProgramPage);
