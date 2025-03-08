<template>
    <view class="viewport">
      <view class="logo">
        <image
            src="http://192.168.34.100:9000/campus/uFxYwGn54XtJ346d1247e247cc30f6ffb1379ac36a47.webp"
        ></image>
      </view>
      <view class="login">
        <wd-button  icon="phone" type="success"  block  open-type="getPhoneNumber" @getphonenumber="login">
          手机号快捷登录
        </wd-button>
        <view class="tips">
          登录/注册即视为你同意《服务条款》和《青春共享站隐私协议》
        </view>
      </view>
      <wd-toast />
    </view>
</template>

<script lang="ts" setup>
import {useToast} from "@/uni_modules/wot-design-uni";
import {wxLogin} from "@/api/userApi";
import {setUserInfo} from "@/utils/userStorage";

const toast = useToast()


const login = async (e) => {
  uni.showLoading({
    title: '加载中'
  });
  console.log(e.code)
  const res = await wxLogin(e.code)
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
  }
  uni.hideLoading();
  toast.error(res.msg)
}

</script>


<style lang="scss" scoped>

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;

  .logo {
    flex: 1;
    text-align: center;
    image {
      width: 220rpx;
      height: 220rpx;
      margin-top: 15vh;
    }
  }
  .login {
    display: flex;
    flex-direction: column;
    height: 60vh;
    padding: 40rpx 20rpx 20rpx;
    margin-top: 20px;

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
