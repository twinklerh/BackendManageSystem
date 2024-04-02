<template>
    <div class="container">
        <div class="aside-menu">
            <div class="logo">
                <img id="imglogo" src="@/assets/logo.svg" height="40px">
                <span class="nav-title">{{ nav.title }}</span>
            </div>
            <el-scrollbar class="aside-scrollbar">
                <MenuView></MenuView>
            </el-scrollbar>
        </div>
        <div class="nav-top"></div>
        <div class="content-main">
            <div class="main-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nav } from '@/setting';
import MenuView from './MenuView.vue';

</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    .aside-menu {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        .logo {
            width: 100%;
            height: $base-menu-logo-height;
            display: flex;
            align-items: center;
            justify-content: center;
            .nav-title {
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
    }
    .nav-top {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: cyan;
    }
    .content-main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: yellowgreen;
        overflow: auto;
    }
}

.main-container {
    padding: 20px;
    height: 1000px;
}

</style>