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
  background: linear-gradient(180deg, 
    rgba(248, 249, 250, 0.8) 0%, 
    rgba(255, 255, 255, 0.95) 50%,
    #ffffff 100%
  );
  min-height: 100vh;
  padding-bottom: 100rpx;

  .banner {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 30rpx 0;
    
    .card-swiper {
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -30rpx;
        height: 60rpx;
        background: linear-gradient(180deg, 
          rgba(248, 249, 250, 0) 0%,
          rgba(248, 249, 250, 0.8) 100%
        );
        z-index: 2;
      }
    }
  }

  .classlist {
    display: flex;
    justify-content: center;
    height: 280rpx;
    width: 720rpx;
    margin: -60rpx auto 40rpx;
    position: relative;
    z-index: 2;

    .cardLayout {
      &::-webkit-scrollbar {
        display: none;
      }
      -webkit-overflow-scrolling: touch;
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: 24rpx;
      align-items: center;
      background: linear-gradient(135deg,
        rgba(168, 176, 251, 0.35) 0%,
        rgba(223, 212, 246, 0.35) 50%,
        rgba(236, 205, 227, 0.35) 100%
      );
      pointer-events: auto;
      z-index: 999;
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 8rpx 30rpx rgba(0, 0, 0, 0.05),
        0 2rpx 6rpx rgba(0, 0, 0, 0.02);
      overflow-x: auto;
      flex-wrap: nowrap;
      justify-content: flex-start;
      padding: 25rpx 20rpx;

      .item {
        flex-shrink: 0;
        min-width: 150rpx;
        height: 230rpx;
        justify-content: flex-start;
        
        &:first-child {
          margin-left: 15rpx;
        }

        & + .item {
          margin-left: 45rpx;
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18rpx;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          transform: translateY(6rpx);
        }

        &:hover {
          transform: translateY(-4rpx);
        }

        .wd-img {
          box-shadow: 
            0 6rpx 16rpx rgba(0, 0, 0, 0.06),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          margin-top: 20rpx;
          flex-shrink: 0;
          width: 130rpx !important;
          height: 130rpx !important;
          border: 4rpx solid rgba(255, 255, 255, 0.9);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          &:hover {
            transform: scale(1.05);
            box-shadow: 
              0 8rpx 20rpx rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.2);
          }
        }

        .text {
          width: 140rpx;
          font-size: 26rpx;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          text-align: center;
          margin-top: 15rpx;
          color: rgba(51, 51, 51, 0.9);
          font-weight: 500;
          letter-spacing: 0.5rpx;
        }
      }
    }
  }

  .activecard {
    margin: 70rpx 0;
    padding: 0 35rpx;

    .title {
      margin-bottom: 35rpx;
      display: flex;
      align-items: center;

      .wd-icon {
        filter: drop-shadow(0 4rpx 12rpx rgba(34, 166, 179, 0.25));
        transform: scale(1.1);
      }

      .text {
        margin: 0 30rpx;
        font-size: 36rpx;
        color: #2d3436;
        font-weight: 600;
        letter-spacing: 1rpx;
      }
    }

    .activelist {
      .row {
        display: flex;
        padding: 28rpx;
        background: #fff;
        border-radius: 32rpx;
        box-shadow: 
          0 8rpx 24rpx rgba(0, 0, 0, 0.06),
          0 1rpx 4rpx rgba(0, 0, 0, 0.02);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 35rpx 0;
        animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30rpx);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:active {
          transform: translateY(4rpx) scale(0.985);
        }

        &:hover {
          box-shadow: 
            0 12rpx 36rpx rgba(0, 0, 0, 0.08),
            0 2rpx 8rpx rgba(0, 0, 0, 0.03);
          transform: translateY(-3rpx);
        }

        .left {
          margin-right: 25rpx;

          .Actimage {
            width: 240rpx;
            height: 190rpx;
            border-radius: 24rpx;
            overflow: hidden;
            position: relative;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
            
            .status-tag {
              position: absolute;
              top: 12rpx;
              left: 12rpx;
              z-index: 2;

              .status-text {
                position: relative;
                font-size: 24rpx;
                color: #fff;
                padding: 8rpx 20rpx;
                z-index: 2;
                font-weight: 500;
                letter-spacing: 0.5rpx;
              }

              .status-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.65);
                border-radius: 12rpx;
                backdrop-filter: blur(4rpx);
                z-index: 1;
              }
            }

            image {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              border-radius: 20rpx;
              width: 100%;
              height: 100%;
              object-fit: cover;
              
              &.loading {
                filter: blur(4rpx);
                opacity: 0.8;
              }
            }

            &:hover image {
              transform: scale(1.08);
            }
          }
        }

        .right {
          flex: 1;
          padding-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .Acttitle {
            font-size: 34rpx;
            font-weight: 600;
            margin-bottom: 24rpx;
            line-height: 1.4;
            color: #2d3436;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .Acttime, .address {
            padding: 4rpx 0;
            display: flex;
            align-items: center;
            font-size: 26rpx;
            margin-bottom: 16rpx;
            gap: 12rpx;
            color: #636e72;

            .moment {
              margin-left: 10rpx;
            }

            .wd-icon {
              margin-right: 12rpx;
              font-size: 32rpx;
              color: #74b9ff;
            }
          }
        }
      }
    }
  }
}
</style>