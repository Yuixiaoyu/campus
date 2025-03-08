<template>
  <view class="index">
    <!-- 滚动容器 -->
<!--    <scroll-view-->
<!--        class="scroll-view"-->
<!--        scroll-y-->
<!--        @scrolltolower="onScrollToLower"-->
<!--        :show-scrollbar="false"-->
<!--    >-->
      <view class="pop">
        <!-- 顶部banner -->
        <image class="banner" src="/static/index/banner.png" mode="widthFix"/>
        <!--小鳄鱼-->
        <image class="flag" src="/static/index/keke.webp"/>
        <!--  消息通知  -->
        <view class="message">
          <wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="check-outline"
                         type="info" custom-class="space"/>
        </view>
      </view>

      <!-- 搜索框 -->
      <view class="search-container">
        <wd-search
            v-model="searchValue"
            placeholder="搜索"
            @search="onSearch"
            hide-cancel
        />
      </view>

      <!-- 模块导航 -->
      <view class="module-container">
        <!--活动模块-->
        <view class="module-activity" @click="onActivity">
          <text class="title">校园活动</text>
          <text class="profile">校园活动新鲜事</text>
          <image
              src="http://192.168.34.100:9000/campus/AucwS4aYizGQ23e3f16a8b2920b53c25b9c0239505ef.webp"
              mode="widthFix"
              style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
          ></image>
        </view>

        <!--社团圈模块-->
        <view class="module-club" @click="onClub">
          <text class="title">社团</text>
          <text class="profile">兴趣星球碰撞</text>
          <image
              src="http://192.168.34.100:9000/campus/NllJmBj2Tpdf446145dbc890ce7a5bed0c8be31c3049.webp"
              mode="widthFix"
              style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
          ></image>
        </view>

        <!--学习圈模块-->
        <view class="module-study" @click="onStudy">
          <text class="title">学习</text>
          <text class="profile">学渣逆袭指南</text>
          <image
              src="http://192.168.34.100:9000/campus/v1JX9jh2AEcN1c3c5da5e5e7d9eafc38429679076bea.webp"
              mode="widthFix"
              style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
          ></image>
        </view>

        <!--失物招领-->
        <view class="module-lost_found" @click="onStudy">
          <text class="title">失物招领</text>
          <text class="profile">寻物速配站</text>
          <image
              src="http://192.168.34.100:9000/campus/UjPN7YbeMFjpc609effd90e9de05ab01adc12e909a3c.webp"
              mode="widthFix"
              style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
          ></image>
        </view>

        <!--二手交易 暂时遗弃 考虑UI设计，后续添加-->
        <!--      <view class="module-second_hand" @click="onStudy">
              </view>-->
      </view>

      <!-- 文章列表 -->
      <view class="article-list">
        <view v-for="(item, index) in articleList" :key="index" class="article-item">
          <view class="article-header">
            <wd-img :src="item.userVO.imageUrl" :width="45" :height="45" round mode="scaleToFill"/>
            <view class="article-info">
              <text class="article-author">{{ item.userVO.userName }}</text>
              <text class="article-date">发布时间: {{ item.createTime.split("T")[0] }}</text>
            </view>
          </view>
          <view class="article-content">
            {{ item.content }}
          </view>
          <view class="image-list" v-if="item.imagesList!=null" :class="[getImageLayoutClass(item.imagesList.length)]">
            <view
                v-for="(url, index) in item.imagesList.slice(0, 9)"
                :key="index"
                class="image-wrapper"
                :style="getImageWrapperStyle(item.imagesList.length, index)"
            >
              <wd-img
                  width="100%"
                  height="100%"
                  mode="aspectFill"
                  radius="5px"
                  enable-preview
                  :src="url"
              />
              <!-- 当为第9张且总数量超过9时显示蒙版 -->
              <view
                  v-if="index === 8 && item.imagesList.length > 9"
                  class="mask"
              >
                <text class="plus-text">+{{ item.imagesList.length - 9 }}</text>
              </view>
            </view>
          </view>
          <view class="article-footer">
            <view class="footer-left">
              <view class="footer-item">
                <wd-icon name="view" size="16px"/>
                <text>{{ item.viewCount }}</text>
              </view>
              <view class="footer-item">
                <wd-icon name="thumb-up" size="16px"/>
                <text>{{ item.likeCount }}</text>
              </view>
              <view class="footer-item">
                <wd-icon name="chat" size="16px"/>
                <text>{{ item.commentCount }}</text>
              </view>
            </view>
            <view @click="closeOutside">
              <wd-popover mode="menu" :content="menu" @menuclick="link(item.id)" >
                <wd-icon name="more" size="16px"/>
              </wd-popover>
            </view>
          </view>
        </view>
      </view>

      <!--  悬浮按钮  -->
      <wd-fab @click="handlePublishArticle" :expandable="false" inactiveIcon="edit-outline"
              :position="`right-bottom`"></wd-fab>

      <!--  轻提示  -->
      <wd-toast/>


<!--    </scroll-view>-->
    <!-- 加载状态 -->
    <wd-loadmore
        custom-class="loadmore"
        v-if="articleList.length > 0"
        :state="loadStatus"
        loading-text="别急在跑了..."
        finished-text="已经没有啦~"
        error-text="与火星断联了~，点击重试"
        @click-error="retryLoad"
    />

  </view>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue'
import {clearUserInfo, getUserInfo, setUserInfo} from "@/utils/userStorage";
import {useToast, useQueue} from '@/uni_modules/wot-design-uni'
import {onLoad, onReachBottom} from '@dcloudio/uni-app'
import {getArticleList} from "@/api/articleApi";

const {closeOutside} = useQueue()

const toast = useToast()
// 搜索相关
const searchValue = ref('')

const onSearch = (value: string) => {
  console.log('搜索:', value)
}
// 模块点击
const onActivity = () => {
  console.log('点击活动模块')
  // 跳转到发布文章页面
  uni.navigateTo({
    url: '/pages/activity/activity'
  })
}
const onClub = () => {
  console.log('点击社团圈模块')
}
const onStudy = () => {
  console.log('点击学习圈模块')
}


// 文章列表数据
const articleList = ref([])

// 分页参数
const pagination = reactive({
  current: 1,
  pageSize: 2,
  total: 0,
  hasMore: true
})

// 加载状态
const loadStatus = ref('loading')

// 获取布局类名
const getImageLayoutClass = ((count) => {
  return count === 4 ? 'two-columns' : 'three-columns'
})
// 获取图片容器样式（处理四张图的最后一行间距）
const getImageWrapperStyle = ((count, index) => {
  if (count === 4 && index === 3) {
    return 'margin-top: 10rpx;'
  }
  return ''
})


onReachBottom(() => {
  console.log("到底部了")
  console.log(articleList.value)
  fetchArticles()
})


onLoad(() => {
  fetchArticles()
})

// 获取文章列表
const fetchArticles = async () => {
  if (!pagination.hasMore) return

  uni.showLoading({
    title: '加载中',
    mask: true
  });
  try {
    loadStatus.value = 'loading'

    const res = await getArticleList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      articleList.value = [...articleList.value, ...res.data.records]
      pagination.total = res.data.total
      console.log("**>", pagination.current * pagination.pageSize)
      console.log("max", res.data.total)
      pagination.hasMore = pagination.current * pagination.pageSize < res.data.total

      // 更新状态
      if (pagination.hasMore) {
        pagination.current++
        loadStatus.value = 'loading'
      } else {
        loadStatus.value = 'finished'
      }
    }
  } catch (err) {
    console.error('加载失败:', err)
    loadStatus.value = 'error'
  } finally {
    uni.hideLoading();
  }
}

// 重试加载
const retryLoad = () => {
  console.log("加载......")
  loadStatus.value = 'loading'
  fetchArticles()
}


// 点击发布文章
const handlePublishArticle = () => {
  // 先校验用户是否登录
  const user = getUserInfo()
  console.log(user)

  if (!user) {
    toast.show({
      iconClass: 'info-circle',
      position: 'middle',
      msg: '请先登录',
    })
    setTimeout(() => {
      // 跳转到登录页面
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }, 1000)
  } else {
    // 跳转到发布文章页面
    uni.navigateTo({
      url: '/pages/publishArticle/publishArticle'
    })
  }
}

// 滚动触底事件
// const onScrollToLower = () => {
//   console.log("触底了",)
//   if (pagination.hasMore) {
//     fetchArticles()
//   }
// }

const menu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'warning',
    content: '举报'
  }
])

function link(id) {
  //todo 举报
  console.log(id)
  uni.navigateTo({
    // url: "/pages/reportArticle/reportArticle?articleId="+id
    url: `/pages/reportArticle/reportArticle?articleId=${id}` //跳转到举报页面
  })
}

</script>

<style lang="scss" scoped>
.index {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fafaff 80%, #e3f6ff 100%);
  background-attachment: fixed; /* 背景固定 */
  z-index: -1; /* 确保背景在内容后面 */
  padding-bottom: 20px;
  .scroll-view{
    min-height: 100vh;
  }
}

.pop {
  position: relative; /* 父容器设置为相对定位 */
  width: 100%;
  height: 70%;

  .banner {
    width: 100%;
    height: 430px;
    filter: blur(0.5px);
  }

  .flag {
    position: absolute;
    //top: 218px;
    bottom: 12px;
    left: 120px;
    width: 140px;
    height: 140px;
    margin-top: 10px;
    z-index: 10;
  }

  .message {
    width: 100%;
    bottom: 0;
    right: 0;
    height: 40px;
    background: #ffffff;
    position: absolute;
    z-index: 5;
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    overflow: hidden;

  }
}


.search-container {

}

.module-container {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列等宽 */
  grid-template-rows: 1fr 1fr;
  gap: 10px; /* 间距 */
  height: 30%;
  font-family: "fangsong";

  /* top-left的div */
  .module-activity, .module-club, .module-study, .module-lost_found {
    height: 130px;
    position: relative; /* 相对定位容器 */
    .title {
      position: absolute;
      right: 10px;
      top: 30px;
      color: #df9c3d;
      //font-family: 等线;
      font-weight: bold;
      z-index: 10;
      font-size: 20px;
      letter-spacing: 0.2em;
    }

    .profile {
      position: absolute;
      font-size: 15px;
      right: 15px;
      font-weight: bold;
      color: #df9c3d;
      opacity: 0.5;
      bottom: 45px;
      z-index: 10;
    }

    image {
      position: absolute;
      bottom: 0; /* 定位到底部 */
      height: auto;
    }
  }

  /* 右边上面的小 div */
  .module-club {
    .title {
      color: #6335b6;
    }

    .profile {
      color: #6d35d4;
    }
  }

  /* 中间右边的小 div */
  .module-study {
    .title {
      color: #74a83c;
    }

    .profile {
      color: #74a83c;
    }
  }

  //底部左边的view
  .module-lost_found {
    .title {
      color: #3365b9;
    }

    .profile {
      color: #3365b9;
    }
  }
}

:deep(.wd-button.is-primary.data-v-aa3a6253) {
  background-image: linear-gradient(to top, #555ae4 0%, #8266f2 100%);
}

.article-list {
  margin-top: 10px;
  padding: 0 16px;

  .article-item {
    margin-bottom: 10px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .article-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .article-info {
        margin-left: 12px;

        .article-author {
          display: block;
          font-size: 14px;
          color: #333;
        }

        .article-date {
          display: block;
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }
      }
    }

    .article-content {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin-bottom: 12px;
    }

    /* 图片列表布局 */
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

          /* 第四张单独处理边距 */
          &:nth-child(4) {
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

        .plus-text {
          color: #fff;
          font-size: 36rpx;
          font-weight: bold;
        }
      }
    }

    .article-footer {
      display: flex;
      margin-top: 10px;
      align-items: center;
      justify-content: space-between;

      .footer-left {
        display: flex;
        gap: 16px;

        .footer-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
