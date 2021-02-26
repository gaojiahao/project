<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-26 17:54:56
-->
<template>
<div class="addAttrProductTable-container">
    <div class="display:block;">
        <div style="margin-bottom: 10px; padding:10px"  v-for="(item,index) in data">
            <div style="position: relative;line-height: 32px;font-size: 14px;">
                <label style="text-align: right;vertical-align: middle;float: left;font-size: 14px;color: #515a6e;line-height: 1;padding: 10px 12px 10px 0;box-sizing: border-box;width: 120px;">{{ item.attributeName }}</label>
                <Select style="width:200px" @on-change="onChange" clearable :label-in-value="true" v-model="list2[item.attributeId]&&list2[item.attributeId]['value']" allow-create filterable @on-create="brandIdCreateFun({value:$event,...item})" :transfer="true" :disabled="disabled" ref="resetSelect">
                    <Option v-for="(dItem,k) in item.valueList" :value="dItem.valueId" :key="dItem.valueId" :tag="item.attributeId">{{ dItem.valueName }}</Option>
                </Select>
            </div>
        </div>
        <div style="margin-bottom: 10px; padding:10px;display: inline-block;" v-if="!disabled">
            <div style="position: relative;line-height: 48px;font-size: 14px;margin-left:120px">
                <Button @click="goReturn" style="float: right; margin-right:10px">返回</Button>
                <!-- <Button @click="clearFormData" style="float: right;margin-right:10px">取消</Button> -->
                <Button type="primary" @click="save" style="float: right; margin-right:10px">保存</Button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $flyio from '@plugins/ajax';
export default {
    name: "AddNewProductTable",
    components: {

    },
    props:{
        data: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type: Boolean,
            default: true,
        },
        pageData:{
            type: Object,
            default () {
                return {}
            }
        },
        disabled:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list2:{}
        }
    },
    watch:{
        data:{
            handler(val){
                for(var i=0;i<val.length;i++){
                    if(val[i].valueList.length){
                        for(var j=0;j<val[i].valueList.length;j++){
                            if(val[i].valueList[j].isSelected){
                                this.list2[val[i]['attributeId']] = {
                                    value: val[i].valueList[j]['valueId'],
                                    label: val[i].valueList[j]['valueName'],
                                    tag: val[i]['attributeId'],
                                };
                            }
                        }
                    }
                }
            },
            deep:true
        }
    },
    methods: {
        clearFormData() {
            this.list2={};
            var arr = this.$refs.resetSelect;
            for(var i=0;i<arr.length;i++){
                arr[i].clearSingleSelect();
            }
        },
        onChange(data){
            if(data&&data.tag)
                this.list2[data.tag]=data;
        },
        save() {
            this.$emit('save',this.list2);
        },
        async brandIdCreateFun(data){
            var params = {
                attributeId: data.attributeId,
                valueName:data.value,
                isEnbale:false,  
            }
            await $flyio.post({
                url: '/api/CreateAttributeValue',
                data: params
                }).then((res) => {
                if(res.result.code==200){
                    this.list2[data.attributeId] = {tag:res.result.item.attributeId,value:res.result.item.id,label:res.result.item.valueName};
                }
            })
        },
        goReturn(){
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="less" scoped>
.addAttrProductTable-container {
    margin-top: 16px;

    .head {
        height: 38px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 38px;
        ;

        .filter-button {
            float: left;
        }

        .filter-search {
            float: right;
        }
    }
}
</style>
