<template>
  <view class="Lflayout">
    <!--  顶部轮播图 -->
    <image class="imageBanner" src="https://minio.fybreeze.cn/campus/peQe3j8x9Rq2a580f1a6fdf14fe354d78499f58d5b99.webp" mode="aspectFit"/>
    <!-- 两张发布卡片 -->
    <view class="PostCard">
      <view class="lostcard card" @click="handlePublish(1)">
        <image src="https://minio.fybreeze.cn/campus/oZ9rS2BRDrp99c0629d190736e88799ee725f4eaf67b.webp" mode="aspectFit"></image>
      </view>
      <view class="foundcard card" @click="handlePublish(2)">
        <image src="https://minio.fybreeze.cn/campus/2025032521171231231259.webp" mode="aspectFill"></image>
      </view>
    </view>
    <!-- 搜索区域 -->
    <view class="serach-region">
      <view class="serach">
        <wd-search placeholder="请输入物品名称" placeholder-left cancel-txt="搜索" />
      </view>
      <view class="label">
        <wd-tag round color="#333" bg-color="#808080" plain>手机</wd-tag>
        <wd-tag round color="#333" bg-color="#808080" plain>衣服</wd-tag>
        <wd-tag round color="#333" bg-color="#808080" plain>钱包</wd-tag>
        <wd-tag round color="#333" bg-color="#808080" plain>文件资料</wd-tag>
        <wd-tag round color="#333" bg-color="#808080" plain>贵重物品</wd-tag>
        <wd-tag round color="#333" bg-color="#808080" plain>雨伞</wd-tag>
        <wd-tag round color="#333" bg-color="#808080" plain>其他</wd-tag>
      </view>
    </view>

    <!--    底部分类栏 -->
    <view class="tap-page">
      <wd-tabs v-model="activeTab">
        <wd-tab title="寻物启事" name="lost"/>
        <wd-tab title="招领启事" name="found"/>
      </wd-tabs>
    </view>

    <!-- 列表展示 -->
    <view class="items-list">
      <view 
        v-for="item in itemsList" 
        :key="item.id"
        class="item-card"
        @click="goToDetail(item.id)"
      >
        <view class="card-content">
          <view class="title-row">
            <text class="title">{{ item.title }}</text>
            <view class="status-tag" :class="item.status === 1 ? 'resolved' : 'pending'">
              {{ item.status === 1 ? '已解决' : '未解决' }}
            </view>
          </view>
          
          <view class="description">{{ item.description }}</view>
          
          <view class="meta-info">
            <view class="info-item">
              <wd-icon name="location" size="28rpx"/>
              <text>{{ item.location }}</text>
            </view>
            <view class="info-item">
              <wd-icon name="time" size="28rpx"/>
              <text>{{ item.eventTime }}</text>
            </view>
            <view class="info-item">
              <wd-icon name="category" size="28rpx"/>
              <text>{{ item.category }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <wd-toast />
    <!-- 加载中状态 -->
    <wd-loading v-if="loading"/>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getItemsList } from '@/api/itemsApi'
import { ItemType } from '@/utils/enum'
import { useToast } from '@/uni_modules/wot-design-uni'
import {onShow} from "@dcloudio/uni-app";
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app";

const toast = useToast()

// 数据定义
const activeTab = ref('lost')
const loading = ref(false)
const itemsList = ref<any[]>([])

// 分页参数
const pageParams = ref({
  current: 1,
  size: 10,
  itemType: ItemType.LOST
})

// 添加刷新标记
const needRefresh = ref(false)

// 获取列表数据
const getList = async () => {
  try {
    loading.value = true
    const res = await getItemsList(pageParams.value)
    if (res.code === 200) {
      itemsList.value = res.data.records
    } else {
      toast.error(res.message || '获取数据失败')
    }
  } catch (error) {
    console.error('获取列表错误:', error)
    toast.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 切换标签页
const handleTabChange = (tab: string) => {
  // 重置分页参数
  pageParams.value = {
    ...pageParams.value,
    current: 1,
    itemType: tab === 'lost' ? ItemType.LOST : ItemType.FOUND
  }
}

// 监听 activeTab 变化
watch(() => activeTab.value, (newTab) => {
  handleTabChange(newTab)
  getList()
})

// 页面加载时获取数据
onMounted(() => {
  getList()
})

const goToDetail =(id)=>{
  console.log(id)
  uni.navigateTo({
    url: `/pages/lostFoundDetail/lostFoundDetail?id=${id}`
  })
}

const handlePublish = (type: number = 1) => {
  console.log("发布类型:", type) // 1-丢失 2-拾获
  uni.navigateTo({
    url: `/pages/lostFoundPublish/lostFoundPublish?type=${type}`
  })
}

// 添加设置刷新标记的方法
const setNeedRefresh = () => {
  console.log('设置刷新标记')
  needRefresh.value = true
}

// 在 onShow 生命周期中处理刷新
onShow(() => {
  console.log('onShow triggered, needRefresh:', needRefresh.value)
  if (needRefresh.value) {
    // 重置分页参数
    pageParams.value = {
      ...pageParams.value,
      current: 1
    }
    itemsList.value = []
    // 重新获取数据
    getList()
    // 重置刷新标记
    needRefresh.value = false
  }
})

// 确保导出方法
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
.Lflayout {

  .imageBanner {
    display: block;
    width: 94%;
    height: 340rpx;
    margin: 30rpx auto;
    border-radius: 20rpx;
    box-shadow: 6px 3px 10px #dfdfdf;
  }

  .PostCard {
    margin: 0 30rpx;
    display: flex;
    justify-content: space-between;

    .card {
      width: 330rpx;
      height: 170rpx;
      border-radius: 8rpx;
      overflow: hidden;
      box-shadow: 3px 3px 10px #dcdcdc;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .serach-region {
    .serach {
      padding-top: 15rpx;
    }

    .label {
      padding-top: 15rpx;
      margin: 0 30rpx;
      display: flex;
      flex-wrap: wrap;
      gap: 15rpx;
    }
  }

  .tap-page {
    margin-top: 10rpx;

    .all,
    .find,
    .lost {
      padding: 15rpx 30rpx;

      //这是丢失信息卡片样式
      .lost-card,
      .find-card {
        background: #fff;
        border-radius: 16rpx;
        padding: 30rpx;
        margin-bottom: 30rpx; // 卡片间距
        box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.06); // 添加柔和阴影

        .title-region {
          margin-bottom: 25rpx;
          display: flex;
          column-gap: 15rpx;
          align-items: center;
          border-bottom: 2rpx solid #cfcfcf; // 添加分割线
          padding-bottom: 20rpx;

          .title {
            font-size: 34rpx;
            font-weight: 600;
            color: #333;
            max-width: 70%; // 控制标题长度
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .thing-info {
          .row {
            display: flex;
            align-items: baseline;
            margin-bottom: 18rpx;
            font-size: 28rpx;

            .info-title {
              color: #666;
              min-width: 140rpx; // 固定标题宽度
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }

  .items-list {
    padding: 20rpx 30rpx;
    
    .item-card {
      background: #fff;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
      
      .card-content {
        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          
          .title {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            flex: 1;
            margin-right: 16rpx;
          }
          
          .status-tag {
            font-size: 24rpx;
            padding: 4rpx 16rpx;
            border-radius: 24rpx;
            
            &.resolved {
              background-color: #e8f5e9;
              color: #4caf50;
            }
            
            &.pending {
              background-color: #fff3e0;
              color: #ff9800;
            }
          }
        }
        
        .description {
          font-size: 28rpx;
          color: #666;
          margin-bottom: 16rpx;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        
        .meta-info {
          display: flex;
          gap: 24rpx;
          font-size: 24rpx;
          color: #999;
          
          .info-item {
            display: flex;
            align-items: center;
            gap: 6rpx;
            
            .wd-icon {
              color: #999;
            }
          }
        }
      }
      
      &:active {
        transform: scale(0.98);
        transition: transform 0.2s;
      }
    }
  }
}
</style>