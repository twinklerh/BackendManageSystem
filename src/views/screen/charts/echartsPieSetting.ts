export const pieSetting = {
    tooltip: {
        trigger: 'item'
    },
    legend: {   //  图例
        top: '3%',
        orient: 'vertical',
        left: 'right',
        textStyle: {
            color: 'white',
            fontSize: 18,
        }
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'inside',
                color: 'white'
            },
            // emphasis: { //  放大效果
            //     label: {
            //         show: true,
            //         fontSize: 40,
            //         fontWeight: 'bold'
            //     }
            // },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '军事' },
                { value: 735, name: '新闻' },
                { value: 580, name: '直播' },
                { value: 484, name: '娱乐' },
                { value: 300, name: '财经' }
            ]
        }
    ],
    grid: {
        left: 0, right: 0, top: 0, bottom: 0
    }
}