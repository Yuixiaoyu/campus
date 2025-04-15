<template>
  <view class="clubPage">
    <!-- 顶部轮播图 -->
    <view class="banner">
      <view class="card-swiper">
        <wd-swiper :list="swiperList" direction="vertical" imageMode="scaleToFill" indicatorPosition="right" autoplay v-model:current="current"
                   :indicator="{ type: 'dots-bar' }" @click="handleClick" @change="onChange"></wd-swiper>
      </view>
    </view>

    <!-- 圆形社团图标区 -->
    <view class="classlist">
      <view class="cardLayout">
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fd7.png" />
          <view class="text">
            体育类社团
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fda.png" />
          <view class="text">
            服务类社团
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fd8.png" />
          <view class="text">
            学术类社团
          </view>
        </view>
        <view class="item">
          <wd-img :width="65" :height="65" round
                  src="https://pic1.imgdb.cn/item/67ea951d0ba3d5a1d7e83fd9.png" />
          <view class="text">
            艺术类社团
          </view>
        </view>
      </view>
    </view>
    <!-- 社团宣传图部分 -->
    <view class="orgcard">
      <!-- 精选社团标题 -->
      <view class="title">
        <wd-icon name="star-on" size="22px" color="#22a6b3"></wd-icon>
        <view class="text">精选社团</view>
      </view>
      <!-- 社团宣传图卡片区 -->
      <view class="orgcardlayout">
        <view 
          class="orgcarditem" 
          v-for="club in clubList" 
          :key="club.id"
          @click="handleClubClick(club)"
        >
          <view class="club-card">
            <image 
              v-if="club.cover" 
              :src="club.cover" 
              mode="aspectFill" 
              class="club-image"
            />
            <view class="club-info">
              <view class="club-name">{{ club.name }}</view>
              <view class="club-profile">{{ club.profile }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加加载状态 -->
    <wd-loading v-if="loading"/>
    <!-- 添加提示组件 -->
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getClubList } from '@/api/clubApi'
import { useToast } from '@/uni_modules/wot-design-uni'
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const toast = useToast()

const current = ref<number>(0)//控制开屏展示的图片

const swiperList = ref([
  "https://pic1.imgdb.cn/item/67f61a7b88c538a9b5c7634d.webp",
])

// 新增的数据
const loading = ref(false)
const clubList = ref<any[]>([])

// 获取社团列表数据
const fetchClubList = async () => {

  try {
    loading.value = true
    const params = {
      current: 1,
      pageSize: 6, // 显示6个精选社团
    }
    
    const res = await getClubList(params)
    if (res.code == 200) {
      clubList.value = res.data.records
    } else {
      toast.error(res.message || '获取社团列表失败')
    }
  } catch (error) {
    console.error('获取社团列表错误:', error)
    toast.error('获取社团列表失败')
  } finally {
    loading.value = false
  }
}

// 处理社团点击
const handleClubClick = (club: any) => {
  // toast.show("敬请期待")
  // 跳转到社团详情页
  uni.navigateTo({
    url: `/pages/clubDetail/clubDetail?id=${club.id}`
  })
}

function handleClick(e) {

}

function onChange(e) {

}

// 页面加载时获取数据
onMounted(() => {
  fetchClubList()
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


//页面主体
.clubPage {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  min-height: 100vh;
  padding-bottom: 40rpx;

  .banner {
    position: relative;
    z-index: 1;
  }


  //这是圆形社团图标区域的父组件
  .classlist {
    // margin-top: -80rpx;
    display: flex;
    justify-content: center;
    height: 250rpx;
    width: 700rpx;
    margin: -50rpx auto 30rpx;
    position: relative;
    z-index: 2;


    .cardLayout {
      display: flex;
      width: 100%;
      height: 100%;
      border: 1px solid #888;
      border-radius: 15rpx;
      justify-content: space-around;
      align-items: center;
      background: #fff;

      border: none;
      box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.08);
      padding: 15rpx 0;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15rpx;
        transition: transform 0.3s ease;

        &:active {
          transform: scale(0.95);
        }

        .wd-img {
          box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
          border: 2rpx solid #fff;
          width: 120rpx !important; // 放大图标
          height: 120rpx !important;
          border: 4rpx solid #fff; // 加粗边框
          transition: transform 0.3s; // 添加过渡

        }


        .text {
          font-size: 28rpx;
          color: #333;
          font-weight: 500;
          line-height: 1.4;
          text-align: center;
        }
      }


    }
  }

  .orgcard {
    margin: 40rpx 0;
    padding: 0 30rpx;

    .title {
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;

      .wd-icon {
        filter: drop-shadow(0 2rpx 4rpx rgba(34, 166, 179, 0.3));
      }

      .text {
        margin: 0 30rpx;
        font-size: 34rpx;
        color: #333;
        font-weight: 600;
        letter-spacing: 1rpx;
      }
    }

    .orgcardlayout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;

      .orgcarditem {
        border-radius: 25rpx;
        height: 400rpx;
        border: none;
        background: #fff;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: #666;
        transition: all 0.3s ease;

        &:active {
          transform: scale(0.98);
          background: #f8f8f8;
        }

        // 添加社团卡片样式
        .club-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          
          .club-image {
            width: 100%;
            height: 240rpx;
            border-radius: 16rpx;
            margin-bottom: 16rpx;
          }
          
          .club-info {
            padding: 10rpx 10rpx;
            flex: 1;
            display: flex;
            flex-direction: column;
            
            .club-name {
              font-size: 32rpx;
              font-weight: 600;
              color: #333;
              margin-bottom: 8rpx;
            }
            
            .club-profile {
              font-size: 26rpx;
              color: #666;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }
  }

}
</style>