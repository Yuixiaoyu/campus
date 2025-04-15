<template>
  <view class="container">
    <wd-tabs v-model="activeTab" sticky animated>
      <wd-tab title="收到的赞"></wd-tab>
      <wd-tab title="收到的收藏"></wd-tab>
    </wd-tabs>

    <!-- 点赞列表 -->
    <view v-show="activeTab === 0" class="like-list">
      <view 
        v-for="(item, index) in likeList" 
        :key="index"
        class="like-item"
        @click="navigateToDetail(item)"
      >
        <view class="user-info">
          <wd-img 
            :width="80" 
            :height="80" 
            round 
            :src="item.userAvatar"
          />
          <view class="info">
            <view class="name">{{ item.userName }}</view>
            <view class="time">{{ item.time }}</view>
          </view>
        </view>
        <view class="content">
          <text class="action">赞了你的{{ item.type }}</text>
          <view class="preview">
            <text class="text">{{ item.content }}</text>
            <image 
              v-if="item.image" 
              class="image" 
              :src="item.image" 
              mode="aspectFill"
            />
          </view>
        </view>
      </view>
      
      <view class="empty-state" v-if="likeList.length === 0">
        <image class="empty-icon" src="/static/message/empty-like.png" mode="aspectFit"></image>
        <text class="empty-text">暂无收到的赞</text>
      </view>
    </view>

    <!-- 收藏列表 -->
    <view v-show="activeTab === 1" class="favorite-list">
      <view 
        v-for="(item, index) in favoriteList" 
        :key="index"
        class="favorite-item"
        @click="navigateToDetail(item)"
      >
        <view class="user-info">
          <wd-img 
            :width="80" 
            :height="80" 
            round 
            :src="item.userAvatar"
          />
          <view class="info">
            <view class="name">{{ item.userName }}</view>
            <view class="time">{{ item.time }}</view>
          </view>
        </view>
        <view class="content">
          <text class="action">收藏了你的{{ item.type }}</text>
          <view class="preview">
            <text class="text">{{ item.content }}</text>
            <image 
              v-if="item.image" 
              class="image" 
              :src="item.image" 
              mode="aspectFill"
            />
          </view>
        </view>
      </view>
      
      <view class="empty-state" v-if="favoriteList.length === 0">
        <image class="empty-icon" src="/static/message/empty-favorite.png" mode="aspectFit"></image>
        <text class="empty-text">暂无收到的收藏</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

// 点赞列表数据
const likeList = ref([
  {
    id: 1,
    userName: '小明',
    userAvatar: '/static/avatar.jpg',
    time: '刚刚',
    type: '帖子',
    content: '这是一个非常有趣的话题...',
    image: 'https://minio.fybreeze.cn/campus/tmp_f4748c1c384f7acb2240ce3cd7000943.webp'
  },
  {
    id: 2,
    userName: '小红',
    userAvatar: '/static/avatar.jpg',
    time: '10分钟前',
    type: '评论',
    content: '说得很对，我也是这么认为的！'
  }
])

// 收藏列表数据
const favoriteList = ref([
  {
    id: 3,
    userName: '小华',
    userAvatar: '/static/avatar.jpg',
    time: '30分钟前',
    type: '帖子',
    content: '关于期末考试复习的一些建议...',
    image: 'https://bpic.588ku.com/back_origin_min_pic/19/10/22/7d5760a4e3926576c237d950d5964db1.jpg'
  }
])

// 跳转到详情页
const navigateToDetail = (item) => {



  if (item.type === '帖子') {
    uni.navigateTo({
      url: `/pages/post/detail?id=${item.id}`
    })
  } else {
    uni.navigateTo({
      url: `/pages/comment/detail?id=${item.id}`
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f6f7;
}

:deep(.wd-tabs__nav) {
  background: #fff;
}

.like-list,
.favorite-list {
  padding: 24rpx;
  
  .like-item,
  .favorite-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      .info {
        margin-left: 16rpx;
        
        .name {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 4rpx;
        }
        
        .time {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    
    .content {
      .action {
        font-size: 26rpx;
        color: #666;
        margin-bottom: 12rpx;
        display: block;
      }
      
      .preview {
        background: #f8f9fa;
        border-radius: 12rpx;
        padding: 16rpx;
        
        .text {
          font-size: 26rpx;
          color: #333;
          line-height: 1.5;
          margin-bottom: 12rpx;
          display: block;
        }
        
        .image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
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
