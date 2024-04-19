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
        <div class="foot-in-first" ref="echartLiquidRef"></div>
    </div>
    <div class="second">
        <div class="top-in-second">
            <p style="color: white; font-size: 20px; margin: 0;">男女比例</p>
            <img src="./images/dataScreen-title.png">
        </div>
        <div class="main-in-second">
            <div class="man"><img src="./images/man.png"></div>
            <div class="woman"><img src="./images/woman.png"></div>
        </div>
        <div class="foot-in-second">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div style="height: 20%;" ref="echartBarRef"></div>
    </div>
    <div class="third">
        <div class="top-in-third">
            <div>年龄比例</div>
            <img src="./images/dataScreen-title.png">
        </div>
        <div class="main-in-third" ref="echartPieRef"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { liquidSetting } from './charts/echatsLiquidSetting';
import { barSetting } from './charts/echartBarSetting';
import { pieSetting } from './charts/echartsPieSetting';
const people = ref('21211人')
const echartLiquidRef = ref()
const echartBarRef = ref()
const echartPieRef = ref()
onMounted(()=>{
    const liquidCharts = echarts.init(echartLiquidRef.value) //  获取echart的实例
    liquidCharts.setOption(liquidSetting);
    const barCharts = echarts.init(echartBarRef.value)
    barCharts.setOption(barSetting);
    const pieCharts = echarts.init(echartPieRef.value)
    pieCharts.setOption(pieSetting);
})
</script>

<style lang="scss" scoped>
.first {
    margin-top: 10px;
    height: 420px;
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
            height: 87px;
            line-height: 97px;  //  文字上下居中
            text-align: center; //  文字左右居中
            font-size: 32px;
            color: white;
            background: url(./images/total.png);
            margin-bottom: 10px;
        }
    }
    .foot-in-first {
        height: 60%;
    }
}
.second {
    margin-top: 10px;
    height: 300px;
    background: url(./images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .main-in-second {
        display: flex;
        justify-content: center;
        align-items: center;
        .man {
            width: 115px;
            height: 111px;
            margin: 20px;
            background: url(./images/man-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .woman {
            width: 115px;
            height: 111px;
            margin: 20px;
            background: url(./images/woman-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .foot-in-second {
        display: flex;
        color: white;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        p {
            margin: 0;
        }
    }
}
.third {
    margin-top: 10px;
    height: 270px;
    background: url(./images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .top-in-third {
        font-size: 20px;
        color: white;
    }
    .main-in-third {
        height: 100%;
    }
}
</style>