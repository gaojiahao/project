<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-20 16:48:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-20 16:49:36
-->
<template>
    <div class="siggle-chart" id="barChart">
        
    </div>
</template>
<script>
import * as echarts from 'echarts/core';
import {
    GridComponent
} from 'echarts/components';
import {
    BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [GridComponent, BarChart, CanvasRenderer]
);

export default {
    name:"NewProductsTotal",
    data() {
        return {}
    },
    methods:{
        drawLine(){
            var chartDom = document.getElementById('barChart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            };
            option && myChart.setOption(option);
        },
    },
    mounted(){
        this.drawLine();
    },
}
</script>