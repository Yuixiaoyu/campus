<template>
  <view class="layout">
    <!-- 顶部功能卡片 -->
    <view class="banner-section">
      <view class="card-item" @click="handleCardClick('attention')">
        <view class="card-content">
          <image class="card-icon" src="/static/message/attention.png" mode="aspectFit"></image>
          <text class="card-title">新增关注</text>
          <view class="badge" v-if="newAttentionCount > 0">{{ newAttentionCount }}</view>
        </view>
      </view>
      <view class="card-item" @click="handleCardClick('like')">
        <view class="card-content">
          <image class="card-icon" src="/static/message/like.png" mode="aspectFit"></image>
          <text class="card-title">赞和收藏</text>
          <view class="badge" v-if="newLikeCount > 0">{{ newLikeCount }}</view>
        </view>
      </view>
      <view class="card-item" @click="handleCardClick('comment')">
        <view class="card-content">
          <image class="card-icon" src="/static/message/comment.png" mode="aspectFit"></image>
          <text class="card-title">评论和@</text>
          <view class="badge" v-if="newCommentCount > 0">{{ newCommentCount }}</view>
        </view>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="message-list">
      <view 
        v-for="(item, index) in messageList" 
        :key="index"
        class="message-item"
        :class="{ unread: !item.isRead }"
        @click="handleMessageClick(item)"
      >
        <view class="avatar-wrapper">
          <wd-img 
            :width="90" 
            :height="90" 
            round 
            :src="item.avatar || '/static/avatar.jpg'"
          />
          <view class="status-dot" v-if="item.online"></view>
        </view>
        <view class="content">
          <view class="header">
            <text class="username">{{ item.username }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
          <view class="message">
            <text class="text">{{ item.message }}</text>
            <view class="unread-count" v-if="item.unreadCount">{{ item.unreadCount }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="messageList.length === 0">
      <image class="empty-icon" src="/static/message/empty.png" mode="aspectFit"></image>
      <text class="empty-text">暂无消息</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 新消息计数
const newAttentionCount = ref(2)
const newLikeCount = ref(5)
const newCommentCount = ref(3)

// 消息列表数据
const messageList = ref([
  {
    id: 1,
    type: 'system',
    username: '校园助手',
    avatar: '/static/avatar.jpg',
    message: '欢迎使用校园助手，有什么可以帮您的吗？',
    time: '刚刚',
    isRead: false,
    online: true,
    unreadCount: 1
  },
  {
    id: 3,
    type: 'activity',
    activityId: 'act001',
    username: '社团活动',
    avatar: '/static/avatar.jpg',
    message: '本周末有趣味运动会活动，欢迎报名参加！',
    time: '30分钟前',
    isRead: false,
    unreadCount: 3
  }
])

// 处理卡片点击
const handleCardClick = (type) => {
  // 清除对应的未读计数
  switch(type) {
    case 'attention':
      newAttentionCount.value = 0
      // 跳转到新增关注页面
      uni.navigateTo({
        url: '/pages/message/newFollowers/newFollowers'
      })
      break
    case 'like':
      newLikeCount.value = 0
      // 跳转到赞和收藏页面
      uni.navigateTo({
        url: '/pages/message/likes/likes'
      })
      break
    case 'comment':
      newCommentCount.value = 0
      // 跳转到评论页面
      uni.navigateTo({
        url: '/pages/message/comments/comments'
      })
      break
  }
}

// 处理消息点击
const handleMessageClick = (item) => {
  // 标记消息为已读
  item.isRead = true
  item.unreadCount = 0

  // 根据消息类型跳转到不同页面
  switch(item.type) {
    case 'system':
      // 系统消息跳转到系统消息页
      uni.navigateTo({
        url: '/pages/message/systemMessage/systemMessage'
      })
      break
    case 'activity':
      // 活动消息跳转到活动消息页
      uni.navigateTo({
        url: `/pages/message/activityMessage/activityMessage?id=${item.activityId}`
      })
      break
  }
}
</script>

<style lang="scss" scoped>
// 文本省略混入
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layout {
  min-height: 100vh;
  background: #f5f6f7;
  padding: 24rpx;
}

.banner-section {
  display: flex;
  justify-content: space-between;
  padding: 24rpx;
  margin-bottom: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .card-item {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 16rpx;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
    }

    .card-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .card-icon {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 12rpx;
      }

      .card-title {
        font-size: 24rpx;
        color: #333;
        font-weight: 500;
      }

      .badge {
        position: absolute;
        top: -8rpx;
        right: -16rpx;
        min-width: 32rpx;
        height: 32rpx;
        padding: 0 8rpx;
        background: #ff4d4f;
        border-radius: 16rpx;
        color: #fff;
        font-size: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.message-list {
  background: #fff;
  border-radius: 16rpx;
  padding: 8rpx 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .message-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    transition: all 0.3s ease;

    &:active {
      background: #f5f6f7;
    }

    &.unread {
      background: #f0f9ff;
    }

    .avatar-wrapper {
      position: relative;
      margin-right: 24rpx;

      .status-dot {
        position: absolute;
        bottom: 4rpx;
        right: 4rpx;
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #52c41a;
        border: 2rpx solid #fff;
      }
    }

    .content {
      flex: 1;
      overflow: hidden;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8rpx;

        .username {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
        }

        .time {
          font-size: 24rpx;
          color: #999;
        }
      }

      .message {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
          flex: 1;
          font-size: 26rpx;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .unread-count {
          min-width: 36rpx;
          height: 36rpx;
          padding: 0 8rpx;
          margin-left: 16rpx;
          background: #ff4d4f;
          border-radius: 18rpx;
          color: #fff;
          font-size: 22rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;

  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 24rpx;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>