<template>
  <view>
    <!--<web-view :src="url"/>-->
    <wd-img src="/static/temp/img.png" width="100%" height="100vh"></wd-img>
  </view>
</template>

<script setup lang="ts">

import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";
import WdImg from "@/uni_modules/wot-design-uni/components/wd-img/wd-img.vue";


const url = ref();

onLoad((option) => {
  console.log(option)
  url.value = option.param;
})

</script>


<style scoped lang="scss">

</style>
