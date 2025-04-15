<template>
    <view class="viewport">
      <wd-navbar custom-class="navbar" :bordered="false" title="登陆" safeAreaInsetTop left-arrow @click-left="handleClickLeft"></wd-navbar>
      <view class="logo">
        <image
            src="https://minio.fybreeze.cn/campus/logo.webp"
        ></image>
      </view>
      <view class="login">
        <wd-button icon="app" type="success"  block  open-type="getPhoneNumber" @getphonenumber="login">
          微信登陆
        </wd-button>
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
  uni.showLoading({
    title: '加载中'
  });
  const code = e.code;
  const res = await wxLogin(code)
  if (res.code == 200) {
    console.log(res.data)
    uni.setStorageSync('token', res.data.token)
    setUserInfo(res.data)
    toast.success("登录成功")
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },1000)
  }else{
    console.log(res)
  }
  uni.hideLoading();
  toast.error(res.msg)
}

onLoad(()=>{
  clearUserInfo()
})

const handleClickLeft = () => {
  uni.navigateBack()
}

</script>


<style lang="scss" scoped>

:deep(.navbar){
  background:none;
}

.viewport {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  //padding: 20rpx 40rpx;
  background-image: url("https://minio.fybreeze.cn/campus/DeWatermark.ai_1744524050762.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-origin: content-box;

  .logo {
    flex: 1;
    text-align: center;
    image {
      width: 220rpx;
      height: 220rpx;
      border-radius: 20rpx;
      margin-top: 15vh;
    }
  }
  .login {
    display: flex;
    flex-direction: column;
    height: 60vh;
    padding: 40rpx 20rpx 20rpx;
    margin-top: 80rpx;

    :deep(.wd-button){
      font-size: 16px;
      letter-spacing: 4px;

    }
  }

  .tips {
    position: absolute;
    bottom: 80rpx;
    left: 20rpx;
    right: 20rpx;
    font-size: 22rpx;
    color: #999;
    text-align: center;
  }

}



</style>
