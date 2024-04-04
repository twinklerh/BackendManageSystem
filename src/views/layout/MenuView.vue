<template>
    <el-menu :collapse="settingStore.isMenuFold" :default-active="route.path" background-color="#001529" text-color="white" style="border:0!important;" router>
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
                <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="/home/acl/role">
                <el-icon><UserFilled /></el-icon>
                <template #title>角色管理</template>
            </el-menu-item>
            <el-menu-item index="/home/acl/menu">
                <el-icon><Menu /></el-icon>
                <template #title>菜单管理</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/home/product">
            <template #title>
                <el-icon><Goods/></el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/home/product/attr">
                <el-icon><Tools /></el-icon>
                <template #title>属性管理</template>
            </el-menu-item>
            <el-menu-item index="/home/product/brand">
                <el-icon><Umbrella /></el-icon>
                <template #title>品牌管理</template>
            </el-menu-item>
            <el-menu-item index="/home/product/sku">
                <el-icon><Coin /></el-icon>
                <template #title>sku管理</template>
            </el-menu-item>
            <el-menu-item index="/home/product/spu">
                <el-icon><SoldOut /></el-icon>
                <template #title>spu管理</template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';
import { useRoute } from 'vue-router';
const route = useRoute()
const settingStore = useSettingStore();
</script>

<style lang="scss" scoped>
</style>