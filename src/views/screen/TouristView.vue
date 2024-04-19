<template>
    <div class="tourist-body">
        <div class="title">年度游客量对比</div>
        <img src="./images/dataScreen-title.png" />
        <div ref="echartRef" style="height:90%;"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import { touristSetting } from './charts/echartTouristSetting';

const echartRef = ref()
onMounted(() => {
    const touristEchart = echarts.init(echartRef.value)
    touristEchart.setOption(touristSetting)
})
</script>

<style lang="scss" scoped>
.title {
    color: white;
    font-size: 20px;
}
.tourist-body {
    height: 260px;
    margin-top: 20px;
    background: url(./images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
}
</style>