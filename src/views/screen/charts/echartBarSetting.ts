export const barSetting = {
    title: { 
        text: '男女比例',
        left: '40%',
        textStyle: {        //主标题颜色
            color: 'skyblue',
        },
    },
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, type: "category" },   //  不展示y轴，指定了Y轴的类型为分类轴
    series: [
        {
            type: 'bar',
            data: [58],
            barWidth: 20,   //  柱宽
            z: 100,
            itemStyle: { borderRadius: 20 }
        },
        {
            type: 'bar',
            data: [100],
            barWidth: 20,
            barGap: '-100%',    //  柱子向上移动一个柱距
            itemStyle: { color: 'pink', borderRadius: 20 },
        },
    ],
    grid: {
        left: 0, right: 0, top: 0, bottom: 0
    }
}