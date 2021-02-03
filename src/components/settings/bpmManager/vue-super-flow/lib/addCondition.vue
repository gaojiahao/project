<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-03 10:24:52
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        width="800"
        draggable >
        <div class="action">
            <div class="action-button">
                <Form :model="node" ref="dataForm" :label-width="0" inline>
                    <FormItem label="">
                        <Select v-model="formData['nexus']" :style="{width:'80px',float: 'left'}" size="small" clearable  filterable>
                            <Option v-for="item in conditionalList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="">
                        <Select v-model="formData['displayName']" :style="{width:'200px',float: 'left'}" size="small" clearable  filterable @on-select="onChange" :label-in-value='true'>
                            <Option v-for="item in formSettings" :value="item.displayName" :key="item.id" :tag="item.id">{{ item.displayName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="">
                        <Select v-model="formData['logicType']" :style="{width:'80px',float: 'left'}" size="small" clearable filterable>
                            <Option v-for="item in operatorList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="">
                        <Input v-model="formData['value']" :style="{width:'200px'}" size="small"></Input>
                    </FormItem>
                    <FormItem label="">
                        <Button size="small" type="primary" icon="ios-add" @click.native="add" class="marginRight">新增</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <Table border :loading="loading" highlight-row :columns="columns" :data="selectAddCondition" stripe ref="selection" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" icon="ios-close" @click="del(index)" class="marginRight">删除</Button>
            </template>
        </Table>
    </Modal>   
</template>
<script>
export default {
    name: 'AddCondition',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '条件设置'
        },
        formSettings:{
            type:Array,
            default () {
                return []
            }
        },
        selectAddCondition:{
            type:Array,
            default () {
                return []
            }           
        },
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
        },
    },
    data () {
        return {
            visble: false,
            loading: true,
            node:{},
            columns: [
                {
                    title: '条件关系',
                    key: 'nexusText',
                },
                {
                    title: '字段名称',
                    key: 'displayName',
                    
                },
                {
                    title: '逻辑判断',
                    key: 'logicText',
                },
                {
                    title: '输入值',
                    key: 'value',
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                },
            ],
            data: [],
            conditionalList:[
                {name:'并且',value:'and'},
                {name:'或者',value:'or'},
            ],
            operatorList:[
                {name:'等于',value:'='},
                {name:'不等于',value:'<>'},
                {name:'大于',value:'>'},
                {name:'小于',value:'<'},
                {name:'大于等于',value:'>='},
                {name:'小于等于',value:'<='}, 
                {name:'为空',value:'nul'},
                {name:'不为空',value:'not null'},
                {name:'包含',value:'in'},
                {name:'不包含',value:'not in'},
                {name:'以...开头',value:'left'},
                {name:'以...结尾',value:'right'},
            ],
            formData:{},
            selectF:{}
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','AddConditionModal',false);
        },
        ok(){
            this.$emit('save',this.selectAddCondition);
            this.$emit('show','AddConditionModal',false);
        },
        onCurrentChange(){},
        add(){
            this.loading = true;
            this.formData = {
                fId:this.selectF.tag,
                ...this.formData,
                columnName: (this.formSettings.find(item=>item.displayName === this.formData.displayName))['columnName'],
                nexusText: (this.conditionalList.find(item=>item.value === this.formData.nexus))['name'],
                logicText: (this.operatorList.find(item=>item.value === this.formData.logicType))['name'],
            }
            this.selectAddCondition.push(this.formData);
            this.formData = {
                nexus: this.conditionalList[0].value,
                displayName:'',
                logicType: this.operatorList[0].value,
                value:'' 
            },
            this.selectF = {};
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        del(index){
            this.selectAddCondition.splice(index, 1);
        },
        onChange(data){
            this.selectF = data;
        }
    },
    created() {
        this.formData = {
            nexus: this.conditionalList[0].value,
            displayName:'',
            logicType: this.operatorList[0].value,
            value:'' 
        },
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>
<style lang="less" scoped>
.action {
    height: 42px;
    .action-button {
        float: left;
        .marginRight{
            margin-right: 10px;
        }
        /deep/ .ivu-form-item-content {
            position: unset;
            line-height: unset;
            font-size: unset;
        }
    }
}
</style>
