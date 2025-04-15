<template>
  <view class="deepseek-page">
    <!-- 顶部导航 -->
    <wd-navbar  title="AI小助手" fixed placeholder safeAreaInsetTop :zIndex="9999999999">
      <template #left>
          <wd-icon
            name="history" 
            size="20px" 
            @click="showHistory"
            class="history-icon"
          />
      </template>
    </wd-navbar>

    <!-- 对话区域 -->
    <scroll-view 
      class="chat-container" 
      scroll-y 
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @scrolltoupper="loadMoreMessages"
    >
      <view class="message-list">
        <!-- AI 欢迎语 -->
        <view class="message ai-message" v-if="messages.length === 0">
          <view class="avatar">
            <wd-img width="40" height="40" round  src="/static/tabbar/deepseek-selected.png"/>
          </view>
          <view class="content">
            <view class="bubble">
              欢迎使用青春共享站AI助手~(✧∇✧) 我是由西安市雁塔区星河云端软件开发俱乐部公司开发的校园服务助手DeepSeek-R1大模型，无论是学习资料求助还是校园生活疑问，小站都能为您提供解决方案。请问今天有什么需要帮助的吗？
            </view>
          </view>
        </view>

        <!-- 消息列表 -->
        <view 
          v-for="(msg, index) in messages" 
          :key="index"
          :class="['message', msg.isUser ? 'user-message' : 'ai-message']"
        >
          <view class="avatar">
            <wd-img 
              width="40" 
              height="40" 
              round 
              :src="msg.isUser ? userAvatar : '/static/tabbar/deepseek-selected.png'"
            />
          </view>
          <view class="content">
            <view class="bubble" :class="{ 'error': msg.error }">
              <block v-if="msg.isUser">
                <text>{{ msg.content }}</text>
              </block>
              <block v-else>
                <rich-text 
                  :nodes="formatMarkdown(msg.content)" 
                  class="markdown-body"
                />
              </block>
              <view v-if="msg.error" class="retry-btn" @click="retryMessage(msg)">
                <wd-icon name="refresh" size="14px"/>
                重试
              </view>
            </view>
            <view class="time">{{ formatTime(msg.time) }}</view>
          </view>
        </view>

        <!-- 加载动画 -->
        <view class="ai-message" v-if="isLoading">
          <view class="avatar">
            <wd-img width="40" height="40" round src="/static/tabbar/deepseek-selected.png"/>
          </view>
          <view class="content">
            <view class="bubble loading">
              <view class="dot"></view>
              <view class="dot"></view>
              <view class="dot"></view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="input-container"  :style="{position: 'relative',bottom:inputHeight+'px'}">
      <wd-input
        v-model="inputMessage"
        type="text"
        placeholder="请输入您的问题"
        :maxlength="500"
        :adjustPosition="false"
        @keypress.enter="sendMessage"
        :disabled="isLoading"
      >
        <template #suffix>
          <view class="button-group">
            <wd-button 
              size="small" 
              type="primary" 
              :loading="isLoading"
              :disabled="!inputMessage.trim() || isLoading"
              @click="sendMessage"
            >
              {{ isLoading ? '发送中...' : '发送' }}
            </wd-button>
          </view>
        </template>
      </wd-input>
    </view>

    <!-- 历史记录弹窗 -->
    <wd-popup v-model="showHistoryPopup" position="right">
      <view class="history-container">
        <view class="history-header">
          <text>历史对话</text>
          <wd-icon name="close" @click="showHistoryPopup = false"/>
        </view>
        <view class="history-list">
          <wd-cell-group>
            <wd-cell 
              v-for="room in rooms" 
              :key="room.id"
              :title="formatTime(room.createTime)"
              is-link
              @click="switchRoom(room.id)"
            />
          </wd-cell-group>
        </view>
      </view>
    </wd-popup>

    <wd-toast/>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import { useToast } from '@/uni_modules/wot-design-uni'
import { getUserInfo } from '@/utils/userStorage'
import { doChat, getChatRoomList, doChatStream } from "@/api/aichatApi"
import {onLoad, onUnload} from "@dcloudio/uni-app";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const toast = useToast()

// 数据定义
const messages = ref<Array<{
  content: string
  isUser: boolean
  time: number
  error?: boolean
  isStreaming?: boolean
}>>([])
const inputMessage = ref('')
const isLoading = ref(false)
const scrollTop = ref(0)
const showHistoryPopup = ref(false)
const rooms = ref([])
const currentRoomId = ref('')
const userAvatar = ref(getUserInfo()?.imageUrl)

const inputHeight = ref(0)

// 修改 marked 配置
marked.setOptions({
  gfm: true,
  breaks: true,
  mangle: false,
  headerIds: false, // 禁用标题ID
  async: false // 禁用异步模式
})

// 修改 formatMarkdown 函数
const formatMarkdown = (content: string) => {
  if (!content) return ''
  try {
    const html = marked.parse(content)
      // 为所有元素添加类名
      .replace(/<pre><code>/g, '<pre class="pre-block"><code class="code-block">')
      .replace(/<code>/g, '<code class="code-inline">')
      .replace(/<p>/g, '<p class="paragraph">')
      .replace(/<ul>/g, '<ul class="list">')
      .replace(/<ol>/g, '<ol class="list">')
      .replace(/<li>/g, '<li class="list-item">')
      .replace(/<blockquote>/g, '<blockquote class="quote">')
      .replace(/\n/g, '<br>') // 确保换行正确显示
    return html
  } catch (error) {
    console.error('Markdown解析错误:', error)
    return content
  }
}

// 获取房间列表
const getRooms = async () => {
  try {
    const res = await getChatRoomList()
    if (res.code === 200) {
      rooms.value = res.data
    }
  } catch (error) {
    toast.error('获取历史记录失败')
  }
}

// 生成唯一房间号
const generateRoomId = () => {
  // 使用时间戳前10位 + 4位随机数
  const timestamp = Math.floor(Date.now() / 1000)
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${timestamp}${random}`
}

// 初始化房间
const initRoom = async () => {
  try {
    // 生成新房间号
    currentRoomId.value = generateRoomId()
    console.log('新建房间号:', currentRoomId.value)
  } catch (error) {
    toast.error('创建房间失败')
    console.error('创建房间错误:', error)
  }
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value || isLoading.value) return
  
  try {
    isLoading.value = true
    const userMessage = inputMessage.value
    inputMessage.value = '' // 提前清空输入框
    
    // 添加用户消息
    messages.value.push({
      content: userMessage,
      isUser: true,
      time: Date.now()
    })
    await scrollToBottom()

    // 添加 AI 消息占位
    const aiMessageIndex = messages.value.length
    messages.value.push({
      content: '',
      isUser: false,
      time: Date.now(),
      isStreaming: true
    })
    await scrollToBottom()

    // 创建流式请求
    const requestTask = await doChatStream(currentRoomId.value, userMessage)
    // 监听流式输出
    requestTask.onChunkReceived((res)=>{
      console.log("ai响应res", res)
      try {
        const uint8Array = new Uint8Array(res.data)
        let text = String.fromCharCode.apply(null, uint8Array)
        text = decodeURIComponent(escape(text))
        console.log("收到的文本:", text)
        
        if (text) {
          // 清理和解析数据
          let cleanedContent = text.replaceAll("data:", ',')
          let splitContent = "[" + cleanedContent.replace(/^,/, '') + "]"
          try {
            const dataArray = JSON.parse(splitContent)
            console.log("解析后的数据:", dataArray)
            
            // 更新消息内容
            for (let i = 0; i < dataArray.length; i++) {
              if (dataArray[i].data && dataArray[i].data.text) {
                messages.value[aiMessageIndex].content += dataArray[i].data.text
                // 强制更新视图
                messages.value = [...messages.value]
                scrollToBottom()
              }
            }
          } catch (parseError) {
            console.error("JSON解析错误:", parseError)
          }
        }
      } catch (error) {
        console.error("处理响应数据错误:", error)
        messages.value[aiMessageIndex].error = true
        messages.value[aiMessageIndex].content = '消息解析错误，请重试'
      }
    })

  } catch (error) {
    console.error('发送消息错误:', error)
    // 根据错误类型显示不同提示
    if(error.message?.includes('timeout')) {
      toast.error('响应超时,请重试')
    } else if(error.message?.includes('Network')) {
      toast.error('网络连接失败,请检查网络')
    } else {
      toast.error(error.message || '发送失败,请重试')
    }
    // 移除最后一条消息
    messages.value.pop()
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

// 显示历史记录
const showHistory = () => {
  getRooms()
  showHistoryPopup.value = true
}

// 切换房间
const switchRoom = (roomId: string) => {
  currentRoomId.value = roomId
  showHistoryPopup.value = false
  // TODO: 加载房间消息
}

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  const query = uni.createSelectorQuery()
  query.select('.message-list').boundingClientRect()
  query.exec((res) => {
    if (res[0]) {
      scrollTop.value = res[0].height
    }
  })
}

// 加载更多消息
const loadMoreMessages = () => {
  // TODO: 实现加载历史消息
}

// 重试消息
const retryMessage = (msg: { content: string; isUser: boolean; time: number; error?: boolean }) => {
  // 实现重试逻辑
}

onMounted(() => {
  // 页面加载时初始化房间
  initRoom()
})
const onKeyboardHeightChange=(res)=> {
  console.log("res",res)
  const { height, duration } = res;
  // 键盘弹起
  if (height) {
    console.log('键盘弹起');
    inputHeight.value = height - 60
  }
  // 键盘收回
  else {
    console.log('键盘收回');
    inputHeight.value = 0
  }
}

onLoad(()=> {
  uni.onKeyboardHeightChange(onKeyboardHeightChange);
})

onUnload(()=>{
  uni.offKeyboardHeightChange(onKeyboardHeightChange);
})

// 分享给好友
onShareAppMessage((res) => {
  console.log(res)
  return {
    title: '青春共享站',
    path: '/pages/index/index',
    imageUrl: '/static/logo.jpg', // 分享图片
  }
})
// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: '青春共享站',
    path: '/pages/index/index',
    imageUrl: '/static/logo.jpg', // 分享图片
  }
})

</script>

<style lang="scss" scoped>
.deepseek-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  .chat-container {
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
    
    .message-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 12px;
    }

    .message {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      max-width: 90%;
      position: relative;

      .avatar {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        position: relative;
        z-index: 1;
      }

      &.user-message {
        flex-direction: row-reverse;
        align-self: flex-end;
        padding-right: 8px;

        .bubble {
          background-color: #8498f0;
          color: #fff;
          border-radius: 16px 2px 16px 16px;
          word-break: break-all;
          white-space: pre-wrap;
          margin-right: 0;
          box-shadow: 0 2px 12px rgba(132, 152, 240, 0.2),
                      0 1px 4px rgba(132, 152, 240, 0.1);
        }

        .content {
          margin-right: 4px;
        }

        .time {
          text-align: right;
          padding-right: 0;
        }
      }

      &.ai-message {
        align-self: flex-start;
        padding-left: 8px;

        .bubble {
          margin-left: 0;
          background-color: #fff;
          border-radius: 2px 16px 16px 16px;
          word-wrap: break-word;
          box-shadow: 3px 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.03);
          
          .markdown-body {
            color: #333;
            overflow-x: hidden;

            :deep(.pre-block) {
              margin: 8px 0;
              padding: 12px;
              background: #f6f8fa;
              border-radius: 6px;
              overflow-x: auto;
              max-width: 100%;
              
              .code-block {
                white-space: pre-wrap;
                word-break: break-all;
                display: block;
                font-family: Consolas, Monaco, 'Andale Mono', monospace;
                font-size: 12px;
              }
            }

            :deep(.code-inline) {
              font-family: Consolas, Monaco, 'Andale Mono', monospace;
              font-size: 12px;
              padding: 2px 4px;
              background: rgba(0,0,0,0.05);
              border-radius: 4px;
              word-break: break-all;
            }

            :deep(.paragraph) {
              margin: 8px 0;
              line-height: 1.6;
              word-wrap: break-word;
            }

            :deep(.list) {
              padding-left: 20px;
              margin: 8px 0;
            }

            :deep(.list-item) {
              margin: 4px 0;
            }

            :deep(.quote) {
              margin: 8px 0;
              padding-left: 12px;
              border-left: 4px solid #ddd;
              color: #666;
            }
          }
        }

        .content {
          margin-left: 4px;
        }
      }

      .content {
        flex: 1;
        min-width: 0;
        max-width: calc(100% - 44px);

        .bubble {
          padding: 12px 16px;
          font-size: 14px;
          line-height: 1.5;
          max-width: 100%;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08),
                        0 2px 6px rgba(0, 0, 0, 0.04);
          }
        }

        .time {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }

        .markdown-body {
          color: #333;
          
          :deep(.pre-block) {
            margin: 8px 0;
            padding: 12px;
            background: #f6f8fa;
            border-radius: 6px;
            overflow-x: auto;
          }

          :deep(.code-text) {
            font-family: Consolas, Monaco, 'Andale Mono', monospace;
            font-size: 12px;
            padding: 2px 4px;
            background: rgba(0,0,0,0.05);
            border-radius: 4px;
          }

          :deep(.paragraph) {
            margin: 8px 0;
            line-height: 1.6;
          }

          :deep(.list) {
            padding-left: 20px;
            margin: 8px 0;
          }

          :deep(.quote) {
            margin: 8px 0;
            padding-left: 12px;
            border-left: 4px solid #ddd;
            color: #666;
          }
        }
      }
    }

    .loading {
      display: flex;
      gap: 4px;
      padding: 12px 24px !important;

      .dot {
        width: 6px;
        height: 6px;
        background-color: #8498f0;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;

        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
      }
    }
  }

  .input-container {
    padding: 16px;
    background-color: #fff;
    border-top: 1px solid #eee;

    .button-group {
      margin-left: 8px;
    }
  }

  .history-container {
    width: 80vw;
    height: 100vh;
    background-color: #fff;
    
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      font-weight: 500;
    }

    .history-list {
      height: calc(100vh - 53px);
      overflow-y: auto;
    }
  }

  .navbar-left {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 16px;

    .history-icon {
      color: #333;
      
      &:active {
        opacity: 0.7;
      }
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.bubble {
  &.error {
    background-color: #fff0f0 !important;
    border: 1px solid #ffcdd2;
  }
  
  .retry-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #ff5252;
    margin-top: 8px;
    cursor: pointer;
    
    &:active {
      opacity: 0.8;
    }
  }
}

.message-content {
  &.streaming {
    &::after {
      content: '▋';
      display: inline-block;
      animation: blink 1s infinite;
      margin-left: 2px;
      color: #666;
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
