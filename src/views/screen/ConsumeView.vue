<template>
    <div class="consume-body">
        <div class="title">消费趋势</div>
        <img src="./images/dataScreen-title.png" />
        <div ref="echartRef" style="height: 90%;"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import { consumeSetting } from './charts/echartConsumeSetting';

const echartRef = ref()

onMounted(() => {
    const consumeEchart = echarts.init(echartRef.value)
    consumeEchart.setOption(consumeSetting)
})

</script>

<style lang="scss" scoped>
.consume-body {
    margin-top: 35px;
    height: 360px;
    background: url(./images/dataScreen-main-cb.png);
    background-size: 100% 100%;
}
.title {
    color: white;
    font-size: 20px;
}
</style>