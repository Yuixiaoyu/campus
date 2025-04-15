<template>
  <view class="my-page">
    <!-- 顶部用户信息区域 -->
    <view class="user-info">
      <view class="user-header" @click="handleToInfo">
        <wd-img
            :src="userInfo.imageUrl"
            width="80" height="80" round/>
        <view class="user-data">
          <view class="nickname">{{ userInfo.userName }}</view>
          <view class="edit">
            {{ userInfo?.constellation || `修仙熬夜座~` }}
          </view>
        </view>
      </view>

      <!-- 个人简介 -->
      <view class="user-bio">
        <view class="bio-text">{{ userInfo.userProfile || '这个人很懒，简介都不想写，估计是没有对象吧' }}</view>
        <view class="user-tags">
          <wd-tag
              :type="index==1?'primary':index==2?'warning':'success'"
              round
              v-for="(item,index) in userInfo.tagList"
              :key="index" >
            {{ item }}
          </wd-tag>
        </view>
      </view>

      <!-- 用户统计数据 -->
      <view class="user-stats">
        <view class="stat-item">
          <view class="num">{{ userInfo.follows || 0 }}</view>
          <view class="label">关注</view>
        </view>
        <view class="stat-item">
          <view class="num">{{ userInfo.fans || 0 }}</view>
          <view class="label">粉丝</view>
        </view>
        <view class="stat-item">
          <view class="num">{{ userInfo.likes || 0 }}</view>
          <view class="label">获赞数</view>
        </view>
        <view class="stat-item" @click="handleSet">
          <wd-icon name="view-list" size="20px" color="#adadad"></wd-icon>
          <view class="label">菜单</view>
        </view>
      </view>
    </view>

    <!--   侧边栏  -->
    <wd-popup v-model="isPopupShow" position="left" custom-style="height:100vh;width:70%" @close="handlePopupClose">
      <view class="popup-content">
        <view style="height: 50px"></view>
        <wd-cell-group border>
          <wd-cell title="修改个人信息" title-width="150px" icon="edit-outline" is-link
                   to="/pages/updateUserInfo/updateUserInfo"/>
          <wd-cell title="反馈中心" title-width="150px" icon="cloud-upload" is-link to="/pages/feedback/feedback"/>
          <wd-cell title="联系我们" title-width="150px" icon="call" is-link to="/pages/relation/relation"/>
        </wd-cell-group>
      </view>
    </wd-popup>
    <!--分段器-->
    <wd-segmented :options="list" v-model:value="current"></wd-segmented>
    <!--分段选项（投稿）-->
    <view class="box" v-if="current==='投稿'">
      <view v-for="(item,index) in articleList" :key="index">
        <!-- 圆点 -->
        <view class="point">
          <view class="dot">&nbsp;</view>
          <view class="title">{{ item.createTime.split("T")[0] }}</view>
        </view>
        <!-- 容器二 -->
        <view class="box-line">
          <!-- 容器三 -->
          <view class="box-data">
            <view class="userProfile">
              <image :src="userInfo.imageUrl" mode="aspectFill"
                     class="articleAvatar"></image>
              <view class="userName">{{ userInfo.userName }}</view>
            </view>
            <view class="row-info">{{ item.content }}</view>
            <!-- 三图容器 -->
            <view class="image-list">
              <!-- 循环生成三个图片 -->
              <view
                  v-for="(url, index) in item.imagesList.slice(0, 3)"
                  v-if="item.imagesList.length != 0"
                  :key="index"
                  class="image-wrapper"
                  :class="{ 'last-item': index === 2, 'single-item': item.imagesList.length === 1 }"
              >
                <!-- wot-design 图片组件 -->
                <wd-img
                    width="100%"
                    height="100%"
                    mode="aspectFill"
                    radius="5px"
                    :src="url"
                />

                <!-- 最后一个图片的蒙版 -->
                <view v-if="index === 2 && item.imagesList.length > 3" class="mask">
                  <text class="plus-text">+{{ (item.imagesList.length - 3) }}</text>
                </view>
              </view>
            </view>
            <wd-tag class="tag" v-for="tag in item.tags" :key="tag" type="primary" plain mark>{{ tag }}</wd-tag>

            <view class="row-button">
              <view class="footer-item">
                <wd-icon name="view" size="16px"/>
                <text>{{ item.viewCount }}</text>
              </view>
              <view class="footer-item">
                <wd-icon class-prefix="t-icon" name="like-selected" v-if="item.isLike"/>
                <wd-icon class-prefix="t-icon" name="like" v-else/>
                <text>{{ item.likeCount }}</text>
              </view>
              <view class="footer-item">
                <wd-icon name="chat" size="16px"/>
                <text>{{ item.commentCount }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--分段选项（活动）-->
    <view class="activecard" v-if="current==='活动'">
      <view class="activelist">
        <!--   活动表单行部分 -->
        <view class="row" v-for="(item,index) in activityList" :key="index" @click="handleActivityClick(index)">
          <view class="left">
            <view class="Actimage">
              <image :src="item.coverPicture" mode="aspectFill"></image>
              <view class="status-tag">
                <view class="status-text">{{ getActivityStatus(item?.status) }}</view>
                <view class="status-bg"></view>
              </view>
            </view>
          </view>
          <view class="right">
            <view class="Acttitle">
              {{ item.title }}
            </view>
            <view class="Acttime">
              <wd-icon name="time"></wd-icon>
              <view class="date">
                {{ item.endTime }}
              </view>
            </view>
            <view class="address">
              <wd-icon name="location"></wd-icon>
              {{ item.position }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="current==='收藏'" class="collect-list">
      <view v-if="collectList.length === 0" class="empty-tip">
        暂无收藏内容
      </view>
      <!-- TODO: 添加收藏列表的展示 -->
    </view>

    <view v-if="current==='喜欢'" class="like-list">
      <view v-if="likeList.length === 0" class="empty-tip">
        暂无点赞内容
      </view>
      <!-- TODO: 添加点赞列表的展示 -->
      <view v-for="(item, index) in likeList" :key="index" class="article-item">
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
    </view>

    <!-- 加载状态 -->
    <wd-loadmore
        custom-class="loadmore"
        :state="loadStatus"
        loading-text="别急在跑了..."
        finished-text="已经没有啦~"
        error-text="与火星断联了~，点击重试"
        @click-error="retryLoad"
    />

    <wd-toast/>
	</view>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from 'vue'
import {getArticleList, getArticleVOLikeListByUserId} from "@/api/articleApi";
import {getUserInfo} from "@/utils/userStorage";

import {useToast} from '@/uni_modules/wot-design-uni'
import {onPullDownRefresh, onReachBottom, onShareAppMessage, onShareTimeline, onShow} from '@dcloudio/uni-app'
import {getActivityStatus} from "@/utils/activityEnum";
import {getActivityVOByJoinUserId} from "@/api/activityApi";
// 用户信息
const userInfo = ref({})

const toast = useToast()

const articleList = ref([])

const activityList = ref([])

// 加载状态
const loadStatus = ref('loading')

// 分页参数
const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
  userId: null,
  hasMore: true,
  isRefreshing: false
})

// 活动列表分页参数
const activityPagination = reactive({
  current: 1,
  pageSize: 5,
  hasMore: true,
  isRefreshing: false
})

const list = ref<string[]>(['投稿', '活动', '收藏', '喜欢'])

const current = ref('投稿')

// 添加一个标记，用于判断是否需要刷新数据
const needRefresh = ref(false)

// 添加收藏列表数据和分页参数
const collectList = ref([])
const collectPagination = reactive({
  current: 1,
  pageSize: 5,
  hasMore: true,
  isRefreshing: false
})

// 添加点赞列表数据和分页参数
const likeList = ref([])
const likePagination = reactive({
  current: 1,
  pageSize: 5,
  hasMore: true,
  isRefreshing: false
})
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

//跳转到详情页
const handleArticleInfo = (id) => {
  uni.navigateTo({
    url: `/pages/articleInfo/articleInfo?articleId=${id}`
  })
}

// 重试加载
const retryLoad = () => {
  console.log("加载......")
  loadStatus.value = 'loading'
  fetchArticles()
}

const handleToDetail = (id) => {
  console.log("id", id)
  uni.navigateTo({
    url: `/pages/userDetail/userDetail?userId=${id}`
  })
}

const handleToInfo = () => {
  uni.navigateTo({
    url: '/pages/updateUserInfo/updateUserInfo'
  })
}

// 获取文章列表
const fetchArticles = async (isRefresh = false) => {
  if (pagination.isRefreshing) return
  pagination.isRefreshing = true

  try {
    // 刷新时重置状态
    if (isRefresh) {
      pagination.current = 1
      pagination.hasMore = true
      articleList.value = []
      uni.showNavigationBarLoading()
    }

    // 无更多数据时中断
    if (!pagination.hasMore) {
      loadStatus.value = 'finished'
      return
    }

    const res = await getArticleList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      userId: pagination.userId
    })

    if (res.code === 200) {
      // 数据拼接
      articleList.value = isRefresh
          ? res.data.records
          : [...articleList.value, ...res.data.records]
      
      // 更新分页状态
      pagination.total = res.data.total
      pagination.hasMore = pagination.current * pagination.pageSize < res.data.total
      pagination.current += 1
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

// 获取活动列表
const fetchActivityList = async (isRefresh = false) => {
  if (activityPagination.isRefreshing) return
  activityPagination.isRefreshing = true

  try {
    if (isRefresh) {
      activityPagination.current = 1
      activityPagination.hasMore = true
      activityList.value = []
      uni.showNavigationBarLoading()
    }

    if (!activityPagination.hasMore) {
      loadStatus.value = 'finished'
      return
    }

    const res = await getActivityVOByJoinUserId(userInfo.value.id)
    if (res.code === 200) {
      activityList.value = isRefresh
          ? res.data
          : [...activityList.value, ...res.data]
      
      // 更新分页状态
      activityPagination.hasMore = false // 如果接口不支持分页，设置为false
      loadStatus.value = 'finished'
    } else {
      toast.error(res.message)
    }
  } catch (error) {
    console.error('获取活动列表失败:', error)
    loadStatus.value = 'error'
  } finally {
    activityPagination.isRefreshing = false
    uni.hideNavigationBarLoading()
    uni.stopPullDownRefresh()
  }
}

// 获取收藏列表
const fetchCollectList = async (isRefresh = false) => {
  if (collectPagination.isRefreshing) return
  collectPagination.isRefreshing = true

  try {
    if (isRefresh) {
      collectPagination.current = 1
      collectPagination.hasMore = true
      collectList.value = []
      uni.showNavigationBarLoading()
    }

    if (!collectPagination.hasMore) {
      loadStatus.value = 'finished'
      return
    }

    // 模拟请求
    console.log('获取收藏列表:', {
      current: collectPagination.current,
      pageSize: collectPagination.pageSize,
      userId: userInfo.value?.id
    })

    // TODO: 替换为实际的API调用
    // const res = await getCollectList({
    //   current: collectPagination.current,
    //   pageSize: collectPagination.pageSize,
    //   userId: userInfo.value?.id
    // })

    loadStatus.value = 'finished'
  } catch (error) {
    console.error('获取收藏列表失败:', error)
    loadStatus.value = 'error'
  } finally {
    collectPagination.isRefreshing = false
    uni.hideNavigationBarLoading()
    uni.stopPullDownRefresh()
  }
}

// 获取点赞列表
const fetchLikeList = async (isRefresh = false) => {
  if (likePagination.isRefreshing) return
  likePagination.isRefreshing = true

  try {
    if (isRefresh) {
      likePagination.current = 1
      likePagination.hasMore = true
      likeList.value = []
      uni.showNavigationBarLoading()
    }

    if (!likePagination.hasMore) {
      loadStatus.value = 'finished'
      return
    }

    const res = await getArticleVOLikeListByUserId(userInfo.value?.id)
    console.log(res)
    if (res.code==200){
      likeList.value = res.data
    }else{
      toast.error(res.msg)
    }

    loadStatus.value = 'finished'
  } catch (error) {
    console.error('获取点赞列表失败:', error)
    loadStatus.value = 'error'
  } finally {
    likePagination.isRefreshing = false
    uni.hideNavigationBarLoading()
    uni.stopPullDownRefresh()
  }
}

// 监听页面滚动到底部
onReachBottom(() => {
  if (current.value === '投稿') {
    if (pagination.hasMore && !pagination.isRefreshing) {
      fetchArticles()
    }
  } else if (current.value === '活动') {
    if (activityPagination.hasMore && !activityPagination.isRefreshing) {
      fetchActivityList()
    }
  } else if (current.value === '收藏') {
    if (collectPagination.hasMore && !collectPagination.isRefreshing) {
      fetchCollectList()
    }
  } else if (current.value === '喜欢') {
    if (likePagination.hasMore && !likePagination.isRefreshing) {
      fetchLikeList()
    }
  }
})

// 监听下拉刷新
onPullDownRefresh(() => {
  if (current.value === '投稿') {
    fetchArticles(true)
  } else if (current.value === '活动') {
    fetchActivityList(true)
  } else if (current.value === '收藏') {
    fetchCollectList(true)
  } else if (current.value === '喜欢') {
    fetchLikeList(true)
  }
})

// 切换标签时的处理
watch(() => current.value, (newValue) => {
  // 重置加载状态
  loadStatus.value = 'loading'
  
  if (newValue === '投稿') {
    fetchArticles(true)
  } else if (newValue === '活动') {
    fetchActivityList(true)
  } else if (newValue === '收藏') {
    fetchCollectList(true)
  } else if (newValue === '喜欢') {
    fetchLikeList(true)
  }
})

// 页面显示时的处理
onShow(() => {
  // 获取用户信息
  const user = getUserInfo()
  if (user) {
    userInfo.value = user
    pagination.userId = user.id
  }
  
  // 根据当前选中的tab刷新数据
  if (current.value === '投稿') {
    fetchArticles(true)
  } else if (current.value === '活动') {
    fetchActivityList(true)
  } else if (current.value === '收藏') {
    fetchCollectList(true)
  } else if (current.value === '喜欢') {
    fetchLikeList(true)
  }
})

const isPopupShow = ref(false)

const handlePopupClose = (() => {
  isPopupShow.value = false
})

const handleSet = (() => {
  isPopupShow.value = true
})

const handleActivityClick = ((index) => {
  console.log("点击活动详情");
  const str = JSON.stringify(activityList.value[index])
  uni.navigateTo({
    url: "/pages/activityDetail/activityDetail?activityInfo=" + str
  })
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
.my-page {
  min-height: 100vh;
  background-color: #fff;

  .user-info {

    padding: 100px 20px 10px 20px;
    color: #ffffff;
    background: linear-gradient(to bottom, #8c989e, #3d4753);

    .user-header {
      display: flex;
      align-items: center;

      .user-data {
        margin-left: 20px;

        .nickname {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .edit {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 100;
        }
      }
    }

    .user-stats {
      display: flex;
      justify-content: center;
      margin: 15px 0;
      align-items: center;

      .stat-item {
        flex: 1;
        //text-align: center;
        padding-left: 10px;

        .num {
          font-size: 18px;
          //font-weight: 600;
          margin-bottom: 4px;
        }

        .label {
          font-size: 12px;
          //color: #666;
        }
      }

      .stat-item:last-child {
        flex: 1.5;
        text-align: center;

        :deep(.wd-icon-setting) {
          margin: 4px 0;
        }

        .label {
          font-size: 13px;
          font-weight: 100;
          //color: #666;
        }
      }
    }

    .popup-content {
      padding: 50px 10px;
    }

    .user-bio {
      .bio-text {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 100;
        margin-bottom: 12px;
      }

      .user-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag {
          padding: 4px 12px;
          background-color: #f5f5f5;
          border-radius: 20px;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }

  :deep(.wd-tabs__nav) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: -10px;
  }

  /* 投稿 */
  .box {
    padding: 10rpx 20rpx 10rpx 40rpx;
    background-color: #f6f6f6;

    /* 圆点 */
    .point {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 15rpx 0;
    }

    .dot {
      margin-left: -22rpx;
      background-color: #198fbe;
      box-shadow: 0 0 5rpx 5rpx #71b2d5;
      color: white;
      width: 24rpx;
      padding: 5rpx;
      font-size: 16rpx;
      text-align: center;
      border-radius: 50rpx;
    }

    .title {
      font-size: 30rpx;
      margin-left: 15rpx;
      background-color: white;
      padding: 12rpx 25rpx;
      border-radius: 50rpx;
      color: #909399;
    }

    /* 容器二 */
    .box-line {
      border-left: 3rpx solid #c8c9cc;
      padding: 15rpx 10rpx 15rpx 35rpx;
    }

    /* 容器三 */
    .box-data {
      background-color: white;
      padding: 20rpx 15rpx;
      border-radius: 15rpx;
      box-shadow: 1px 2px 5px 1px #c8c9cc;


      .userProfile {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 10rpx;
        border-bottom: 1px solid #eeeeee;

        .articleAvatar {
          width: 90rpx;
          height: 90rpx;
          display: block;
          border-radius: 50%;
        }

        .userName {
          margin-left: 20rpx;
        }


      }


      .row-info {
        font-size: 28rpx;
        color: gray;
        line-height: 45rpx;
        padding: 10rpx 15rpx;
        text-indent: 2rem;
      }

      .tag {
        margin: 5px 3px;
      }

      .row-button {
        display: flex;
        flex-direction: row;
        //justify-content: space-around;
        align-items: center;
        border-top: 1rpx solid #f1f1f1;
        margin-top: 20rpx;
        padding-top: 20rpx;
      }

      .row-button view {
        padding: 4px 8px;
        font-size: 28rpx;
        //color: white;
        color: #9e9e9e;
        border-radius: 10rpx;
      }

      /* 图片列表布局 */
      /* 图片列表布局 */
      .image-list {
        margin-top: 10px;
        display: flex;
        gap: 10rpx; /* 图片间距 */

        /* 图片容器 */
        .image-wrapper {
          flex: 1;
          aspect-ratio: 1; /* 保持正方形 */
          position: relative;
          height: auto;
          overflow: hidden;
          border-radius: 12rpx; /* 可选圆角 */
        }

        /* 当只有一张图片时，调整 flex 值 */
        .single-item {
          flex: 0 0 30%; /* 你可以根据需要调整这个值 */
        }

        /* 蒙版样式 */
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

          /* +10 文字样式 */
          .plus-text {
            color: #fff;
            font-size: 36rpx;
            font-weight: bold;
          }
        }
      }


      /* 处理最后一个元素的额外样式（可选） */
      .last-item {
        margin-right: 0;
      }

    }


  }
  //活动
  .activecard {
    margin: 60rpx 0;
    padding: 0 30rpx;

    .title {
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;

      .wd-icon {
        filter: drop-shadow(0 4rpx 8rpx rgba(34, 166, 179, 0.2));
      }

      .text {
        margin: 0 30rpx;
        font-size: 34rpx;
        color: #333;
        font-weight: 600;
        letter-spacing: 1rpx;
      }
    }

    .activelist {
      .row {
        display: flex;
        padding: 20rpx;
        background: #fff;
        border-radius: 32rpx;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;

        margin: 30rpx 0; // 统一垂直间距

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:active {
          transform: translateY(4rpx) scale(0.98);
        }

        .left {
          margin-right: 5rpx;

          .Actimage {
            width: 220rpx;
            height: 180rpx;
            border-radius: 24rpx;
            overflow: hidden;
            position: relative; // 父级相对定位

            .status-tag {
              position: absolute;
              top: 0rpx;
              left: 0rpx;
              z-index: 2;

              .status-text {
                position: relative;
                font-size: 22rpx;
                color: #fff;
                padding: 6rpx 16rpx;
                z-index: 2;
              }

              .status-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 8rpx;
                backdrop-filter: blur(4rpx);
                z-index: 1;
              }
            }

            image {
              transition: transform 0.3s;
              border-radius: 20rpx;
              width: 100%;
              height: 100%;
            }

            &:active image {
              transform: scale(1.05);
            }
          }
        }

        .right {
          flex: 1;
          padding-left: 15rpx;

          .Acttitle {
            font-size: 32rpx;
            font-weight: 600;
            margin-bottom: 20rpx;
            line-height: 1.4;
          }

          .Acttime, .address {
            padding: 0rpx 0rpx;
            display: flex;
            font-size: 26rpx;
            margin-bottom: 16rpx;
            gap: 10rpx;

            .moment {
              margin-left: 10rpx;
            }

            .wd-icon {
              margin-right: 12rpx;
              font-size: 38rpx;
            }
          }
        }

      }
    }
  }


  .like-list {
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
}

.empty-tip {
  text-align: center;
  padding: 40rpx;
  color: #999;
  font-size: 28rpx;
}
</style>