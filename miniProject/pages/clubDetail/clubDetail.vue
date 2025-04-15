<template>
  <view class="container">
    <wd-loading v-if="loading" />
    
    <template v-else>
      <!-- 顶部封面和基本信息 -->
      <view class="header">
        <image 
          v-if="clubInfo.cover" 
          :src="clubInfo.cover" 
          mode="aspectFill" 
          class="cover-image"
        />
        <view class="club-info">
          <image 
            v-if="clubInfo.avatar" 
            :src="clubInfo.avatar" 
            class="club-avatar"
            mode="aspectFill"
          />
          <text class="club-name">{{ clubInfo.name }}</text>
          <text class="member-count">成员数：{{ clubInfo.grandTotal || 0 }}</text>
        </view>
      </view>

      <!-- 社团介绍模块 -->
      <view class="section intro-box" @click="handleSectionClick">
        <view class="section-title">
          <wd-icon name="info" color="#007AFF" />
          <text>社团介绍</text>
        </view>
        <text class="content-text">{{ clubInfo.profile || '暂无介绍' }}</text>
      </view>

      <!-- 社长介绍模块 -->
      <view class="section profile-box" @click="handleSectionClick">
        <view class="section-title">
          <wd-icon name="user" color="#007AFF" />
          <text>社长介绍</text>
        </view>
        <view class="president-info" v-if="clubInfo.userVO">
          <view class="president-card">
            <view class="photo-wrapper">
              <image 
                class="photo" 
                :src="clubInfo.userVO.imageUrl || '/static/default-avatar.png'" 
                mode="aspectFill" 
                lazy-load 
                @load="handleImageLoad"
              />
              <view class="loading-text" v-if="!imageLoaded">照片加载中...</view>
              <view class="president-tag">社长</view>
            </view>
            <view class="info-wrapper">
              <view class="basic-info">
                <text class="name">{{ clubInfo.userVO.userName || '未设置姓名' }}</text>
                <text class="account">{{ clubInfo.userVO.userAccount }}</text>
              </view>
              <view class="tags" v-if="clubInfo.userVO.tagList && clubInfo.userVO.tagList.length > 0">
                <text 
                  v-for="(tag, index) in clubInfo.userVO.tagList" 
                  :key="index" 
                  class="tag"
                >{{ tag }}</text>
              </view>
              <view class="extra-info">
                <view class="info-item" v-if="clubInfo.userVO.gender !== undefined">
                  <wd-icon :name="clubInfo.userVO.gender === 1 ? 'male' : 'female'" 
                          :color="clubInfo.userVO.gender === 1 ? '#007AFF' : '#FF69B4'" 
                          size="28rpx" />
                </view>
                <view class="info-item" v-if="clubInfo.userVO.constellation">
                  <wd-icon name="star" color="#FFB900" size="28rpx" />
                  <text>{{ clubInfo.userVO.constellation }}</text>
                </view>
              </view>
              <view class="profile">
                <text class="profile-text">{{ clubInfo.userVO.userProfile || '这个社长很懒，还没有填写简介~' }}</text>
              </view>
            </view>
          </view>
        </view>
        <view v-else class="empty-tip">暂无社长信息</view>
      </view>

      <!-- 社团荣誉墙 -->
      <view class="section honor-box" v-if="clubInfo.awards && clubInfo.awards.length > 0">
        <view class="section-title">
          <wd-icon name="trophy" color="#FFB900" />
          <text>社团荣誉</text>
        </view>
        <view class="awards-grid">
          <view 
            v-for="(award, index) in clubInfo.awards" 
            :key="index" 
            class="award-item"
            @click="previewImage(award)"
          >
            <image 
              :src="award" 
              mode="aspectFill" 
              class="award-image"
              lazy-load
            />
            <view class="award-mask">
              <wd-icon name="zoom-in" color="#fff" size="40rpx" />
            </view>
          </view>
        </view>
      </view>

      <!-- 社团活动 -->
      <view class="section activity-box" v-if="clubInfo.activityVOList && clubInfo.activityVOList.length > 0">
        <view class="section-title">
          <wd-icon name="calendar" color="#007AFF" />
          <text>社团活动</text>
        </view>
        <view class="activity-list">
          <view 
            v-for="(activity, index) in clubInfo.activityVOList" 
            :key="index" 
            class="activity-card"
            @click="handleActivityClick(activity)"
          >
            <image 
              v-if="activity.coverPicture"
              :src="activity.coverPicture"
              mode="aspectFill" 
              class="activity-cover"
              lazy-load
            />
            <view class="activity-info">
              <text class="activity-title">{{ activity.title }}</text>
              <view class="activity-meta">
                <view class="meta-item">
                  <wd-icon name="time" size="24rpx" color="#666" />
                  <text>{{ activity.startTime }}</text>
                </view>
                <view class="meta-item">
                  <wd-icon name="location" size="24rpx" color="#666" />
                  <text>{{ activity.position || '暂无地点' }}</text>
                </view>
              </view>
              <text class="activity-desc">{{ activity.profile || '暂无描述' }}</text>
              <view class="activity-footer">
                <view class="activity-status" :class="getStatusClass(activity.status)">
                  {{ getStatusText(activity.status) }}
                </view>
                <view 
                  v-if="activity.status !== 2" 
                  class="registration-status"
                  :class="activity.isRegistration ? 'registered' : 'not-registered'"
                >
                  {{ activity.isRegistration ? '已报名' : '未报名' }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>

    <!-- 添加提示组件 -->
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { ClubDetailVO } from '@/api/types'
import { getClubDetail } from '@/api/clubApi'
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()
const imageLoaded = ref(false)
const loading = ref(true)

// 社团详情数据
const clubInfo = ref<ClubDetailVO>({
  id: 0,
  name: '',
  profile: '',
  cover: '',
  avatar: '',
  grandTotal: 0,
  awards: [],
  userVO: {
    imageUrl: '',
    userName: '',
    userAccount: '',
    userProfile: '',
    userRole: ''
  }
})

// 处理图片加载完成
const handleImageLoad = () => {
  imageLoaded.value = true
}

// 处理模块点击
const handleSectionClick = () => {
  uni.vibrateShort()
}

// 获取社团详情数据
const fetchClubDetail = async (id: number) => {
  try {
    loading.value = true
    const res = await getClubDetail(id)
    console.log(res)
    if (res.code === 200 && res.data) {
      clubInfo.value = res.data
    } else {
      toast.error('获取社团详情失败')
    }
  } catch (error) {
    console.error('获取社团详情错误:', error)
    toast.error('获取社团详情失败')
  } finally {
    loading.value = false
  }
}

// 预览图片
const previewImage = (url: string) => {
  uni.previewImage({
    urls: clubInfo.value.awards as string[],
    current: url
  })
}

// 处理活动点击
const handleActivityClick = (activity: any) => {
  console.log(activity)
  // 可以跳转到活动详情页
  uni.navigateTo({
    url: `/pages/activityDetail/activityDetail?activityInfo=${JSON.stringify(activity)}`
  })
}

// 获取活动状态样式类
const getStatusClass = (status: number) => {
  switch (status) {
    case 0: return 'status-upcoming'
    case 1: return 'status-ongoing'
    case 2: return 'status-ended'
    default: return 'status-unknown'
  }
}

// 获取活动状态文本
const getStatusText = (status: number) => {
  switch (status) {
    case 0: return '即将开始'
    case 1: return '进行中'
    case 2: return '已结束'
    default: return '未知状态'
  }
}

// 页面加载时获取数据
onLoad((option: Record<string, string> | undefined) => {
  if (option?.id) {
    fetchClubDetail(Number(option.id))
  } else {
    toast.error('参数错误')
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
})
</script>

<style lang="scss">
$primary-blue: #007AFF;
$border-gray: #e0e0e0;
$placeholder-bg: #f5f5f5;

page {
  background-color: #f8f8f8;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding-bottom: 40rpx;
}

.header {
  position: relative;
  height: 400rpx;
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .club-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40rpx 30rpx;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .club-avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      border: 4rpx solid #fff;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.2);
    }
    
    .club-name {
      color: #fff;
      font-size: 36rpx;
      font-weight: 600;
      margin-bottom: 10rpx;
    }
    
    .member-count {
      color: rgba(255,255,255,0.8);
      font-size: 28rpx;
    }
  }
}

.section {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin: 0 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12rpx;
  color: $primary-blue;
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
  
  .wd-icon {
    font-size: 36rpx;
  }
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  text-align: justify;
}

.president-info {
  padding: 20rpx 0;
  
  .president-card {
    background: linear-gradient(to bottom right, #f8f9fa, #ffffff);
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
    
    .photo-wrapper {
      position: relative;
      width: 100%;
      height: 360rpx;
      overflow: hidden;
      background: linear-gradient(45deg, #1a73e8, #8ab4f8);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%);
        z-index: 1;
      }
      
      .photo {
        width: 240rpx;
        height: 240rpx;
        border-radius: 50%;
        object-fit: cover;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 6rpx solid rgba(255, 255, 255, 0.8);
        box-shadow: 
          0 8rpx 32rpx rgba(0,0,0,0.15),
          0 0 0 1rpx rgba(255,255,255,0.2);
        z-index: 2;
        
        &:active {
          transform: translate(-50%, -50%) scale(0.95);
        }
      }
      
      .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255,255,255,0.9);
        font-size: 28rpx;
        z-index: 2;
        background: rgba(0,0,0,0.3);
        padding: 8rpx 24rpx;
        border-radius: 30rpx;
        backdrop-filter: blur(4px);
      }
      
      .president-tag {
        position: absolute;
        top: 30rpx;
        right: 30rpx;
        background: rgba(255,255,255,0.95);
        color: #1a73e8;
        padding: 12rpx 30rpx;
        border-radius: 30rpx;
        font-size: 24rpx;
        font-weight: 600;
        backdrop-filter: blur(4px);
        box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8rpx;
        
        &::before {
          content: '';
          width: 12rpx;
          height: 12rpx;
          background: #1a73e8;
          border-radius: 50%;
          display: inline-block;
        }
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60%;
        background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
        z-index: 1;
      }
    }
    
    .info-wrapper {
      padding: 30rpx;
      
      .basic-info {
        display: flex;
        align-items: center;
        gap: 16rpx;
        margin-bottom: 20rpx;
        
        .name {
          font-size: 36rpx;
          font-weight: 600;
          color: #333;
        }
        
        .account {
          font-size: 26rpx;
          color: #999;
          background: #f5f5f5;
          padding: 4rpx 16rpx;
          border-radius: 20rpx;
        }
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
        margin-bottom: 20rpx;
        
        .tag {
          font-size: 24rpx;
          color: #666;
          background: #f0f2f5;
          padding: 6rpx 20rpx;
          border-radius: 16rpx;
          
          &:nth-child(3n+1) {
            background: #E8F3FF;
            color: #007AFF;
          }
          
          &:nth-child(3n+2) {
            background: #FFF3E0;
            color: #FF9800;
          }
          
          &:nth-child(3n+3) {
            background: #E8F5E9;
            color: #4CAF50;
          }
        }
      }
      
      .extra-info {
        display: flex;
        align-items: center;
        gap: 24rpx;
        margin-bottom: 24rpx;
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 8rpx;
          font-size: 26rpx;
          color: #666;
        }
      }
      
      .profile {
        background: #f8f9fa;
        padding: 24rpx;
        border-radius: 16rpx;
        
        .profile-text {
          font-size: 28rpx;
          color: #666;
          line-height: 1.8;
          text-align: justify;
        }
      }
    }
  }
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  padding: 10rpx 0;
  
  .award-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: 12rpx;
    overflow: hidden;
    background: $placeholder-bg;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
    
    &:active {
      transform: scale(0.95);
    }
    
    .award-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .award-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(2px);
      
      .wd-icon {
        transform: scale(0.8);
        transition: transform 0.3s ease;
      }
    }
    
    &:active .award-mask {
      opacity: 1;
      
      .wd-icon {
        transform: scale(1);
      }
    }
  }
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 40rpx 0;
}

// 添加进入动画
.section {
  opacity: 0;
  transform: translateY(20rpx);
  animation: slideIn 0.5s ease forwards;
  
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  
  .activity-card {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
    
    &:active {
      transform: scale(0.98);
    }
    
    .activity-cover {
      width: 100%;
      height: 300rpx;
      object-fit: cover;
    }
    
    .activity-info {
      padding: 24rpx;
      
      .activity-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 16rpx;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .activity-meta {
        display: flex;
        gap: 24rpx;
        margin-bottom: 16rpx;
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8rpx;
          color: #666;
          font-size: 24rpx;
          
          .wd-icon {
            font-size: 24rpx;
          }
        }
      }
      
      .activity-desc {
        font-size: 26rpx;
        color: #666;
        line-height: 1.6;
        margin-bottom: 16rpx;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .activity-footer {
        display: flex;
        align-items: center;
        gap: 16rpx;
        
        .activity-status {
          display: inline-block;
          padding: 4rpx 16rpx;
          border-radius: 8rpx;
          font-size: 24rpx;
          font-weight: 500;
          
          &.status-upcoming {
            background: #E8F3FF;
            color: #007AFF;
          }
          
          &.status-ongoing {
            background: #E8F5E9;
            color: #4CAF50;
          }
          
          &.status-ended {
            background: #F5F5F5;
            color: #999;
          }
          
          &.status-unknown {
            background: #FFF3E0;
            color: #FF9800;
          }
        }
        
        .registration-status {
          display: inline-block;
          padding: 4rpx 16rpx;
          border-radius: 8rpx;
          font-size: 24rpx;
          font-weight: 500;
          
          &.registered {
            background: #E8F5E9;
            color: #4CAF50;
          }
          
          &.not-registered {
            background: #FFF3E0;
            color: #FF9800;
          }
        }
      }
    }
  }
}
</style>