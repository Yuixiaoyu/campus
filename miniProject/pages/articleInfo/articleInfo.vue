<template>
  <view class="articleInfo">
    <view class="article-card">
      <view class="article-main">
        <!-- 用户信息区域 -->
        <view class="user-info">
          <view class="avatar-wrapper">
            <wd-img :width="60" :height="60" :src="userInfo?.imageUrl" round/>
            <view class="user-badge" v-if="user?.id==articleInfo?.userId">作者</view>
          </view>
          <view class="user-meta">
            <text class="username">{{ userInfo?.userName }}</text>
            <text class="post-time">{{ dayjs(articleInfo?.createTime).format('MM月DD日 HH:mm') }} 发布</text>
          </view>
        </view>

        <!-- 文章内容区域 -->
        <view class="content-wrapper">
          <rich-text :nodes="formatContent(articleInfo?.content)" class="rich-content"></rich-text>
          
          <!-- 图片展示区域 -->
          <view class="image-list" v-if="articleInfo?.imagesList?.length"
                :class="[getImageLayoutClass(articleInfo?.imagesList.length)]">
            <view
                v-for="(url, index) in articleInfo?.imagesList"
                :key="index"
                class="image-wrapper"
                @tap.stop="previewImage(url,articleInfo.imagesList)"
            >
              <wd-img
                  width="100%"
                  height="100%"
                  mode="aspectFill"
                  :show-menu-by-longpress="true"
                  radius="12px"
                  :src="url"
              />
              <view class="image-overlay">
                <view class="image-count" v-if="index === 0 && articleInfo.imagesList.length > 1">
                  <wd-icon name="picture" size="14px" color="#fff"/>
                  <text>{{ articleInfo.imagesList.length }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部操作栏 -->
        <view class="article-footer" v-if="user?.id==articleInfo?.userId">
          <view class="footer-left">

          </view>
          <view class="footer-right" v-if="user?.id==articleInfo?.userId">
            <view class="delete-btn" @click="handleDeleteArticle">
              <wd-icon name="delete" size="16px" color="#FF5252"/>
              <text>删除</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 评论区域 -->
    <view class="comments-section">
      <view class="section-header">
        <text class="title">评论 {{ articleInfo?.commentCount || 0 }}</text>
        <wd-divider></wd-divider>
      </view>

      <view class="comments-list" v-if="commentList?.length">
        <view class="comment-item" v-for="item in commentList" :key="item.id">
          <view class="comment-header">
            <wd-img :width="50" :height="50" :src="item.userVO.imageUrl" round/>
            <view class="comment-meta">
              <text class="username">{{ item.userVO?.userName }}</text>
              <text class="time">{{ item.createTime }}</text>
            </view>
          </view>
          
          <view class="comment-content" @click="handleComment(item)">
            <text class="content-text">{{ item.content }}</text>
          </view>

          <view class="replies" v-if="item.replies?.length">
            <view class="reply-item" v-for="sub in item.replies" :key="sub.id">
              <view class="reply-header">
                <text class="username">{{ sub.userVO?.userName }}</text>
                <text class="reply-to">回复</text>
                <text class="target-user">{{ sub.parentUserVO?.userName }}</text>
              </view>
              <view class="reply-content" @click="handleComment(sub)">
                <text>{{sub.content}}</text>
              </view>
              <text class="time">{{ sub.createTime }}</text>
            </view>
          </view>
        </view>
      </view>
      <wd-status-tip v-else image="content" tip="暂无评论"/>
    </view>

    <wd-gap safe-area-bottom height="120"></wd-gap>

    <view class="comment-bar">
      <view class="comment-input-wrapper">
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
        >发送</wd-button>
      </view>
    </view>
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

onLoad((options: any) => {
  console.log("接收到的数据：", options?.articleId)
  articleId.value = options?.articleId
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

// 格式化文章内容，处理换行等
const formatContent = (content: string) => {
  if (!content) return '';
  return content.split('\n').map(text => `<div class="content-paragraph">${text}</div>`).join('');
}

</script>


<style scoped lang="scss">
.articleInfo {
  position: relative;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 30rpx 30rpx 120rpx;

  .article-card {
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;

    .article-main {
      padding: 30rpx;

      .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        position: relative;

        .avatar-wrapper {
          position: relative;
          margin-right: 16rpx;
          flex-shrink: 0;

          .user-badge {
            position: absolute;
            bottom: -4rpx;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #3B7FFF, #6AA1FF);
            color: #fff;
            font-size: 18rpx;
            padding: 2rpx 10rpx;
            border-radius: 10rpx;
            white-space: nowrap;
          }
        }

        .user-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6rpx;

          .username {
            font-size: 30rpx;
            font-weight: 600;
            color: #333;
          }

          .post-time {
            font-size: 24rpx;
            color: #999;
          }
        }
      }

      .content-wrapper {
        .rich-content {
          .content-paragraph {
            font-size: 30rpx;
            line-height: 1.8;
            color: #333;
            margin-bottom: 24rpx;
            text-align: justify;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .image-list {
          margin-top: 24rpx;
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;

          &.three-columns {
            .image-wrapper {
              width: calc((100% - 24rpx) / 3);
              aspect-ratio: 1;
            }
          }

          &.two-columns {
            .image-wrapper {
              width: calc((100% - 12rpx) / 2);
              aspect-ratio: 1;
            }
          }

          &.one-column {
            .image-wrapper {
              width: 100%;
              max-height: 800rpx;
              aspect-ratio: 16/9;
            }
          }

          .image-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 12rpx;
            background: #f5f5f5;
            transition: transform 0.2s;

            &:active {
              transform: scale(0.98);
            }

            .image-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
              pointer-events: none;

              .image-count {
                position: absolute;
                top: 12rpx;
                right: 12rpx;
                background: rgba(0,0,0,0.5);
                border-radius: 20rpx;
                padding: 6rpx 12rpx;
                display: flex;
                align-items: center;
                gap: 4rpx;

                text {
                  color: #fff;
                  font-size: 22rpx;
                }
              }
            }
          }
        }
      }

      .article-footer {
        margin-top: 30rpx;
        padding-top: 20rpx;
        border-top: 2rpx solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .footer-left {
          display: flex;
          gap: 30rpx;

          .comment-count {
            display: flex;
            align-items: center;
            gap: 6rpx;
            
            text {
              font-size: 26rpx;
              color: #666;
            }
          }
        }

        .footer-right {
          .delete-btn {
            display: flex;
            align-items: center;
            gap: 6rpx;
            padding: 12rpx 20rpx;
            background: #FFF0F0;
            border-radius: 30rpx;
            transition: all 0.3s ease;

            text {
              font-size: 24rpx;
              color: #FF5252;
            }

            &:active {
              transform: scale(0.95);
              opacity: 0.9;
            }
          }
        }
      }
    }
  }

  .comments-section {
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    padding: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .section-header {
      margin-bottom: 30rpx;

      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 20rpx;
        display: block;
      }
    }

    .comments-list {
      .comment-item {
        padding: 30rpx 0;
        border-bottom: 2rpx solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        .comment-header {
          display: flex;
          align-items: center;
          gap: 16rpx;
          margin-bottom: 20rpx;

          .comment-meta {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4rpx;

            .username {
              font-size: 28rpx;
              font-weight: 500;
              color: #333;
            }

            .time {
              font-size: 24rpx;
              color: #999;
            }
          }
        }

        .comment-content {
          padding: 0 66rpx;
          margin-bottom: 20rpx;

          .content-text {
            font-size: 28rpx;
            color: #666;
            line-height: 1.5;
          }
        }

        .replies {
          margin-left: 66rpx;
          padding: 20rpx;
          background: #f8f9fa;
          border-radius: 12rpx;

          .reply-item {
            padding: 16rpx 0;
            
            &:not(:last-child) {
              border-bottom: 2rpx solid #eee;
            }

            .reply-header {
              margin-bottom: 10rpx;
              font-size: 26rpx;

              .username {
                color: #638fb3;
                font-weight: 500;
              }

              .reply-to {
                color: #999;
                margin: 0 8rpx;
              }

              .target-user {
                color: #638fb3;
              }
            }

            .reply-content {
              font-size: 26rpx;
              color: #666;
              margin: 10rpx 0;
              line-height: 1.5;
            }

            .time {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
      }
    }
  }

  .comment-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 20rpx 30rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.1);
    z-index: 100;

    .comment-input-wrapper {
      display: flex;
      align-items: center;
      gap: 20rpx;
      background: #f5f5f5;
      border-radius: 36rpx;
      padding: 10rpx 20rpx;

      :deep(.wd-input) {
        flex: 1;
        background: transparent;

        .wd-input__inner {
          background: transparent;
          height: 72rpx;
          font-size: 28rpx;
        }
      }

      .submit-btn {
        min-width: 120rpx;
        height: 72rpx;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
