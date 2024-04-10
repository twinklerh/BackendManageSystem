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
                <span class="el-dropdown">
                    {{ userStore.username }}
                    <img :src="userStore.avatar" height="30px" width="30px" style="border-radius: 50%;"/>
                </span>
                <template #dropdown>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </template>
            </el-dropdown>
       </div> 
    </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore()
const refresh = ()=>{
    settingStore.refreshInNavBarButton = !settingStore.refreshInNavBarButton;
}
const fullScreen = ()=>{
    const full = document.fullscreenElement;    //  dom对象的一个属性，用来判断是否是全屏，返回值是bool类型
    if(!full)    document.documentElement.requestFullscreen();
    else         document.exitFullscreen();
}
const logout = () => {
    localStorage.setItem("jwt_token", "");
    router.push({name: 'login'});
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
.el-dropdown {
    display: flex; 
    align-items: center;
}
.el-dropdown:hover {
    cursor: pointer;
}
</style>