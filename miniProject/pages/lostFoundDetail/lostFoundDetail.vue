<template>
  <view class="layout">
    <view class="Thing-info card-style">
      <view class="title">
        <view class="title-text">
          {{ itemsDetail.title }}
        </view>
        <view class="time">
          {{ itemsDetail.eventTime }}
        </view>
      </view>
      <!-- 小标签信息 -->
      <view class="class-info">
        <!--<view class="class-icon">-->
        <!--  <wd-icon name="goods" size="22px" color="#b0a0e6"></wd-icon>-->
        <!--  <view class="class-text">-->
        <!--    白日梦-->
        <!--  </view>-->
        <!--</view>-->
        <view class="class-icon">
          <wd-icon name="discount" size="18px" color="#b0a0e6"></wd-icon>
          <view class="class-text">{{ itemsDetail.category }}</view>
        </view>
        <view class="class-icon">
          <wd-icon name="view" size="18px" color="#b0a0e6"></wd-icon>
          <view class="class-text"> 本人保管</view>
        </view>
        <view class="class-icon">
          <wd-icon name="location" size="18px" color="#b0a0e6"></wd-icon>
          <view class="class-text">{{ itemsDetail.location }}</view>
        </view>
      </view>
      <!-- 图片信息区 -->
      <view class="Ting-pic"  v-if="itemsDetail.url?.length!=0">
        <wd-swiper :list="itemsDetail?.url" :indicator="{ type: 'fraction' }" :autoplay="true"
                   indicatorPosition="bottom-right" @click="handleClick" @change="onChange">
        </wd-swiper>
      </view>
      <!-- 备注信息区 -->
      <view class="info-item">
        {{ itemsDetail.description }}
      </view>
    </view>
    <view class="user-info card-style">
      <view class="user-pic">
        <wd-img :width="50" :height="50" round :src="itemsDetail?.userVO?.imageUrl" />
      </view>
      <view class="user">
        <view class="name">
          {{ itemsDetail?.userVO?.userName }}
        </view>
        <view class="class">
          发布者
        </view>
      </view>
      <view class="bottom">
        <wd-button type="primary" @click="show = true">是我的</wd-button>
        <wd-overlay :show="show" @click="show = false">
          <view class="wrapper">
            <view class="block"  @click.stop="">
              <view class="title">
                验证消息
              </view>
              <view class="title-info">
                上传证明材料
              </view>
              <!-- 图片上传区域 -->
              <wd-upload
                  v-model:file-list="fileList"
                  ref="uploadFile"
                  :limit="6"
                  multiple
                  accept="image"
                  action="https://campus.fybreeze.cn/api/article/uploadImages"
                  @change="handleChange"
                  :before-remove="beforeImageRemove"
                  @success="uploadSuccess"
              />
              <view class="title-info">
                请你简要描述一下物品的特征
              </view>
              <view class="input-text">
                <wd-textarea v-model="paramsMatch.description" placeholder="请填写物品的信息" />
              </view>

              <view class="bottom-pop">
                <wd-button type="info" @click="show = false">取消</wd-button>
                <wd-button @click="handleSubmit">确认</wd-button>
              </view>
            </view>
          </view>
        </wd-overlay>
      </view>
    </view>
    <wd-toast />
  </view>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import {onLoad} from "@dcloudio/uni-app";
import {addMatchRecords, getItemsById} from "@/api/itemsApi";
import {deleteFile} from "@/api/uploadApi";
import{ onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";
import {getUserInfo} from "@/utils/userStorage";
const show = ref(false) //
const value = ref("")//文本绑定
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const itemsDetail = ref({})

// 数据定义
const fileList = ref([])

const paramsMatch = ref({
  urlList: [],
  userId: 0,
  description: "",
  foundItemId: 0
})


//上传图片列表
const handleChange = ((file) => {
  console.log("files:", file)
  console.log(fileList.value)
  fileList.value = file;
})


// 删除图片前置操作
const beforeImageRemove =  ((res) => {
  const url = paramsMatch.value.urlList[res.index];
  console.log("删除前置处理",url)
  deleteFile(url).then((response) => {
    if (response.code === 200) {
      console.log("删除成功", response)
      fileList.value.splice(res.index, 1)
      // images.value.splice(res.index, 1)
      paramsMatch.value.urlList.splice(res.index,1)
      console.log("paramsMatch>>>",paramsMatch)
    } else {
      console.log("删除失败", response)
    }
  })
})

// 上传图片
const uploadSuccess = (res) => {
  console.log('上传成功res', res.file.response)
  const result = JSON.parse(res.file.response)
  console.log('上传成功result.data', result.data)
  // images.value.push(...result.data)
  paramsMatch.value.urlList.push(...result.data)
  console.log(paramsMatch.value)
}

// pop用户弹出框确认按钮
const handleSubmit = async  () => {
  console.log(paramsMatch.value)
  const res = await addMatchRecords(paramsMatch.value)
  if (res.code === 200) {
    console.log(res)
    toast.success({
      msg: '等待对方审核~',
      zIndex: 1000,
      cover: true
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  } else {
    toast.error({
      msg: res.message,
      zIndex: 1000,
      cover: true
    })
  }
}
function handleClick(e) {
}
function onChange(e) {
}
const getLostFoundDetail = async (id) => {
  console.log(id)
  const res = await getItemsById(id)
  if (res.code === 200) {
    console.log(res.data)
    itemsDetail.value = res.data
  } else {
    console.log(res.message)
  }
}
onLoad((options) => {
  console.log(options)
  getLostFoundDetail(options.id)
  paramsMatch.value.foundItemId = options.id
  paramsMatch.value.userId = getUserInfo().id
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
.layout {
  padding: 20rpx 30rpx;
  background: #f5f5f7;
  // 将 height: 100% 改为 ↓
  min-height: 100vh;
  box-sizing: border-box;


  // 公共卡片样式
  .card-style {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  .Thing-info {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-text {
        display: block;
        font-size: 40rpx;
        color: #b0a0e6;
        font-weight: 500;
        margin-bottom: 20rpx;
        flex: 5;
      }

      .time {
        flex:4;
        color: #999999;
      }
    }

    .class-info {
      display: flex;
      gap: 10rpx;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 20rpx;

      .class-icon {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .class-text {
          padding-left: 10rpx;
          font-size: 28rpx;
          color: #999999;
        }
      }
    }

    .Ting-pic {
      padding: 30rpx 0;
    }
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .bottom {
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .block {
        padding: 30rpx;
        width: 580rpx;
        height: auto;
        background-color: #fff;
        border-radius: 20rpx;

        .title {
          padding-bottom: 10rpx;
          font-size: 40rpx;
        }

        .title-info {
          color: #b0a0e6;
          padding-bottom: 15rpx;
        }

        .input-text {
          border: 1px solid rgb(0, 0, 0, 0.09);
          box-shadow: 3px 10rpx rgb(0, 0, 0, 0.09);
        }

        .bottom-pop {
          padding-top: 40rpx;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .user {
      display: flex;
      flex-direction: column;
      gap: 10rpx;
      padding: 0 10px;
      align-items: start;

      .name {
        font-weight: 600;
        font-size: 35rpx;
        width: 120px;
        overflow: hidden;      /* 隐藏溢出内容 */
        white-space: nowrap;   /* 强制文本不换行 */
        text-overflow: ellipsis; /* 显示省略符号 */

      }

      .class {
        color: #999999;
      }
    }
  }
}
</style>