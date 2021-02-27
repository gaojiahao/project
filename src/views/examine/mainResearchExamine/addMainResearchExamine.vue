<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-27 09:47:23
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
                    <UploadPic></UploadPic>
                </div>
            </div>
        </TabPane>
        <TabPane label="属性" name="propertyInfo" :disabled="disabled">
            <div class="top">
                <!-- <Divider orientation="left" size="small">属性</Divider> -->
                <div class="top_tabale">
                    <AddAttrProductTable :data="dataProp" :loading="loadingProp"></AddAttrProductTable>
                </div>
            </div>
        </TabPane>
        <TabPane label="详细描述" name="detailInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">详细描述</Divider>
                <div class="top_tabale1">
                    <NewHtmlEditor :value="productInfoFormValidate.description"></NewHtmlEditor>
                </div>
            </div>
        </TabPane>
        <TabPane label="日志文件" name="logInfo" :disabled="disabled">
            <AddNewProductTableLog :data="dataLog" :loading="loadingLog" :pageData="pageDataLog" @change-page-log="changePageLog" @on-page-size-change-log="onPageSizeChangeLog"></AddNewProductTableLog>
        </TabPane>
    </Tabs>
    <div class="top">
        <Divider orientation="left" size="small">审核建议</Divider>
        <div class="top_tabale">
            <div style="height:40px;width:100%;padding:10px">
                <RadioGroup v-model="platform" @on-change="onChange">
                    平台：
                    <template v-for="(ditem,dIndex) in platformList">
                        <Radio :label="ditem.id" :key="ditem.id">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </div>
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" ref="examine">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button type="primary" @click="save(true)" style="float: left;">同意</Button>
                            <Button @click="save(false)" style="float: left; margin-left:10px">不同意</Button>   
                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button> 
                        </div>
                    </FormItem>
                </template>
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";
import config2 from "@views/examine/mainResearchExamine/addMainResearchExamine";
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
    GetGoodsSupplierPage,
    GetPrepGoodsById,
    GetPrepGoodsAttributeById,
    GetOperationLogPage
} from "@service/basicinfoService";
import {
    GetPlatformsList,
} from "@service/settingsService";
import {
    CreateGoodsTort,
} from "@service/tortExamineService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'addTortExamine',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
        AddNewProductTable,
        AddNewProductTableUploadPic,
        AddNewProductTableUploadVideo,
        AddNewProductTableUpload3D,
        AddNewProductTableUploadMusic,
        AddNewProductTableLog,
        UploadPic,
        NewHtmlEditor,
        AddAttrProductTable
    },
    mixins: [config,config2],
    computed:{
        disabled(){
            return this.productId ? false : false;
        }
    },
    watch:{
        platform:{
            handler(val){

            }
        }
    },
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
            platform: '',
            platformList:[],
            firstPlatform:'',
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
                                characteristic:res.result.item.characteristic,
                                brandId:res.result.item.brandId,
                                brandName:res.result.item.brandName,
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
                    GetOperationLogPage({goodsId:this.productId}).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.dataLog = res.result.item.items;
                                this.loadingLog = false;
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
        goResearch(row){
            this.$router.push({name:'viewResearch',query: {id:row.id}}); 
        },
        close(){
            this.$router.go(-1)
        },
        GetPlatformsList() {
            return new Promise((resolve, reject) => {
                GetPlatformsList(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.platformList = res.result.item;
                            this.firstPlatform = this.platformList[0]['id'];
                        });
                    }
                });
            });
        },
        onChange(e){

        },
        save(status){
            var params = {};
            var platformName = '';
            for(var i=0;i<this.platformList.length;i++){
                if(this.platform==this.platformList[i]['id']){
                    platformName = this.platformList[i]['name']
                }
            };
            params = {
                goodsId:this.productId,
                platformId: this.platform,
                platformName: platformName,
                reason:this.formValidate2.reason,
                isTort: this.formValidate2.isTort,
                remark: status
            }
            this.$refs['examine'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (params.goodsId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateGoodsTort(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：审核成功！');
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
                    }
                } else {
                    this.$Message.error('保存失败');
                }
            })
        }
    },
    created() {
        this.productId = this.$route.query.id;
        this.getFormData();
        this.GetGoodsSupplierPage();
        this.GetPrepGoodsAttributeById();
        this.GetOperationLogPage();
        this.GetPlatformsList();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
.top_tabale1{
    background-color: #FFFFFF;
}
</style>
