<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧可视化大数据平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">{{ dateTime }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const dateTime = ref('');
const goHome = () => {
    router.push('/')
}
onMounted(()=>{
    setInterval(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 月份从1开始计数
        const date = now.getDate(); // 获取当前日期
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const timeString = `北京时间：${year}年${month}月${date}日 ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        dateTime.value = timeString;
    }, 1000);
})
</script>

<style lang="scss" scoped>
.top {
    width: 100%;
    height: 40px;
    display: flex;
}
.left {
    flex: 1.5;
    background: url(./images/dataScreen-header-left-bg.png) no-repeat;
    .lbtn {
        width: 100px;
        height: 40px;
        float: right;
        background: url(./images/dataScreen-header-btn-bg-l.png) no-repeat;
        background-size: 100% 100%;
        line-height: 40px;
        color: #29fcff;
        font-size: 20px;
        text-align: center;
    }
    .lbtn:hover {
        cursor: pointer;
    }
}
.center {
    flex: 2;
    .title {
        width: 100%;
        height: 74px;
        text-align: center;
        color: #29fcff;
        font-size: 40px;
        line-height: 74px;
        background: url(./images/dataScreen-header-center-bg.png) no-repeat;
        background-size: 100% 100%;
    }
}
.right {
    flex: 1.5;
    background: url(./images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    line-height: 40px;
    .rbtn {
        width: 150px;
        height: 40px;
        float: left;
        background: url(./images/dataScreen-header-btn-bg-r.png) no-repeat;
        background-size: 100% 100%;
        
        color: #29fcff;
        font-size: 20px;
        text-align: center;
    }
    .time {
        color: #29fcff;
        font-size: 20px;
        margin-left: 40px;
    }
}
</style>