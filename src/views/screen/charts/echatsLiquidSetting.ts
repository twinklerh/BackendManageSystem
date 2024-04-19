export const liquidSetting = {
    title: { text: '水球图' },
    xAxis: {},
    yAxis: {},
    series: {   //  决定你展示什么样的图形
        type: 'liquidFill',
        data: [0.6, 0.5, 0.42],  //  波浪
        radius: '80%', //  水球图半径
        outline: {
            show: true,
            borderDistance: 8,
            itemStyle: {
                color: 'red',
                borderWidth: 8,
                borderColor: '#294D99',
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.25)'
            }
        }
    },
    grid: {
        left: 0, right: 90, top: 0, bottom: 0
    }
}