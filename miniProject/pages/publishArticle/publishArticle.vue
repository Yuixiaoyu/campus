<template>
  <view class="publish-article">
    <!-- 顶部导航栏 -->
    <wd-navbar title="写说说" leftText="取消" fixed placeholder safeAreaInsetTop @click-left="onClickLeft">
    </wd-navbar>
    <!-- 主体内容区域 -->
    <view class="content">
      <view class="upload-section">
        <!-- 文本输入区域 -->
        <wd-textarea
            v-model="publishArticleParams.content"
            :maxlength="2000"
            show-word-limit
            placeholderStyle="font-size:18px;"
            show-count
            clearable
            placeholder="分享新鲜事~"
            size="large"
            :rows="5"
        />
        <!-- 图片上传区域 -->
        <wd-upload
            v-model:file-list="fileList"
            ref="uploadFile"
            :limit="9"
            multiple
            accept="image"
            action="http://localhost:8090/api/article/uploadImages"
            @change="handleChange"
            :before-remove="beforeImageRemove"
            @success="uploadSuccess"
        >
        </wd-upload>

        <view class="tags" v-if="publishArticleParams.tags.length!=0">
          <wd-tag closable round type="primary" v-for="(item,index) in publishArticleParams.tags" @close="handleSelectedClose(index)">
            {{ item }}
          </wd-tag>
        </view>

        <view class="lable">
          &nbsp;&nbsp;
          <wd-tag round bg-color="#eee">@ 好友</wd-tag>
          &nbsp;
          <wd-tag custom-class="space" round use-icon-slot bg-color="#eee" @click="showAction">
            <text>添加标签</text>
            <template #icon>
              <wd-icon name="discount"></wd-icon>
            </template>
          </wd-tag>
          &nbsp;
          <wd-tag custom-class="space" round use-icon-slot bg-color="#eee">
            <text>添加地点</text>
            <template #icon>
              <wd-icon name="location"></wd-icon>
            </template>
          </wd-tag>
        </view>
        <view>
        </view>
      </view>

      <!-- 位置和可见范围设置 -->
      <view class="settings">
        <wd-cell-group>
          <wd-cell title="谁可以看" is-link icon="view" value="所有人可见" @click="setVisibility"/>
          <wd-cell title="定时" is-link icon="clock" @click="setTime"/>
          <wd-cell title="匿名" center icon="note">
            <view class="custom-value" style="height: 32px;">
              <wd-switch v-model="isAnonymity" @change="handleAnonymityChange"/>
            </view>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
    <wd-gap height="60px"></wd-gap>

    <!-- 底部发布按钮 -->
    <view class="footer">
      <wd-button block type="primary" @click="publishArticle">
        发布笔记
      </wd-button>
    </view>

    <!-- 动作面板 -->
    <wd-action-sheet v-model="showActionSheet" :actions="actions" @select="selectAction" @close="!showActionSheet"
                     cancel-text="取消"/>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {addArticle, AddArticleParams, getArticleTags} from "@/api/articleApi";
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()
// 数据定义
const fileList = ref([])
// 是否匿名
const isAnonymity = ref(false)
// 动作面板
const showActionSheet = ref(false)
//发布文章对象
const publishArticleParams = ref<AddArticleParams>({
  content:'',
  tags:[],
  images:[],
})

// 动作面板数据
const actions = ref([])

// 方法定义
const onClickLeft = () => {
  uni.navigateBack()
}


const getTags = () => {
  getArticleTags().then((res: any) => {
    actions.value = res.data.map(item => ({name: item}))
    console.log(actions.value)
  });
}

// 删除已选的tag
const handleSelectedClose = (index) => {
  publishArticleParams.value.tags.splice(index,1)
}

// 点击添加标签按钮
const showAction = () => {
  getTags()
  showActionSheet.value = !showActionSheet.value
}

const selectAction = (item) => {
  console.log(publishArticleParams.value.tags)
  publishArticleParams.value.tags.push(item.item.name)
}

// 匿名按钮
const handleAnonymityChange = () => {
  isAnonymity.value = !isAnonymity.value
}

// 上传图片
const uploadSuccess = (res) => {
  console.log('上传成功res', res.file.response)
  const result = JSON.parse(res.file.response)
  console.log('上传成功result.data', result.data)
  // images.value.push(...result.data)
  publishArticleParams.value.images.push(...result.data)
  console.log(publishArticleParams.value)
}
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
  publishArticleParams.value.images.splice(res.index,1)
  console.log("publishArticleParams>>>",publishArticleParams)
})
const setTime = () => {
  // 实现定时发布
}

const setVisibility = () => {
  // 谁可见
}

const publishArticle = async () => {
  // 实现发布逻辑
  console.log("发布文章参数：", publishArticleParams.value)
  const res = await addArticle(publishArticleParams.value)
  console.log("发布文章接口返回结果：", res)
  if (res.code == 200) {
    toast.show('发布成功')
    setTimeout(() => {
      uni.navigateBack()
    }, 2000)
  }else{
    toast.error(res.message)
  }
}
</script>

<style lang="scss" scoped>
:deep(.wd-upload__mask.data-v-d50d9cde) {
  background-color: rgba(0, 0, 0, 0.3);
}

.publish-article {
  min-height: 100vh;
  background-color: #f8f8f8;

  .content {
    padding: 16px;

    .upload-section {
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;

      :deep(.wd-upload__preview) {
        width: 100px;
        height: 100px;
      }

      :deep(.data-v-d50d9cde.wd-upload__evoke) {
        height: 100px;
        width: 100px;
        margin-left: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
      }

      :deep(.wd-upload) {
        padding: 10px;
      }

      :deep(.data-v-d50d9cde .wd-upload__preview) {
        margin: 5px 6px;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        //justify-content: center;
        padding: 8px 10px;

        :deep(.wd-tag) {
          margin: 6px 5px;
        }
      }

      .lable {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }

    .input-area {
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 8px;

      padding: 12px;
    }

    .tags-section {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;

      .tag-item {
        font-size: 12px;
      }
    }

    .settings {
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background-color: #fff;
  }

  :deep(.wd-action-sheet) {
    overflow: hidden;
  }

  :deep(.wd-action-sheet__actions) {
    max-height: 200px;
  }


}


</style>
