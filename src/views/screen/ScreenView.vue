<template>
    <div class="container">
        <div class="screen" ref="screenRef">
            <div class="top"><TopView /></div>
            <div class="main">
                <div class="left"><LeftView /></div>
                <div class="center">
                    <MainView class="main-in-center" />
                    <LineView class="line-in-center" />
                </div>
                <div class="right">
                    <AttractionView class="top-in-right" />
                    <TouristView class="middle-in-right" />
                    <ConsumeView class="bottom-in-right" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import TopView from './TopView.vue';
import LeftView from './LeftView.vue';
import MainView from './MainView.vue';
import LineView from './LineView.vue';
import AttractionView from './AttractionView.vue';
import TouristView from './TouristView.vue';
import ConsumeView from './ConsumeView.vue';

const screenRef = ref();

function getScale(w=1920, h=1080)   {
    const ww = window.innerWidth / w;
    const hh = window.innerHeight / h;
    return ww < hh ? ww : hh;
}

onMounted(() => {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`       //  是将对应的div进行缩放，不是对整个页面
    //  translate(-50%,-50%)：这部分代码将容器向左上角移动，使其在父容器中居中显示。-50% 表示移动到自身宽度和高度的一半的位置，从而实现水平和垂直居中。
})

</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    width: 100vw;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
}
.screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;     //  将基点设置为左上角，这样容器将以左上角为基点进行缩放和定位。
}

.main {
    display: flex;
    .left {
        flex: 1;
        height: 1040px;
    }
    .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .main-in-center {
            flex: 3;
        }
        .line-in-center {
            flex: 1;
        }
    }
    .right {
        flex: 1;
    }
}
</style>