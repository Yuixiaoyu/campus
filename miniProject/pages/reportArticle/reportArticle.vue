<template>
  <view>
    <wd-notice-bar text="请如实填写举报信息及相关材料。经管理员审核后，将给予答复。若发现用户恶意举报，将封禁该用户的举报功能。"
                   prefix="wifi-error"
                   type="danger" />
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
            label="用户ID"
            label-width="100px"
            prop="userId"
            disabled
            v-model="model.userId"
        />
        <wd-input
            label="文章ID"
            label-width="100px"
            prop="articleId"
            disabled
            v-model="model.articleId"
        />
        <wd-textarea
            label-width="100px"
            v-model="model.reason"
            placeholder="请输入原因..."
            label="原因"
            required
            :maxlength="240"
            clearable
            show-word-limit
        >
        </wd-textarea>
        <wd-cell title="证明材料" title-width="100px" required>
          <wd-upload
              v-model:file-list="imageList"
              accept="image"
              image-mode="aspectFill"
              action="http://localhost:8090/api/article/uploadImages"
              @change="handleUploadImage">
          </wd-upload>
        </wd-cell>
      </wd-cell-group>

      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>
    <wd-toast/>
  </view>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useToast} from "@/uni_modules/wot-design-uni";
import {onLoad} from "@dcloudio/uni-app";
import {getUserInfo} from "@/utils/userStorage";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const {success: showSuccess} = useToast()

const model = reactive<{
  userId: string
  articleId: string
  reason: string
  images: []
}>({
  userId: "",
  articleId: "",
  reason: "",
  images: []
})

const form = ref()

function handleSubmit() {
  form.value
      .validate()
      .then(({valid, errors}) => {
        if (valid) {
          showSuccess({
            msg: '校验通过'
          })
        }
      })
      .catch((error) => {
        console.log(error, 'error')
      })
}

onLoad((options) => {
  console.log("接收到的数据：", options)
  model.articleId = options.articleId
  console.log("model.articleId：", model.articleId)
  const user = getUserInfo()
  model.userId = user?.id
})

const imageList = ref([])
//上传图片列表
const handleUploadImage = ((file) => {
  console.log("files:", file)
  imageList.value = file;
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


<style scoped lang="scss">
.footer {
  padding: 12px;
}
</style>
