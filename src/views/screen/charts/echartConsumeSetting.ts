export const consumeSetting = {
    title: {
        text: '游客消费统计',
        textStyle: {
            color: 'white',
        },
    },
    radar: {
        indicator: [
            { name: '消费' },
            { name: '好感' },
            { name: '出行' },
            { name: '小吃' },
            { name: '爱好' },
            { name: '景点' },
        ],
    },
    series: [
        {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: '购物',
                },
                {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: '吃饭',
                },
            ],
        },
    ],
}