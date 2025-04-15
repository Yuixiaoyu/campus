<template>
  <view class="container">
    <view class="header">
      <text class="title">系统消息</text>
      <text class="subtitle">{{ messages.length }}条系统通知</text>
    </view>

    <view class="message-list">
      <view 
        v-for="(item, index) in messages" 
        :key="index"
        class="message-item"
        :class="{ unread: !item.isRead }"
        @click="handleMessageClick(item)"
      >
        <view class="icon-wrap">
          <wd-icon :name="getTypeIcon(item.type)" size="48rpx" :color="getTypeColor(item.type)" />
        </view>
        <view class="content">
          <view class="title">{{ item.title }}</view>
          <view class="desc">{{ item.content }}</view>
          <view class="time">{{ item.time }}</view>
        </view>
        <view class="status" v-if="!item.isRead"></view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="messages.length === 0">
      <image class="empty-icon" src="/static/message/empty-system.png" mode="aspectFit"></image>
      <text class="empty-text">暂无系统消息</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 消息列表数据
const messages = ref([
  {
    id: 1,
    type: 'sound',
    title: '系统维护通知',
    content: '亲爱的用户，系统将于本周六凌晨2:00-4:00进行例行维护，期间可能影响部分功能的使用。',
    time: '2024-01-20 10:00',
    isRead: false
  },
  {
    id: 2,
    type: 'update',
    title: '版本更新提醒',
    content: '校园社区2.0版本已发布，新增动态表情功能，欢迎体验！',
    time: '2024-01-19 15:30',
    isRead: true
  },
  {
    id: 3,
    type: 'internet',
    title: '账号安全提醒',
    content: '检测到您的账号在新设备上登录，如非本人操作，请及时修改密码。',
    time: '2024-01-18 20:15',
    isRead: false
  }
])

// 获取消息类型图标
const getTypeIcon = (type: string) => {
  const icons = {
    sound: 'sound',
    update: 'refresh',
    internet: 'internet'
  }
  return icons[type] || 'sound'
}

// 获取消息类型颜色
const getTypeColor = (type: string) => {
  const colors = {
    notice: '#409EFF',
    update: '#67C23A',
    security: '#E6A23C'
  }
  return colors[type] || '#409EFF'
}

// 处理消息点击
const handleMessageClick = (item) => {
  item.isRead = true
  // TODO: 调用标记已读API
  uni.navigateTo({
    url: `/pages/message/detail?id=${item.id}&type=system`
  })
}
</script>

<style lang="scss" scoped>
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
    display: flex;
    align-items: flex-start;
    position: relative;
    
    &.unread {
      background: #f0f9ff;
    }
    
    .icon-wrap {
      width: 80rpx;
      height: 80rpx;
      background: rgba(64, 158, 255, 0.1);
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
    }
    
    .content {
      flex: 1;
      
      .title {
        font-size: 28rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .desc {
        font-size: 26rpx;
        color: #666;
        line-height: 1.5;
        margin-bottom: 12rpx;
      }
      
      .time {
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .status {
      position: absolute;
      top: 32rpx;
      right: 24rpx;
      width: 12rpx;
      height: 12rpx;
      background: #f56c6c;
      border-radius: 50%;
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
