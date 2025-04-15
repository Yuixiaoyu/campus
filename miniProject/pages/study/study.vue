<template>
  <view class="container">
    <!-- 内容分类区域 -->
    <view class="content-section">
      <!-- 毕业生板块 -->
      <view class="category-card graduate-section">
        <view class="section-header">
          <text class="section-title">毕业生经验分享</text>
          <text class="section-subtitle">来自优秀毕业生的宝贵经验</text>
        </view>
        
        <wd-tabs v-model="leftActive" animated sticky>
          <wd-tab title="就业"></wd-tab>
          <wd-tab title="考公"></wd-tab>
          <wd-tab title="考研"></wd-tab>
        </wd-tabs>

        <!-- 不同tab内容 -->
        <view class="card-list">
          <template v-for="(tab, tabIndex) in leftTabs" :key="tabIndex">
            <scroll-view 
              v-show="leftActive === tabIndex"
              class="scroll-content" 
              scroll-y
              enable-flex
            >
              <view 
                class="doc-card" 
                v-for="item in tab.list" 
                :key="item.id"
                @click="navigateToGraduateDetail(leftActive, item)"
              >
                <view class="doc-content">
                  <view class="doc-title">{{ item.title }}</view>
                  <view class="doc-meta">
                    <view class="meta-left">
                      <image class="avatar" :src="item.avatar || '/static/default-avatar.png'" mode="aspectFill" />
                      <text class="author">{{ item.author }}</text>
                    </view>
                    <view class="meta-right">
                      <text class="date">{{ item.date }}</text>
                      <wd-icon name="read" size="14px" class="read-icon" />
                    </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </template>
        </view>
      </view>

      <!-- 在校生板块 -->
      <view class="category-card student-section">
        <view class="section-header">
          <text class="section-title">在校生经验分享</text>
          <text class="section-subtitle">学长学姐的学习心得</text>
        </view>

        <wd-tabs v-model="rightActive" animated sticky>
          <wd-tab title="期末"></wd-tab>
          <wd-tab title="实验"></wd-tab>
          <wd-tab title="作业"></wd-tab>
        </wd-tabs>

        <!-- 不同tab内容 -->
        <view class="card-list">
          <template v-for="(tab, tabIndex) in rightTabs" :key="tabIndex">
            <scroll-view 
              v-show="rightActive === tabIndex"
              class="scroll-content" 
              scroll-y
              enable-flex
            >
              <view 
                class="doc-card" 
                v-for="item in tab.list" 
                :key="item.id"
                @click="navigateToStudentDetail(rightActive, item)"
              >
                <view class="doc-content">
                  <view class="doc-title">{{ item.title }}</view>
                  <view class="doc-meta">
                    <view class="meta-left">
                      <image class="avatar" :src="item.avatar || '/static/default-avatar.png'" mode="aspectFill" />
                      <text class="author">{{ item.author }}</text>
                    </view>
                    <view class="meta-right">
                      <text class="date">{{ item.date }}</text>
                      <wd-icon name="read" size="14px" class="read-icon" />
                    </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ArticleItem {
  id: number;
  title: string;
  author: string;
  date: string;
  avatar?: string;
}

interface TabItem {
  title: string;
  list: ArticleItem[];
}

const leftActive = ref(0)
const rightActive = ref(0)

// 左侧数据
const leftTabs: TabItem[] = [{
  title: '就业',
  list: [{
    id: 1,
    title: '互联网大厂面试指南',
    author: '真欣同学',
    url: 'https://www.bilibili.com/video/BV18S4y1C7fS/?spm_id_from=333.337.search-card.all.click',
    date: '03-01'
  },
  {
    id: 2,
    title: '简历制作黄金法则',
    author: '取景框看世界',
    url: 'https://www.bilibili.com/video/BV1NL4y1878J/?spm_id_from=333.337.search-card.all.click',
    date: '03-02'
  },
  {
    id: 3,
    title: '薪资谈判技巧',
    author: 'HR大婷讲求职',
    url: 'https://www.bilibili.com/video/BV1N14y1r7tJ/?spm_id_from=333.337.search-card.all.click&vd_source=8f5eaf78f6121694f4dd471819f3772b',
    date: '03-03'
  }]
},
{
  title: '考公',
  list: [{
    id: 4,
    title: '行测系统课',
    author: '刘文超Vin',
    url: 'https://www.bilibili.com/video/BV12t4115735/?spm_id_from=333.337.search-card.all.click',
    date: '03-04'
  },
  {
    id: 5,
    title: '申论系统课',
    author: '公考小马哥',
    url: 'https://www.bilibili.com/video/BV1P34y167K4/?spm_id_from=333.337.search-card.all.click&vd_source=8f5eaf78f6121694f4dd471819f3772b',
    date: '03-05'
  },
  {
    id: 6,
    title: '面试技巧',
    author: '心竺公考',
    url: 'https://www.bilibili.com/video/BV1uJ411H7w4/?spm_id_from=333.337.search-card.all.click',
    date: '03-06'
  }]
},
{
  title: '考研',
  list: [{
    id: 7,
    title: '考研时间规划表',
    author: '取景框看世界',
    url: 'https://www.bilibili.com/video/BV1qwzdY4EqG/?spm_id_from=333.337.search-card.all.click',
    date: '03-07'
  },
  {
    id: 8,
    title: '考研英语长难句',
    author: '颉斌斌老师',
    url: 'https://space.bilibili.com/271970833?spm_id_from=333.337.search-card.all.click',
    date: '03-08'
  },
  {
    id: 9,
    title: '政治背诵手册',
    author: '肖秀荣',
    url: 'https://www.bilibili.com/video/BV1KH4y1d7YB/?spm_id_from=333.1387.homepage.video_card.click',
    date: '03-09'
  }]
}]

// 右侧数据
const rightTabs: TabItem[] = [{
  title: '期末',
  list: [{
    id: 10,
    title: '高数期末复习重点',
    author: '框框老师课堂',
    url: 'https://www.bilibili.com/video/BV1mN411r7VM/?spm_id_from=333.337.search-card.all.click',
    date: '03-10'
  },
  {
    id: 11,
    title: '英语四级阅读',
    author: '我是瑞斯拜',
    url: 'https://www.bilibili.com/video/BV1Ea411i7Da/?spm_id_from=333.337.search-card.all.click',
    date: '03-11'
  },
  {
    id: 12,
    title: '专业课考试技巧',
    author: '清华学姐小琳',
    url: 'https://b23.tv/sHOmbvo',
    date: '03-12'
  }]
},
{
  title: '实验',
  list: [{
    id: 13,
    title: '物理实验注意事项',
    author: '五味666',
    url: 'https://b23.tv/5f7xAyF',
    date: '03-13'
  },
  {
    id: 14,
    title: '化学实验安全指南',
    author: '鹰少学姐',
    url: 'https://b23.tv/kj5UuzZ',
    date: '03-14'
  },
  {
    id: 15,
    title: '生物实验操作要领',
    author: '生物研零生',
    url: 'https://b23.tv/prbT81x',
    date: '03-15'
  }]
},
{
  title: '作业',
  list: [{
    id: 16,
    title: '作业规范指导',
    author: '眠羊八困',
    url: 'https://www.bilibili.com/video/BV1mb4y1x7W1/?spm_id_from=333.337.search-card.all.click',
    date: '03-16'
  },
  {
    id: 17,
    title: '论文写作技巧',
    author: 'SCI论文写作',
    url: 'https://b23.tv/72e2ldd',
    date: '03-17'
  },
  {
    id: 18,
    title: '实验报告模板',
    author: '奋斗的习习',
    url: 'https://www.bilibili.com/video/BV1nU4y1T7tE/?spm_id_from=333.337.search-card.all.click&vd_source=8f5eaf78f6121694f4dd471819f3772b',
    date: '03-18'
  }]
}]

// 毕业生经验详情页跳转
const navigateToGraduateDetail = (tabIndex: number, item: ArticleItem) => {
  const routes = [
    '/pages/graduateExperience/graduateExperience?param=',
    '/pages/graduateExperience/graduateExperience?param=',
    '/pages/graduateExperience/graduateExperience?param='
  ]
  
  uni.navigateTo({
    url: `${routes[tabIndex]}${item.url}`
  })
}

// 在校生经验详情页跳转
const navigateToStudentDetail = (tabIndex: number, item: ArticleItem) => {
  const routes = [
    '/pages/studentExperience/studentExperience?param=',
    '/pages/studentExperience/studentExperience?param=',
    '/pages/studentExperience/studentExperience?param='
  ]
  
  uni.navigateTo({
    url: `${routes[tabIndex]}${item.url}`
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f6f7;
}

:deep(.wd-tabs__nav--sticky){
  width: 90vw !important;
}

.content-section {
  padding: 20rpx;
  margin-top: 20rpx;

  .category-card {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

    .section-header {
      margin-bottom: 20rpx;

      .section-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }

      .section-subtitle {
        font-size: 24rpx;
        color: #999;
        margin-left: 16rpx;
      }
    }

    .card-list {
      margin-top: 16rpx;

      .scroll-content {
        max-height: 600rpx;
      }

      .doc-card {
        background: #f8f9fa;
        border-radius: 12rpx;
        padding: 20rpx;
        margin-bottom: 16rpx;
        transition: all 0.3s ease;

        &:active {
          transform: scale(0.98);
        }

        .doc-content {
          .doc-title {
            font-size: 28rpx;
            font-weight: 500;
            color: #333;
            margin-bottom: 16rpx;
            line-height: 1.4;
          }

          .doc-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .meta-left {
              display: flex;
              align-items: center;

              .avatar {
                width: 36rpx;
                height: 36rpx;
                border-radius: 50%;
                margin-right: 12rpx;
              }

              .author {
                font-size: 24rpx;
                color: #666;
              }
            }

            .meta-right {
              display: flex;
              align-items: center;

              .date {
                font-size: 24rpx;
                color: #999;
                margin-right: 12rpx;
              }

              .read-icon {
                color: #999;
              }
            }
          }
        }
      }
    }
  }

  .graduate-section {
    border-top: 4rpx solid #4CAF50;
  }

  .student-section {
    border-top: 4rpx solid #2196F3;
  }
}

:deep(.wd-tabs__nav) {
  background: transparent;
}

:deep(.wd-tabs__line) {
  height: 4rpx;
  border-radius: 2rpx;
}

:deep(.wd-tab) {
  font-size: 28rpx;
  padding: 20rpx 0;
}

:deep(.wd-search) {
  --search-padding: 20rpx;
  --search-input-height: 72rpx;
  --search-input-border-radius: 36rpx;
}
</style>
