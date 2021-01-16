<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-12 20:59:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-16 09:03:50
-->
<template>
    <Cascader :data="data" v-model="value1" change-on-select :render-format="format" @on-change="onChange" trigger="hover"></Cascader>
</template>
<script;>
import $flyio from '@plugins/ajax';

export default {
    name:"SelectCascade",
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: Number,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        name:{
            type:String,
            default:''
        }
    },
    watch:{
        value:{
            handler(val){
                this.value1.push(val)
            }
        }
    },
    data () {
        return {
            value1: [],
            data: [],
        }
    },
    methods:{
        format(labels, selectedData) {
            const index = labels.length - 1;
            const data = selectedData[index] || false;
            if (data && data.code) {
                return labels[index] + ' - ' + data.code;
            }
            return labels[index];
        },
        calleArr: function(data){
            for(var i=0;i<data.length;i++){
                data[i]['value'] = data[i].id;
                data[i]['label'] = data[i].name;
                if(data[i]['children']&&data[i]['children'].length){
                    this.calleArr(data[i]['children']);
                }
            }
        },
        onChange(value, selectedData){
            var length = value.length;
            var data = {
                label: selectedData[length-1]['label'],
                tag: this.name,
                value: selectedData[length-1]['id'],
            };
            this.$emit('change', data['value']);
            this.$parent.$parent.$parent.onChange(data);
        },
        async init(){
            var parmas = this.formConfig.dataSource.parmas ? this.formConfig.dataSource.parmas:{};
            await $flyio.post({
                url: this.formConfig.dataSource.url,
                data:{ ...parmas,maxResultCount:200}
            }).then((res) => {
                if(res.result.code==200){
                    this.data = res.result.item;
                    this.calleArr(this.data);
                }
            })  
        },
    },
    created(){
        this.init();     
    }
}
</script>