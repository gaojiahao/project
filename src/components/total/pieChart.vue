<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-20 11:04:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 10:52:34
-->
<template>
    <div class="siggle-chart" id="pieChart">
        
    </div>
</template>
<script>
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import {
    PieChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
);

export default {
    name:"NewProductsTotal",
    data() {
        return {}
    },
    methods:{
        drawLine(){
            var chartDom = document.getElementById('pieChart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
    		    title: {//标题组件
                    text: '新品开发统计',
                    left: 'center'
                },
    		    tooltip: {
    		        trigger: 'item',
    		        formatter: "{b}: {c} ({d}%)", //"{a} <br/>{b}: {c} ({d}%)"
    		        textStyle:{    //图例文字的样式
                        color:'black',  //文字颜色
                        fontSize:12    //文字大小
                    }
    		    },
    		    graphic:[		       	       
    		         {
    		      		type: 'text',              
    		      		top: '40%',           
    		      		left: 'center',          
    		      		style: {
    		      		   text: '10000.00',      
    		      		   fill: '#333333',       
    		      		   fontSize: 20,          
    		      		   fontWeight: 'normal'
    		      		}  		      		        
    		      	},{
    		      		type: 'text',              
    		      		top: '53%',           
    		      		left: 'center',          
    		      		style: {
    		      		   text: '实发工资',      
    		      		   fill: '#A6A8B6',       
    		      		   fontSize: 12,          
    		      		   fontWeight: 'normal'
    		      		}  		      		        
    		      	},      
    		    ],
    		    //圆环的颜色
    		    color:['#48cda6','#fd87fb','#11abff','#ffdf6f','#968ade'],
    		    // 图例
    		    legend: {
    		    	// 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
    		    	selectedMode: true, 
    		        /* orient: 'vertical', */
    		       /*  x : 'right',   //图例显示在右边
                    y: 'center',  */  //图例在垂直方向上面显示居中
                    bottom:0,
                    itemWidth:10,  //图例标记的图形宽度
                    itemHeight:10, //图例标记的图形高度
    		        data:['高家豪','张旦','郭君','张三','李四'],
    		        textStyle:{    //图例文字的样式
                        color:'#A6A8B6',  //文字颜色
                        fontSize:12    //文字大小
                    }
    		    },   		  
    		    series: [
    		        {
    		            name:'工资占比图',//代表a的值，系列名称
    		            type:'pie',
    		            center:['50%','45%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
    		            // radius: ['45%', '60%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
    		            avoidLabelOverlap: false,
    		           /*  animation: false, */  //是否禁用动画效果
    		            label: {
                            show: true, //是否显示标签标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                            position: 'outside', //显示的标签的内容//a（系列名称），b（数据项名称），c（数值）, d（百分比）
                            formatter: "{b}:{c}（{d}%）", //"{a},{b}:{c}（{d}%）"
    		            },
    		            data:[
    		                {value:8000, name:'高家豪'},
    		                {value:100, name:'张旦'},
    		                {value:600, name:'郭君'},
    		                {value:200, name:'张三'},
    		                {value:1100, name:'李四'}
    		            ]
    		        }
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