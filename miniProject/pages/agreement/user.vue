<template>
  <view class="agreement-page">
    <scroll-view scroll-y class="content">
      <view class="section">
        <view class="title">1. 服务说明</view>
        <view class="text">
          青春共享站是一个面向高校学生的学习资源共享和交流平台，致力于为用户提供优质的学习体验。
          <view class="sub-title">我们提供以下服务：</view>
          <view class="item">学习资源共享：支持文档、图片等多种格式的资源上传和下载</view>
          <view class="item">校园信息交流：发布和浏览校园动态、学习经验等</view>
          <view class="item">学习互助：用户之间可以进行学习经验分享和问题解答</view>
          <view class="item">AI智能助手：提供智能化的学习辅导和问答服务</view>
          <view class="item">个性化推荐：基于用户兴趣推荐相关学习资源</view>
        </view>
      </view>

      <view class="section">
        <view class="title">2. 账号使用规范</view>
        <view class="text">
          <view class="sub-title">基本要求：</view>
          <view class="item">用户需通过微信授权登录，确保账号真实性</view>
          <view class="item">妥善保管账号信息，不得将账号借给他人使用</view>
          <view class="item">遵守国家法律法规和校园相关规定</view>
          
          <view class="sub-title">禁止行为：</view>
          <view class="item">发布违法、违规、色情、暴力等不当内容</view>
          <view class="item">侵犯他人知识产权或隐私权</view>
          <view class="item">利用平台进行商业推广或垃圾信息传播</view>
          <view class="item">干扰平台正常运营或损害其他用户权益</view>
        </view>
      </view>

      <view class="section">
        <view class="title">3. 内容规范</view>
        <view class="text">
          <view class="sub-title">内容要求：</view>
          <view class="item">上传的资源必须是合法、无害且不侵犯他人权益</view>
          <view class="item">分享的学习经验应真实可靠，有实际参考价值</view>
          <view class="item">互动交流应文明友善，促进良好的学习氛围</view>
          
          <view class="sub-title">学术诚信：</view>
          <view class="item">尊重原创，标明资源来源</view>
          <view class="item">不得抄袭、剽窃他人作品</view>
          <view class="item">遵守学术规范和知识产权保护规定</view>
        </view>
      </view>

      <view class="section">
        <view class="title">4. 用户权益</view>
        <view class="text">
          <view class="sub-title">基本权益：</view>
          <view class="item">免费使用平台基础功能和服务</view>
          <view class="item">获取和分享优质学习资源</view>
          <view class="item">参与平台社区互动和交流</view>
          <view class="item">获得技术支持和服务保障</view>
          
          <view class="sub-title">特殊权益：</view>
          <view class="item">优质内容创作者可获得平台奖励</view>
          <view class="item">活跃用户享有更多互动特权</view>
          <view class="item">内容举报及投诉的处理权</view>
        </view>
      </view>

      <view class="section">
        <view class="title">5. 服务变更与终止</view>
        <view class="text">
          <view class="item">平台保留随时修改或中断服务的权利</view>
          <view class="item">用户违反协议可能导致账号被限制或终止使用</view>
          <view class="item">服务变更会提前通知用户</view>
          <view class="item">用户可随时终止使用平台服务</view>
        </view>
      </view>

      <view class="section">
        <view class="title">6. 免责声明</view>
        <view class="text">
          <view class="item">用户对自己发布的内容负责</view>
          <view class="item">平台不对用户间的纠纷承担责任</view>
          <view class="item">因不可抗力导致的服务中断不承担责任</view>
          <view class="item">平台有权对违规内容进行处理</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.agreement-page {
  min-height: 100vh;
  max-width: 98%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 32rpx;
}

.section {
  margin-bottom: 40rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 24rpx;
    position: relative;
    padding-left: 24rpx;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 25%;
      width: 8rpx;
      height: 50%;
      background: #07c160;
      border-radius: 4rpx;
    }
  }
  
  .text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
    padding: 0 12rpx;
    
    .sub-title {
      font-size: 30rpx;
      font-weight: 500;
      color: #333;
      margin: 24rpx 0 16rpx;
    }
    
    .item {
      margin-top: 16rpx;
      padding-left: 24rpx;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: 8rpx;
        top: 16rpx;
        width: 4rpx;
        height: 4rpx;
        border-radius: 50%;
        background: #999;
      }
    }
  }
}
</style> 