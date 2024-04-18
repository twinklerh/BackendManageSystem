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
            <el-popover placement="bottom" title="主题设置" :width="250" trigger="manual" :visible="popoverVisiable">
                <template #reference>
                    <el-button circle icon="Setting" @click="setPopoverVisiable"></el-button>
                </template>
                <el-form>
                    <el-form-item label="主题颜色">
                        <el-color-picker @change="setColor" v-model="color" :predefine="predefineColors" />                        
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch v-model="switchDark" @change="changeDark" active-icon="Moon" inactive-icon="Sunny" inline-prompt></el-switch>
                    </el-form-item>
                </el-form>
            </el-popover>
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
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore()
const switchDark = ref(false)
const popoverVisiable = ref(false)
const refresh = ()=>{
    settingStore.refreshInNavBarButton = !settingStore.refreshInNavBarButton;
}
const fullScreen = ()=>{
    const full = document.fullscreenElement;    //  dom对象的一个属性，用来判断是否是全屏，返回值是bool类型
    if(!full)    document.documentElement.requestFullscreen();
    else         document.exitFullscreen();
}
const logout = () => {
    userStore.token = '';
    localStorage.removeItem("token")
    router.push({path: '/login'})
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577',])

const changeDark = () => {
    if(switchDark.value){
        localStorage.setItem('darkTheme', 'true')
        darkOn()
    }   else    {
        localStorage.removeItem('darkTheme')
        darkOff()
    }
}

const darkOn = () => {
    const html = document.documentElement;
    html.className = 'dark';
}

const darkOff = () => {
    const html = document.documentElement;
    html.className='';
}

const setColor = () => {
    const html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value);
}

const setPopoverVisiable =  ()=>{ popoverVisiable.value = !popoverVisiable.value }

onBeforeMount(()=>{
    const darkTheme = localStorage.getItem('darkTheme')
    if(darkTheme === 'true')    {
        switchDark.value = true;
        darkOn();
    }   else    {
        switchDark.value = false;
        darkOff();
    }
})
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