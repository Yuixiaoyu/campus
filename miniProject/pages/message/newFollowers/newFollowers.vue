<template>
  <view class="container">
    <view class="header">
      <text class="title">新增关注</text>
      <text class="subtitle">{{ followers.length }}位用户关注了你</text>
    </view>

    <view class="follower-list">
      <view 
        v-for="(item, index) in followers" 
        :key="index"
        class="follower-item"
      >
        <view class="user-info">
          <view class="avatar-wrap">
            <wd-img 
              :width="100" 
              :height="100" 
              round 
              :src="item.avatar"
            />
            <view class="gender-icon" :class="item.gender">
              <wd-icon :name="item.gender === 'male' ? 'male' : 'female'" size="28rpx" />
            </view>
          </view>
          <view class="info">
            <view class="name">{{ item.nickname }}</view>
            <view class="signature">{{ item.signature }}</view>
          </view>
        </view>
        <view class="action">
          <button 
            class="follow-btn"
            :class="{ following: item.isFollowing }"
            @click="handleFollow(item)"
          >
            {{ item.isFollowing ? '已关注' : '关注' }}
          </button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="followers.length === 0">
      <image class="empty-icon" src="/static/message/empty-follow.png" mode="aspectFit"></image>
      <text class="empty-text">暂无新的关注</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 关注列表数据
const followers = ref([
  {
    id: 1,
    nickname: '小明同学',
    avatar: '/static/avatar.jpg',
    gender: 'male',
    signature: '热爱生活，热爱学习',
    isFollowing: false
  },
  {
    id: 2,
    nickname: '小红同学',
    avatar: '/static/avatar.jpg',
    gender: 'female',
    signature: '追求进步，永不止步',
    isFollowing: true
  },
  {
    id: 3,
    nickname: '小华同学',
    avatar: '/static/avatar.jpg',
    gender: 'male',
    signature: '计算机科学与技术专业在读',
    isFollowing: false
  }
])

// 处理关注/取消关注
const handleFollow = (user) => {
  user.isFollowing = !user.isFollowing
  // TODO: 调用关注/取消关注API
  uni.showToast({
    title: user.isFollowing ? '已关注' : '已取消关注',
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

.follower-list {
  background: #fff;
  border-radius: 16rpx;
  padding: 0 24rpx;
  
  .follower-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 2rpx solid #f5f6f7;
    
    &:last-child {
      border-bottom: none;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      flex: 1;
      margin-right: 24rpx;
      
      .avatar-wrap {
        position: relative;
        margin-right: 20rpx;
        
        .gender-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 32rpx;
          height: 32rpx;
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
        
        .name {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .signature {
          font-size: 24rpx;
          color: #999;
          @include text-ellipsis;
        }
      }
    }
    
    .action {
      .follow-btn {
        min-width: 140rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        border-radius: 28rpx;
        font-size: 26rpx;
        background: #409EFF;
        color: #fff;
        border: none;
        padding: 0 24rpx;
        
        &.following {
          background: #f5f6f7;
          color: #666;
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
