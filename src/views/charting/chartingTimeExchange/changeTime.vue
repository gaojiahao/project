<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-20 14:14:14
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">基本信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="form">
                <template slot="button">
                    <div style="width:100%">   
                    </div>
                </template>
            </ViewForm>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">制作信息</Divider>
        <div class="top_tabale">
            <div class="myTable">
                <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" :transfer="true"></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="top" v-if="showTime">
        <Divider orientation="left" size="small">时间调换</Divider>
        <div class="top_tabale">
            <ChartingFullCalendar :config="selectData"></ChartingFullCalendar>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/charting/chartingDelegation/productAppointStoreConfig";
import ViewForm from "@components/public/form/viewForm";
import ChartingFullCalendar from "@components/charting/chartingFullCalendar";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import {
    CreateFileDistribution,
    GetFileDistributionPage,
    UpdateFileDistribution
} from "@service/tortExamineService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'ChangeTime',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        ChartingFullCalendar
    },
    mixins: [config],
    data(){
        return{
            columns: [
                {
                    title: '平台名称',
                    key: 'platformName',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.platformName);
                    }
                },
                {
                    title: '店铺',
                    key: 'storeName',
                },
                {
                    title: '制作类型',
                    key: 'fileType',
                },
                {
                    title: '制作人',
                    key: 'userName',
                },
                {
                    title: '制作时间',
                    key: 'chartingTime',
                    render: (h, params) => {
                        var _self = this;
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('div',{
                                style: {
                                    display: !params.row.edit ? 'block':'none',
                                    lineHeight: '32px'
                                }
                            }, params.row.startTime+"--"+params.row.endTime),
                            h('div', {
                                style: {
                                    lineHeight: '32px',
                                    marginLeft: '5px',
                                    color:'#5cadff'
                                },
                                on: {
                                    'click': (event) => {
                                        // _self.data[params.index]['edit'] = _self.data[params.index]['edit'] ? false:true;
                                        _self.showTime = true;
                                        _self.selectData = _self.data[params.index];
                                        this.GetFileDistributionPageById();
                                    }
                                },
                            }, '调换')
                        ]);
                    }
                }
                // {
                //     title: '制作时间',
                //     key: 'chartingTime',
                //     render: (h, params) => {
                //         var _self = this;
                //         return h('div', {
                //             style: {
                //                 display: 'flex',
                //             }
                //         }, [
                //             h('div',{
                //                 style: {
                //                     display: !params.row.edit ? 'block':'none',
                //                     lineHeight: '32px'
                //                 }
                //             }, params.row.chartingTime,),
                //             h('DatePicker', {
                //                 props: {
                //                     value: params.row.chartingTime.split(" -- "),
                //                     format: "yyyy-MM-dd HH:mm",
                //                     type: "datetimerange",
                //                     transfer: true,
                //                     editable: false
                //                 },
                //                 style: {
                //                     display: params.row.edit ? 'block':'none'
                //                 },
                //                 on: {
                //                     'on-change': (event) => {
                //                         _self.data[params.index][params.column.key] = event.currentTarget.value;
                //                     },
                //                     'on-ok': (event) => {
                //                         _self.loading = true;
                //                         setTimeout(() => {
                //                             this.loading = false;
                //                             _self.data[params.index]['edit'] = _self.data[params.index]['edit'] ? false:true;
                //                         }, 1000);
                //                     }
                //                 },
                //             }),
                //             h('div', {
                //                 style: {
                //                     lineHeight: '32px',
                //                     marginLeft: '5px',
                //                     color:'#5cadff'
                //                 },
                //                 on: {
                //                     'click': (event) => {
                //                         _self.data[params.index]['edit'] = _self.data[params.index]['edit'] ? false:true;
                //                         _self.showTime = true;
                //                         _self.selectData = _self.data[params.index];
                //                     }
                //                 },
                //             }, !params.row.edit ? '编辑':'确认')
                //         ]);
                //     }
                // }
            ],
            data: [],
            loading: true,
            isSelectPeople:'',
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            showTime:false,
            selectData:{},
            peopleData:[]
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
                                categoryName: res.result.item.categoryName,
                                productImg:[{name:'',url:res.result.item.imgOne},{name:'',url:res.result.item.imgTwo},{name:'',url:res.result.item.imgThree}]
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
        GetFileDistributionPage(){
            this.id = this.$route.query.id;
            if(this.id) {
                this.loading = true;
                return new Promise((resolve, reject) => {
                    GetFileDistributionPage({userId:0,goodsId:this.id,...this.pageData}).then(res => {
                        if (res.result.code == 200) {
                            this.data = res.result.item.items;
                            this.totalPage = res.result.item.totalCount;
                            this.loading=false;
                        } else if (res.result.code = 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        GetFileDistributionPageById(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetFileDistributionPage({userId:this.selectData.userId,goodsId:0,...this.pageData}).then(res => {
                        if (res.result.code == 200) {
                            this.peopleData = res.result.item.items;
                        } else if (res.result.code = 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        changePage() {},
        onCurrentChange(currentRow,oldCurrentRow){
            
        },
    },
    created() {
        this.getFormData();
        this.GetFileDistributionPage();
    }
}
</script>
<style scoped>
>>>.ivu-form-item-content {
    flex-direction: column;
}
</style>
<style lang="less" scoped>
@import  "~@less/form.less";
.myTable{
    padding:10px;
}
</style>
