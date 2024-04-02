<template>
    <el-menu :default-active="route.path" background-color="#001529" text-color="white" style="border:0!important;" router>
        <el-menu-item index="/home/screen">
            <el-icon><Monitor/></el-icon>
            <span>数据大屏</span>
        </el-menu-item>
        <el-sub-menu index="/home/acl">
            <template #title>
                <el-icon><Key/></el-icon>
                <span>权限管理</span>
            </template>
            <el-menu-item index="/home/acl/user">
                <el-icon><User /></el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/home/acl/role">
                <el-icon><UserFilled /></el-icon>
                <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/home/acl/menu">
                <el-icon><Menu /></el-icon>
                <span>菜单管理</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/home/product">
            <template #title>
                <el-icon><Goods/></el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/home/product/attr">
                <el-icon><Tools /></el-icon>
                <span>属性管理</span>
            </el-menu-item>
            <el-menu-item index="/home/product/brand">
                <el-icon><Umbrella /></el-icon>
                <span>品牌管理</span>
            </el-menu-item>
            <el-menu-item index="/home/product/sku">
                <el-icon><Coin /></el-icon>
                <span>sku管理</span>
            </el-menu-item>
            <el-menu-item index="/home/product/spu">
                <el-icon><SoldOut /></el-icon>
                <span>spu管理</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { Monitor, Key, User, UserFilled, Menu, Goods, Tools, Umbrella, Coin, SoldOut } from '@element-plus/icons-vue'
const route = useRoute()
</script>

<style lang="scss" scoped>
</style>