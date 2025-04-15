<template>
  <view class="relation">
    <wd-navbar custom-class="navbar" :bordered="false" title="联系我们" safeAreaInsetTop left-arrow
               @click-left="handleClickLeft"></wd-navbar>

    <view class="relation-content">
      <view class="relation-content-title">联系我们</view>
      <view class="relation-content-text">
        扫描下方二维码，与我们取得联系。<br/>
        注：请备注来意
      </view>
      <wd-img custom-class="img" @tap.stop="previewImage" :src="url" :width="100" :height="100"  mode="scaleToFill"/>
    </view>
  </view>
</template>

<script setup lang="ts">

import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";


const url = 'https://minio.fybreeze.cn/campus/rIfnbyoVsdDmb6b7d81505235520d4f070e8085ef16c.webp';


const handleClickLeft = () => {
  uni.navigateBack()
}

// 预览图片
const previewImage = () => {
  uni.previewImage({
    current: url, // 当前显示图片的http链接
    urls: [url] // 需要预览的图片http链接列表
  })
}



// 分享给好友
onShareAppMessage((res) => {
  console.log(res)
  return {
    title: '青春共享站',
    path: '/pages/index/index',
    imageUrl: '/static/logo.jpg', // 分享图片
  }
})
// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: '青春共享站',
    path: '/pages/index/index',
    imageUrl: '/static/logo.jpg', // 分享图片
  }
})

</script>


<style scoped lang="scss">
.relation {
  min-height: 100vh;
  background-image: linear-gradient(to bottom,
      #deb1f9 0%,
      #ead0fc 30%,
      #ede2fb 80%,
      #f0faff 100%
  );
  :deep(.navbar) {
    background: none;
  }
  .relation-content {
    width: 540rpx;
    padding: 40rpx;
    border-radius: 10px;
    margin: 80rpx auto;
    background-color: #ffffff;
    .relation-content-title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    .relation-content-text {
      font-size: 28rpx;
      margin-bottom: 10rpx;
    }
    :deep(.img){
      width: 100% !important;
      height: 720rpx !important;
    }

  }
}
</style>
