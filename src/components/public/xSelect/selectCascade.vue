<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-12 20:59:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-14 20:57:21
-->
<template>
    <Cascader :data="data" v-model="value1"></Cascader>
</template>
<script>
import $flyio from '@plugins/ajax';

export default {
    name:"SelectCascade",
    props: {
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            value1: [],
             data: [
                 //{
            //     value: 'beijing',
            //     label: '北京',
            //     children: [
            //         {
            //             value: 'gugong',
            //             label: '故宫'
            //         },
            //         {
            //             value: 'tiantan',
            //             label: '天坛'
            //         },
            //         {
            //             value: 'wangfujing',
            //             label: '王府井'
            //         }
            //     ]
            // }, {
            //     value: 'jiangsu',
            //     label: '江苏',
            //     children: [
            //         {
            //             value: 'nanjing',
            //             label: '南京',
            //             children: [
            //                 {
            //                     value: 'fuzimiao',
            //                     label: '夫子庙',
            //                 }
            //             ]
            //         },
            //         {
            //             value: 'suzhou',
            //             label: '苏州',
            //             children: [
            //                 {
            //                     value: 'zhuozhengyuan',
            //                     label: '拙政园',
            //                 },
            //                 {
            //                     value: 'shizilin',
            //                     label: '狮子林',
            //                 }
            //             ]
            //         }
            //     ],
            // }
            ]
        }
    },
    methods:{
        async init(){
            debugger
            var parmas = this.formConfig.dataSource.parmas ? this.formConfig.dataSource.parmas:{};
            await $flyio.post({
                url: this.formConfig.dataSource.url,
                data:{ ...parmas,maxResultCount:200}
            }).then((res) => {
                if(res.result.code==200){
                    debugger
                    // if(this.formConfig[item].dataSource.col){
                    //     var data = res.result.item.map((e,index)=>{
                    //         for(var i=0;i<this.formConfig[item].dataSource.col.length;i++){
                    //             e[this.formConfig[item].dataSource.col[i]['k']] = e[this.formConfig[item].dataSource.col[i]['v']];
                    //         }
                    //         return e;
                    //     });    
                    // } else {
                    //     var data = res.result.item.map((e,index)=>{
                    //         e.value = e.id;
                    //         return e;
                    //     });
                    // }
                    this.data = res.result.item;
                }
            })  
        },
    },
    created(){
        this.init();     
    }
}
</script>