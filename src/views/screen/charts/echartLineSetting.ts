export const lineSetting = {
    title: {
        text: '访问量',
    },
    xAxis: {
        type: 'category',          //两侧不留白
        boundaryGap: false,
        splitLine: {          //分割线不要
            show: false,
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {          //轴线的设置
            show: true,
        },
        axisTick: {          //刻度
            show: true,
        },
    },
    yAxis: {
        splitLine: {
            show: false,
        },
        axisLine: {        //轴线的设置
            show: true,
        },
        axisTick: {        //刻度
            show: true,
        },
    },
    grid: {
        left: 40, top: 0, right: 20, bottom: 70,
    },
    series: [    //系列
        {
            type: 'line',
            data: [120, 1240, 66, 2299, 321, 890, 1200],
            smooth: true,            //平滑曲线的设置
            areaStyle: {            //区域填充样式
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'red', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'blue', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
        },
    ],
}
