const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
const points = [
    { value: [116.405285, 39.904989], itemStyle: { color: '#FFFA00' } },
    { value: [113.54909, 22.198951], itemStyle: { color: '#00EEFF' } },
    { value: [91.132212, 29.660361], itemStyle: { color: '#00EEFF' } },
    { value: [126.642464, 45.756967], itemStyle: { color: '#00EEFF' } },
    { value: [87.617733, 43.792818], itemStyle: { color: '#00EEFF' } },
]

export const mapSetting = {
    geo: {
        map: 'China',
        roam: true, // 是否开启放大缩小/拖拽功能
        zoom: 1.2, // 缩放比列
        layoutCenter: ['50%', '50%'], // 地图中心点位置
        layoutSize: '100%',
        label: {
            show: true,
            color: '#fff',
            fontSize: 18,
        },
        itemStyle: {
            areaColor: '#12235c',
            borderColor: '#2ab8ff',
            borderWidth: .5,
            shadowColor: 'rgba(0,54,255, 0.4)',
            shadowBlur: 100
        },
        emphasis: { //区域激活时的样式
            itemStyle: {
                areaColor: '#02102b',
            },
            label: {
                color: "#fff"
            }
        }
    },
    series: [ // 添加迁移线数据
        {
            type: 'lines',
            data: [ // 配置多个点的数据
                {
                    coords: [
                        [116.405285, 39.904989],
                        [113.54909, 22.198951],
                    ]
                },
                {
                    coords: [
                        [116.405285, 39.904989],
                        [91.132212, 29.660361],
                    ]
                },
                {
                    coords: [
                        [116.405285, 39.904989],
                        [126.642464, 45.756967]
                    ]
                },
                {
                    coords: [
                        [116.405285, 39.904989],
                        [87.617733, 43.792818]
                    ]
                }
            ],
            effect: {
                show: true,
                period: 5, //箭头指向速度，值越小速度越快
                trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
                // symbol: 'arrow', //箭头图标
                symbol: planePath,
                // 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg5NzY1NjcyMTMyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU0MTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE4NC4yMTU1MzggNjc5LjEzNTg4NGwxNjEuNDM1OTAyIDE2MC42MzY0MDNjOC43OTA0MzEgOC43OTA0MzEgMjQuNzc0MzI0IDEzNS44NjIwNzkgMTUuOTgzODkzIDE0NC42NTI1MWwtMzEuOTY3Nzg2IDMxLjk2Nzc4N2MtOC43OTA0MzEgOC43OTA0MzEtMjMuMTc3MzU2IDguNzkwNDMxLTMxLjk2Nzc4NyAwbC0xNi43ODMzOTMtMTYuNzgzMzkyLTEyNy44NjkxMTctMTI3Ljg2OTExOGMtNTEuOTQ3MTQ2LTUxLjk0NzE0Ni0xMDQuNjkzNzkxLTEwMy44OTQyOTItMTI5LjQ2ODExNi0xMjkuNDY4MTE2bC0xNS45ODM4OTMtMTUuOTgzODkzYy04Ljc5MDQzMS04Ljc5MDQzMS04Ljc5MDQzMS0yMy4xNzczNTYgMC0zMS45Njc3ODdsMzEuOTY3Nzg3LTMxLjk2Nzc4NmM4Ljc5MDQzMS04Ljc5MDQzMSAxMzUuODYwMDUgNy45OTI5NjEgMTQ0LjY1MjUxIDE2Ljc4MzM5MnoiIGZpbGw9IiNEOERCREIiIHAtaWQ9IjU0MjAiPjwvcGF0aD48cGF0aCBkPSJNMjQ0LjE1MzYxNiA5Ni41MzAzNzhjLTIzLjk3NDgyNSAwLTQzLjk1NjIxNCAxOS45NzkzNTktNDMuOTU2MjE0IDQzLjk1NjIxNHMxOS45NzkzNTkgNDMuOTU2MjE0IDQzLjk1NjIxNCA0My45NTYyMTQgNDMuOTU2MjE0LTE5Ljk3OTM1OSA0My45NTYyMTQtNDMuOTU2MjE0LTE5Ljk4MTM4OS00My45NTYyMTQtNDMuOTU2MjE0LTQzLjk1NjIxNHogbTEzNS44NjIwNzggNDcuOTQ5NjUxYy0yMy45NzQ4MjUgMC00My45NTYyMTQgMTkuOTc5MzU5LTQzLjk1NjIxNCA0My45NTYyMTRzMTkuOTc5MzU5IDQzLjk1NjIxNCA0My45NTYyMTQgNDMuOTU2MjE0IDQzLjk1NjIxNC0xOS45NzkzNTkgNDMuOTU2MjE0LTQzLjk1NjIxNC0xOS45ODEzODktNDMuOTU2MjE0LTQzLjk1NjIxNC00My45NTYyMTR6IG00OTkuNDkyMTAyIDQ5MS41MDExNjljMC0yMy45NzQ4MjUtMTkuOTc5MzU5LTQzLjk1NjIxNC00My45NTYyMTQtNDMuOTU2MjE0cy00My45NTYyMTQgMTkuOTc5MzU5LTQzLjk1NjIxNCA0My45NTYyMTRjMCAyMy45NzQ4MjUgMTkuOTc5MzU5IDQzLjk1NjIxNCA0My45NTYyMTQgNDMuOTU2MjE0czQzLjk1NjIxNC0xOS4xODE4OSA0My45NTYyMTQtNDMuOTU2MjE0eiBtMy45OTU0NjYgOTEuOTA1ODY1Yy0yMy45NzQ4MjUgMC00My45NTYyMTQgMTkuOTc5MzU5LTQzLjk1NjIxNCA0My45NTYyMTQgMCAyMy45NzQ4MjUgMTkuOTc5MzU5IDQzLjk1NjIxNCA0My45NTYyMTQgNDMuOTU2MjE0IDIzLjk3NDgyNSAwIDQzLjk1NjIxNC0xOS45NzkzNTkgNDMuOTU2MjE0LTQzLjk1NjIxNC0wLjAwMjAyOS0yMy45NzY4NTUtMTkuOTgxMzg5LTQzLjk1NjIxNC00My45NTYyMTQtNDMuOTU2MjE0eiIgZmlsbD0iIzY3Njc2NyIgcC1pZD0iNTQyMSI+PC9wYXRoPjxwYXRoIGQ9Ik01OTguOTkzMjA3IDI2Ny41NTYyMTFsMTU4LjIzOTkzNSAxNTguMjM5OTM1YzE3LjU4Mjg5MSAxNy41ODI4OTEgMTkxLjgwNDY5MSA1MDQuMjg3MDY2IDE3NC4yMjE4IDUyMS44Njk5NThsLTYzLjEzNjA3NSA2My4xMzYwNzRjLTE3LjU4Mjg5MSAxNy41ODI4OTEtNDUuNTUzMTgzIDE3LjU4Mjg5MS02My4xMzYwNzQgMEw0NTUuOTM3NjY2IDU2Ny4yNTA2NiAxMy4xODc2NzYgMjE5LjYwNDUzMWMtMTcuNTgyODkxLTE3LjU4Mjg5MS0xNy41ODI4OTEtNDUuNTUzMTgzIDAtNjMuMTM2MDc1bDYzLjEzNjA3NC02My4xMzYwNzRjMTcuNTgyODkxLTE3LjU4MDg2MiA1MDUuMDg2NTY1IDE1Ni42NDA5MzcgNTIyLjY2OTQ1NyAxNzQuMjIzODI5eiIgZmlsbD0iI0Q4REJEQiIgcC1pZD0iNTQyMiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMDA0Ljk4MDQ0NSAxOS44MDY4NzljNDMuOTU2MjE0IDQzLjk1NjIxNCA0Ljc5NDk2NSAxNTMuNDQyOTQxLTQ3LjE1MjE4MSAyMDYuMTg5NTg2bC01NzEuNDE4NjA2IDU3MC42MTkxMDdjLTUyLjc0NjY0NSA1Mi43NDY2NDUtMjQxLjM1NTM2OSAxNzEuMDI1ODMyLTI4NS4zMDk1NTQgMTI3LjA3MTY0OHM3NC4zMjUwMDMtMjMyLjU2MjkwOSAxMjcuMDcxNjQ4LTI4NS4zMDk1NTRsNTcwLjYxOTEwNy01NzEuNDE4NjA2Qzg1MS41MzU0NzUgMTQuMjEyNDE0IDk2MS4wMjQyMzEtMjQuMTQ3MzA2IDEwMDQuOTgwNDQ1IDE5LjgwNjg3OXoiIGZpbGw9IiNFNEU3RTciIHAtaWQ9IjU0MjMiPjwvcGF0aD48cGF0aCBkPSJNMjY3LjMzMDk3MSA2NzYuNzM5NDE2TDgzNy45NTAwNzkgMTA2LjEyMDMwOGM0NC43NTM2ODQtNDQuNzUzNjg0IDEzMC4yNjc2MTUtNzkuMTE5OTY4IDE4MS40MTUyNjItNjIuMzM2NTc1LTMuMTk1OTY3LTkuNTg5OTMtNy45OTA5MzItMTcuNTgyODkxLTE0LjM4NDg5Ni0yNC43NzQzMjQtNDMuOTU2MjE0LTQzLjk1NjIxNC0xNTMuNDQ0OTctNC43OTY5OTQtMjA2LjE5MTYxNSA0Ny45NDk2NTFMMjI4LjE2OTcyMiA2MzcuNTc4MTY3QzE3NS40MjMwNzcgNjkwLjMyNDgxMiA1Ny45NDMzODkgODc4LjkzMTUwNyAxMDEuMDk4MDc1IDkyMi44ODc3MjFjNi4zOTM5NjMgNi4zOTM5NjMgMTYuNzgzMzkyIDkuNTg5OTMgMjkuNTY5Mjg5IDkuNTg5OTMgMC44MDE1MjgtNjguNzI4NTA5IDkxLjkwNzg5NC0yMTAuOTg0NTUxIDEzNi42NjM2MDctMjU1LjczODIzNXoiIGZpbGw9IiNEREUwRTAiIHAtaWQ9IjU0MjQiPjwvcGF0aD48cGF0aCBkPSJNMjgwLjExNjg2OCA0MjguOTkyMTEzbDkwLjMwODg5NiA3MC4zMjc1MDcgMjMwLjk2NTk0LTIzMC45NjU5MzktMi4zOTg0OTctMi4zOTg0OTdjLTQuNzk0OTY1LTQuNzk0OTY1LTQ5LjU0ODY0OS0yMy4xNzczNTYtMTEwLjI4ODI1NS00Ni4zNTI2ODJMMjgwLjExNjg2OCA0MjguOTkyMTEzeiIgZmlsbD0iI0M3Q0FDQSIgcC1pZD0iNTQyNSI+PC9wYXRoPjxwYXRoIGQ9Ik01MjYuMjY3MjAyIDY1Ni43NjAwNTdsMjc4LjExNjA5MiAzNTQuMDQwMDkyYzE1Ljk4Mzg5MyAxNS45ODM4OTMgNDEuNTU3NzE3IDE2Ljc4MzM5MiA1OS4xNDA2MDggMy4xOTU5NjdMNTU2LjYzNTk5MSA2MjYuMzkxMjY4bC0zMC4zNjg3ODkgMzAuMzY4Nzg5eiBtLTEyNy44NzExNDYtMTg4LjYwODcyNEw4LjM5MjcxMSAxNjIuODYyNDJjLTExLjk4ODQyNyAxNy41ODI4OTEtMTAuMzg5NDI5IDQxLjU1NzcxNyA0Ljc5NDk2NSA1Ni43NDIxMTFsMzU0LjgzOTU5MSAyNzguMTE2MDkxIDMwLjM2ODc4OS0yOS41NjkyODl6IiBmaWxsPSIjM0RCMzlFIiBwLWlkPSI1NDI2Ij48L3BhdGg+PHBhdGggZD0iTTM2OC4wMjcyNjcgNDk3LjcyMDYyMmwzMC4zNjg3ODktMjkuNTY5Mjg5LTg3LjkxMDM5OS02OC43MzA1MzktMzAuMzY4Nzg5IDI5LjU2OTI5IDg3LjkxMDM5OSA2OC43MzA1Mzh6IiBmaWxsPSIjMzhBNTkyIiBwLWlkPSI1NDI3Ij48L3BhdGg+PC9zdmc+',
                symbolSize: 15, //图标大小
            },
            lineStyle: {
                color: '#00eaff',
                width: 1, //尾迹线条宽度
                opacity: .7, //尾迹线条透明度
                curveness: .3, //尾迹线条曲直度
            },
        },
        { // 带有涟漪特效动画的散点（气泡）图
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
                number: 3, // 波纹的数量。
                period: 5, // 动画的周期，秒数。
                scale: 17, // 动画中波纹的最大缩放比例。
                brushType: 'fill', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            symbolSize: 2,
            data: points,
        }
    ]
}