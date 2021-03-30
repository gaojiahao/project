<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 19:25:16
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">派店信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="form">
                <template slot="button">
                    <div style="width:100%">
                        
                    </div>
                </template>
            </ViewForm>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">制图信息:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="selectionColumns" :data="selectedGoods" height="300" width="1400"></Table>
                        <!-- <span style="margin: 10px;">
                            <Button size="small" @click="handleSelectAll(true)">全选</Button>
                            <Button size="small" @click="handleSelectAll(false)">取消</Button>
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">审核</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" ref="examine">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <!-- <Button type="primary" @click="save(true)" style="float: left;">保存</Button> -->
                            <!-- <Button @click="save(false)" style="float: left; margin-left:10px">不同意</Button> -->
                            <Button @click="goReturn" style="float: left;">返回</Button>   
                        </div>
                    </FormItem>
                </template>
            </ViewForm>
        </div>
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import config from "@views/examine/appointStoreExamine/viewProductConfig";
import config2 from "@views/examine/appointStoreExamine/productAppointStoreConfig";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import {
    GetDistributionReviewInfo,
    CreateDistributionReview
} from "@service/tortExamineService";
import {
    GetReviewActionPage
} from "@service/basicService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'viewChartingExamine',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
    },
    mixins: [config,config2],
    data(){
        return{
            selectionColumns: [
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: params.row.status ==1 ? "#ff9900": params.row.status==2 ? "#19be6b" : params.row.status==3 ? "#ff9900" :"#ed4014"
                        },
                        },params.row.status ==1 ? "未完成":  params.row.status==2 ? "已完成" : params.row.status==3 ? "待返工":"待确认");
                    },
                    width:120
                },
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                {
                    title: '制图类型',
                    key: 'fileTypeName',
                    width:120
                },
                {
                    title: '制图人',
                    key: 'userName',
                    width:120
                },
                {
                    title: '制图数量',
                    key: 'quantity',
                    width:120
                },
                {
                    title: '完成时间',
                    key: 'endTime',
                    width:160
                },
                {
                    title: '下载地址',
                    key: 'goodsFiles',
                    width:400,
                    render: (h, params) => {
                        var arr = params.row.goodsFiles,
                        e= this;
                        return h('ul', arr.map(function (item,index) {
                            // return h('a',{
                            //     domProps:{
                            //     href: e.baseUrl+item.fileUrl,
                            //     target: '_black'
                            //     },
                            //     style: {
                            //     marginRight: '5px'
                            //     }
                            // }, '文件'+parseInt(index+1)+':'+item.name)
                            return h('div', 
                                [
                                    h('Poptip',{
                                        props: {
                                            trigger:'hover',
                                            content:"content",
                                            placement:"right",
                                            transfer:true,
                                        },
                                    },[
                                        h('a', {
                                            domProps:{
                                                href: e.baseUrl+item.fileUrl,
                                                target: '_black'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                        }, '文件'+parseInt(index+1)+':'+item.name),
                                        h('img',{
                                            slot:"content",
                                            attrs: {
                                                src: e.baseUrl+item.fileUrl || require("@assets/default/logo.png")
                                            },
                                            style: {
                                                width: '300px',
                                                height: '300px'
                                            },
                                            class:'api'
                                        })
                                    ])    
                                ]
                            );
                        }))
                    }
                },
                {
                    title: '意见',
                    key: 'remark',
                    width:250
                }
            ],
            notSelectedColumns: [
                 {
                    title: '委派',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:  this.notSelectedGoods[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.notSelectedGoods[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'selectName',
                    width:120
                },
                {
                    title: '选品时间',
                    key: 'selectOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            dontSelectedColumns: [
                 {
                    title: '委派',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:  this.dontSelectedGoods[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.dontSelectedGoods[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'selectName',
                    width:120
                },
                {
                    title: '不选时间',
                    key: 'selectOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            dispatchedColumns: [
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'sellerName',
                    width:120
                },
                {
                    title: '选品时间',
                    key: 'createdOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            selectedGoods:[],
            baseUrl:''
        }
    },
    methods: {
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPrepGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                code:res.result.item.code,
                                name: res.result.item.name,
                                categoryId: res.result.item.categoryId,
                                remark:res.result.item.remark,
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        goReturn(){
            this.$router.go(-1);
        },
        save(){
            var fileReviewInfos=[];
            for(var i=0;i<this.selectedGoods.length;i++){
                this.selectedGoods[i]['id'] = this.selectedGoods[i]['id'];
                this.selectedGoods[i]['isPass'] = this.selectedGoods[i]['isPass'];
                this.selectedGoods[i]['remark'] = this.selectedGoods[i]['remark'];
                fileReviewInfos.push(this.selectedGoods[i]);
            };
            if (fileReviewInfos.length) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateDistributionReview({fileReviewInfos:fileReviewInfos}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：审核成功！');
                            this.goReturn();
                        } else  {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            } else {
                this.$Message.error({
                    background: true,
                    content: '请选择审核信息'
                });
            }
        },
        GetDistributionReviewInfo(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetDistributionReviewInfo({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.selectedGoods = res.result.item;
                            for(var i=0;i<this.selectedGoods.length;i++){
                                this.$set(this.selectedGoods[i],'isPass',true);
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        handleSelectAll(status){
            for(var i=0;i<this.selectedGoods.length;i++){
                this.$set(this.selectedGoods[i],'isPass',status);
            }
        },
        GetReviewActionPage(){
            this.id = this.$route.query.id;
            if(this.id){
                return new Promise((resolve, reject) => {
                    GetReviewActionPage({reviewType:'fileDistributionReview',relatedId:this.id}).then(res => {
                        if(res.result.code==200){
                            for(var i=0;i<res.result.item.items.length;i++){
                                this.formValidate2['reviewRemark'] = res.result.item.items[i]['reviewRemark'];
                            }
                        }
                    });
                });
            }     
        },
    },
    created() {
        this.baseUrl = this.$base_url;
        this.getFormData();
        this.GetDistributionReviewInfo();
        this.GetReviewActionPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
