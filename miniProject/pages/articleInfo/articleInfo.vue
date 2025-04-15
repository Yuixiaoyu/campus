<template>
  <view class="articleInfo">
    <view class="articleInfo-content">
      <!--    头像展示区   -->
      <wd-img :width="40" :height="40" :src="userInfo?.imageUrl" radius="5"/>
      <view class="articleInfo-content-info">
        <!--  昵称展示区   -->
        <view class="articleInfo-content-info-name">{{ userInfo?.userName }}</view>
        <!--   文章内容展示区     -->
        <wd-text size="16px"
                 color="#5e5e5e"
                 :text="articleInfo?.content"></wd-text>
        <!--    图片列表展示区    -->
        <view class="image-list" v-if="articleInfo?.imagesList!=null"
              :class="[getImageLayoutClass(articleInfo?.imagesList.length)]">
          <view
              v-for="(url, index) in articleInfo?.imagesList"
              :key="index"
              class="image-wrapper"
          >
            <wd-img
                width="100%"
                height="100%"
                mode="aspectFill"
                :show-menu-by-longpress="true"
                radius="5px"
                :src="url"
                @tap.stop="previewImage(url,articleInfo.imagesList)"
            />
          </view>
        </view>
        <!--  日期展示区   -->
        <wd-text size="12px" :text="dayjs(articleInfo?.createTime).format('YYYY年MM月DD日HH:mm')"></wd-text>
        &nbsp;<wd-icon v-if="user?.id==articleInfo?.userId" @click="handleDeleteArticle" name="delete" size="14px" color="#5A6C8F"></wd-icon>
      </view>
    </view>
    <wd-text :text="`评论(`+articleInfo?.commentCount+`)`"></wd-text>
    <wd-divider></wd-divider>
    <!--评论区域-->
    <view class="comment-content" v-for="item in commentList" :key="item.id" v-if="commentList?.length!=0">
      <!--    头像展示区   -->
      <wd-img :width="40" :height="40" :src="item.userVO.imageUrl" round/>
      <view class="comment-content-info">
        <!--  昵称展示区   -->
        <view class="comment-content-info-name">{{ item.userVO?.userName }}</view>
        <wd-text :text="item.createTime" size="12px"/>
        <!--  评论内容展示区 (第一层)  -->
        <view class="comment-content-info-content">
          <view @click="handleComment(item)" style="color: #6a6a6a">{{ item.content }}</view>
          <!--第二层及之后的多层评论-->
          <view class="comment-content-comment" v-for="sub in item.replies" :key="sub.id">
            <view>
              <text style="color: #638fb3;margin-right: 8rpx" :lines="1">{{ sub.userVO?.userName }}</text>
              <wd-text text="回复"></wd-text>
              <text style="color: #638fb3;margin-left: 8rpx" :lines="1">{{ sub.parentUserVO?.userName }}</text>
            </view>
            <view @click="handleComment(sub)" style="font-size: 15px;color: #5e5e5e;width: 100%" >{{sub.content}}</view>
            <wd-text :text="sub.createTime" size="12px"/>
          </view>
        </view>
      </view>
    </view>
    <wd-status-tip image="content" tip="暂无评论" v-else/>
    <wd-gap safe-area-bottom height="60"></wd-gap>
    <view class="comment-bar">
      <view class="comment-bar-input">
        <wd-input
            v-model="commentText"
            :placeholder="text"
            clearable
            no-border
            prefix-icon="edit-1"
            placeholder-style="color: #999;"
            @confirm="submitComment"
        />
        <wd-button
            class="submit-btn"
            type="primary"
            size="small"
            :disabled="!commentText"
            @click="submitComment"
        >发送
        </wd-button>
      </view>
    </view>
    <!--消息提示框-->
    <wd-toast/>
  </view>
</template>

<script setup lang="ts">

import {dayjs, useToast} from "@/uni_modules/wot-design-uni";
import {onLoad} from "@dcloudio/uni-app";
import {ref,nextTick} from "vue";
import {deleteArticle, getArticleByArticleId} from "@/api/articleApi";
import {addComment, getCommentListByArticleId} from "@/api/commentApi";
import {getUserInfo} from "@/utils/userStorage";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const articleId = ref()

const userInfo = ref()

const commentList = ref()

const text = ref("写下你的想法")

const articleInfo = ref()

const toast = useToast()

const commentText = ref()

const parentId = ref(0)

const user=ref()

onLoad((options) => {
  console.log("接收到的数据：", options.articleId)
  articleId.value = options.articleId
  getArticleInfo()
  getCommentList()
  user.value = getUserInfo()

})

const getArticleInfo = async () => {
  console.log("获取文章详情")
  const res = await getArticleByArticleId(articleId.value)
  if (res.code == 200) {
    console.log(res)
    articleInfo.value = res.data
    userInfo.value = articleInfo.value.userVO
  } else {
    toast.show(res.message)
  }
}
// 获取布局类名
const getImageLayoutClass = ((count) => {
  switch (count) {
    case 1:
      return 'one-column'
    case 2:
    case 4:
      return 'two-columns'
    case 3:
      return 'three-columns'
    default:
      return 'three-columns'
  }
})

// 预览图片
const previewImage = (url, urlList) => {
  console.log(urlList)
  uni.previewImage({
    current: url, // 当前显示图片的http链接
    urls: urlList // 需要预览的图片http链接列表
  })
}

const getCommentList = async () => {
  const res = await getCommentListByArticleId(articleId.value)
  if (res.code == 200) {
    console.log(res)
    commentList.value = res.data
  } else {
    toast.show(res.message)
  }
}

const handleComment = (comment) => {
  console.log(comment.userVO.userName)
  text.value = "回复@" + comment.userVO.userName + "："
  console.log(comment)
  parentId.value = comment.id
}

const submitComment = async () => {
  //发布评论
  const data = {
    articleId: articleId.value,
    content: commentText.value,
    userId: user.value.id,
    parentId: parentId.value
  }
  console.log("发布评论", data)
  const res = await addComment(data)
  if (res.code == 200) {
    toast.show("评论成功")
    commentText.value = ""
    parentId.value = 0
    getCommentList()
  }else {
    toast.show(res.message)
  }
}


const handleDeleteArticle = () => {
  uni.showModal({
    title: '提示',
    content: '确定删除该文章吗？',
    success: async function (res) {
      if (res.confirm) {
        const res = await deleteArticle(articleId.value)
        if (res.code == 200) {
          toast.show("删除成功")
          setTimeout(() => {
            // 获取页面实例并设置刷新标记
            const pages = getCurrentPages()
            const indexPage = pages.find(page => page.route === 'pages/index/index')
            if (indexPage) {
              // @ts-ignore
              indexPage.$vm.setNeedRefresh()
            }
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1000)
        } else {
          toast.show(res.message)
        }
      }
    }
  })
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
.articleInfo {
  position: relative;
  padding: 10px 20px;
  min-height: 100vh;

  .articleInfo-content {
    display: flex;

    .articleInfo-content-info {
      flex: 1;
      margin-left: 10px;
      margin-bottom: 10px;

      .articleInfo-content-info-name {
        color: #638fb3;
        font-weight: 500;
        margin-bottom: 10rpx;
        //letter-spacing: 1rpx;
      }

      .image-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;

        /* 默认三列布局 */
        &.three-columns {
          .image-wrapper {
            width: calc((100% - 20rpx) / 3);
          }
        }

        /* 四张时两列布局 */
        &.two-columns {
          .image-wrapper {
            width: calc((100% - 10rpx) / 2);

          }
        }

        &.one-column {
          .image-wrapper {
            //width: 100%;
            width: 500rpx;
            height: 500rpx;
            /* 清除横向间距 */
            margin-right: 0 !important;
            /* 保持纵向间距 */
            &:not(:first-child) {
              margin-top: 10rpx;
            }
          }
        }

        .image-wrapper {
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          border-radius: 12rpx;
        }
      }
    }
  }

  :deep(.wd-divider.data-v-86c73a37) {
    padding: 0 !important;
    color: #e2e2e2;
  }

  .comment-content {
    display: flex;

    .comment-content-info {
      flex: 1;
      margin-left: 10px;
      margin-bottom: 10px;

      .comment-content-info-name {
        color: #638fb3;
        font-weight: 500;
        font-size: 14px;
      }

      .comment-content-info-content {
        font-size: 15px;
        padding-right: 10px;

        .comment-content-comment {
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
  }

  .comment-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    padding: 20rpx 30rpx;
    background: #fff;
    box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.05);
    z-index: 100;

    .comment-bar-input {
      display: flex;
      align-items: center;
      .input-box {
        margin-right: 20rpx;
        :deep(.wot-input__inner) {
          padding: 0 30rpx;
          height: 70rpx;
          line-height: 70rpx;
        }
      }
      :deep(.wd-input){
        flex: 1;
        padding: 0 6px;
      }
      .submit-btn {
        width: 80rpx;
        //:deep(.wot-button) {
        //  border-radius: 40rpx;
        //}
      }
    }
  }
}
</style>
