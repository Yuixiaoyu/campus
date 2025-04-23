<template>
  <view class="deepseek-page">
    <!-- 顶部导航 -->
    <wd-navbar title="智能助手" fixed placeholder safeAreaInsetTop></wd-navbar>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- AI对话模块卡片 -->
      <view class="feature-card ai-chat" @click="showAIChat">
        <view class="card-content">
          <view class="icon-wrapper">
            <wd-img width="60" height="60" round src="/static/tabbar/deepseek-selected.png"/>
          </view>
          <view class="card-info">
            <text class="title">AI智能助手</text>
            <text class="description">24小时在线，解答你的任何问题</text>
          </view>
          <view class="arrow">
            <wd-icon name="arrow-right" size="20px" color="#666"/>
          </view>
        </view>
      </view>

      <!-- 海龟汤游戏模块卡片 -->
      <view class="feature-card turtle-soup" @click="showTurtleSoup">
        <view class="card-content">
          <view class="icon-wrapper">
            <wd-img width="60" height="60" round src="/static/turtle-soup-icon.png"/>
          </view>
          <view class="card-info">
            <text class="title">海龟汤游戏</text>
            <text class="description">烧脑解谜，激发你的想象力</text>
          </view>
          <view class="arrow">
            <wd-icon name="arrow-right" size="20px" color="#666"/>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAIChat = () => {
  uni.navigateTo({
    url: '/pages/ai-chat/ai-chat'
  })
}

const showTurtleSoup = () => {
  uni.showToast({
    title: '敬请期待...',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.deepseek-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 50%, #fff8f9 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at 90% 10%, rgba(99,102,241,0.03) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at 10% 90%, rgba(241,102,102,0.03) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
}

.main-content {
  padding: 40rpx 30rpx;
  margin-top: 88rpx;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30rpx;
}

.feature-card {
  position: relative;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  transition: all 0.3s ease;
  border: 2rpx solid #f0f0f0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(255,255,255,0) 100%);
    z-index: 0;
  }

  &:active {
    transform: translateY(2rpx);
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 30rpx;
  }

  .icon-wrapper {
    flex-shrink: 0;
    
    :deep(.wd-img) {
      border: 6rpx solid #ffffff;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
    }
  }

  .card-info {
    flex: 1;

    .title {
      font-size: 40rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 12rpx;
      display: block;
    }

    .description {
      font-size: 28rpx;
      color: #666;
      display: block;
      line-height: 1.5;
    }
  }

  .arrow {
    padding: 20rpx;
    opacity: 0.6;
  }
}

.ai-chat {
  background: #f8f9ff;
  border-color: #e6e8f6;
  
  &::after {
    content: '';
    position: absolute;
    right: -60rpx;
    bottom: -60rpx;
    width: 200rpx;
    height: 200rpx;
    background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 100%);
    border-radius: 50%;
    z-index: 0;
  }
}

.turtle-soup {
  background: #fff8f9;
  border-color: #f6e6e8;
  
  &::after {
    content: '';
    position: absolute;
    right: -60rpx;
    bottom: -60rpx;
    width: 200rpx;
    height: 200rpx;
    background: linear-gradient(135deg, rgba(241,102,102,0.1) 0%, rgba(241,102,102,0) 100%);
    border-radius: 50%;
    z-index: 0;
  }
}
</style>
