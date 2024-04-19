export const attractionSetting = {
    title: {
        text: '景区排行',
        link: 'http://www.baidu.com',
        left: '50%',
        textStyle: {        //主标题文字样式
            color: 'yellowgreen',
            fontSize: 20,
        },
        subtext: '各大景区排行',        //子标题
        subtextStyle: {        //子标题的样式
            color: 'yellowgreen',
            fontSize: 16,
        },
    },
    xAxis: {
        type: 'category',
    },
    yAxis: {},
    grid: {
        left: 20, bottom: 20, right: 20,
    },
    series: [
        {
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70],
            label: {
                show: true,
                position: 'insideTop',  //文字的位置
                color: 'yellowgreen',    //文字颜色
            },
            showBackground: true,   //是否显示背景颜色
            backgroundStyle: {
                color: {    //底部背景的颜色
                    type: 'linear',
                    x: 0,y: 0,x2: 0,y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'black', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'blue', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
            itemStyle: {       //柱条的样式
                borderRadius: [10, 10, 0, 0],
                color: function (data: any) {   //柱条颜色
                    const arr = [   //给每一个柱条这是背景颜色
                        'red',
                        'orange',
                        'yellowgreen',
                        'green',
                        'purple',
                        'hotpink',
                        'skyblue',
                    ]
                    return arr[data.dataIndex]
                },
            },
        },
        {
            type: 'line',
            data: [10, 20, 30, 40, 50, 60, 90],
            smooth: true, //平滑曲线
        },
        {
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70],
            label: {    //柱状图的:图形上的文本标签，
                show: true,
                position: 'insideTop',  //文字的位置
                
                color: 'yellowgreen',   //文字颜色
            },
            showBackground: true,
            backgroundStyle: {
                color: {    //底部背景的颜色
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'black', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'blue', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
            
            itemStyle: {//柱条的样式
                borderRadius: [10, 10, 0, 0],
                color: function (data: any) {//柱条颜色
                    const arr = [//给每一个柱条这是背景颜色
                        'red',
                        'orange',
                        'yellowgreen',
                        'green',
                        'purple',
                        'hotpink',
                        'skyblue',
                    ]
                    return arr[data.dataIndex]
                },
            },
        },
    ],
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.7)',
    },
}