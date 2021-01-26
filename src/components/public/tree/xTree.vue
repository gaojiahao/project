<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-04 20:23:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-26 11:30:21
-->
<template>
<div class="x_tree" :class="[isCheck ? 'ivu-form-item-error':'']" style="width:250px" v-if="!hidden">
    <div class="ivu-input-wrapper box" style="">
        <input type="text" :placeholder="[isCheck ? '':placeholder]" class="ivu-input " disabled :value="name">
    </div>
    <Icon type="md-add-circle" style="color: green; font-size:24px;vertical-align: middle; line-height:34px" @click.native="showModel()" v-if="!disabled"/>
    <div class="ivu-form-item-error-tip" v-show="isCheck">请选择{{checkText}}</div>
    <Modal v-model="show" title="分配权限" @on-ok="ok" @on-cancel="cancel" :fullscreen="fullscreen">
        <p slot="header" style="color:#999;">
            <span>{{titleText}}</span>
            <Icon type="ios-expand" @click.native="fullModel()" class="ivu-modal-full" />
        </p>
        <div style="">
            <Input v-model="searchValue" search enter-button placeholder="" size="small" style="width: 200px" @on-search="initData" clearable />
        </div>
        <div style="overflow-y: scroll;height: 600px;position: relative;">
            <Tree :data="datas" @on-select-change="onSelectChange" ref="tree"></Tree>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    AuthModuleList,
} from "@service/settingsService"
import $flyio from '@plugins/ajax'

export default {
    name: 'XTree',
    model: {
        prop: 'value',
        event: 'change'
    },
    props:{
        value: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default () {
                return {}
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            datas:[],
            show: false,
            titleText: '选择',
            checkText: '分类名称',
            placeholder: '',
            fullscreen: false,
            hidden: false,
            disabled:false,
            name:'',
            selected:{},
            menuData:[],
            searchValue:'',
            isCheck:false
        }
    },
    computed:{
        // isCheck(){
        //     return this.value ? false:true;
        // }
    },
    watch:{
        config:{
            handler(val){
                this.datas = val['dataSource']['data'];
                this.calleArr(this.datas);
            },
            deep:true,
        },
        value:{
            handler(val){

            },
            deep:true,
            immediate:true,
        }
    },
    methods: {
        showModel() {
            this.show = true;
        },
        fullModel() {
            this.fullscreen = this.fullscreen ? false : true;
        },
        calleArr: function(data){
            for(var i in data){
                if(data[i].parent){ 
                    data[i] = {
                        ...data[i].parent,
                        title: data[i].parent.name,
                        children: data[i].children ? data[i].children:[]
                    };
                    this.$delete(data[i],'parent');
                } else {
                    if(this.value == data[i].id){
                        this.name = data[i].name;
                    }
                    data[i] = {
                        ...data[i],
                        title:data[i].name
                    }
                }
                // if(this.roleAuthData.indexOf(data[i]['id'])!=-1){
                //     data[i]['checked'] = true;
                //     data[i]['expand'] = true;
                // }
                if(data[i].children){
                    this.calleArr(data[i].children);
                }
            }
        },
        cancel(){
            this.$emit('show-modal',false);
            this.AuthModuleList();
            this.selected=[];
        },
        ok(){
            this.name = this.selected.name;
            this.$emit('change',this.selected.id);
        },
        initData(){
            var parmas = {};
            parmas[this.config.dataSource.params] = this.searchValue;

            $flyio.post({
                url: this.config.dataSource.url,
                data:{ ...parmas}
            }).then((res) => {
                if(res.result.code==200){
                    this.datas = res.result.item;
                    this.calleArr(this.datas);
                }
            })   
        },
        onSelectChange(selectedAll,selectedItem){
            this.selected=selectedItem;    
        }
    },
    created() {
        
    }
}
</script>
<style lang="less" scoped>
.x_tree {
    .ivu-form-item-error {
        .ivu-input-wrapper {
            .ivu-input-error {
                border: 1px solid #ed4014;
            }
        }
    }
    .box{
        width: 200px; float: left;line-height:32px
    }
}
.ivu-modal-full {
    z-index: 1;
    font-size: 14px;
    float: right;
    margin-right: 20px;
    margin-top: 4px;
}
</style><style scoped>
>>>.ivu-table th,
>>>.ivu-table td {
    height: 28px;
}
</style>
