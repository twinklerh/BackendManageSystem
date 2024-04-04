<template>
    <div class="top-nav-bar">
       <div class="bar-left">
        <el-icon style="margin-right: 10px;" @click="()=>{settingStore.isMenuFold = !settingStore.isMenuFold}">
            <component :is="settingStore.isMenuFold ? 'Fold' : 'Expand'"/>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        </el-breadcrumb>
       </div>
       <div class="bar-right">
            <el-button circle @click="refresh" icon="Refresh"></el-button>
            <el-button circle @click="refresh" icon="FullScreen"></el-button>
            <el-button circle @click="refresh" icon="Setting"></el-button>
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

const settingStore = useSettingStore();
const refresh = ()=>{
    let a = 10;
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