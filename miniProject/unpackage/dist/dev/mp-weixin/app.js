"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/publishArticle/publishArticle.js";
  "./pages/login/login.js";
  "./pages/reportArticle/reportArticle.js";
  "./pages/activity/activity.js";
  "./pages/club/club.js";
  "./pages/study/study.js";
  "./pages/lostFound/lostFound.js";
  "./pages/message/message.js";
  "./pages/articleInfo/articleInfo.js";
  "./pages/updateUserInfo/updateUserInfo.js";
  "./pages/feedback/feedback.js";
  "./pages/relation/relation.js";
  "./pages/activityDetail/activityDetail.js";
  "./pages/aiService/aiService.js";
  "./pages/lostFoundPublish/lostFoundPublish.js";
  "./pages/lostFoundDetail/lostFoundDetail.js";
  "./pages/userDetail/userDetail.js";
  "./pages/clubDetail/clubDetail.js";
  "./pages/message/newFollowers/newFollowers.js";
  "./pages/message/likes/likes.js";
  "./pages/message/comments/comments.js";
  "./pages/message/systemMessage/systemMessage.js";
  "./pages/message/activityMessage/activityMessage.js";
  "./pages/graduateExperience/graduateExperience.js";
  "./pages/studentExperience/studentExperience.js";
  "./pages/agreement/user.js";
  "./pages/agreement/privacy.js";
  "./pages/aiService/aiChat/aiChat.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
