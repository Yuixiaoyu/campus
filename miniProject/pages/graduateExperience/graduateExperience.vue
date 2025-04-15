<template>
  <view>
    <web-view :src="url"/>
  </view>
</template>

<script setup lang="ts">

import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";


const url = ref();

onLoad((option) => {
  console.log(option)
  url.value = option.param;
})

</script>


<style scoped lang="scss">

</style>
