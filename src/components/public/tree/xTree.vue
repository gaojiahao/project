<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-04 20:23:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-18 19:31:30
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
        <div style="overflow-y: scroll;height: 400px;position: relative;">
            <Tree :data="datas" :render="renderContent" expand-node ref="tree"></Tree>
        </div>
    </Modal>
</div>
</template>

<script>
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
        configName:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            datas:[],
            show: false,
            titleText: '选择',
            checkText: '类目名称',
            placeholder: '',
            fullscreen: false,
            hidden: false,
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
                //this.calleArr(this.datas);
            },
            deep:true,
            immediate:true,
        }
    },
    methods: {
        renderContent (h, { root, node, data }) {
            var t = this,
            e = t.$createElement;
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    click: () => {
                    if (!node.node.selected)
                        this.$refs.tree.handleSelect(node.nodeKey); //手动选择树节点
                        this.selected = data;
                    }
                }
            }, [
                h('span', [
                    // h('Icon', {
                    //     props: {
                    //         type: 'ios-paper-outline'
                    //     },
                    //     style: {
                    //         marginRight: '8px'
                    //     }
                    // }),
                    h('span', data.name)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [])
            ]);
        },
        showModel() {
            this.show = true;
        },
        fullModel() {
            this.fullscreen = this.fullscreen ? false : true;
        },
        calleArr: function(data){
            for(var i in data){
                if(this.value == data[i].id){
                    this.name = data[i].name;
                    // data[i]['checked'] = true;
                    data[i]['selected'] = true;
                }
                data[i] = {
                    ...data[i],
                    title:data[i].name
                }
                if(data[i].children.length){
                    for(var j=0;j<data[i].children.length;j++){
                        if(data[i].children[j]['id']==this.value){
                            data[i]['expand'] = true;
                        }    
                    }
                    this.calleArr(data[i].children);
                }
            }
        },
        cancel(){
            this.$emit('show-modal',false);
            this.selected=[];
            this.fullscreen = false;
        },
        ok(){
            this.handleInput(this.selected.id);
            this.name = this.selected.name;
            this.$emit('on-select',{label: this.selected.name,tag: this.configName,value: this.selected.id});
        },
        handleInput(value) {
            this.$emit('change', value)
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
