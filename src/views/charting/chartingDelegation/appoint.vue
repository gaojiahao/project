<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-19 17:51:38
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
                    <UploadPic :length="3" :value="productInfoFormValidate['imgUrl']" :disabled="true"></UploadPic>
                </div>
            </div>
        </TabPane>
        <TabPane label="属性" name="propertyInfo" :disabled="disabled">
            <div class="top">
                <!-- <Divider orientation="left" size="small">属性</Divider> -->
                <div class="top_tabale">
                    <AddAttrProductTable :data="dataProp" :loading="loadingProp" :disabled="true"></AddAttrProductTable>
                </div>
            </div>
        </TabPane>
        <TabPane label="详细描述" name="detailInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">详细描述</Divider>
                <div class="top_tabale1">
                    <NewHtmlEditor :value="productInfoFormValidate.description" :disabled="true"></NewHtmlEditor>
                </div>
            </div>
        </TabPane>
        <TabPane label="日志文件" name="logInfo" :disabled="disabled">
            <AddNewProductTableLog :data="dataLog" :loading="loadingLog" :pageData="pageDataLog" @change-page-log="changePageLog" @on-page-size-change-log="onPageSizeChangeLog"></AddNewProductTableLog>
        </TabPane>
    </Tabs>
    <div class="top">
        <Divider orientation="left" size="small">人员分配</Divider>
        <div class="top_tabale">
            <div style="width:100%;height:100%;margin-top:10px;padding: 10px 10px 10px 50px;">
                店铺选择：
                <RadioGroup v-model="store" @on-change="onChange">
                    <template v-for="(ditem,dIndex) in storeList">
                        <Radio :label="ditem.storeId" :key="ditem.storeId">
                            {{ditem.storeName}}
                        </Radio>
                    </template>
                </RadioGroup>
            </div>
            <div style="width:100%;height:100%;margin-top:10px;padding: 0 10px 10px 50px;">
                <Table border :columns="columns" :data="filesData" stripe v-if="store" :loading="filedLoading"></Table>
            </div>
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="examine">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                        </div>
                    </FormItem>
                </template>
            </XForm>
            <div style="width:100%;height:100%;margin-top:10px;padding: 0 10px 10px 50px;">
                <div style="line-height: 32px;display: flex;">
                    <Button type="primary" @click="save" style="float: left;">保存</Button>
                    <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import config from "@views/basicinfo/developNewProducts/viewNewProductConfig";
import config2 from "@views/charting/chartingDelegation/productAppointStoreConfig";
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
    GetFileDistributionInfo
} from "@service/tortExamineService";
import {
    GetUserInfoList
} from "@service/settingsService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'Appoint',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        AddNewProductTable,
        AddNewProductTableUploadPic,
        AddNewProductTableUploadVideo,
        AddNewProductTableUpload3D,
        AddNewProductTableUploadMusic,
        AddNewProductTableLog,
        UploadPic,
        NewHtmlEditor,
        AddAttrProductTable,
        XForm
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
            store:'',
            storeList:[],
            filesData:[],
            columns: [
                {
                    title: '制作文件类型',
                    key: 'fileTypeName'
                },
                {
                    title: '数量',
                    key: 'quantity',
                    align: 'center',
                },
                {
                    title: '人员',
                    key: 'userId',
                    align: 'center',
                    render: (h, params) => {
                        return h('Select',{
                                props:{
                                    value: params.row.logisticsMode,
                                    transfer:true
                                },
                                on: {
                                    'on-change':(event) => {
                                        this.filesData[params.index].userId = event;
                                    }
                                },
                            },
                            this.peopleList.map((item) =>{
                                return h('Option', {
                                    props: {
                                        value: item.id,
                                        label: item.userName
                                    },
                                    value: params.row.userId
                                })
                            })
                        )
                    }
                },
                {
                    title: '制作时间',
                    key: 'date',
                    align: 'center',
                    render: (h, params) => {
                        return h('DatePicker', {
                            props: {
                                value: this.filesData[params.index][params.column.key],
                                format:"yyyy-MM-dd HH:mm", 
                                type:"datetimerange",
                                transfer:true,
                            },
                            on: {
                                'on-change': (event) => {
                                    this.filesData[params.index][params.column.key] = event;
                                },
                                'on-clear': (event) => {
                                    this.filesData[params.index][params.column.key] = '';
                                },
                            }
                        });
                    }
                },
            ],
            peopleList:[],
            filedLoading:true
        }
    },
    computed:{
        disabled(){
            return this.productId ? false : false;
        }
    },
    methods: {
        clearFormData() {},
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
                                this.dataProp = res.result.item.attributesList||[];
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
                                imgUrl: [],
                                brandId:res.result.item.brandId,
                                brandName:res.result.item.brandName,
                                url:res.result.item.url,
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
            this.$router.push({name:'chartingDelegationList'});
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
        save() {
            var data = this.storeList[0];
             for(var i=0;i<this.filesData.length;i++){
                if(!(this.filesData[i].userId&&this.filesData[i].date&&this.filesData[i].date[0]&&this.filesData[i].date[1])){
                    this.$Message.error('人员，制作时间未填写完整');   
                    return ; 
                }
            }
            for(var i=0;i<this.filesData.length;i++){
                var obj={};
                obj={
                    fileType: this.filesData[i].fileTypeId,
                    fileTypeName: this.filesData[i].fileTypeName,
                    userId: this.filesData[i].userId,
                    remark: this.formValidate2.remark,
                    startTime: this.filesData[i].date[0],
                    endTime: this.filesData[i].date[1],
                    goodsId: this.productInfoFormValidate.id,
                    goodsName: this.productInfoFormValidate.name,
                    platformId: data['platfromId'],
                    platformName: data['platfromName'],
                    storeId: data['storeId'],
                    storeName: data['storeName']
                };
                this.$refs['examine'].$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateFileDistribution(obj).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：保存成功！');
                                    this.goReturn();
                                } else if (res.result.code == 400) {
                                    this.$Message.error({
                                        background: true,
                                        content: res.result.msg
                                    });
                                    this.$FromLoading.hide();
                                }
                            });
                        });   
                    } else {
                        this.$Message.error('保存失败');
                    }
                })
            }
        },
        GetFileDistributionInfo(){
            if(this.productId){
                return new Promise((resolve, reject) => {
                    GetFileDistributionInfo({id:this.productId}).then(res => {
                        if(res.result.code==200){
                            this.storeList = res.result.item;
                            this.store = this.storeList[0]['storeId'];
                            this.filesData = this.storeList[0]['fileRelations'];
                            this.filedLoading = false;
                        }
                    });
                });
            }    
        },
        onChange(){
            
        },
        GetUserInfoList(){
            return GetUserInfoList().then(res => {
                if (res.result.code == 200) {
                    var data = res.result.item;
                    for(var i=0;i<data.length;i++){
                        data[i]['name'] = data[i]['userName'];
                        data[i]['value'] = data[i]['id'];
                    }
                    this.peopleList = data;
                }
            }).catch(e =>{console.log(e)}); 
        },
    },
    created() {
        this.productId = this.$route.query.id;
        this.getFormData();
        this.GetGoodsSupplierPage();
        this.GetPrepGoodsAttributeById();
        this.GetOperationLogPage();
        this.GetFileDistributionInfo();
        this.GetUserInfoList();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
.top_tabale1{
    background-color: #FFFFFF;
}
</style>
