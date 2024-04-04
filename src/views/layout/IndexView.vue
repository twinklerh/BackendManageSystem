<template>
    <div class="container">
        <div class="aside-menu" :class="{fold:settingStore.isMenuFold?true:false}">
            <div class="logo">
                <img id="imglogo" src="@/assets/logo.svg" height="40px">
                <span class="nav-title">{{ nav.title }}</span>
            </div>
            <el-scrollbar class="aside-scrollbar">
                <MenuView></MenuView>
            </el-scrollbar>
        </div>
        <div class="nav-top" :class="{fold:settingStore.isMenuFold?true:false}">
            <TopNavBarView></TopNavBarView>
        </div>
        <div class="content-main" :class="{fold:settingStore.isMenuFold?true:false}">
            <div class="main-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nav } from '@/setting';
import MenuView from './MenuView.vue';
import TopNavBarView from './TopNavBarView.vue';
import { useSettingStore } from '@/store/setting';
const settingStore = useSettingStore();
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    .aside-menu {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all 5000ms;
        .logo {
            width: 100%;
            height: $base-menu-logo-height;
            margin-left: 7px;
            display: flex;
            justify-content: left;
            align-items: center;
            .nav-title {
                display: inline;
                font-size: $base-logo-title-fontSize;
                color: white;
                padding: 15px;
            }
        }
        .aside-scrollbar {
            height: calc(100vh - $base-menu-logo-height);
            width: 100%;
            color: white;
        }
        &.fold {    //  & 表示父级选择器，这里指aside-menu的dom节点的fold类
            width: $base-menu-min-width;
        }
    }
    .nav-top {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all 5000ms;
        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
    .content-main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: yellowgreen;
        overflow: auto;
        transition: all 5000ms;
        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}

.main-container {
    padding: 20px;
    height: 1000px;
}

</style>