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
watch(()=>settingStore.refreshInNavBarButton, ()=>{
  flagDestory.value = false;  //  销毁组件
  nextTick(()=>{  //  不用延时器，因为延时器不靠谱，你不知道什么时候组件销魂完毕
    //  nextTick能保证响应式数据发生变化后你的dom更新完毕了
    flagDestory.value = true;
  })
})
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active{
  transition: all;
}

.fade-enter-enter-to {
  opacity: 1;
  transition: scale(1);
}
</style>
