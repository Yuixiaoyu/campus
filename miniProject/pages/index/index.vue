<template>
  <view class="index">
    <view class="pop">
      <wd-skeleton theme="image" animation="flashed" :loading="banner">
        <!-- 顶部banner -->
        <image class="banner" src="https://pic1.imgdb.cn/item/67d576ab88c538a9b5becd09.webp" @load="successLoadBanner"/>
      </wd-skeleton>
      <!--小鳄鱼-->
      <image class="flag" src="https://pic1.imgdb.cn/item/67d56ea388c538a9b5becba1.webp"/>
      <!--  消息通知  -->
      <view class="message">
        <wd-notice-bar
            text="声明公告：平台内禁止发布任何有关政治立场、色情、暴力等一系列非法言论，如有发现将封禁处理，所有用户均可发布内容，谁发布谁负责"
            prefix="check-outline"
            type="info"
            custom-class="space"/>
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
          <text class="profile">校园新鲜事</text>
          <image
              src="https://minio.fybreeze.cn/campus/I95haQscB2NT23e3f16a8b2920b53c25b9c0239505ef.webp"
              mode="widthFix"
              style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
          ></image>
        </view>

      <!--社团圈模块-->
      <view class="module-club" @click="onClub">
        <text class="title">社团互动</text>
        <text class="profile">兴趣星球</text>
        <image
            src="https://minio.fybreeze.cn/campus/OGVQu3sOFwbI446145dbc890ce7a5bed0c8be31c3049.webp"
            mode="widthFix"
            style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
        ></image>
      </view>

      <!--学习圈模块-->
      <view class="module-study" @click="onStudy">
        <text class="title">学习交流</text>
        <text class="profile">逆袭指南</text>
        <image
            src="https://minio.fybreeze.cn/campus/MdMaffVPSoFB1c3c5da5e5e7d9eafc38429679076bea.webp"
            mode="widthFix"
            style="width: 100%; height: 100%;filter: drop-shadow(1px 5px 5px rgba(0,0,0,0.3))"
        ></image>
      </view>

      <!--失物招领-->
      <view class="module-lost_found" @click="lostFound">
        <text class="title">失物招领</text>
        <text class="profile">寻物速配站</text>
        <image
            src="https://minio.fybreeze.cn/campus/UvxiqTrRI3RPc609effd90e9de05ab01adc12e909a3c.webp"
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
        <view class="article-header" @click="handleToDetail(item.userVO.id)">
          <wd-img :src="item.userVO.imageUrl" :width="45" :height="45" round mode="scaleToFill"/>
          <view class="article-info">
            <text class="article-author">{{ item.userVO.userName }}</text>
            <text class="article-date">发布时间: {{ item.createTime }}</text>
          </view>
        </view>
        <view class="article-content" @click="handleArticleInfo(item.id)">
          <wd-text :text="item.content" color="#565756"  size="14px"  :lines="4"  />
          <!--{{ item.content }}-->
        </view>
        <view class="image-list" @click="handleArticleInfo(item.id)" v-if="item.imagesList!=null"
              :class="[getImageLayoutClass(item.imagesList.length)]">
          <view
              v-for="(url, index) in item.imagesList.slice(0, 9)"
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
                @tap.stop="previewImage(url,item.imagesList)"
            >
              <template #loading>
                <view class="loading-wrap">
                  <wd-loading/>
                </view>
              </template>
              <template #error>
                <view class="error-wrap">加载失败</view>
              </template>
            </wd-img>
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
            <view class="footer-item" @click="handleLikeItem(item.id,index)">
              <!--<wd-icon name="thumb-up" size="16px"/>-->
              <i class="t-icon t-icon-like-selected" style="font-size: 16px;" v-if="item.isLike"></i>
              <i class="t-icon t-icon-like" style="font-size: 16px;" v-else></i>
              <text>{{ item.likeCount }}</text>
            </view>
            <view class="footer-item" @click="handleArticleInfo(item.id)">
              <wd-icon name="chat" size="16px"/>
              <text>{{ item.commentCount }}</text>
            </view>
          </view>
          <view @click="closeOutside">
            <wd-popover mode="menu" :content="menu" @menuclick="link(item.id)">
              <wd-icon name="more" size="16px"/>
            </wd-popover>
          </view>
        </view>
      </view>
      <wd-status-tip image="content" tip="暂无内容" v-if="articleList.length==0"/>
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

    <!--  悬浮按钮  -->
    <wd-fab @click="handlePublishArticle" :expandable="false" inactiveIcon="edit-outline"
            :position="`right-bottom`"></wd-fab>

    <!--  轻提示  -->
    <wd-toast/>

    <wd-message-box/>

  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {getUserInfo} from "@/utils/userStorage";
import {useMessage, useQueue, useToast} from '@/uni_modules/wot-design-uni'
import {onLoad, onPullDownRefresh, onReachBottom, onShareAppMessage, onShareTimeline, onShow} from '@dcloudio/uni-app'
import {getArticleList, likeArticle} from "@/api/articleApi";

const message = useMessage()

const {closeOutside} = useQueue()

const banner = ref(true)

const toast = useToast()
// 搜索相关
const searchValue = ref('')

const onSearch = (value: string) => {
  console.log('搜索:', value)
}
// banner加载出来之后
const successLoadBanner = () => {
  banner.value = false;
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
  // toast.show("敬请期待")
  console.log('点击社团圈模块')
  uni.navigateTo({
    url: '/pages/club/club'
  })
}
const onStudy = () => {
  // toast.show("敬请期待")
  uni.navigateTo({
    url: '/pages/study/study'
  })
  console.log('点击学习圈模块')
}
const lostFound = () => {
  uni.navigateTo({
    url: "/pages/lostFound/lostFound"
  })
  console.log('点击失物招领模块')
}

// 文章列表数据
const articleList = ref([])

// 分页参数
const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
  hasMore: true,
  // 新增刷新锁防止重复请求
  isRefreshing: false
})

// 加载状态
const loadStatus = ref('loading')

// 添加在文件顶部其他变量声明处
const needRefresh = ref(false)

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


onReachBottom(() => {
  console.log("到底部了")

  console.log(articleList.value)
  fetchArticles()
})


// 下拉刷新
onPullDownRefresh(() => {
  if (!pagination.isRefreshing) {
    fetchArticles(true).then(() => {
      toast.show("加载成功")
    }).finally(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 500)
    })
  }
})
// 优化后的数据加载方法
const fetchArticles = async (isRefresh = false) => {
  if (pagination.isRefreshing) return
  pagination.isRefreshing = true

  try {
    // 刷新时重置状态
    if (isRefresh) {
      pagination.current = 1
      pagination.hasMore = true
      articleList.value = []
      uni.showNavigationBarLoading() // 显示顶部加载动画
    }

    // 无更多数据时中断
    if (!pagination.hasMore) {
      loadStatus.value = 'finished'
      return
    }

    const res = await getArticleList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      // 数据拼接逻辑
      articleList.value = isRefresh
          ? res.data.records
          : [...articleList.value, ...res.data.records]
      // 分页状态更新
      pagination.total = res.data.total
      pagination.hasMore = pagination.current * pagination.pageSize < res.data.total
      pagination.current += 1

      // 加载状态管理
      loadStatus.value = pagination.hasMore ? 'loading' : 'finished'
    }
  } catch (err) {
    console.error('加载失败:', err)
    loadStatus.value = 'error'
  } finally {
    pagination.isRefreshing = false
    uni.hideNavigationBarLoading()
    uni.stopPullDownRefresh()
  }
}

// 重试加载
const retryLoad = () => {
  console.log("加载......")
  loadStatus.value = 'loading'
  fetchArticles()
}


// 点击文章跳转到详情页
const handleArticleInfo = (id) => {
  uni.navigateTo({
    url: `/pages/articleInfo/articleInfo?articleId=${id}`
  })
}

// 点击发布文章
const handlePublishArticle = () => {
  const user = getUserInfo()
  console.log(user)

  if (!user) {
    toast.show({
      iconClass: 'info-circle',
      position: 'middle',
      msg: '请先登录',
    })
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }, 1000)
  } else {
    uni.navigateTo({
      url: '/pages/publishArticle/publishArticle'
    })
  }
}

// 监听页面显示
onShow(() => {
  // 检查是否需要刷新
  if (needRefresh.value) {
    console.log('需要刷新页面')
    // 输出当前页面栈信息
    const pages = getCurrentPages()
    console.log('当前页面栈:', pages.map(p => p.route))
    
    // 重置分页参数
    pagination.current = 1
    pagination.hasMore = true
    articleList.value = []
    // 重新获取数据
    fetchArticles(true)
    // 重置刷新标记
    needRefresh.value = false
  }
})

// 首次加载数据
onLoad(() => {
  fetchArticles()
})

// 预览图片
const previewImage = (url, urlList) => {
  uni.previewImage({
    current: url, // 当前显示图片的http链接
    urls: urlList // 需要预览的图片http链接列表
  })
}

// 点赞
const handleLikeItem = async (id, index) => {
  console.log(id, index)
  const res = await likeArticle(id)
  if (res.code == 200) {
    if (articleList.value[index].isLike) {
      articleList.value[index].likeCount -= 1
      articleList.value[index].isLike = false
    } else {
      articleList.value[index].likeCount += 1
      articleList.value[index].isLike = true
    }
  } else {
    toast.show(res.message)
  }
}

const menu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'warning',
    content: '举报'
  }
])

function link(id) {
  //todo 举报
  console.log(id)
  toast.show("敬请期待")
  // uni.navigateTo({
  //   url: `/pages/reportArticle/reportArticle?articleId=${id}` //跳转到举报页面
  // })
}

const handleToDetail = (id) => {
  console.log("id", id)
  uni.navigateTo({
    url: `/pages/userDetail/userDetail?userId=${id}`
  })
}

// 首次加载数据
onLoad(() => {
  fetchArticles()
})

const showMessageAlert = () => {
  message.alert({
    msg: `使用声明通告：\r` +
        `平台内禁止发布任何有关政治立场、色情、暴力等一系列非法言论，如有发现将封禁处理，所有用户均可发布内容，谁发布谁负责\n\n` +
        '“青春共享站”投稿规范>>>\n' +
        '①平台内禁止售卖论文，毕设，公章，假条等\n' +
        '②投稿内容屏蔽联系方式等敏感信息，如有需要请在评论区发布\n' +
        '③防止诈骗提醒，任何涉及金钱交易行为或买卖物品行为一定要面对面线下交易完成\n' +
        '④平台内禁止骚扰他人，发现一律禁言处理\n' +
        '⑤与平台无关的第三方内容需自行分辨\n' +
        '⑥欢迎大家积极举报不良内容营造和谐平台\n\n' +
        '网络不是法外之地，要知敬畏明底线\n' +
        '以上所有规则最终解释权归平台所有\n\n' +
        `本公告生效时间：2025年3月24日`,
    title: '官方通知',
    closeOnClickModal: false,
  })
}

// 添加一个设置刷新标记的方法
const setNeedRefresh = () => {
  needRefresh.value = true
}

// 导出方法供其他页面使用
defineExpose({
  setNeedRefresh
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
.index {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fafaff 80%, #e3f6ff 100%);
  background-attachment: fixed; /* 背景固定 */
  z-index: -1; /* 确保背景在内容后面 */
  padding-bottom: 20px;

  .scroll-view {
    min-height: 100vh;
  }
}

.pop {
  position: relative; /* 父容器设置为相对定位 */
  width: 100%;
  height: 70%;

  :deep(.wd-skeleton__row) {
    width: 100%;
  }

  :deep(.wd-skeleton__col) {
    width: 100% !important;
    height: 520rpx !important;
  }


  .banner {
    width: 100%;
    height: 300px;
    overflow: hidden;
    filter: blur(1px);
  }

  .flag {
    position: absolute;
    bottom: 12px;
    right: 30px;
    width: 140px;
    height: 140px;
    margin-top: 10px;
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
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列等宽 */
  grid-template-rows: 1fr 1fr;
  gap: 20rpx; /* 间距 */
  height: auto;
  font-family: "fangsong";

  /* top-left的div */
  .module-activity, .module-club, .module-study, .module-lost_found {
    height: 240rpx;
    position: relative; /* 相对定位容器 */
    .title {
      position: absolute;
      right: 10px;
      top: 58rpx;
      color: #df9c3d;
      font-weight: bold;
      z-index: 10;
      font-size: 20px;
      letter-spacing: 0.1em;
    }

    .profile {
      position: absolute;
      font-size: 15px;
      right: 15px;
      font-weight: bold;
      color: #cb8e35;
      opacity: 0.5;
      bottom: 80rpx;
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

          :deep(.t-icon-like .t-icon-like-selected) {
            height: 17px !important;
            width: 17px !important;
          }

        }
      }
    }
  }
}
</style>
