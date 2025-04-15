<template>
  <view class="clubPage">
    <view class="banner">
      <view class="card-swiper">
        <wd-swiper
            :list="swiperList"
            previousMargin="24px"
            :duration="200"
            nextMargin="24px"
            imageMode="scaleToFill"
            indicatorPosition="bottom"
            autoplay
            v-model:current="current"
            :indicator="{type: 'dots-bar'}"
            @click="handleClick"
            @change="onChange">
        </wd-swiper>
      </view>
    </view>
    <!-- 圆形活动图标区 -->
    <view class="classlist">
      <view class="cardLayout">
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67deadf888c538a9b5c35202.webp"/>
          <view class="text">
            文艺类
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67deadf888c538a9b5c35201.webp"/>
          <view class="text">
            体育活动类
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67deadf888c538a9b5c351ff.webp"/>
          <view class="text">
            学术思辨类
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67deadf888c538a9b5c35200.webp"/>
          <view class="text">
            社会实践与公益类
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67deadf888c538a9b5c351fe.webp"/>
          <view class="text">
            特定主题
          </view>
        </view>
      </view>
    </view>

    <!-- 活动表单 -->
    <view class="activecard">
      <view class="title">
        <wd-icon name="heart-filled" size="22px" color="#22a6b3"></wd-icon>
        <view class="text">热门活动</view>
      </view>
      <view class="activelist">

        <!--   活动表单行部分 -->
        <view class="row" v-for="(item,index) in activityList" :key="index" @click="handleActivityClick(index)">
          <view class="left">
            <view class="Actimage">
              <image :src="item.coverPicture" mode="aspectFill"></image>
              <view class="status-tag">
                <view class="status-text">{{ getActivityStatus(item?.status) }}</view>
                <view class="status-bg"></view>
              </view>
            </view>
          </view>
          <view class="right">
            <view class="Acttitle">
              {{ item.title }}
            </view>
            <view class="Acttime">
              <wd-icon name="time"></wd-icon>
              <view class="date">
                {{ item.endTime }}
              </view>
            </view>
            <view class="address">
              <wd-icon name="location"></wd-icon>
              {{ item.position }}
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {getActivityList} from "@/api/activityApi";
import {onLoad, onShow} from "@dcloudio/uni-app";
import {getActivityStatus} from "@/utils/activityEnum";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const current = ref<number>(0)//控制开屏展示的图片

const swiperList = ref([
  'https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11481.webp',
  'https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11482.webp',
  'https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11484.webp',
  'https://pic1.imgdb.cn/item/67dac5f488c538a9b5c11483.webp',
])

const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
  userId: null,
  hasMore: true,
  // 新增刷新锁防止重复请求
  isRefreshing: false
})

const activityList = ref([])

function handleClick(e) {
}

function onChange(e) {

}

const handleActivityClick = (index) => {
  console.log("点击活动详情");
  const str = JSON.stringify(activityList.value[index])
  uni.navigateTo({
    url: "/pages/activityDetail/activityDetail?activityInfo=" + str
  })
}


const fetchActivityList = async () => {
  const res = await getActivityList(pagination)
  if (res.code == 200) {
    console.log(res)
    activityList.value = res.data.records;
  } else {
    console.log("获取活动列表失败")
  }
}

onShow(() => {
  fetchActivityList()
})
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
.clubPage {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%); //控制背景颜色
  min-height: 100vh;
  padding-bottom: 80rpx;

  .banner {
    position: relative;
    z-index: 1;
  }

  //这是圆形活动图标区域的父组件
  .classlist {
    display: flex;
    justify-content: center;
    height: 250rpx;
    width: 700rpx;
    margin: -50rpx auto 30rpx;
    position: relative;
    z-index: 2;

    .cardLayout {
      &::-webkit-scrollbar {
        display: none; // 隐藏滚动条
      }

      -webkit-overflow-scrolling: touch; // 启用弹性滚动
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: 15rpx;
      //justify-content: space-around;
      align-items: center;
      /* 半透明黑色背景（透明度可调） */
      //background-color: rgba(0, 0, 0, 0.5);
      background: linear-gradient(135deg,
          rgb(168, 176, 251, 0.6),
          rgb(223, 212, 246, 0.6) 60%,
          rgb(236, 205, 227, 0.6) 100%
      );

      /* 指针事件配置（可选） */
      pointer-events: auto; /* 默认：允许穿透点击 */
      /* pointer-events: none;  /* 禁止穿透点击 */

      /* 层级控制（确保在最上层） */
      z-index: 999;

      /* 可选：添加模糊效果（需微信小程序支持） */
      backdrop-filter: blur(10px);

      border: none;
      box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.08);
      //padding: 15rpx 0;

      overflow-x: auto; // 允许横向滚动
      flex-wrap: nowrap; // 强制不换行
      justify-content: flex-start; // 左对齐
      padding: 15rpx 10rpx; // 增加左右内边距

      .item {
        flex-shrink: 0; // 禁止缩小
        min-width: 140rpx;
        height: 220rpx;
        justify-content: flex-start;

        &:first-child {
          margin-left: 10rpx;
        }

        & + .item {
          margin-left: 40rpx;
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15rpx;
        transition: transform 0.2s ease;

        &:active {
          transform: translateY(6rpx);
        }

        .wd-img {
          box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
          margin-top: 20rpx;
          flex-shrink: 0;
          width: 120rpx !important;
          height: 120rpx !important;
          border: 4rpx solid #fff;
          transition: transform 0.2s;
        }

        .text {
          width: 140rpx;
          font-size: 26rpx;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          text-align: center;
          margin-top: 15rpx;
        }
      }
    }
  }

  .activecard {
    margin: 60rpx 0;
    padding: 0 30rpx;

    .title {
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;

      .wd-icon {
        filter: drop-shadow(0 4rpx 8rpx rgba(34, 166, 179, 0.2));
      }

      .text {
        margin: 0 30rpx;
        font-size: 34rpx;
        color: #333;
        font-weight: 600;
        letter-spacing: 1rpx;
      }
    }

    .activelist {
      .row {
        display: flex;
        padding: 20rpx;
        background: #fff;
        border-radius: 32rpx;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;

        margin: 30rpx 0; // 统一垂直间距

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:active {
          transform: translateY(4rpx) scale(0.98);
        }

        .left {
          margin-right: 5rpx;

          .Actimage {
            width: 220rpx;
            height: 180rpx;
            border-radius: 24rpx;
            overflow: hidden;
            position: relative; // 父级相对定位

            .status-tag {
              position: absolute;
              top: 0rpx;
              left: 0rpx;
              z-index: 2;

              .status-text {
                position: relative;
                font-size: 22rpx;
                color: #fff;
                padding: 6rpx 16rpx;
                z-index: 2;
              }

              .status-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 8rpx;
                backdrop-filter: blur(4rpx);
                z-index: 1;
              }
            }

            image {
              transition: transform 0.3s;
              border-radius: 20rpx;
              width: 100%;
              height: 100%;
            }

            &:active image {
              transform: scale(1.05);
            }
          }
        }

        .right {
          flex: 1;
          padding-left: 15rpx;

          .Acttitle {
            font-size: 32rpx;
            font-weight: 600;
            margin-bottom: 20rpx;
            line-height: 1.4;
          }

          .Acttime, .address {
            padding: 0rpx 0rpx;
            display: flex;
            font-size: 26rpx;
            margin-bottom: 16rpx;
            gap: 10rpx;

            .moment {
              margin-left: 10rpx;
            }

            .wd-icon {
              margin-right: 12rpx;
              font-size: 38rpx;
            }
          }
        }

      }
    }
  }

}
</style>