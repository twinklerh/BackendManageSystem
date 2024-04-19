<template>
    <div class="line-echart">
        <div class="title">未来七天游客趋势图</div>
        <img src="./images/dataScreen-title.png">
        <div ref="echartLineRef" style="height: 100%;"></div>
    </div>
    
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { lineSetting } from './charts/echartLineSetting';

const echartLineRef = ref()

onMounted(() => {
    const chartLine = echarts.init(echartLineRef.value)
    chartLine.setOption(lineSetting);
})

</script>

<style lang="scss" scoped>
.line-echart {
    width: 100%;
    height: 600px;
    background: url(./images/dataScreen-main-cb.png);
    background-size: 100% 100%;
    margin: 0 10px;
}
.title {
    margin: 0 0;
    font-size: 18px;
    color: white;
}
</style>