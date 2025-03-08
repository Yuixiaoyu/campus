<template>
  <view class="activity-page">
    <!-- 顶部导航栏 -->
    <wd-navbar title="校园活动" leftText="返回" fixed placeholder safeAreaInsetTop @click-left="onClickLeft">
    </wd-navbar>

    <!-- 分类标签页 -->
    <wd-tabs v-model="tab">
      <block v-for="(item,index) in tabs" :key="index">
        <wd-tab :title="item.name" :name="item.name">
          <view class="content">内容{{ item.name }}</view>
        </wd-tab>
      </block>
    </wd-tabs>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签页
const activeTab = ref(0)

const tab = ref("例子")

// 标签页数据
const tabs = ref([
  {
    name: '文艺类',
    items: []
  },
  {
    name: '体育活动类',
    items: []
  },
  {
    name: '学术思辨',
    items: []
  },
  {
    name: '社会实践与公益类',
    items: []
  },
  {
    name: '特定主题',
    items: []
  }
])

// 是否有数据
const hasData = ref(true)

// 点击活动卡片
const onActivityClick = (item: any) => {
  console.log('点击活动:', item)
  // 这里可以添加跳转到活动详情页的逻辑
}

// 返回上一页
const onClickLeft = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.activity-page {
  min-height: 100vh;
  background-color: #f8f8f8;

  .activity-list {
    padding: 16px;
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .activity-card {
    padding: 16px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;

    &:active {
      transform: scale(0.98);
    }

    &.pink {
      background-color: #ffeef0;
    }

    &.yellow {
      background-color: #fff8e6;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .card-desc {
      font-size: 12px;
      color: #666;
      line-height: 1.5;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .card-time {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;

      :deep(.wd-icon) {
        margin-right: 4px;
      }
    }
  }

  :deep(.wd-tabs__nav) {
    background-color: #fff;
    padding: 0 12px;
  }

  :deep(.wd-tab) {
    min-height: calc(100vh - 44px - 44px);
  }
}
</style>
