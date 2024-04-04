<template>
    <div class="top-nav-bar">
       <div class="bar-left">
        <el-icon style="margin-right: 10px;" @click="()=>{settingStore.isMenuFold = !settingStore.isMenuFold}">
            <component :is="settingStore.isMenuFold ? 'Fold' : 'Expand'"/>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item>后台管理系统</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">
                <el-icon style="margin: 0 4px;">
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
       </div>
       <div class="bar-right">
            <el-button circle @click="refresh" icon="Refresh"></el-button>
            <el-button circle @click="fullScreen" icon="FullScreen"></el-button>
            <el-button circle icon="Setting"></el-button>
            <el-dropdown style="padding: 15px;" trigger="click">
                <span style="display: flex; align-items: center;">
                    <img src="@/assets/UserDefaultImg.png"  height="30px"/>
                    <el-icon><ArrowDown /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-item>123</el-dropdown-item>
                </template>
            </el-dropdown>
       </div> 
    </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';
import { useRoute } from 'vue-router';
const route = useRoute();
const settingStore = useSettingStore();
const refresh = ()=>{
    settingStore.refreshInNavBarButton = !settingStore.refreshInNavBarButton;
}
const fullScreen = ()=>{
    const full = document.fullscreenElement;    //  dom对象的一个属性，用来判断是否是全屏，返回值是bool类型
    if(!full)    document.documentElement.requestFullscreen();
    else         document.exitFullscreen();
}
</script>

<style lang="scss" scoped>
.top-nav-bar {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    background-image: linear-gradient(to right, white, #F5F5DC);
}
.bar-left {
    display: flex;
    align-items: center;
    padding: 20px;
}
.bar-right {
    display: flex;
    align-items: center;
    margin-right: 55px;
}
</style>