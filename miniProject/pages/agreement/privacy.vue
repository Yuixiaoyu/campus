<template>
  <view class="privacy-page">
    <scroll-view scroll-y class="content">
      <view class="section">
        <view class="title">1. 信息收集</view>
        <view class="text">
          <view class="sub-title">基本信息：</view>
          <view class="item">微信授权信息：头像、昵称等基本资料</view>
          <view class="item">手机号码：用于账号安全验证和通知</view>
          <view class="item">学校信息：用于校园社区身份认证</view>
          
          <view class="sub-title">使用信息：</view>
          <view class="item">浏览记录：您访问的页面和内容</view>
          <view class="item">搜索记录：搜索的关键词和历史</view>
          <view class="item">互动数据：点赞、评论、收藏等</view>
          <view class="item">设备信息：设备型号、系统版本等</view>
        </view>
      </view>

      <view class="section">
        <view class="title">2. 信息使用</view>
        <view class="text">
          <view class="sub-title">核心功能：</view>
          <view class="item">提供基础平台服务和功能</view>
          <view class="item">账号安全管理和身份验证</view>
          <view class="item">社区互动和消息通知</view>
          
          <view class="sub-title">服务优化：</view>
          <view class="item">个性化内容推荐和搜索结果</view>
          <view class="item">改进产品功能和用户体验</view>
          <view class="item">提供智能化的学习辅导服务</view>
        </view>
      </view>

      <view class="section">
        <view class="title">3. 信息保护</view>
        <view class="text">
          <view class="sub-title">技术保障：</view>
          <view class="item">采用加密技术传输和存储数据</view>
          <view class="item">实施严格的数据访问控制</view>
          <view class="item">定期安全评估和系统升级</view>
          
          <view class="sub-title">管理措施：</view>
          <view class="item">建立完善的信息安全制度</view>
          <view class="item">员工保密培训和责任约束</view>
          <view class="item">及时处理安全事件和漏洞</view>
        </view>
      </view>

      <view class="section">
        <view class="title">4. 信息共享</view>
        <view class="text">
          <view class="sub-title">共享原则：</view>
          <view class="item">严格遵守最小必要原则</view>
          <view class="item">确保数据接收方履行保密义务</view>
          <view class="item">依法依规进行信息共享</view>
          
          <view class="sub-title">共享场景：</view>
          <view class="item">经您明确同意的信息共享</view>
          <view class="item">法律法规要求的信息提供</view>
          <view class="item">维护平台安全的必要共享</view>
        </view>
      </view>

      <view class="section">
        <view class="title">5. 用户权利</view>
        <view class="text">
          <view class="sub-title">信息管理：</view>
          <view class="item">访问、更正您的个人信息</view>
          <view class="item">删除不准确的个人信息</view>
          <view class="item">注销账号及清除信息</view>
          
          <view class="sub-title">其他权利：</view>
          <view class="item">撤回授权同意的权利</view>
          <view class="item">投诉举报的权利</view>
          <view class="item">获取隐私政策更新提醒</view>
        </view>
      </view>

      <view class="section">
        <view class="title">6. AI服务隐私</view>
        <view class="text">
          <view class="sub-title">数据处理：</view>
          <view class="item">AI对话内容仅用于服务提供</view>
          <view class="item">对话数据进行脱敏处理</view>
          <view class="item">定期清理历史对话数据</view>
          
          <view class="sub-title">安全保障：</view>
          <view class="item">AI服务符合伦理和安全标准</view>
          <view class="item">严格控制对话数据访问权限</view>
          <view class="item">保护用户对话内容安全</view>
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
.privacy-page {
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