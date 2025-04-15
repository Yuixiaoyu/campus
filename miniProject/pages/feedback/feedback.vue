<template>
  <view class="feedback">
    <wd-navbar custom-class="navbar" :bordered="false" title="意见反馈" safeAreaInsetTop left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="title">
      <view class="title-text">Hello</view>
      <view class="title-content">
        你有什么好的建议可以分享下哦~
      </view>
    </view>
    <view class="container">
      <wd-textarea v-model="feedbackData.content"
                   placeholder="请填写10个字以上内容，以便我们提供更好的内容"
                   :maxlength="2000"
                   placeholderStyle="font-size:14px;"
                   show-count
                   clearable
                   :rows="5"
      />
      <!-- 图片上传区域 -->
      <wd-upload
          v-model:file-list="fileList"
          ref="uploadFile"
          multiple
          accept="image"
          action="https://campus.fybreeze.cn/api/article/uploadImages"
          @change="handleChange"
          :before-remove="beforeImageRemove"
          @success="uploadSuccess"
      />
    </view>
    <view class="container" >
      <view style="font-weight: bold;font-size: 16px;margin-bottom: 12px;margin-top: 4px" >联系电话</view>
      <wd-input type="text" no-border v-model="feedbackData.relation" placeholder="输入手机号/邮箱"  />
    </view>
    <wd-button custom-class="btn" type="primary"  block @click="submitFeedback">提交反馈</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useToast } from '@/uni_modules/wot-design-uni'
import {onLoad} from "@dcloudio/uni-app";
import {getUserInfo} from "@/utils/userStorage";
import {addFeedBack} from "@/api/feedback";
import {onShareTimeline,onShareAppMessage} from "@dcloudio/uni-app";

const toast = useToast()

const fileList = ref([])

const feedbackData = ref({
  userId: 0,
  imageList: [],
  content: '',
  relation: ''
})

const handleClickLeft = () => {
  uni.navigateBack()
}

onLoad(() => {
  const user = getUserInfo();
  if (user) {
    feedbackData.value.userId = user.id
  }else {
    toast.show({
      type: 'warning',
      message: '请先登录'
    })
  }
  console.log(user)
})

//上传图片列表
const handleChange = ((file) => {
  console.log("files:", file)
  console.log(fileList.value)
  fileList.value = file;
})

// 删除图片前置操作
const beforeImageRemove = ((res) => {
  fileList.value.splice(res.index, 1)
  // images.value.splice(res.index, 1)
  feedbackData.value.imageList.splice(res.index,1)
  console.log("publishArticleParams>>>",feedbackData)
})
// 上传图片
const uploadSuccess = (res) => {
  console.log('上传成功res', res.file.response)
  const result = JSON.parse(res.file.response)
  console.log('上传成功result.data', result.data)
  // images.value.push(...result.data)
  feedbackData.value.imageList.push(...result.data)
  console.log(feedbackData.value)
}

const submitFeedback = async ()=>{
 const res = await  addFeedBack(feedbackData.value)
  if (res.code === 200) {
    toast.show("提交成功~感谢您的反馈")
    setTimeout(()=>{
      uni.navigateBack()
    },1000);
  }
  console.log("提交反馈",feedbackData.value)
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

.feedback{
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(to bottom,
      #bdcff5 0%,
      #f2f3f9 30%,
      #f2f7fe 80%,
      #f0faff 100%
  );
  background-color: #eaf4fb;
  :deep(.navbar){
    background:none;
  }

  .title{
    width: 80%;
    padding: 20px;
    .title-text{
      font-size: 60rpx;
      font-weight: bold;
    }
    .title-content{
      margin-top: 10px;
      font-size: 14px;
      color: #919191;
    }
  }
  .container{
    width: 620rpx;
    border-radius: 10px;
    padding: 28rpx;
    margin: 30rpx auto;
    background-color: #ffffff;

  }

  :deep(.btn){
    margin: 30px auto;
    width: 90%;
  }



}
</style>
