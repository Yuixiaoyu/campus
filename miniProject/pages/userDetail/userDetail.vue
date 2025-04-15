<template>
  <view class="container">
    <!-- 背景图区域 -->
    <view class="banner-wrap">
      <image class="banner-bg" src="/static/logo.jpg" mode="aspectFill" />
      <view class="banner-overlay"></view>

      <!-- 用户头像卡片 -->
      <view class="user-card">
        <view class="user-info">
          <view class="avatar-container">
            <wd-img 
              width="160rpx" 
              height="160rpx" 
              round 
              :src="userInfo?.imageUrl || '/static/default-avatar.png'" 
              class="avatar-image"
            />
            <view class="online-status"></view>
          </view>
          <view class="text-info">
            <view class="name-row">
              <text class="username">{{userInfo?.userName || '未设置昵称'}}</text>
              <wd-icon v-if="userInfo?.gender" 
                      :name="userInfo.gender === 1 ? 'male' : 'female'" 
                      :color="userInfo.gender === 1 ? '#007AFF' : '#FF69B4'" 
                      size="32rpx" 
              />
            </view>
            <view class="tags-row">
              <wd-tag type="success" size="small">Lv.3</wd-tag>
              <wd-tag type="warning" size="small">活跃用户</wd-tag>
            </view>
            <text class="active-time">最近活跃：刚刚</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 详细信息区域 -->
    <view class="profile-detail">
      <view class="left-section">
        <view class="profile-text">
          <text class="profile-content">{{ userInfo?.userProfile || '这个人很懒，还没有填写简介~' }}</text>
        </view>
        <view class="location-info">
          <wd-icon name="location" size="28rpx" color="#666" />
          <wd-tag plain size="small">IP属地：陕西</wd-tag>
        </view>
      </view>

      <view class="right-section">
        <view class="data-grid">
          <view class="data-item">
            <text class="num">122</text>
            <text class="label">获赞</text>
          </view>
          <view class="divider"></view>
          <view class="data-item">
            <text class="num">6</text>
            <text class="label">粉丝</text>
          </view>
          <view class="divider"></view>
          <view class="data-item">
            <text class="num">0</text>
            <text class="label">关注</text>
          </view>
        </view>
        <view class="action-buttons">
          <wd-button type="success" size="small" v-if="isShow()==1">
            <wd-icon name="plus" />关注
          </wd-button>
          <wd-button type="info" size="small" v-else-if="isShow()==2">
            <wd-icon name="check" />已关注
          </wd-button>
          <wd-button type="primary" size="small" v-else @click="handleToEdit">
            <wd-icon name="edit" />编辑资料
          </wd-button>
        </view>
      </view>
    </view>

    <!-- 用户动态区域 -->
    <view class="past-records">
      <wd-tabs slidable="always" animated auto-line-width sticky offset-top="0">
        <wd-tab title="发表" :badge="total">
          <view v-if="articleList.length === 0" class="empty-content">
            <wd-icon name="comment" size="80rpx" color="#ccc" />
            <text>暂无发表内容</text>
          </view>
          <view v-else class="article-list">
            <view v-for="article in articleList" :key="article.id" class="article-card" @click="handleToArticle(article.id)">
              <view class="article-header">
                <view class="author-info">
                  <wd-img 
                    width="60rpx" 
                    height="60rpx" 
                    round 
                    :src="article.userVO.imageUrl" 
                    class="author-avatar"
                  />
                  <text class="author-name">{{article.userVO.userName}}</text>
                </view>
                <text class="article-time">{{article.createTime}}</text>
              </view>
              <view class="article-content">
                <text class="article-desc">{{article.content}}</text>
              </view>
              <!-- 图片列表展示 -->
              <view v-if="article.imagesList && article.imagesList.length > 0" class="image-list" :class="[`image-count-${article.imagesList.length}`]">
                <image 
                  v-for="(img, index) in article.imagesList" 
                  :key="index"
                  :src="img"
                  mode="aspectFill"
                  class="content-image"
                  @click.stop="previewImage(article.imagesList, index)"
                  :class="{
                    'single-image': article.imagesList.length === 1,
                    'double-image': article.imagesList.length === 2,
                    'multi-image': article.imagesList.length > 2
                  }"
                />
              </view>
              <view class="article-footer">
                <view class="article-stats">
                  <view class="stat-item">
                    <wd-icon name="view" size="28rpx" color="#666"/>
                    <text>{{article.viewCount}}</text>
                  </view>
                  <view class="stat-item">
                    <i :class="article.isLike ? 't-icon t-icon-like-selected' : 't-icon t-icon-like'" size="28rpx" />
                    <text>{{article.likeCount}}</text>
                  </view>
                  <view class="stat-item">
                    <wd-icon name="chat" size="28rpx" color="#666"/>
                    <text>{{article.commentCount}}</text>
                  </view>
                </view>
                <view class="article-tags" v-if="article.tags && article.tags.length > 0">
                  <wd-tag v-for="tag in article.tags" :key="tag" type="info" size="small">{{tag}}</wd-tag>
                </view>
              </view>
            </view>
            
            <!-- 加载更多区域 -->
            <view class="load-more" v-if="articleList.length > 0">
              <view v-if="loading" class="loading">
                <wd-loading size="28rpx" />
                <text>加载中...</text>
              </view>
              <view v-else-if="finished" class="no-more">
                <text>没有更多了</text>
              </view>
              <view v-else class="load-more-btn" @click="onLoadMore">
                <text>点击加载更多</text>
              </view>
            </view>
          </view>
        </wd-tab>
        <wd-tab title="收藏" :badge="1">
          <view class="empty-content">
            <wd-icon name="star" size="80rpx" color="#ccc" />
            <text>暂无收藏内容</text>
          </view>
        </wd-tab>
      </wd-tabs>
    </view>
  </view>
  <wd-toast />
</template>

<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
import {getUserVOById} from "@/api/userApi";
import {ref} from "vue";
import { useToast } from '@/uni_modules/wot-design-uni'
import {getUserInfo} from "@/utils/userStorage";
import {getArticleList} from "@/api/articleApi";

const toast = useToast()

interface UserInfo {
  id: string | number;
  userName: string;
  imageUrl: string;
  gender?: number;
  userProfile?: string;
}

interface Article {
  id: string | number;
  content: string;
  createTime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLike: boolean;
  imagesList: string[];
  tags?: string[];
  userVO: UserInfo;
}

const userInfo = ref<UserInfo | null>(null)
const articleList = ref<Article[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const finished = ref(false)
const currentUserId = ref('')

onLoad((options) => {
  console.log(options)
  if (options?.userId) {
    currentUserId.value = options.userId
    fetchUser(options.userId)
    fetchArticles(options.userId)
  }
})

const fetchUser = async (id) => {
  console.log(id)
  const res = await getUserVOById(id)
  console.log(res)
  if (res.code === 200) {
    userInfo.value = res.data

  }else{
    toast.error(res.message)
  }
}

const fetchArticles = async (userId) => {
  if (loading.value || finished.value) return
  
  try {
    loading.value = true
    const res = await getArticleList({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      userId: userId
    })
    
    if (res.code === 200) {
      if (currentPage.value === 1) {
        articleList.value = res.data.records
      } else {
        articleList.value = [...articleList.value, ...res.data.records]
      }
      
      total.value = res.data.total
      
      // 判断是否加载完成
      if (articleList.value.length >= total.value) {
        finished.value = true
      } else {
        currentPage.value++
      }
    } else {
      toast.error(res.message)
    }
  } catch (error) {
    console.error('获取文章列表失败:', error)
    toast.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

// 添加加载更多的处理函数
const onLoadMore = () => {
  if (currentUserId.value) {
    fetchArticles(currentUserId.value)
  }
}

const isShow = (): number => {
  const localUserInfo = getUserInfo()
  if (!localUserInfo || !userInfo.value) return 1
  if (localUserInfo.id === userInfo.value.id) return 3
  return 2
}

const handleToEdit = ()=>{
  uni.navigateTo({
    url: '/pages/updateUserInfo/updateUserInfo'
  })
}

const handleToArticle = (articleId) => {
  uni.navigateTo({
    url: `/pages/articleDetail/articleDetail?articleId=${articleId}`
  })
}

// 添加图片预览功能
const previewImage = (images: string[], current: number): void => {
  uni.previewImage({
    urls: images,
    current: images[current]
  })
}

</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: #f8f9fa;
}


.banner-wrap {
  position: relative;
  height: 400rpx;
  overflow: visible;
  margin-bottom: 120rpx;
  
  .banner-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1);
    filter: blur(10px);
  }
  
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom,
      rgba(0,0,0,0.2),
      rgba(0,0,0,0.4)
    );
  }

  .user-card {
    position: absolute;
    bottom: -140rpx;
    left: 30rpx;
    right: 30rpx;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-radius: 24rpx;
    padding: 40rpx;
    box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.08);
    z-index: 10;

    .user-info {
      display: flex;
      align-items: center;
      gap: 40rpx;

      .avatar-container {
        position: relative;
        flex-shrink: 0;
        
        .avatar-image {
          width: 180rpx !important;
          height: 180rpx !important;
          border: 6rpx solid white;
          box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          
          &:active {
            transform: scale(0.95);
          }
        }
        
        .online-status {
          position: absolute;
          bottom: 8rpx;
          right: 8rpx;
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          background: #4CAF50;
          border: 4rpx solid white;
          box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
        }
      }

      .text-info {
        flex: 1;
        padding: 12rpx 0;
        
        .name-row {
          display: flex;
          align-items: center;
          gap: 16rpx;
          margin-bottom: 16rpx;
          
          .username {
            font-size: 42rpx;
            font-weight: 600;
            color: #333;
            text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.05);
          }
        }
        
        .tags-row {
          display: flex;
          gap: 16rpx;
          margin-bottom: 20rpx;
          flex-wrap: wrap;
        }

        .active-time {
          font-size: 26rpx;
          color: #666;
          display: flex;
          align-items: center;
          gap: 8rpx;
          
          &::before {
            content: '';
            display: inline-block;
            width: 12rpx;
            height: 12rpx;
            background: #4CAF50;
            border-radius: 50%;
            margin-right: 4rpx;
          }
        }
      }
    }
  }
}

.profile-detail {
  margin: 30rpx 20rpx;
  padding: 30rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);

  .left-section {
    margin-bottom: 30rpx;

    .profile-text {
      margin-bottom: 20rpx;
      
      .profile-content {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
      }
    }
    
    .location-info {
      display: flex;
      align-items: center;
      gap: 8rpx;
    }
  }

  .right-section {
    border-top: 2rpx solid #f5f5f5;
    padding-top: 24rpx;

    .data-grid {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 24rpx;

      .data-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20rpx;

        .num {
          font-size: 36rpx;
          font-weight: 600;
          color: #333;
          margin-bottom: 4rpx;
        }

        .label {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .divider {
        width: 2rpx;
        height: 40rpx;
        background: #f0f0f0;
      }
    }
    
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 20rpx;
      
      .wd-button {
        min-width: 160rpx;
        
        .wd-icon {
          margin-right: 4rpx;
        }
      }
    }
  }
}

.past-records {
  background: #fff;
  border-radius: 24rpx;
  margin: 0 20rpx 20rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
  width: auto;
  box-sizing: border-box;
  overflow: hidden;
  
  .article-list {
    margin: 0;
    padding: 0;
    width: 88%;
    box-sizing: border-box;
    
    .article-card {
      max-width: 100%;
      background: #fff;
      border-radius: 16rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
      width: 100%;
      box-sizing: border-box;
      
      .article-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12rpx;
        
        .author-info {
          display: flex;
          align-items: center;
          gap: 12rpx;
          flex: 1;
          min-width: 0;
          
          .author-avatar {
            flex-shrink: 0;
            width: 60rpx !important;
            height: 60rpx !important;
            border: 2rpx solid #f0f0f0;
          }
          
          .author-name {
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 300rpx;
          }
        }
        
        .article-time {
          font-size: 24rpx;
          color: #999;
          flex-shrink: 0;
          margin-left: 12rpx;
        }
      }
      
      .article-content {
        margin-bottom: 12rpx;
        width: 100%;
        
        .article-desc {
          font-size: 28rpx;
          color: #333;
          line-height: 1.6;
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      
      .image-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8rpx;
        margin: 16rpx 0;
        width: 100%;
        box-sizing: border-box;
        
        &.image-count-1 {
          .content-image {
            width: 80%;
            max-height: 400rpx;
            border-radius: 12rpx;
          }
        }
        
        &.image-count-2 {
          justify-content: flex-start;
          .content-image {
            width: calc(50% - 12rpx);
            height: 320rpx;
            border-radius: 8rpx;
          }
        }
        
        &.image-count-3 {
          justify-content: flex-start;
          .content-image {
            width: calc(33.33% - 6rpx);
            height: 240rpx;
            border-radius: 8rpx;
          }
        }
        
        &.image-count-4 {
          justify-content: flex-start;
          .content-image {
            width: calc(50% - 10rpx);
            height: 280rpx;
            border-radius: 8rpx;
          }
        }
        
        .content-image {
          width: calc(33.33% - 6rpx);
          height: 400rpx;
          border-radius: 8rpx;
          object-fit: cover;
          flex-shrink: 0;
        }
      }
      
      .article-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8rpx;
        width: 100%;
        
        .article-stats {
          display: flex;
          gap: 16rpx;
          flex-wrap: wrap;
          
          .stat-item {
            display: flex;
            align-items: center;
            gap: 4rpx;
            color: #666;
            font-size: 24rpx;
          }
        }
        
        .article-tags {
          display: flex;
          gap: 8rpx;
          flex-wrap: wrap;
          max-width: 40%;
          
          .wd-tag {
            max-width: 120rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  
  .empty-content {
    padding: 60rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    
    text {
      font-size: 28rpx;
      color: #999;
    }
  }
}

.load-more {
  padding: 16rpx 0;
  text-align: center;
  
  .loading, .no-more, .load-more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    
    text {
      font-size: 26rpx;
      color: #999;
    }
  }
  
  .load-more-btn {
    text {
      color: #666;
    }
    
    &:active {
      opacity: 0.7;
    }
  }
}
</style>