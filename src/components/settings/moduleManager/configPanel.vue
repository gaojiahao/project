<template>
    <div class="form-container" v-if="visible">
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                字段配置
            </div>
            <div class="ef-node-form-body">
                <!--开始节点-->
                <Form :model="data" ref="formValidate" :label-width="80">
                    <FormItem label="字段值">
                        <Input v-model="data.fieldCode" @on-blur="change"></Input >
                    </FormItem>
                    <FormItem label="字段名称">
                        <Input v-model="data.fieldName"></Input >
                    </FormItem>
                    <FormItem label="字段类型">
                        <Select v-model="data.type">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="隐藏">
                        <RadioGroup v-model="data.hidden">
                            <Radio label="false" >
                                是
                            </Radio>
                            <Radio label="true" >
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="只读">
                        <RadioGroup v-model="data.edit">
                            <Radio label="true" >
                                是
                            </Radio>
                            <Radio label="false" >
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="必填">
                        <RadioGroup v-model="data.required">
                            <Radio label="true" >
                                是
                            </Radio>
                            <Radio label="false" >
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="提交">
                        <RadioGroup v-model="data.submit">
                            <Radio label="true" >
                                是
                            </Radio>
                            <Radio label="false" >
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="单位">
                        <Input v-model="data.unit"></Input >    
                    </FormItem>
                    <FormItem label="默认值">
                        <Input v-model="data.defaultValue"></Input >
                    </FormItem>
                    <template v-if="['select','selectorSingle','selectorMulti'].indexOf(data.type)!=-1">
                        <FormItem label="数据源类型">
                            <Select v-model="dataSource.type">
                                <Option v-for="item in dataSourceList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="数据列" v-if="dataSource.type=='static'">
                            <Input v-model="dataSource.data" type="textarea" :autosize="{minRows: 5,maxRows: 10}" />
                        </FormItem>
                        <FormItem label="数据源" v-else-if="dataSource.type=='dynamic'">
                            <Input v-model="dataSource.url"></Input >
                        </FormItem>
                        <FormItem label="显示值">
                            <Input v-model="dataSource.displayCode"></Input >
                        </FormItem>
                        <FormItem label="显示字段">
                            <Input v-model="dataSource.displayName"></Input >
                        </FormItem>
                    </template>
                    <template v-if="['radio'].indexOf(data.type)!=-1">
                        <FormItem label="数据列">
                            <Input v-model="dataSource.data" type="textarea" :autosize="{minRows: 5,maxRows: 10}" />
                        </FormItem>
                    </template>
                    <template v-if="['float'].indexOf(data.type)!=-1">
                        <FormItem label="精确位数">
                            <Input v-model="data.accurate" />
                        </FormItem>
                         <FormItem label="四舍五入">
                            <RadioGroup v-model="data.rounding">
                                <Radio label="true" >
                                    是
                                </Radio>
                                <Radio label="false" >
                                    否
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                    </template>
                </Form>
            </div>
        </div>
    </div>

</template>

<script>
    import {
    Row,
    Col,
    } from "view-design";

    export default {
        name:'ConfigPanel',
        props:{
            visible: {
                type: Boolean,
                default: false
            },
            data:{
                type:Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                typeList:[
                    {name:'文本',value:'text'},
                    {name:'文本域',value:'textarea'},
                    {name:'整数',value:'number'},
                    {name:'小数',value:'float'},
                    {name:'单选',value:'radio'},
                    {name:'下拉',value:'select'},
                    {name:'单项选择器',value:'selectorSingle'},
                    {name:'多项选择器',value:'selectorMulti'},
                    {name:'附件',value:'uploadImage'},
                    {name:'标签',value:'texts'},
                    {name:'商品体积',value:'size'},
                ],
                dataSourceList:[
                    {name:'动态',value:'dynamic'},
                    {name:'静态',value:'static'}, 
                ],
                dataSource:{
                    type:'',
                    data:'',
                    url: ''
                }
            }
        },
        watch:{
            "data.type":{
                handler(val){
                    if(val=='select'){
                        this.data.dataSource= {
                            type:'',
                            data:'',
                        }
                    } else {
                        this.$delete(this.data,'dataSource');
                    }
                }
            },
            dataSource:{
                handler(val){
                    this.data.dataSource = this.dataSource;
                },
                deep: true
            }
        },
        methods: {
            save() {
                this.$emit('save',this.node);
            },
            change(value){
                this.$emit('set-container',this.data);
            }
        },
    }
</script>
<style scoped>
>>>.ivu-form-item-content {
    text-align: left;
}
</style>
<style lang="less" scoped>
    .ef-node-form-header{
        text-align: left;
        padding: 5px 0 0 5px;
    }
    .form-container{
        width: 300px;
        border: 1px solid rgb(220, 227, 232);
        text-align: center;
        background-color: #FFFFFF; 
        .ef-node-form-body{
            padding: 10px 10px 0 0;
        }
    }
    .el-node-form-tag {
        position: absolute;
        top: 50%;
        margin-left: -15px;
        height: 40px;
        width: 15px;
        background-color: #fbfbfb;
        border: 1px solid rgb(220, 227, 232);
        border-right: none;
        z-index: 0;
    }
</style>
