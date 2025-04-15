<template>
  <view class="container">
    <view class="header">
      <text class="title">收到的评论</text>
      <text class="subtitle">{{ comments.length }}条新评论</text>
    </view>

    <view class="comment-list">
      <view 
        v-for="(item, index) in comments" 
        :key="index"
        class="comment-item"
        @click="navigateToDetail(item)"
      >
        <view class="user-info">
          <view class="avatar-wrap">
            <wd-img 
              :width="80" 
              :height="80" 
              round 
              :src="item.userAvatar"
            />
            <view class="gender-icon" :class="item.gender">
              <wd-icon :name="item.gender === 'male' ? 'male' : 'female'" size="24rpx" />
            </view>
          </view>
          <view class="info">
            <view class="name-time">
              <text class="name">{{ item.userName }}</text>
              <text class="time">{{ item.time }}</text>
            </view>
            <view class="comment-text">{{ item.content }}</view>
          </view>
        </view>
        
        <view class="original-post">
          <view class="post-type">
            <wd-icon :name="getTypeIcon(item.sourceType)" size="28rpx" />
            <text>{{ getTypeText(item.sourceType) }}</text>
          </view>
          <view class="post-content">
            <text class="text">{{ item.sourceContent }}</text>
            <image 
              v-if="item.sourceImage" 
              class="image" 
              :src="item.sourceImage" 
              mode="aspectFill"
            />
          </view>
        </view>

        <view class="action-bar">
          <view class="action-item" @click.stop="handleLike(item)">
            <wd-icon :name="item.isLiked ? 'like-fill' : 'like'" size="32rpx" :color="item.isLiked ? '#409EFF' : '#999'" />
            <text :class="{ active: item.isLiked }">{{ item.likeCount || '点赞' }}</text>
          </view>
          <view class="action-item" @click.stop="handleReply(item)">
            <wd-icon name="comment" size="32rpx" color="#999" />
            <text>回复</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="comments.length === 0">
      <image class="empty-icon" src="/static/message/empty-comment.png" mode="aspectFit"></image>
      <text class="empty-text">暂无新的评论</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 评论列表数据
const comments = ref([
  {
    id: 1,
    userName: '小明',
    userAvatar: '/static/avatar.jpg',
    gender: 'male',
    time: '刚刚',
    content: '这个观点说得很好，我也是这么认为的！',
    sourceType: 'post',
    sourceId: 101,
    sourceContent: '关于如何提高学习效率，我有以下几点建议...',
    sourceImage: 'https://bpic.588ku.com/back_origin_min_pic/19/10/22/7d5760a4e3926576c237d950d5964db1.jpg',
    isLiked: false,
    likeCount: 3
  },
  {
    id: 2,
    userName: '小红',
    userAvatar: '/static/avatar.jpg',
    gender: 'female',
    time: '10分钟前',
    content: '同学你好，请问这个活动具体在哪个教室举办？',
    sourceType: 'activity',
    sourceId: 202,
    sourceContent: '欢迎参加本周六下午的编程交流会...',
    isLiked: true,
    likeCount: 1
  }
])

// 获取类型图标
const getTypeIcon = (type: string) => {
  const icons = {
    post: 'document',
    activity: 'calendar',
    course: 'education'
  }
  return icons[type] || 'document'
}

// 获取类型文本
const getTypeText = (type: string) => {
  const texts = {
    post: '帖子',
    activity: '活动',
    course: '课程'
  }
  return texts[type] || '帖子'
}

// 跳转到详情页
const navigateToDetail = (item) => {
  const routes = {
    post: `/pages/post/detail?id=${item.sourceId}`,
    activity: `/pages/activity/detail?id=${item.sourceId}`,
    course: `/pages/course/detail?id=${item.sourceId}`
  }
  uni.navigateTo({
    url: routes[item.sourceType] || routes.post
  })
}

// 处理点赞
const handleLike = (item) => {
  item.isLiked = !item.isLiked
  item.likeCount += item.isLiked ? 1 : -1
  // TODO: 调用点赞/取消点赞API
  uni.showToast({
    title: item.isLiked ? '已点赞' : '已取消点赞',
    icon: 'none'
  })
}

// 处理回复
const handleReply = (item) => {
  uni.navigateTo({
    url: `/pages/comment/reply?id=${item.id}&userName=${item.userName}`
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

.comment-list {
  .comment-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    
    .user-info {
      display: flex;
      margin-bottom: 16rpx;
      
      .avatar-wrap {
        position: relative;
        margin-right: 16rpx;
        
        .gender-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &.male {
            background: #409EFF;
            color: #fff;
          }
          
          &.female {
            background: #FF69B4;
            color: #fff;
          }
        }
      }
      
      .info {
        flex: 1;
        
        .name-time {
          display: flex;
          align-items: center;
          margin-bottom: 8rpx;
          
          .name {
            font-size: 28rpx;
            font-weight: 500;
            color: #333;
            margin-right: 12rpx;
          }
          
          .time {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .comment-text {
          font-size: 28rpx;
          color: #333;
          line-height: 1.5;
        }
      }
    }
    
    .original-post {
      background: #f8f9fa;
      border-radius: 12rpx;
      padding: 16rpx;
      margin-bottom: 16rpx;
      
      .post-type {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;
        
        text {
          font-size: 24rpx;
          color: #666;
          margin-left: 8rpx;
        }
      }
      
      .post-content {
        .text {
          font-size: 26rpx;
          color: #666;
          line-height: 1.5;
          margin-bottom: 12rpx;
          @include multi-line-ellipsis(2);
        }
        
        .image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 8rpx;
        }
      }
    }
    
    .action-bar {
      display: flex;
      align-items: center;
      border-top: 2rpx solid #f5f6f7;
      padding-top: 16rpx;
      
      .action-item {
        display: flex;
        align-items: center;
        margin-right: 32rpx;
        
        text {
          font-size: 26rpx;
          color: #999;
          margin-left: 8rpx;
          
          &.active {
            color: #409EFF;
          }
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
