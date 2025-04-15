<template>
  <view class="lostFoundPublish">
    <!-- 发布类型选择 -->
    <view class="type-selector card-style">
      <view class="type-btn"
            :class="{ active: lostFoundPublishParams.itemType === 1 }"
            @click="handleTypeChange(1);lostFoundPublishParams.currentLocation=''">
        我丢失了
      </view>
      <view class="type-btn"
            :class="{ active: lostFoundPublishParams.itemType === 2 }"
            @click="handleTypeChange(2)">
        我捡到了
      </view>
    </view>

    <!-- 基本信息区块 -->
    <view class="easyInfo card-style">
      <view class="info-item">
        <text class="item-label">标题</text>
        <wd-input placeholder="请输入标题" v-model="lostFoundPublishParams.title" clearable :maxlength="20" show-word-limit />
      </view>

      <!--<view class="info-item">-->
      <!--  <text class="item-label">物品名称</text>-->
      <!--  <wd-input placeholder="请输入物品名称" clearable :maxlength="20" show-word-limit />-->
      <!--</view>-->

      <view class="info-item">
        <text class="item-label">发现时间</text>
        <wd-datetime-picker label=""  v-model="dateValue" />
      </view>

      <view class="info-item">
        <text class="item-label">掉落/遗失地点</text>
        <wd-input placeholder="请输入掉落地点" v-model="lostFoundPublishParams.location" clearable />
      </view>

      <view class="info-item">
        <text class="item-label">描述信息</text>
        <wd-input placeholder="请输入物品描述" v-model="lostFoundPublishParams.description" type="textarea" :rows="3" />
      </view>

      <!--<view class="info-item">-->
      <!--  <text class="item-label">物品标签</text>-->
      <!--  <view class="label-container">-->
      <!--    <wd-tag v-for="tag in tags" :key="tag" round color="#fff" bg-color="#007AFF" class="tag-item">-->
      <!--      {{ tag }}-->
      <!--    </wd-tag>-->
      <!--  </view>-->
      <!--</view>-->

      <!-- 标签选择区域 -->
      <view class="info-item">
        <text class="item-label">物品类型</text>
        <view class="label-container">
          <wd-tag 
            v-for="tag in categoryTags" 
            :key="tag"
            :type="lostFoundPublishParams.category === tag ? 'primary' : 'default'"
            round
            @click="handleTagSelect(tag)"
          >
            {{ tag }}
          </wd-tag>
        </view>
      </view>

    </view>

    <!-- 地址信息区块 -->
    <view class="addressInfo card-style" v-if="lostFoundPublishParams.itemType==2">
      <text class="section-title">当前物品所在地</text>
      <wd-input placeholder="请输入物品当前所在地" v-model="lostFoundPublishParams.currentLocation" clearable />
    </view>

    <!-- 上传区块 -->
    <view class="upload-section card-style">
      <text class="section-title">上传图片（最多6张）</text>
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
    </view>

    <!-- 操作按钮 -->
    <view class="action-bar">
      <wd-button type="primary" block @click="handlePublish">立即发布</wd-button>
    </view>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {dayjs, useToast} from "@/uni_modules/wot-design-uni";
import {deleteFile} from "@/api/uploadApi";
import {onLoad} from "@dcloudio/uni-app";
import {getUserInfo} from "@/utils/userStorage";
import {addItems} from "@/api/itemsApi";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const toast = useToast()

const fileList = ref();

const dateValue = ref<number>(Date.now())

const handleSubmit = () => {
  lostFoundPublishParams.value.eventTime = dayjs(dateValue.value).format('YYYY-MM-DD HH:mm:ss')
  console.log(lostFoundPublishParams.value)
  toast.show("该功能暂未完成~")
}

// 预设的物品类型标签
const categoryTags = ref([
  '手机数码',
  '证件卡片',
  '钱包',
  '钥匙',
  '包包',
  '衣物',
  '首饰配件',
  '图书资料',
  '生活用品',
  '其他'
])

//发布文章对象
const lostFoundPublishParams = ref<any>({
  category: "",
  description: "",
  eventTime: "",
  itemType: 1, // 1-丢失 2-招领
  location: "",
  currentLocation: "",
  title: "",
  urlList: [],
  userId: 0,
})

//上传图片列表
const handleChange = ((file) => {
  console.log("files:", file)
  console.log(fileList.value)
  fileList.value = file;
})

// 删除图片前置操作
const beforeImageRemove =  ((res) => {
  const url = lostFoundPublishParams.value.urlList[res.index];
  console.log("删除前置处理",url)
  deleteFile(url).then((response) => {
    if (response.code === 200) {
      console.log("删除成功", response)
      fileList.value.splice(res.index, 1)
      // images.value.splice(res.index, 1)
      lostFoundPublishParams.value.urlList.splice(res.index,1)
      console.log("publishArticleParams>>>",lostFoundPublishParams)
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
  lostFoundPublishParams.value.urlList.push(...result.data)
  console.log(lostFoundPublishParams.value)
}

// 标签选择处理
const handleTagSelect = (tag: string) => {
  lostFoundPublishParams.value.category = tag
}

// 添加表单验证方法
const validateForm = () => {
  const params = lostFoundPublishParams.value
  
  // 基础必填项（两种类型都需要验证的字段）
  if (!params.title?.trim()) {
    toast.show('请输入标题')
    return false
  }
  
  if (!params.description?.trim()) {
    toast.show('请输入描述')
    return false
  }
  
  if (!params.location?.trim()) {
    toast.show('请输入丢失/拾获地点')
    return false
  }
  
  if (!dateValue) {
    toast.show('请选择时间')
    return false
  }
  
  if (!params.category?.trim()) {
    toast.show('请选择物品类型')
    return false
  }

  // 仅当选择"我捡到了"(itemType === 2)时验证 currentLocation
  if (params.itemType === 2 && !params.currentLocation?.trim()) {
    toast.show('请输入当前物品位置')
    return false
  }
  return true
}

// 修改发布方法
const handlePublish = async () => {
  // 表单验证
  if (!validateForm()) {
    return
  }

  lostFoundPublishParams.value.eventTime = dayjs(dateValue.value).format('YYYY-MM-DD HH:mm:ss')

  uni.showLoading({
    title: "发布中",
    mask: true,
  })

  try {
    const res = await addItems(lostFoundPublishParams.value)
    if (res.code === 200) {
      toast.show({
        msg: "发布成功",
        cover: true
      })
      
      // 修改获取页面实例和设置刷新的方式
      const pages = getCurrentPages()
      // 获取上一页实例
      const prevPage = pages[pages.length - 2]
      
      setTimeout(() => {
        // 确保上一页存在并且是失物招领列表页
        if (prevPage && prevPage.route === 'pages/lostFound/lostFound') {
          // 调用上一页的刷新方法
          if (typeof prevPage.$vm.setNeedRefresh === 'function') {
            console.log('调用刷新方法')
            prevPage.$vm.setNeedRefresh()
          } else {
            console.error('setNeedRefresh 方法未找到')
          }
        }
        
        // 返回上一页
        uni.navigateBack({
          delta: 1
        })
      }, 1500)
    } else {
      toast.error(res.message)
    }
  } catch (error) {
    console.error('发布失败:', error)
    toast.error('发布失败，请重试')
  } finally {
    uni.hideLoading()
  }
}

// 修改类型切换方法
const handleTypeChange = (type: number) => {
  lostFoundPublishParams.value.itemType = type
  // 如果切换到"我丢失了"，清空当前位置
  if (type === 1) {
    lostFoundPublishParams.value.currentLocation = ''
  }
}

onLoad((options) => {
  const loginUser = getUserInfo()
  lostFoundPublishParams.value.userId = loginUser?.id
  
  // 如果有传入类型参数，则设置对应的类型
  if (options && options.type) {
    const type = parseInt(options.type)
    console.log("type>>",type)
    // 设置发布类型
    lostFoundPublishParams.value.itemType = type
    // 如果是拾获类型，确保 currentLocation 字段已初始化
    if (type === 2) {
      lostFoundPublishParams.value.currentLocation = ''
    }
  }
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
.lostFoundPublish {
  padding: 20rpx 30rpx;
  background: #f5f5f7;
  min-height: 100vh;


  // 公共卡片样式
  .card-style {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  // 信息项通用样式
  .info-item {
    margin-bottom: 40rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .item-label {
      display: block;
      font-weight: bold;
      font-size: 28rpx;
      color: #333;
      //font-weight: 500;
      margin-bottom: 20rpx;
    }
  }
}

// 标签容器
.label-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;

  .tag-item {
    flex-shrink: 0;
    padding: 10rpx 30rpx;
  }
}

// 区块标题
.section-title {
  display: block;
  font-size: 32rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 30rpx;
}

// 上传区块
.upload-section {
  ::v-deep .wd-upload__container {
    margin-top: 20rpx;
  }
}

// 操作按钮栏
.action-bar {
  position: sticky;
  bottom: 0;
  padding: 30rpx 0;
  margin: 0 auto;
}
:deep(.wd-picker__cell){
  padding: 10px 0 !important;
}

.type-selector {
  display: flex;
  gap: 30rpx;
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #fff;

  .type-btn {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 12rpx;
    font-size: 30rpx;
    background: #f5f5f7;
    color: #666;
    transition: all 0.3s ease;

    &.active {
      background: #007AFF;
      color: #fff;
      font-weight: 500;
      box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.2);
    }
  }
}

.category-section {
  margin-bottom: 20px;
  
  .section-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    :deep(.wd-tag) {
      margin: 4px;
    }
  }
}
</style>