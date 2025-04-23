"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_userStorage = require("../../../utils/userStorage.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  (_easycom_wd_navbar2 + _easycom_wd_icon2 + _easycom_wd_toast2)();
}
const _easycom_wd_navbar = () => "../../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_icon = () => "../../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
const _easycom_wd_toast = () => "../../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_icon + _easycom_wd_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "aiChat",
  setup(__props) {
    uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const parseMarkdown = (text) => {
      return '<div class="markdown-content">' + text.replace(/```([\s\S]*?)```/g, '<div class="pre-block"><div class="code-inline">$1</div></div>').replace(/`([^`]+)`/g, '<span class="code-inline">$1</span>').replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="md-link" data-href="$2">$1</span>').replace(/\n\n/g, '</div><div class="text-block">').replace(/^\n?(.+)/, '<div class="text-block">$1').replace(/(.+)\n?$/, "$1</div>") + "</div>";
    };
    const scrollTop = common_vendor.ref(0);
    const messages = common_vendor.ref([]);
    const inputMessage = common_vendor.ref("");
    const keyboardHeight = common_vendor.ref(0);
    const isLoading = common_vendor.ref(false);
    const roomId = common_vendor.ref(1);
    const userId = common_vendor.ref(null);
    common_vendor.ref("");
    const dataBuffer = common_vendor.ref("");
    const lastMessageId = common_vendor.computed(() => {
      const length = messages.value.length;
      return length ? `msg-${length - 1}` : "";
    });
    const handleClickLeft = () => {
      common_vendor.index.navigateBack();
    };
    const handleInputFocus = (event) => {
      keyboardHeight.value = event.detail.height || 0;
    };
    const handleInputBlur = () => {
      keyboardHeight.value = 0;
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        const query = common_vendor.index.createSelectorQuery();
        query.select(".chat-container").boundingClientRect();
        query.select(".messages-list").boundingClientRect();
        query.exec(([container, messages2]) => {
          if (container && messages2) {
            scrollTop.value = messages2.height - container.height;
          }
        });
      });
    };
    common_vendor.onLoad(() => {
      const user = utils_userStorage.getUserInfo();
      console.log(user);
      if (user != null) {
        userId.value = user == null ? void 0 : user.id;
      } else {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/login/login"
          });
        }, 1e3);
      }
    });
    const arrayBufferToString = (arr) => {
      if (typeof arr === "string") {
        return arr;
      }
      var dataview = new DataView(arr);
      var ints = new Uint8Array(arr.byteLength);
      for (var i = 0; i < ints.length; i++) {
        ints[i] = dataview.getUint8(i);
      }
      var str = "", _arr = ints;
      for (var i = 0; i < _arr.length; i++) {
        if (_arr[i]) {
          var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
          if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
              if (_arr[st + i]) {
                store += _arr[st + i].toString(2).slice(2);
              }
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
          } else {
            str += String.fromCharCode(_arr[i]);
          }
        }
      }
      return str;
    };
    const sendMessage = async () => {
      var _a;
      if (!inputMessage.value.trim() || isLoading.value)
        return;
      const userMessage = inputMessage.value.trim();
      messages.value.push({
        role: "user",
        content: userMessage
      });
      inputMessage.value = "";
      scrollToBottom();
      isLoading.value = true;
      dataBuffer.value = "";
      try {
        messages.value.push({
          role: "assistant",
          content: "",
          isTyping: true
        });
        let str = "";
        const requestTask = common_vendor.index.request({
          url: `https://campus.fybreeze.cn/api/ai/${roomId.value}/streamChat?clientId=${userId.value}&message=${encodeURIComponent(userMessage)}`,
          method: "GET",
          header: {
            "Accept": "text/event-stream",
            "sa-Token": common_vendor.index.getStorageSync("token")
          },
          enableChunked: true,
          responseType: "arraybuffer",
          success: (res) => {
            console.log("发送完成：", res);
          },
          onChunkReceived: (res) => {
          }
        });
        requestTask.onChunkReceived((res) => {
          let arrayBuffer = res.data;
          let text = arrayBufferToString(arrayBuffer);
          dataBuffer.value += text;
          while (true) {
            const newlineIndex = dataBuffer.value.indexOf("\n");
            if (newlineIndex === -1)
              break;
            const line = dataBuffer.value.substring(0, newlineIndex).trim();
            dataBuffer.value = dataBuffer.value.substring(newlineIndex + 1);
            if (line.startsWith("data:")) {
              const currentData = line.substring(5).trim();
              if (currentData) {
                str += currentData;
                const lastMessage = messages.value[messages.value.length - 1];
                if (lastMessage && lastMessage.role === "assistant") {
                  lastMessage.content = str;
                  try {
                    lastMessage.parsedContent = parseMarkdown(str);
                  } catch (error) {
                    console.error("Markdown解析失败:", error);
                    lastMessage.parsedContent = str;
                  }
                  common_vendor.nextTick$1(() => {
                    scrollToBottom();
                  });
                }
              }
            }
          }
        });
      } catch (error) {
        console.error("发送消息失败:", error);
        if ((_a = messages.value[messages.value.length - 1]) == null ? void 0 : _a.isTyping) {
          messages.value.pop();
        }
        common_vendor.index.showToast({
          title: "发送失败，请重试",
          icon: "none"
        });
      } finally {
        isLoading.value = false;
        const lastMessage = messages.value[messages.value.length - 1];
        if (lastMessage) {
          lastMessage.isTyping = false;
        }
        scrollToBottom();
      }
    };
    const loadMoreMessages = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleClickLeft),
        b: common_vendor.p({
          title: "DeepSeek",
          ["left-arrow"]: true,
          fixed: true,
          placeholder: true,
          safeAreaInsetTop: true
        }),
        c: messages.value.length === 0
      }, messages.value.length === 0 ? {
        d: common_assets._imports_0$7
      } : common_vendor.e({
        e: common_vendor.f(messages.value, (message, index, i0) => {
          return common_vendor.e({
            a: message.role === "assistant"
          }, message.role === "assistant" ? {
            b: common_assets._imports_0$7
          } : {}, {
            c: message.role === "assistant"
          }, message.role === "assistant" ? {
            d: message.parsedContent || message.content
          } : {
            e: common_vendor.t(message.content)
          }, {
            f: message.isTyping ? 1 : "",
            g: message.role === "assistant" && !message.isTyping
          }, message.role === "assistant" && !message.isTyping ? {
            h: "dee9fdd8-1-" + i0,
            i: common_vendor.p({
              name: "copy",
              size: "16px",
              color: "#999"
            }),
            j: "dee9fdd8-2-" + i0,
            k: common_vendor.p({
              name: "refresh",
              size: "16px",
              color: "#999"
            }),
            l: "dee9fdd8-3-" + i0,
            m: common_vendor.p({
              name: "thumb-up",
              size: "16px",
              color: "#999"
            }),
            n: "dee9fdd8-4-" + i0,
            o: common_vendor.p({
              name: "thumb-down",
              size: "16px",
              color: "#999"
            })
          } : {}, {
            p: index,
            q: "msg-" + index,
            r: common_vendor.n(message.role)
          });
        }),
        f: isLoading.value
      }, isLoading.value ? {
        g: common_assets._imports_0$7
      } : {}), {
        h: scrollTop.value,
        i: common_vendor.o(loadMoreMessages),
        j: lastMessageId.value,
        k: -1,
        l: isLoading.value,
        m: common_vendor.o(handleInputFocus),
        n: common_vendor.o(handleInputBlur),
        o: common_vendor.o(sendMessage),
        p: inputMessage.value,
        q: common_vendor.o(($event) => inputMessage.value = $event.detail.value),
        r: common_vendor.p({
          name: "arrow-up",
          size: "20px",
          color: inputMessage.value.trim() && !isLoading.value ? "#FFFFFF" : "#CCCCCC"
        }),
        s: inputMessage.value.trim() && !isLoading.value ? 1 : "",
        t: common_vendor.o(($event) => inputMessage.value.trim() && !isLoading.value && sendMessage()),
        v: keyboardHeight.value + "px"
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dee9fdd8"]]);
wx.createPage(MiniProgramPage);
