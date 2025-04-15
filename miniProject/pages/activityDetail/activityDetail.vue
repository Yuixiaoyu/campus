<template>
  <view class="activityDetail">
    <!-- 顶部图片 -->
    <view class="banner">
      <image :src="activity.coverPicture" mode="aspectFill"></image>
    </view>
    <!-- 活动信息 -->
    <view class="actdetailCard">
      <!-- 左上角小标签 -->
      <view class="status-tag">{{ getActivityStatus(activity?.status) }}</view>
      <!-- 上半部分基础信息 -->
      <view class="Basicinfo">
        <!-- 活动标题 -->
        <view class="Acttitle">
          {{ activity.title }}
        </view>
        <view class="inforow">
          <view class="endtime">
            截止时间：{{ activity.endTime }}
          </view>
          <view class="Rstaff">
            剩余人员：{{ activity.maxSignups - activity.currentSignups }}人
          </view>
          <view class="Enrollment">
            报名人数：{{ activity.currentSignups }}人报名
          </view>
        </view>
      </view>
      <!-- 下半信息部分 -->
      <view class="infolist">
        <view class="addressAndtime">
          <view class="title">
            <wd-icon name="circle" size="18px"></wd-icon>
            时间地点
          </view>
          <view class="time">
            <wd-icon name="time" size="18px"></wd-icon>
            <view class="date">{{ activity.startTime }}</view>
            <!--<view class="moment"> 上午9:00</view>-->
          </view>
          <view class="address">
            <wd-icon name="location" size="18px"></wd-icon>
            {{ activity.position }}
          </view>
        </view>
        <view class="actobject">
          <view class="title">
            <wd-icon name="circle" size="18px"></wd-icon>
            活动对象
          </view>
          <view class="Objcontent">
            <wd-icon name="user-avatar" size="18px"></wd-icon>
            {{ activity.targetUsers }}
          </view>
        </view>
        <view class="hold">
          <view class="title">
            <wd-icon name="circle" size="18px"></wd-icon>
            举办方
          </view>
          <view class="holdobj">
            <wd-icon name="tips" size="18px"></wd-icon>
            {{ activity.organizers }}
          </view>
        </view>
        <view class="profile">
          <view class="title">
            <wd-icon name="circle" size="18px"></wd-icon>
            活动详情
          </view>
          <view class="pfecontent">
            {{ activity.profile }}
          </view>
        </view>

      </view>
    </view>
    <view class="signupbut">
      <view class="signup">
        <wd-button block @click.once="handleRegistration">{{ activity.isRegistration ? '取消报名' : '立即报名'}}</wd-button>
      </view>
    </view>
    <wd-gap safe-area-bottom height="0"></wd-gap>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {onLoad} from "@dcloudio/uni-app";
import {getActivityStatus} from "@/utils/activityEnum";
import {getUserInfo} from "@/utils/userStorage";
import {registrationActivity} from "@/api/activityApi";
import {useToast} from '@/uni_modules/wot-design-uni'
import { debounce } from 'lodash'
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";


const toast = useToast()


const activity = ref({})
const user = ref({})

onLoad((options) => {
  console.log(options.activityInfo)
  activity.value = JSON.parse(options.activityInfo)

  user.value = getUserInfo();

})

const handleRegistration = debounce(async () => {
  console.log("报名")
  const data = {
    activityId: activity.value.id,
    userId: user.value.id,
  }
  const res = await registrationActivity(data)
  if (res.code === 200) {
    const text = activity.value.isRegistration ? '取消报名成功' : '报名成功'
    toast.show({
      msg: text,
      cover: true
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  } else {
    toast.error(res.message)
  }
},600)
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

<style lang="scss" scoped>
.activityDetail {
  position: relative;

  .status-tag {
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    /* 向上偏移露出卡片 */
    background: #6699FF;
    color: #fff;
    font-size: 20rpx;
    padding: 4rpx 20rpx;
    border-radius: 15rpx 0rpx 15rpx 0;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
    z-index: 3;
  }

  .banner {
    width: 100%;
    height: 400rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .actdetailCard {
    background: #EEEEEE;
    border-radius: 26rpx 26rpx 0 0;
    position: relative;
    z-index: 2;
    margin-top: -30rpx;

    .Basicinfo {
      padding-top: 30rpx;

      .Acttitle {
        text-align: center;
        font-size: 38rpx;
        font-weight: bold;
      }

      .inforow {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-around;
        font-size: 20rpx;
        color: #777777;
      }
    }

    .infolist {
      height: auto;
      background: #fff;
      border-radius: 20rpx;
      margin: 0rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

      .title {
        display: flex;
        align-items: center;
        padding: 24rpx 30rpx;
        font-size: 32rpx;
        color: #333;
        font-weight: 600;
        background: linear-gradient(to right, #f8f8f8, #fff);
        border-left: 6rpx solid #6699FF;
        margin: 20rpx 0;

        .wd-icon {
          margin-right: 16rpx;
          font-size: 36rpx;
        }

      }

      /* 内容区域统一样式 */
      .time,
      .address,
      .Objcontent,
      .holdobj,
      .pfecontent {
        padding: 16rpx 30rpx;
        font-size: 28rpx;
        color: #666;
        display: flex;
        align-items: center;

        .wd-icon {
          margin-right: 12rpx;
          color: #888;
        }
      }
    }
  }

  .signupbut {
    display: flex;
    justify-content: center;

    .signup {
      margin-top: 30rpx;
      width: 100%;
    }
  }
}
</style>