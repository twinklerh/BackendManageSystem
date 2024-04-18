<template>
    <div class="first">
        <div class="top-in-first">
            <p class="title">实时游客统计</p>
            <div class="title-img"></div>
            <div class="right-in-first">可预览人数：9999人</div>
        </div>
        <div class="main-in-first">
            <span class="people-in-first" v-for="(item,index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="foot-in-first">
            此处写echart
        </div>
    </div>
    <div class="second">男女比例</div>
    <div class="third">年龄比例</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const people = ref('21211人')
</script>

<style lang="scss" scoped>
.first {
    margin-top: 10px;
    height: 400px;
    background: url(./images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    .top-in-first {
        .title {
            color: #29fcff;
            font-size: 21px;
        }
        .title-img {
            background: url(./images/dataScreen-title.png) no-repeat;
            width: 68px;
            height: 7px;
        }
        .right-in-first {
            float: right;
            color: white;
            font-size: 20px;
            padding-right: 19px;
        }
    }
    .main-in-first {
        display: flex;
        margin-top: 30px;
        .people-in-first {
            flex: 1;
            height: 97px;
            line-height: 97px;  //  文字上下居中
            text-align: center; //  文字左右居中
            font-size: 42px;
            color: white;
            background: url(./images/total.png);
        }
    }
    .foot-in-first {
        height: 100%;
        background-color: red;
    }
}
.second {
    height: 300px;
    background-color: wheat;
}
.third {
    height: 340px;
    background-color: white;
}
</style>