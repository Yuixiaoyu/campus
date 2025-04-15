<template>
  <view class="container">
    <view class="header">
      <text class="title">活动消息</text>
      <text class="subtitle">{{ messages.length }}条活动通知</text>
    </view>

    <view class="message-list">
      <view 
        v-for="(item, index) in messages" 
        :key="index"
        class="message-item"
        :class="{ unread: !item.isRead }"
        @click="handleMessageClick(item)"
      >
        <view class="activity-info">
          <view class="status-tag" :class="item.status">{{ getStatusText(item.status) }}</view>
          <view class="title">{{ item.title }}</view>
          <view class="time-location">
            <view class="time">
              <wd-icon name="time" size="28rpx" color="#999" />
              <text>{{ item.time }}</text>
            </view>
            <view class="location">
              <wd-icon name="location" size="28rpx" color="#999" />
              <text>{{ item.location }}</text>
            </view>
          </view>
        </view>
        
        <view class="notice-content">
          <text class="label">{{ getNoticeLabel(item.type) }}</text>
          <text class="content">{{ item.content }}</text>
        </view>

        <view class="action-bar">
          <button 
            class="action-btn primary" 
            v-if="item.status === 'pending'"
            @click.stop="handleConfirm(item)"
          >确认参加</button>
          <button 
            class="action-btn secondary" 
            v-if="item.status === 'pending'"
            @click.stop="handleDecline(item)"
          >婉拒</button>
          <view class="status-text" v-else>{{ getActionText(item.status) }}</view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="messages.length === 0">
      <image class="empty-icon" src="/static/message/empty-activity.png" mode="aspectFit"></image>
      <text class="empty-text">暂无活动消息</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 活动消息列表数据
const messages = ref([
  {
    id: 1,
    type: 'invite',
    title: '编程技术交流会',
    time: '2024-01-25 14:00-16:00',
    location: '图书馆三楼会议室',
    content: '诚邀您参加本周四下午的编程技术交流会，届时将讨论前端开发的最新趋势。',
    status: 'pending',
    isRead: false
  },
  {
    id: 2,
    type: 'update',
    title: '校园歌手大赛',
    time: '2024-01-28 19:00-21:00',
    location: '大学生活动中心',
    content: '您报名的校园歌手大赛时间已调整，请查看最新安排。',
    status: 'confirmed',
    isRead: true
  },
  {
    id: 3,
    type: 'reminder',
    title: '篮球友谊赛',
    time: '2024-01-22 15:00-17:00',
    location: '体育馆主场',
    content: '提醒：您报名的篮球友谊赛将在明天下午开始，请准时到场。',
    status: 'declined',
    isRead: false
  }
])

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap = {
    pending: '待确认',
    confirmed: '已确认',
    declined: '已婉拒',
    canceled: '已取消'
  }
  return statusMap[status] || '待确认'
}

// 获取通知标签
const getNoticeLabel = (type: string) => {
  const labels = {
    invite: '活动邀请',
    update: '活动更新',
    reminder: '活动提醒',
    cancel: '活动取消'
  }
  return labels[type] || '活动通知'
}

// 获取操作文本
const getActionText = (status: string) => {
  const actionMap = {
    confirmed: '您已确认参加',
    declined: '您已婉拒参加',
    canceled: '活动已取消'
  }
  return actionMap[status] || ''
}

// 处理消息点击
const handleMessageClick = (item) => {
  item.isRead = true
  // TODO: 调用标记已读API
  uni.navigateTo({
    url: `/pages/activity/detail?id=${item.id}`
  })
}

// 处理确认参加
const handleConfirm = (item) => {
  item.status = 'confirmed'
  // TODO: 调用确认参加API
  uni.showToast({
    title: '已确认参加',
    icon: 'success'
  })
}

// 处理婉拒参加
const handleDecline = (item) => {
  item.status = 'declined'
  // TODO: 调用婉拒参加API
  uni.showToast({
    title: '已婉拒参加',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.container {
  min-height: 100vh;
  background: #f5f6f7;
  padding: 24rpx;
}

.header {
  background: #fff;
  padding: 32rpx 24rpx;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  
  .title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 8rpx;
    display: block;
  }
  
  .subtitle {
    font-size: 26rpx;
    color: #999;
  }
}

.message-list {
  .message-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    
    &.unread {
      background: #f0f9ff;
    }
    
    .activity-info {
      position: relative;
      padding-right: 120rpx;
      margin-bottom: 20rpx;
      
      .status-tag {
        position: absolute;
        right: 0;
        top: 0;
        padding: 4rpx 16rpx;
        border-radius: 8rpx;
        font-size: 24rpx;
        
        &.pending {
          background: #e6a23c;
          color: #fff;
        }
        
        &.confirmed {
          background: #67c23a;
          color: #fff;
        }
        
        &.declined {
          background: #909399;
          color: #fff;
        }
        
        &.canceled {
          background: #f56c6c;
          color: #fff;
        }
      }
      
      .title {
        font-size: 30rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 16rpx;
      }
      
      .time-location {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: #666;
        
        .time, .location {
          display: flex;
          align-items: center;
          margin-right: 32rpx;
          
          text {
            margin-left: 8rpx;
          }
        }
      }
    }
    
    .notice-content {
      background: #f8f9fa;
      border-radius: 12rpx;
      padding: 16rpx;
      margin-bottom: 20rpx;
      
      .label {
        font-size: 24rpx;
        color: #409EFF;
        margin-bottom: 8rpx;
        display: block;
      }
      
      .content {
        font-size: 26rpx;
        color: #666;
        line-height: 1.5;
      }
    }
    
    .action-bar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      
      .action-btn {
        min-width: 160rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        border-radius: 32rpx;
        font-size: 26rpx;
        margin-left: 20rpx;
        
        &.primary {
          background: #409EFF;
          color: #fff;
        }
        
        &.secondary {
          background: #f5f6f7;
          color: #666;
        }
      }
      
      .status-text {
        font-size: 26rpx;
        color: #999;
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
