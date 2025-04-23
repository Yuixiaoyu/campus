<template>
    <view class="viewport">
      <wd-navbar custom-class="navbar" :bordered="false" title="登录" safeAreaInsetTop></wd-navbar>
      
      <!-- 主要内容区 -->
      <view class="main-content">
        <view class="logo-section">
          <image
              class="logo-image"
              src="https://minio.fybreeze.cn/campus/logo.webp"
          ></image>
          <view class="welcome-section">
            <text class="welcome-title">欢迎来到青春共享站</text>
            <text class="welcome-subtitle">让校园生活更精彩</text>
          </view>
        </view>

        <view class="login-section">
          <!-- 按钮组 -->
          <view class="button-group">
            <wd-button 
              icon="wechat" 
              type="success" 
              block 
              open-type="getPhoneNumber" 
              @getphonenumber="login"
              class="login-btn"
            >
              微信一键登录
            </wd-button>
            
            <wd-button 
              type="info" 
              block 
              plain
              @click="handleCancel"
              class="cancel-btn"
            >
              暂不登录
            </wd-button>
          </view>

          <!-- 协议区域 -->
          <view class="agreement">
            <text class="agreement-text">登录即表示同意</text>
            <text class="link" @click="openUserAgreement">《用户协议》</text>
            <text class="agreement-text">和</text>
            <text class="link" @click="openPrivacyPolicy">《隐私政策》</text>
          </view>
        </view>
      </view>

      <wd-toast />
    </view>
</template>

<script lang="ts" setup>
import {useToast} from "@/uni_modules/wot-design-uni";
import {wxLogin} from "@/api/userApi";
import {clearUserInfo, setUserInfo} from "@/utils/userStorage";
import {onLoad} from "@dcloudio/uni-app";

const toast = useToast()

const login = async (e) => {
  if (!e.code) {
    toast.error('未授权手机号，请重试')
    return
  }

  uni.showLoading({
    title: '登录中...'
  })
  
  try {
    const res = await wxLogin(e.code)
    if (res.code === 200) {
      console.log(res.data)
      uni.setStorageSync('token', res.data.token)
      setUserInfo(res.data)
      toast.success("登录成功")
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 1000)
    } else {
      toast.error(res.message || '登录失败')
    }
  } catch (error) {
    console.error('登录错误:', error)
    toast.error('登录失败，请重试')
  } finally {
    uni.hideLoading()
  }
}

const handleCancel = () => {
  uni.switchTab({
    url: '/pages/index/index'
  })
}

const openUserAgreement = () => {
  // 打开用户协议页面
  uni.navigateTo({
    url: '/pages/agreement/user'
  })
}

const openPrivacyPolicy = () => {
  // 打开隐私政策页面
  uni.navigateTo({
    url: '/pages/agreement/privacy'
  })
}

onLoad(()=>{
  clearUserInfo()
})
</script>

<style lang="scss" scoped>
:deep(.navbar) {
  background: transparent;
  
  :deep(.wd-navbar__title) {
    font-weight: 600;
    color: #333;
  }
}

.viewport {
  max-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 60%;
    height: 40%;
    background: linear-gradient(135deg, rgba(132, 152, 240, 0.1) 0%, rgba(132, 152, 240, 0.05) 100%);
    border-radius: 0 0 0 100%;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 60%;
    height: 40%;
    background: linear-gradient(135deg, rgba(7, 193, 96, 0.1) 0%, rgba(7, 193, 96, 0.05) 100%);
    border-radius: 100% 0 0 0;
    z-index: 1;
  }
}

.main-content {
  position: relative;
  z-index: 2;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 88rpx);
}

.logo-section {
  text-align: center;
  margin: 60rpx 0;
  
  .logo-image {
    width: 180rpx;
    height: 180rpx;
    border-radius: 36rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
    transform: perspective(800rpx) rotateY(10deg);
    transition: transform 0.3s ease;
    
    &:active {
      transform: perspective(800rpx) rotateY(0deg);
    }
  }
  
  .welcome-section {
    margin-top: 40rpx;
    
    .welcome-title {
      font-size: 44rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 12rpx;
      display: block;
    }
    
    .welcome-subtitle {
      font-size: 28rpx;
      color: #666;
      display: block;
    }
  }
}

.login-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40rpx 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 32rpx;
  
  .login-btn {
    height: 96rpx;
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 2rpx;
    border-radius: 48rpx;
    background: linear-gradient(135deg, #07c160, #0ab956);
    border: none;
    box-shadow: 0 8rpx 24rpx rgba(7, 193, 96, 0.2);
    transition: all 0.3s ease;
    
    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.15);
    }
  }
  
  .cancel-btn {
    height: 96rpx;
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 2rpx;
    border-radius: 48rpx;
    border: 2rpx solid #e0e0e0;
    transition: all 0.3s ease;
    
    &:active {
      background: #f5f5f5;
    }
  }
}

.agreement {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  padding: 0 32rpx;
  
  .agreement-text {
    margin: 0 4rpx;
  }
  
  .link {
    color: #07c160;
    font-weight: 500;
    position: relative;
    
    &:active {
      opacity: 0.8;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2rpx;
      left: 0;
      width: 100%;
      height: 1rpx;
      background: currentColor;
      opacity: 0.5;
    }
  }
}
</style>
