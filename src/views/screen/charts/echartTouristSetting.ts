export const touristSetting = {
    title: {
        text: '散点图',
        left: '40%',
        textStyle: {
            color: 'white',
        },
    },
    xAxis: {
        type: 'category',
        show: true,
    },
    yAxis: {
        show: false,
    },
    grid: {
        left: 20, top: 20, right: 0, bottom: 20,
    },
    series: {
        type: 'scatter',
        data: [
            33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313, 123, 5, 657, 7,
        ],
        symbol: 'diamond',        //标记图形设置
        symbolSize: 16,
        label: {        //图文标签
            show: true,
            position: 'top',
            color: 'red',
        },
        itemStyle: {        //散点图标记的颜色
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
}