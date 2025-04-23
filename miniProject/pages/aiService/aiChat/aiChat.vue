<template>
  <view class="ai-chat">
    <!-- 顶部导航栏 -->
    <wd-navbar title="DeepSeek" left-arrow fixed placeholder safeAreaInsetTop @click-left="handleClickLeft" >
    </wd-navbar>

    <!-- 聊天内容区域 -->
    <scroll-view 
      class="chat-container" 
      scroll-y 
      :scroll-top="scrollTop" 
      :scroll-with-animation="true" 
      @scrolltoupper="loadMoreMessages"
      :scroll-into-view="lastMessageId"
    >
      <view class="welcome-section" v-if="messages.length === 0">
        <image class="logo" src="/static/tabbar/deepseek-selected.png" mode="aspectFit"/>
        <view class="welcome-text">
          <text class="title">我是 DeepSeek，很高兴见到你！</text>
          <text class="subtitle">我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</text>
        </view>
      </view>
      <view v-else class="messages-list">
        <view 
          v-for="(message, index) in messages" 
          :key="index" 
          :id="'msg-' + index"
          class="message-item" 
          :class="message.role"
        >
          <image 
            v-if="message.role === 'assistant'" 
            class="avatar" 
            src="/static/tabbar/deepseek-selected.png" 
            mode="aspectFit"
          />
          <view class="message-content">
            <view class="message-bubble" :class="{ 'typing': message.isTyping }">
              <rich-text v-if="message.role === 'assistant'" :nodes="message.parsedContent || message.content"></rich-text>
              <text v-else>{{ message.content }}</text>
            </view>
            <view v-if="message.role === 'assistant' && !message.isTyping" class="message-actions">
              <view class="action-item">
                <wd-icon name="copy" size="16px" color="#999"/>
              </view>
              <view class="action-item">
                <wd-icon name="refresh" size="16px" color="#999"/>
              </view>
              <view class="action-item">
                <wd-icon name="thumb-up" size="16px" color="#999"/>
              </view>
              <view class="action-item">
                <wd-icon name="thumb-down" size="16px" color="#999"/>
              </view>
            </view>
          </view>
        </view>
        <!-- 加载中状态 -->
        <view v-if="isLoading" class="message-item assistant">
          <image class="avatar" src="/static/tabbar/deepseek-selected.png" mode="aspectFit"/>
          <view class="message-content">
            <view class="loading-dots">
              <view class="dot"></view>
              <view class="dot"></view>
              <view class="dot"></view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-section" :style="{ bottom: keyboardHeight + 'px' }">
      <view class="input-container">
        <textarea
          class="input-textarea"
          v-model="inputMessage"
          :adjust-position="false"
          :show-confirm-bar="false"
          :cursor-spacing="20"
          :maxlength="-1"
          :disabled="isLoading"
          placeholder="输入消息..."
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @confirm="sendMessage"
        />
        <view 
          class="send-button" 
          :class="{ 'active': inputMessage.trim() && !isLoading }" 
          @click="inputMessage.trim() && !isLoading && sendMessage()"
        >
          <wd-icon 
            name="arrow-up" 
            size="20px" 
            :color="inputMessage.trim() && !isLoading ? '#FFFFFF' : '#CCCCCC'"
          />
        </view>
      </view>
      <view class="ai-notice">内容由 AI 生成，仅供参考</view>
    </view>
    <wd-toast></wd-toast>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import {doChat, doChatStream} from '@/api/aichatApi'
import {onLoad} from "@dcloudio/uni-app";
import {getUserInfo} from "@/utils/userStorage";
import {useToast} from '@/uni_modules/wot-design-uni'
const toast = useToast()

// 简单的markdown解析函数
const parseMarkdown = (text: string): string => {
  return '<div class="markdown-content">' + 
    text
      // 代码块
      .replace(/```([\s\S]*?)```/g, '<div class="pre-block"><div class="code-inline">$1</div></div>')
      // 行内代码
      .replace(/`([^`]+)`/g, '<span class="code-inline">$1</span>')
      // 粗体
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // 斜体
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="md-link" data-href="$2">$1</span>')
      // 段落
      .replace(/\n\n/g, '</div><div class="text-block">')
      .replace(/^\n?(.+)/, '<div class="text-block">$1')
      .replace(/(.+)\n?$/, '$1</div>') +
    '</div>';
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
  parsedContent?: string
}

const scrollTop = ref(0)
const messages = ref<Message[]>([])
const inputMessage = ref('')
const keyboardHeight = ref(0)
const isLoading = ref(false)
const roomId = ref(1) // 默认房间ID，实际应该从路由或其他地方获取
const userId = ref(null) // 用户id
const currentAssistantMessage = ref('')
const dataBuffer = ref('') // 添加数据缓冲区

const lastMessageId = computed(() => {
  const length = messages.value.length
  return length ? `msg-${length - 1}` : ''
})

const handleClickLeft = () => {
  // 处理菜单点击
  uni.navigateBack()
}

const handleInputFocus = (event) => {
  keyboardHeight.value = event.detail.height || 0
}

const handleInputBlur = () => {
  keyboardHeight.value = 0
}

const scrollToBottom = () => {
  nextTick(() => {
    const query = uni.createSelectorQuery()
    query.select('.chat-container').boundingClientRect()
    query.select('.messages-list').boundingClientRect()
    query.exec(([container, messages]) => {
      if (container && messages) {
        scrollTop.value = messages.height - container.height
      }
    })
  })
}

onLoad(() => {
  const user = getUserInfo();
  console.log(user)
  if (user!=null){
    userId.value = user?.id;
  }else{
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    setTimeout(() => {
      uni.reLaunch({
        url: "/pages/login/login"
      });
    }, 1e3);
  }
})

const decodeUTF8=(data)=>{
  // 将二进制数据转为Uint8数组
  const uint8Array = new Uint8Array(data);

  // 传统方式转换字符串（兼容旧环境）
  let string = '';
  for (let i = 0; i < uint8Array.length; i++) {
    string += String.fromCharCode(uint8Array[i]);
  }

  // 双重解码处理特殊字符（如中文）
  return decodeURIComponent(encodeURI(string));
}


const decode=(data)=> {
  const text = decodeUTF8(data);
  console.log(text)
  const lines = text.split('\n');
  let result = '';

  for (let line of lines) {
    if (line.startsWith('data: ')) {
      const jsonData = line.slice(6).trim();

      // 结束标识处理
      if (jsonData === '[DONE]') return result;

      // 清理控制字符（防止JSON解析失败）
      const cleanedData = jsonData.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

      try {
        const parsedData = JSON.parse(cleanedData);
        // 提取AI生成内容
        result += parsedData.choices[0].delta.content || '';
      } catch (e) {
        console.error('解析失败:', e);
      }
    }
  }
  return result;
}

const arrayBufferToString=(arr)=>{
  if (typeof arr === 'string') {
    return arr;
  }
  var dataview = new DataView(arr);
  var ints = new Uint8Array(arr.byteLength);
  for (var i = 0; i < ints.length; i++) {
    ints[i] = dataview.getUint8(i);
  }
  var str = '',
      _arr = ints;
  for (var i = 0; i < _arr.length; i++) {
    if (_arr[i]) {
      var one = _arr[i].toString(2),
          v = one.match(/^1+?(?=0)/);
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
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return
  
  const userMessage = inputMessage.value.trim()
  
  messages.value.push({
    role: 'user',
    content: userMessage
  })
  
  inputMessage.value = ''
  scrollToBottom()
  isLoading.value = true
  dataBuffer.value = '' // 重置缓冲区
  
  try {
    messages.value.push({
      role: 'assistant',
      content: '',
      isTyping: true
    })

    let str = ''
    const requestTask = uni.request({
      url: "https://campus.fybreeze.cn" + `/api/ai/${roomId.value}/streamChat?clientId=${userId.value}&message=${encodeURIComponent(userMessage)}`,
      method: 'GET',
      header: {
        'Accept': 'text/event-stream',
        'sa-Token': uni.getStorageSync('token')
      },
      enableChunked: true,
      responseType: 'arraybuffer',
      success: (res) => {
        console.log("发送完成：",res)
      },
      onChunkReceived: (res) => {}
    });

    requestTask.onChunkReceived(res => {
      let arrayBuffer = res.data;
      let text = arrayBufferToString(arrayBuffer)
      
      // 将新数据添加到缓冲区
      dataBuffer.value += text;
      
      // 处理缓冲区中的完整行
      while (true) {
        const newlineIndex = dataBuffer.value.indexOf('\n');
        if (newlineIndex === -1) break; // 没有完整的行，等待更多数据
        
        // 提取一行数据
        const line = dataBuffer.value.substring(0, newlineIndex).trim();
        // 更新缓冲区，移除已处理的行
        dataBuffer.value = dataBuffer.value.substring(newlineIndex + 1);
        
        // 处理数据行
        if (line.startsWith('data:')) {
          const currentData = line.substring(5).trim();
          if (currentData) {
            str += currentData;
            // 更新最后一条消息的内容
            const lastMessage = messages.value[messages.value.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
              lastMessage.content = str;
              // 解析markdown内容
              try {
                lastMessage.parsedContent = parseMarkdown(str);
              } catch (error) {
                console.error('Markdown解析失败:', error);
                lastMessage.parsedContent = str;
              }
              nextTick(() => {
                scrollToBottom();
              });
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('发送消息失败:', error)
    if (messages.value[messages.value.length - 1]?.isTyping) {
      messages.value.pop()
    }
    uni.showToast({
      title: '发送失败，请重试',
      icon: 'none'
    })
  } finally {
    isLoading.value = false
    const lastMessage = messages.value[messages.value.length - 1]
    if (lastMessage) {
      lastMessage.isTyping = false
    }
    scrollToBottom()
  }
}




const loadMoreMessages = () => {
  // 加载更多消息
}
</script>

<style lang="scss" scoped>
.ai-chat {
  min-height: 100vh;
  background: #F7F8FA;
  display: flex;
  flex-direction: column;
}

:deep(.wd-navbar) {
  background: #FFFFFF;
  border-bottom: 1rpx solid #EBEDF0;

  .right-actions {
    display: flex;
    gap: 30rpx;
    padding-right: 20rpx;
  }
}

.chat-container {
  flex: 1;
  margin-top: 88rpx;
  margin-bottom: 280rpx;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 40rpx;

  .logo {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 40rpx;
  }

  .welcome-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .title {
      font-size: 36rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 20rpx;
    }

    .subtitle {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }
  }
}

.input-section {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx 30rpx calc(20rpx + env(safe-area-inset-bottom));
  //box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  transition: bottom 0.3s;

  .input-container {
    position: relative;
    background: #ececec;
    border-radius: 16rpx;
    border: 1px solid #dcdcdc;
    padding: 16rpx 80rpx 16rpx 20rpx;

    .input-textarea {
      width: 100%;
      min-height: 44rpx;
      max-height: 120rpx;
      font-size: 28rpx;
      line-height: 1.5;
      background: transparent;
    }

    .send-button {
      position: absolute;
      right: 12rpx;
      bottom: 12rpx;
      width: 52rpx;
      height: 52rpx;
      border-radius: 26rpx;
      background: #F2F3F5;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      &.active {
        background: #4080FF;
        cursor: pointer;
        
        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .ai-notice {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    margin-top: 12rpx;
  }
}

.messages-list {
  padding: 20rpx 0;

  .message-item {
    display: flex;
    margin-bottom: 30rpx;
    padding: 0 30rpx;

    &.assistant {
      .message-bubble {
        background: transparent;
        margin-left: 16rpx;
        color: #333333;
        padding: 0;
        box-shadow: none;
      }
    }

    &.user {
      flex-direction: row-reverse;

      .message-bubble {
        background: #F2F3F5;
        border-radius: 20rpx;
        color: #333333;
        padding: 16rpx 24rpx;
      }
    }

    .avatar {
      width: 48rpx;
      height: 48rpx;
      border-radius: 24rpx;
      flex-shrink: 0;
    }

    .message-content {
      max-width: 70%;
    }

    .message-bubble {
      font-size: 28rpx;
      line-height: 1.6;
      word-break: break-all;
      
      :deep(.markdown-content) {
        .pre-block {
          background-color: #f6f8fa;
          border-radius: 6px;
          padding: 16rpx;
          overflow-x: auto;
          margin: 8rpx 0;
        }
        
        .code-inline {
          font-family: Consolas, Monaco, 'Andale Mono', monospace;
          background-color: rgba(175,184,193,0.2);
          padding: 2rpx 6rpx;
          border-radius: 4rpx;
          font-size: 26rpx;
        }
        
        .text-block {
          margin: 8rpx 0;
        }
        
        .list-block {
          padding-left: 20rpx;
          margin: 8rpx 0;
        }
        
        .table-block {
          border-collapse: collapse;
          margin: 8rpx 0;
          
          .table-cell {
            border: 1px solid #d0d7de;
            padding: 8rpx 12rpx;
          }
          
          .table-header {
            background-color: #f6f8fa;
          }
        }
        
        .quote-block {
          border-left: 4rpx solid #d0d7de;
          padding-left: 16rpx;
          color: #57606a;
          margin: 8rpx 0;
        }
        
        .md-image {
          max-width: 100%;
          height: auto;
        }
        
        .md-link {
          color: #0969da;
          text-decoration: none;
          
          &:active {
            text-decoration: underline;
          }
        }
      }
      
      &.typing::after {
        content: '|';
        animation: cursor-blink 1s infinite;
        margin-left: 2px;
      }
    }

    .message-actions {
      display: flex;
      gap: 24rpx;
      margin-top: 12rpx;
      padding: 0 12rpx;
      opacity: 0;
      transition: opacity 0.3s ease;

      .action-item {
        padding: 6rpx;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    &:hover {
      .message-actions {
        opacity: 1;
      }

    }
  }
}

.loading-dots {
  display: flex;
  gap: 8rpx;
  padding: 12rpx 0;

  .dot {
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    background: #999;
    animation: bounce 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>