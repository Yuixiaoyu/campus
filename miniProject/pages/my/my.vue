<template>
  <view class="my-page">
    <!-- 顶部用户信息区域 -->
    <view class="user-info">
      <view class="user-header">
        <wd-img :src="userInfo.imageUrl || 'http://192.168.34.100:9000/campus/nAH9IwNA5RLPa749104127442e3a91ee3c41c57d8a34.webp'" width="80" height="80" round/>
        <view class="user-data">
          <view class="nickname">{{ userInfo.userName }}</view>
          <view class="edit">
            修仙熬夜座~
          </view>
        </view>
      </view>

      <!-- 个人简介 -->
      <view class="user-bio">
        <view class="bio-text">{{ userInfo.userProfile || '这个人很懒，简介都不想写，估计是没有对象吧' }}</view>
        <view class="user-tags">
          <wd-tag type="primary" round>电竞少年</wd-tag>
          <wd-tag type="warning" round>时间管理大师</wd-tag>
          <wd-tag type="success" round>程序猿</wd-tag>
        </view>
      </view>

      <!-- 用户统计数据 -->
      <view class="user-stats">
        <view class="stat-item">
          <view class="num">{{ userInfo.follows || 168 }}</view>
          <view class="label">关注</view>
        </view>
        <view class="stat-item">
          <view class="num">{{ userInfo.fans || '3.1k' }}</view>
          <view class="label">粉丝</view>
        </view>
        <view class="stat-item">
          <view class="num">{{ userInfo.likes || 263 }}</view>
          <view class="label">获赞数</view>
        </view>
        <view class="stat-item"  @click="isPopupShow = true">
          <wd-icon name="setting" size="18px" color="#adadad"></wd-icon>
          <view class="label">设置</view>
        </view>
      </view>
    </view>

    <!--   侧边栏  -->
    <wd-popup v-model="isPopupShow"  position="right" custom-style="height: 100vh;width:50%" @close="handlePopupClose"></wd-popup>

    <wd-tabs v-model="tab">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="item" :name="item">
          <!-- 内容区域 -->
          <!-- 容器一 -->
          <view class="box">
            <view v-for="(item,index) in dataList" :key="index">
              <!-- 圆点 -->
              <view class="point">
                <view class="dot">&nbsp;</view>
                <view class="title">{{ item.createTime.split("T")[0] }}</view>
              </view>
              <!-- 容器二 -->
              <view class="box-line">
                <!-- 容器三 -->
                <view class="box-data">
                  <view class="userProfile">
                    <image src="https://www.keaitupian.cn/cjpic/frombd/1/253/1619359266/955220359.jpg" mode="aspectFill" class="articleAvatar"></image>
                    <view class="userName">{{userInfo.userName}}</view>
                  </view>
                  <view class="row-info">{{ item.content }}</view>
                  <!-- 三图容器 -->
                  <view class="image-list">
                    <!-- 循环生成三个图片 -->
                    <view
                        v-for="(url, index) in item.imagesList.slice(0, 3)"
                        v-if="item.imagesList.length != 0"
                        :key="index"
                        class="image-wrapper"
                        :class="{ 'last-item': index === 2, 'single-item': item.imagesList.length === 1 }"
                    >
                      <!-- wot-design 图片组件 -->
                      <wd-img
                          width="100%"
                          height="100%"
                          mode="aspectFill"
                          radius="5px"
                          :src="url"
                      />

                      <!-- 最后一个图片的蒙版 -->
                      <view v-if="index === 2 && item.imagesList.length > 3" class="mask">
                        <text class="plus-text">+{{ (item.imagesList.length - 3) }}</text>
                      </view>
                    </view>
                  </view>
                  <wd-tag class="tag" v-for="tag in item.tags" type="primary" plain mark>{{tag}}</wd-tag>

                  <view class="row-button">
                    <view class="footer-item">
                      <wd-icon name="view" size="16px"/>
                      <text>{{item.viewCount}}</text>
                    </view>
                    <view class="footer-item">
                      <wd-icon name="thumb-up" size="16px"/>
                      <text>{{item.likeCount}}</text>
                    </view>
                    <view class="footer-item">
                      <wd-icon name="chat" size="16px"/>
                      <text>{{item.commentCount}}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </wd-tab>
      </block>
    </wd-tabs>

    <wd-toast />

  </view>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {getArticleByUserId} from "@/api/articleApi";
import {getUserInfo} from "@/utils/userStorage";

import { useToast } from '@/uni_modules/wot-design-uni'
import {onLoad,onPullDownRefresh} from '@dcloudio/uni-app'
// 用户信息
const userInfo = ref({})

const toast = useToast()

const dataList = ref([])

// 编辑资料
const editProfile = () => {
  uni.navigateTo({
    url: '/pages/editProfile/editProfile'
  })
}

const myArticleList = async () => {
  userInfo.value = getUserInfo();
  const articleList = await getArticleByUserId(userInfo.value.id)
  console.log(articleList)
  if (articleList.code === 200) {
    dataList.value = articleList.data
    // dataList.push(...articleList.data)
  }else {
    toast.error(articleList.msg)
  }
//   将articleList.data赋值给dataList

  console.log(dataList)

}
onLoad(() => {
  myArticleList()
})
// 下拉刷新
onPullDownRefresh(()=>{
  console.log("触发下拉刷新")
  myArticleList()
  uni.stopPullDownRefresh();
})

const tab = ref<number>(0)
const tabs = ref(['投稿','收藏','喜欢'])



const isPopupShow = ref(true)

const handlePopupClose = (()=>{
  isPopupShow.value = false
})



</script>

<style lang="scss" scoped>
.my-page {
  min-height: 100vh;
  background-color: #fff;

  .user-info {

    padding: 100px 20px 10px 20px;
    color: #ffffff;
    background: linear-gradient(to bottom, #8c989e, #3d4753);

    .user-header {
      display: flex;
      align-items: center;

      .user-data {
        margin-left: 20px;

        .nickname {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .edit{
          margin-top: 10px;
          font-size: 14px;
          font-weight: 100;
        }
      }
    }

    .user-stats {
      display: flex;
      justify-content: center;
      margin: 15px 0;
      align-items: center;

      .stat-item {
        flex: 1;
        //text-align: center;
        padding-left: 10px;
        .num {
          font-size: 18px;
          //font-weight: 600;
          margin-bottom: 4px;
        }

        .label {
          font-size: 12px;
          //color: #666;
        }
      }
      .stat-item:last-child{
        flex: 1.5;
        text-align: center;
        :deep(.wd-icon-setting){
          margin: 4px 0;
        }
        .label {
          font-size: 13px;
          font-weight: 100;
          //color: #666;
        }
      }
    }

    .user-bio {
      .bio-text {
        margin-top: 32px;
        font-size: 14px;
        font-weight: 100;
        margin-bottom: 12px;
      }

      .user-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag {
          padding: 4px 12px;
          background-color: #f5f5f5;
          border-radius: 20px;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }

  :deep(.wd-tabs__nav){
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: -10px;
  }
  /* 容器一 */
  .box {
    padding: 10rpx 20rpx 10rpx 40rpx;
    background-color: #f6f6f6;

    /* 圆点 */
    .point {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 15rpx 0;
    }

    .dot {
      margin-left: -22rpx;
      background-color: #198fbe;
      box-shadow: 0 0 5rpx 5rpx #71b2d5;
      color: white;
      width: 24rpx;
      padding: 5rpx;
      font-size: 16rpx;
      text-align: center;
      border-radius: 50rpx;
    }

    .title {
      font-size: 30rpx;
      margin-left: 15rpx;
      background-color: white;
      padding: 12rpx 25rpx;
      border-radius: 50rpx;
      color: #909399;
    }

    /* 容器二 */
    .box-line {
      border-left: 3rpx solid #c8c9cc;
      padding: 15rpx 10rpx 15rpx 35rpx;
    }

    /* 容器三 */
    .box-data {
      background-color: white;
      padding: 20rpx 15rpx;
      border-radius: 15rpx;
      box-shadow: 1px 2px 5px 1px #c8c9cc;


      .userProfile{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 10rpx;
        border-bottom: 1px solid #eeeeee;

        .articleAvatar{
          width: 90rpx;
          height: 90rpx;
          display: block;
          border-radius: 50%;
        }
        .userName{
            margin-left: 20rpx;
        }


      }



      .row-info {
        font-size: 28rpx;
        color: gray;
        line-height: 45rpx;
        padding: 10rpx 15rpx;
        text-indent: 2rem;
      }
      .tag{
        margin: 5px 3px;
      }

      .row-button {
        display: flex;
        flex-direction: row;
        //justify-content: space-around;
        align-items: center;
        border-top: 1rpx solid #f1f1f1;
        margin-top: 20rpx;
        padding-top: 20rpx;
      }

      .row-button view {
        padding: 4px 8px;
        font-size: 28rpx;
        //color: white;
        color: #9e9e9e;
        border-radius: 10rpx;
      }

      /* 图片列表布局 */
      /* 图片列表布局 */
      .image-list {
        margin-top: 10px;
        display: flex;
        gap: 10rpx; /* 图片间距 */

        /* 图片容器 */
        .image-wrapper {
          flex: 1;
          aspect-ratio: 1; /* 保持正方形 */
          position: relative;
          height: auto;
          overflow: hidden;
          border-radius: 12rpx; /* 可选圆角 */
        }

        /* 当只有一张图片时，调整 flex 值 */
        .single-item {
          flex: 0 0 30%; /* 你可以根据需要调整这个值 */
        }

        /* 蒙版样式 */
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;

          /* +10 文字样式 */
          .plus-text {
            color: #fff;
            font-size: 36rpx;
            font-weight: bold;
          }
        }
      }


      /* 处理最后一个元素的额外样式（可选） */
      .last-item {
        margin-right: 0;
      }

    }



  }

}
</style>
