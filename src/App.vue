<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flagDestory" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import { useSettingStore } from './store/setting';
const settingStore = useSettingStore();
const flagDestory = ref(true);
watch(()=>settingStore.refreshInNavBarButton, ()=>{   //  卸载所有组件再重新加载所有组件
  flagDestory.value = false;  //  销毁组件
  nextTick(()=>{
    flagDestory.value = true;
  })
})
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  // transform: scale(0.9);   //  添加自己写的动画
}

.fade-enter-active{
  transition: all 0s;
}

.fade-enter-to {
  opacity: 1;
  // transform: scale(1);
}
</style>
