<template>
    <div class="attraction-body">
        <div class="title">热门景点排行</div>
        <img src="./images/dataScreen-title.png" />
        <div ref="echartRef" style="height:90%;"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import { attractionSetting } from './charts/echartAttractionSetting';

const echartRef = ref()

onMounted(() => {
    const attractionEchart = echarts.init(echartRef.value)
    attractionEchart.setOption(attractionSetting);
})
</script>

<style lang="scss" scoped>
.attraction-body {
    background: url(./images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    color: white;
    height: 360px;
}
</style>