<template>
  <view class="updateUserInfo">
    <wd-navbar custom-class="navbar"  :bordered="false" title="修改信息" safeAreaInsetTop left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="container">
      <wd-button custom-class="userAvatar" type="text" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
        <wd-img :width="100" :height="100" round :src="user?.imageUrl"/>
      </wd-button>
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

// 点击获取头像
const chooseAvatar = (e) => {
  console.log(e)
  const avatarUrl = e.avatarUrl
  uni.uploadFile({
    url: 'https://campus.fybreeze.cn/api/article/uploadImages', // 仅为示例，并非真实的接口地址
    filePath: avatarUrl,
    name: 'file',
    formData: {
      'user': 'test'
    },
    success(res) {
      // 将旧的image保存
      oldImage.value = user.value.imageUrl
      // console.log(res)
      const data = JSON.parse(res.data)
      // 上传完成需要更新头像
      user.value.imageUrl = data.data[0]
      toast.show("上传成功")
    },
    fail(err) {
      toast.error("上传失败")
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

    :deep(.userAvatar) {
      width: 100%;
      height: 220rpx;
      z-index: 1 !important;
    }

    :deep(.wd-img) {
      width: 100% !important;
      height: 220rpx !important;
      margin-top: 30rpx;
      z-index: 100 !important;
    }

    :deep(.wd-img__image) {
      width: 100px;
      height: 100px;
      margin: 10rpx auto;
      z-index: 100 !important;
      border-radius: 50%;
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
