<template>
    <div class="map" ref="echartMapRef"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import chinaJson from './charts/china.json';
import { mapSetting } from './charts/echartMapSetting';
const echartMapRef = ref()
console.log(chinaJson)

onMounted(()=>{
    echarts.registerMap('China', chinaJson as any);
    const mapChart = echarts.init(echartMapRef.value)
    mapChart.setOption(mapSetting)
})

</script>

<style lang="scss" scoped>
</style>