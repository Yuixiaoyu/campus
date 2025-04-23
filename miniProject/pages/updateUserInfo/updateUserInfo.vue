<template>
  <view class="updateUserInfo">
    <wd-navbar custom-class="navbar"  :bordered="false" title="修改信息" safeAreaInsetTop left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="container">
      <view class="avatar-wrapper">
        <wd-button custom-class="userAvatar" type="text" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
          <view class="avatar-container">
            <wd-img v-if="user?.imageUrl" :width="100" :height="100" round :src="user.imageUrl"/>
            <view v-else class="avatar-placeholder">
              <wd-icon name="person" size="50px" color="#acc4f9"/>
              <text class="placeholder-text">点击设置头像</text>
            </view>
            <view class="avatar-edit-hint">
              <wd-icon name="camera" size="20px" color="#fff"/>
            </view>
          </view>
        </wd-button>
      </view>
      <view class="info">
        <wd-cell title="昵称" center>
          <wd-input type="nickname" no-border v-model="user.userName" placeholder="请输入用户名" @change="handleChangeName" />
        </wd-cell>
        <wd-select-picker
            type="radio"
            label="性别"
            v-model="user.gender"
            :columns="genderColumns"
            @change="handleGender">
        </wd-select-picker>
        <wd-select-picker
            type="radio"
            label="星座"
            v-model="user.constellation"
            :columns="constellationColumns"
            @change="handleGender">
        </wd-select-picker>
        <wd-select-picker
            label="标签"
            prop="tagList"
            type="checkbox"
            :max="3"
            v-model="user.tagList"
            :columns="tagList"
            placeholder="请选择个性标签"
        />
        <wd-textarea label="简介"
                     clearable
                     v-model="user.userProfile"
                     placeholder="请输入简介"
                     show-word-limit
                     :maxlength="100"/>
      </view>
    </view>

    <wd-button custom-class="btn" block type="primary" @click="updateUserInfo">保存</wd-button>
    <wd-gap height="60rpx"></wd-gap>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";
import {clearUserInfo, getUserInfo, setUserInfo} from "@/utils/userStorage";
import {updateWxUser} from "@/api/userApi";
import { useToast } from '@/uni_modules/wot-design-uni'
import {deleteFile} from "@/api/uploadApi";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const toast = useToast()

const user = ref<{
  id?: string;
  imageUrl?: string;
  userName?: string;
  userProfile?: string;
  gender?: number;
  constellation?: string;
  tagList: string[];
}>({
  tagList: [] // 初始化空标签列表
})

const oldImage = ref("")


const genderColumns = ref<Record<string, any>>([
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  },
  {
    value: 2,
    label: '保密'
  }
])

const constellationColumns = ref<Record<string, any>>([
  {
    value: '熬夜冠军座',
    label: '熬夜冠军座'
  },
  {
    value: '秃然焦虑座',
    label: '秃然焦虑座'
  },
  {
    value: '奶茶续命座',
    label: '奶茶续命座'
  },
  {
    value: '地铁迷路座',
    label: '地铁迷路座'
  },
  {
    value: '社畜进化座',
    label: '社畜进化座'
  },
  {
    value: '通宵赶工座',
    label: '通宵赶工座'
  },
  {
    value: '表情包王座',
    label: '表情包王座'
  },
  {
    value: '社恐晚期座',
    label: '社恐晚期座'
  },
  {
    value: '香菜毁灭座',
    label: '香菜毁灭座'
  },
  {
    value: '锦鲤附体座',
    label: '锦鲤附体座'
  },
  {
    value: '电量焦虑座',
    label: '电量焦虑座'
  }
])

const tagList = ref([
  {
    value: '运动达人',
    label: '运动达人'
  },
  {
    value: '学习狂魔',
    label: '学习狂魔'
  },
  {
    value: '社交达人',
    label: '社交达人'
  },
  {
    value: '文艺青年',
    label: '文艺青年'
  },
  {
    value: '技术宅',
    label: '技术宅'
  },
  {
    value: '美食家',
    label: '美食家'
  },
  {
    value: '旅行者',
    label: '旅行者'
  },
  {
    value: '音乐控',
    label: '音乐控'
  },
  {
    value: '电影迷',
    label: '电影迷'
  },
  {
    value: '摄影师',
    label: '摄影师'
  },
  {
    value: '创意咖',
    label: '创意咖'
  },
  {
    value: '志愿者',
    label: '志愿者'
  }
])

onLoad(() => {
  user.value = getUserInfo();
  console.log(user.value)
})

const handleClickLeft = () => {
  uni.navigateBack()
}

// 选择性别
const handleGender = (e: any) => {
  user.value.constellation = e.value
  console.log(user.value)
  console.log(e)
}

// 切换标签选择状态
const toggleTag = (tag: string) => {
  if (!user.value.tagList) {
    user.value.tagList = []
  }
  const index = user.value.tagList.indexOf(tag)
  if (index === -1) {
    if (user.value.tagList.length >= 3) {
      toast.show('最多只能选择3个标签')
      return
    }
    user.value.tagList.push(tag)
  } else {
    user.value.tagList.splice(index, 1)
  }
}

// 保存按钮
const updateUserInfo = async () => {
  console.log(user.value)
  //构造请求数据
  const updateData = {
    id: user.value.id,
    imageUrl: user.value.imageUrl,
    userName: user.value.userName,
    userProfile: user.value.userProfile,
    gender: user.value.gender,
    constellation: user.value.constellation,
    tagList: user.value.tagList
  }

  // 删除旧图片
  if (oldImage.value){
    const fileRes = await deleteFile(oldImage.value)
    if (fileRes.code === 200) {
      console.log("删除旧图片成功")
    } else {
      console.log("删除旧图片失败")
    }
  }
  //调用更新请求
  const res = await updateWxUser(updateData)
  if (res.code === 200) {
    toast.show('更新成功')
    user.value = {
      ...res.data,
      ...user.value
    }
    // 清空缓存
    clearUserInfo()
    console.log("user-value:",user.value)
    // 更新缓存
    setUserInfo(user.value)
    console.log("getuserinfo",getUserInfo());
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  }else{
    toast.show(res.message)
  }
}

// 修改头像选择函数
const chooseAvatar = (e) => {
  console.log('选择头像:', e)
  const avatarUrl = e.detail?.avatarUrl || e.avatarUrl
  if (!avatarUrl) {
    toast.error('获取头像失败')
    return
  }

  uni.showLoading({
    title: '上传中...'
  })

  uni.uploadFile({
    url: 'https://campus.fybreeze.cn/api/article/uploadImages',
    filePath: avatarUrl,
    name: 'file',
    formData: {
      'user': 'test'
    },
    success(res) {
      try {
        const data = JSON.parse(res.data)
        if (data.code === 200 && data.data?.[0]) {
          oldImage.value = user.value?.imageUrl || ''
          user.value.imageUrl = data.data[0]
          toast.show('上传成功')
        } else {
          toast.error('上传失败：' + (data.message || '未知错误'))
        }
      } catch (error) {
        console.error('解析响应失败:', error)
        toast.error('上传失败：数据格式错误')
      }
    },
    fail(err) {
      console.error('上传失败:', err)
      toast.error('上传失败：' + (err.errMsg || '网络错误'))
    },
    complete() {
      uni.hideLoading()
    }
  })
}

const handleChangeName = (e) => {
  console.log(e)

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

.updateUserInfo {
  background-image: linear-gradient(to bottom,
      #acc4f9 0%,
      #eeeffe 30%,
      #eef1f9 80%,
      #f9f2f0 100%
  );
  //background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  min-height: 100vh;
  //padding: 100rpx 0;


  :deep(.navbar){
    background:none;
  }

  .container {
    width: 620rpx;
    padding: 40rpx 20rpx ;
    border-radius: 10px;
    margin: 100rpx auto 100rpx auto;
    background-color: #fff;

    .avatar-wrapper {
      width: 100%;
      padding: 40rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      :deep(.userAvatar) {
        width: 160rpx !important;
        height: 160rpx !important;
        padding: 0;
        margin: 0;
        position: relative;
        border-radius: 50%;
        overflow: visible;
        background: none;
        
        &::after {
          content: '';
          position: absolute;
          top: -6rpx;
          left: -6rpx;
          right: -6rpx;
          bottom: -6rpx;
          border-radius: 50%;
          background: linear-gradient(135deg, #acc4f9 0%, #8498f0 100%);
          opacity: 0.1;
          z-index: 1;
        }

        &:active {
          transform: scale(0.95);
        }
      }

      .avatar-container {
        width: 160rpx;
        height: 160rpx;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
        
        :deep(.wd-img) {
          width: 160rpx !important;
          height: 160rpx !important;
          display: block;
        }
      }

      .avatar-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f8f9ff;
        
        .placeholder-text {
          font-size: 24rpx;
          color: #8498f0;
          margin-top: 12rpx;
        }
      }

      .avatar-edit-hint {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50rpx;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s ease;
        opacity: 0;
      }

      &:active .avatar-edit-hint {
        opacity: 1;
      }
    }

    .info {
      margin-top:20px;
      :deep(.wd-textarea__inner) {
        padding: 2px;
      }

      :deep(.data-v-f1c5bbe2){
        width: 180rpx;
      }
      :deep(.wd-input__value){
        width: 320rpx;
      }

    }


  }

  :deep(.btn) {
    width: 520rpx;
    margin: 0 auto;
  }
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 20rpx 0;
}

.tag-item {
  margin: 0;
  border-radius: 20rpx;
  font-size: 24rpx;
  padding: 4rpx 20rpx;
  background-color: #f8f8f8;
  
  &:deep(.wd-tag--primary) {
    background-color: #eef1f9;
    color: #8498f0;
    border-color: #8498f0;
  }
  
  &:deep(.wd-tag--default) {
    background-color: #f8f8f8;
    color: #666;
    border-color: #ddd;
  }
}

.tag-cell {
  :deep(.wd-cell__title) {
    font-size: 28rpx;
    color: #333;
  }
}

</style>
