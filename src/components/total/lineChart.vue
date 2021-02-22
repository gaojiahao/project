<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-20 11:04:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 10:01:34
-->
<template>
    <div class="siggle-chart" id="myChart">
        
    </div>
</template>
<script>
import * as echarts from 'echarts/core';
import {
    GridComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [GridComponent, LineChart, CanvasRenderer]
);

export default {
    name:"NewProductsTotal",
    data() {
        return {}
    },
    methods:{
        drawLine(){
            var chartDom = document.getElementById('myChart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                //标题
                title: {
                    text: '新品开发统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right: 'right',
                },
                xAxis: {
                    type: 'category',
                    name: '时间',
                    data: ['2.13', '2.14', '2.15', '2.16', '2.17', '2.18', '2.19',]
                },
                yAxis: {
                    type: 'value',
                    name: '数量',
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 100
                }],
                series: [
                    {
                        name:'所有',
                        data: [16, 33, 39, 44, 32, 41, 41],
                        type: 'line'
                    },
                    {
                        name:'已开发',
                        data: [10, 11, 17, 8, 5, 12, 9],
                        type: 'line'
                    },
                    {
                        name:'未开发',
                        data: [5, 10, 20, 25, 15, 10, 22],
                        type: 'line'
                    },
                    {
                        name:'审核中',
                        data: [1, 2, 5, 3, 2, 7, 1],
                        type: 'line'
                    },
                ]
            };
            option && myChart.setOption(option);
        },
    },
    mounted(){
        this.drawLine();
    },
}
</script>