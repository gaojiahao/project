<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-23 17:48:37
-->
<template>
<div>
    <Tabs type="card" :animated="false" :value="tabName">
        <TabPane label="基本信息" name="basicInfo">
            <div class="top">
                <Divider orientation="left" size="small">基本信息</Divider>
                <div class="top_tabale">
                    <ViewForm :formValidate="productInfoFormValidate" :ruleValidate="ruleValidate" :formConfig="productInfo" ref="form" :divisionField="divisionField">
                        <template slot="button">
                            <FormItem>
                            </FormItem>
                        </template>
                    </ViewForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="供应商信息" name="sellInfo" :disabled="disabled">
            <AddNewProductTable :data="dataPruch" :loading="loadingPruch" :pageData="pageDataPruch" @change-page="changePagePruch" @on-page-size-change="onPageSizeChangePruch"></AddNewProductTable>
        </TabPane>
        <TabPane label="制作文件" name="uploadInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">上传信息</Divider>
                <div class="top_tabale" style="flex:display;padding:20px;flex-direction:column;display:flex">
                    <UploadPic :length="3" :value="productInfoFormValidate['imgUrl']" :disabled="true" @go-return="goReturn" :hidden="true"></UploadPic>
                </div>
            </div>
        </TabPane>
        <TabPane label="属性" name="propertyInfo" :disabled="disabled">
            <div class="top">
                <!-- <Divider orientation="left" size="small">属性</Divider> -->
                <div class="top_tabale">
                    <AddAttrProductTable :data="dataProp" :loading="loadingProp" :disabled="true" @go-return="goReturn" :hidden="true"></AddAttrProductTable>
                </div>
            </div>
        </TabPane>
        <TabPane label="详细描述" name="detailInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">详细描述</Divider>
                <div class="top_tabale1">
                    <NewHtmlEditor :value="productInfoFormValidate.description" :disabled="true" @go-return="goReturn" :hidden="true"></NewHtmlEditor>
                </div>
            </div>
        </TabPane>
        <TabPane label="日志文件" name="logInfo" :disabled="disabled">
            <AddNewProductTableLog :data="dataLog" :loading="loadingLog" :pageData="pageDataLog" @change-page-log="changePageLog" @on-page-size-change-log="onPageSizeChangeLog" :hidden="true"></AddNewProductTableLog>
        </TabPane>
    </Tabs>
    <div class="top">
        <Divider orientation="left" size="small">制作信息</Divider>
        <div class="top_tabale">
            <div class="myTable">
                <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
                </Table>
                <div style="margin: 10px 0;overflow: hidden">
                    <Button @click="goReturn" style="float: left;">返回</Button>
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
import config2 from "@views/charting/chartingDelegation/productAppointStoreConfig";
import ViewForm from "@components/public/form/viewForm";
import ChartingFullCalendar from "@components/charting/chartingFullCalendar";
import config from "@views/basicinfo/developNewProducts/viewNewProductConfig";
import AddNewProductTable from "@components/basicinfo/developNewProducts/addNewProductTable";
import AddNewProductTableUploadPic from "@components/basicinfo/developNewProducts/addNewProductTableUploadPic";
import AddNewProductTableUploadVideo from "@components/basicinfo/developNewProducts/addNewProductTableUploadVideo";
import AddNewProductTableUpload3D from "@components/basicinfo/developNewProducts/addNewProductTableUpload3D";
import AddNewProductTableUploadMusic from "@components/basicinfo/developNewProducts/addNewProductTableUploadMusic";
import AddNewProductTableLog from "@components/basicinfo/developNewProducts/addNewProductTableLog";
import UploadPic from "@components/basicinfo/developNewProducts/uploadPic";
import NewHtmlEditor from "@components/basicinfo/developNewProducts/newHtmlEditor";
import AddAttrProductTable from "@components/basicinfo/developNewProducts/addAttrProductTable";
import {
    CreatePrepGoods,
    CraeteGoodsSupplier,
    GetGoodsSupplierPage,
    GetPrepGoodsById,
    UpdatePrepGoods,
    GetPrepGoodsAttributeById,
    UpdatePrepGoodsAttribute,
    GetOperationLogPage
} from "@service/basicinfoService"
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
        ChartingFullCalendar,
        AddNewProductTable,
        AddNewProductTableUploadPic,
        AddNewProductTableUploadVideo,
        AddNewProductTableUpload3D,
        AddNewProductTableUploadMusic,
        AddNewProductTableLog,
        UploadPic,
        NewHtmlEditor,
        AddAttrProductTable,
    },
    mixins: [config,config2],
    data(){
        return{
            tabName:'basicInfo',
            divisionField:{
                value:'material',
                name:'其他信息'
            },
            productId:'',
            dataPruch:[],
            pageDataPruch:{
                skipCount: 1,
                skipTotal: 5,
                maxResultCount: 5,
                keyword:'',
                pageSizeOpts:[5,50,200],
                totalPagePruch:0
            },
            loadingPruch:true,
            dataProp:[],
            loadingProp:true,
            pageDataLog:{
                skipCount: 1,
                skipTotal: 5,
                maxResultCount: 5,
                keyword:'',
                pageSizeOpts:[5,50,200],
                totalPagePruch:0
            },
            dataLog:[],
            loadingLog:true,
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
                    key: 'fileTypeName',
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
    computed:{
        disabled(){
            return this.productId ? false : false;
        }
    },
    methods: {
        GetGoodsSupplierPage() {
            if(this.productId){
                return new Promise((resolve, reject) => {
                    GetGoodsSupplierPage({goodsId:this.productId,...this.pageDataPruch}).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.pageDataPruch.totalPagePruch = res.result.item.totalCount;
                                this.dataPruch = res.result.item.items;
                                this.loadingPruch = false;
                            });
                        }
                    });
                });
            }
        },
        GetPrepGoodsAttributeById() {
            if(this.productId){
                return new Promise((resolve, reject) => {
                    GetPrepGoodsAttributeById({id:this.productId}).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.dataProp = res.result.item.attributesList;
                                this.loadingProp = false;
                            });
                        }
                    });
                });
            }
        },
        changePagePruch(page){
            this.pageDataPruch.skipCount = page;
            this.GetGoodsSupplierPage();
        },
        onPageSizeChangePruch(pagesize){
            this.pageDataPruch.maxResultCount = pagesize;
            this.GetGoodsSupplierPage();
        },
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPrepGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.productInfoFormValidate = {
                                id: res.result.item.id,
                                code:res.result.item.code,
                                name: res.result.item.name,
                                categoryId: res.result.item.categoryId,
                                categoryName: res.result.item.categoryName,
                                characteristic:res.result.item.characteristic,
                                logisticsLabel: res.result.item.logisticsLabel,
                                brandId:res.result.item.brandId,
                                brandName:res.result.item.brandName,
                                imgUrl: [],
                                isPackage: res.result.item.isPackage,
                                weight:res.result.item.weight,
                                productSize:{
                                    long: res.result.item.howlong,
                                    wide: res.result.item.width,
                                    high: res.result.item.high,
                                    volume: res.result.item.volume,
                                },
                                material:res.result.item.material,
                                packageCost:res.result.item.packageCost,
                                packageWeight:res.result.item.packageWeight,
                                packagingSize:{
                                    long: res.result.item.packageLong,
                                    wide: res.result.item.packageWidth,
                                    high: res.result.item.packageHigh,
                                    volume: res.result.item.packageVolume,
                                },
                                features:res.result.item.features,
                                remark:res.result.item.remark,
                                description:res.result.item.description,
                            }
                            if(res.result.item.imgOne){
                                this.productInfoFormValidate['imgUrl'].push({
                                    filePath:res.result.item.imgOne,
                                    type:res.result.item.imgOne ? res.result.item.imgOne.substring(res.result.item.imgOne.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgOne,
                                    status:'finished',
                                });
                            }
                            if(res.result.item.imgTwo){
                                this.productInfoFormValidate['imgUrl'].push({
                                    filePath:res.result.item.imgTwo,
                                    type:res.result.item.imgTwo ? res.result.item.imgTwo.substring(res.result.item.imgTwo.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgTwo,
                                    status:'finished',
                                });
                            }
                            if(res.result.item.imgThree){
                                this.productInfoFormValidate['imgUrl'].push({
                                    filePath:res.result.item.imgThree,
                                    type:res.result.item.imgThree ? res.result.item.imgThree.substring(res.result.item.imgThree.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgThree,
                                    status:'finished',
                                });
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
        GetOperationLogPage(){
            if(this.productId){
                return new Promise((resolve, reject) => {
                    GetOperationLogPage({goodsId:this.productId,...this.pageDataLog}).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.dataLog = res.result.item.items;
                                this.loadingLog = false;
                                this.pageDataLog.totalPagePruch = res.result.item.totalCount;
                            });
                        }
                    });
                });
            }    
        },
        changePageLog(page){
            this.pageDataLog.skipCount = page;
            this.GetOperationLogPage();
        },
        onPageSizeChangeLog(pagesize){
            this.pageDataLog.maxResultCount = pagesize;
            this.GetOperationLogPage();
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
        goReturn(){
            this.$router.go(-1);
        },
    },
    created() {
        this.productId = this.$route.query.id;
        this.getFormData();
        this.GetGoodsSupplierPage();
        this.GetPrepGoodsAttributeById();
        this.GetOperationLogPage();
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
.top_tabale1{
    background-color: #FFFFFF;
}
</style>
