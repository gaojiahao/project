<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-20 11:04:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-20 12:13:17
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
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:'本周',
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
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