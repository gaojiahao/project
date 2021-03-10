<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-09 16:56:02
-->
<template>
<div>
    <div class="prevPage" v-if="preId"  @click="prePage">
        <Icon type="ios-arrow-back" />
    </div>
    <Tabs type="card" :animated="false" :value="tabName">
        <TabPane label="基本信息" name="basicInfo">
            <div class="top">
                <Divider orientation="left" size="small">基本信息</Divider>
                <div class="top_tabale">
                    <ViewForm :formValidate="productInfoFormValidate" :ruleValidate="ruleValidate" :formConfig="productInfo" @save="save" @clear-form-data="clearFormData" ref="form" :divisionField="divisionField">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%"> 
                                    <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                                </div>
                            </FormItem>
                        </template>
                    </ViewForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="供应商信息" name="sellInfo" :disabled="disabled">
            <AddNewProductTable :data="dataPruch" :loading="loadingPruch" :pageData="pageDataPruch" @change-page="changePagePruch" @on-page-size-change="onPageSizeChangePruch" :disabled="true"></AddNewProductTable>
        </TabPane>
        <TabPane label="制作文件" name="uploadInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">上传信息</Divider>
                <div class="top_tabale" style="flex:display;padding:20px;flex-direction:column;display:flex">
                    <UploadPic :length="3" :value="productInfoFormValidate['imgUrl']" @save="saveUpload" :disabled="true"></UploadPic>
                </div>
            </div>
        </TabPane>
        <TabPane label="属性" name="propertyInfo" :disabled="disabled">
            <div class="top">
                <!-- <Divider orientation="left" size="small">属性</Divider> -->
                <div class="top_tabale">
                    <AddAttrProductTable :data="dataProp" :loading="loadingProp" @save="UpdatePrepGoodsAttribute" :disabled="true"></AddAttrProductTable>
                </div>
            </div>
        </TabPane>
        <TabPane label="详细描述" name="detailInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">详细描述</Divider>
                <div class="top_tabale1">
                    <NewHtmlEditor @save="saveDescription" @clear="descriptionClear" :value="productInfoFormValidate.description" :disabled="true"></NewHtmlEditor>
                </div>
            </div>
        </TabPane>
        <TabPane label="日志文件" name="logInfo" :disabled="disabled">
            <AddNewProductTableLog :data="dataLog" :loading="loadingLog" :pageData="pageDataLog" @change-page-log="changePageLog" @on-page-size-change-log="onPageSizeChangeLog"></AddNewProductTableLog>
        </TabPane>
    </Tabs>
    <div class="nextPage" v-if="nextId" @click="nextPage">
        <Icon type="ios-arrow-forward" />
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
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
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'ViewNewProduct',
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
        AddAttrProductTable
    },
    mixins: [config],
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
            preId:'',
            nextId:''
        }
    },
    computed:{
        disabled(){
            return this.productId ? false : false;
        }
    },
    watch:{
        $route:function(to,from){
            if(to.query.id!=from.query.id){
                this.productId = to.query.id;
                if(this.productId)
                this.init();
            }
        }
    },
    methods: {
        clearFormData() {},
        descriptionClear(){
            this.productInfoFormValidate.description = '';
        },
        save() {
            var params = this.productInfoFormValidate;
            params = {
                ...params,
                howlong:params.productSize.long,
                width:params.productSize.wide,
                high:params.productSize.high,
                packageLong:params.packagingSize.long,
                packageWidth:params.packagingSize.wide,
                packageHigh:params.packagingSize.high,
            }
            console.log('params',params);
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.productId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdatePrepGoods(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.productId = res.result.item.id;
                                    this.GetGoodsSupplierPage();
                                } else if (res.result.code == 400) {
                                    this.$Message.error({
                                        background: true,
                                        content: res.result.msg
                                    });
                                    this.$FromLoading.hide();
                                }
                            });
                        });
                    } else  {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreatePrepGoods(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.productId = res.result.item.id;
                                    // this.$router.push({name:'editNewProduct',query: {id:this.productId}});
                                    //this.GetGoodsSupplierPage();
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
        },
        savePurchase(){
            var params = this.purchaseFormValidate;
            params = {
                ...params,
                goodsId:this.productInfoFormValidate.id||this.productId,
                goodsName:this.productInfoFormValidate.name||'是否第三方',
            }
            console.log('params',params);
            this.$refs['formPurch'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.productId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CraeteGoodsSupplier(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.GetGoodsSupplierPage();
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
        },
        saveDescription(value){
            this.productInfoFormValidate.description = value;
            var params = this.productInfoFormValidate;
            params = {
                ...params,
                howlong:params.productSize.long,
                width:params.productSize.wide,
                high:params.productSize.high,
                packageLong:params.packagingSize.long,
                packageWidth:params.packagingSize.wide,
                packageHigh:params.packagingSize.high,
                description:value,
            }
            console.log('params',params);
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.productId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdatePrepGoods(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.productId = res.result.item.id;
                                    this.GetGoodsSupplierPage();
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
        },
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
        saveUpload(){
            this.$Message.info({content:'温馨提示：保存成功'});
            this.disabledProperty = false;
            this.tabName = 'propertyInfo';        
        },
        saveProperty(){
            this.$Message.info({content:'温馨提示：保存成功'});
            this.disabledDetailInfo = false; 
            this.tabName = 'detailInfo';   
        },
        saveDetailInfo(){
            this.$Message.info({content:'温馨提示：保存成功'});
            this.disabledLog = false;    
            this.tabName = 'logInfo';   
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
                                imgUrl: [{
                                    filePath:res.result.item.imgOne,
                                    type:res.result.item.imgOne ? res.result.item.imgOne.substring(res.result.item.imgOne.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgOne,
                                },
                                {
                                    filePath:res.result.item.imgTwo,
                                    type:res.result.item.imgTwo ? res.result.item.imgTwo.substring(res.result.item.imgTwo.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgTwo,
                                },
                                {
                                    filePath:res.result.item.imgThree,
                                    type:res.result.item.imgThree ? res.result.item.imgThree.substring(res.result.item.imgThree.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgThree,
                                }],
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
        descriptionClear(){
            this.productInfoFormValidate.description='';
        },
        UpdatePrepGoodsAttribute(data){
            var params = {};
            params.prepGoodsId = this.productId;
            params.prepGoodsAttributes = [];
            for(var i in data){
                var obj = {};
                obj = {
                    goodsId:  this.productId,
                    goodsName: this.productInfoFormValidate.name,
                    attributeId: data[i].tag,
                    attributeValueId: data[i].value,
                }
                params.prepGoodsAttributes.push(obj);
            }
            return new Promise((resolve, reject) => {
                this.$FromLoading.show();
                UpdatePrepGoodsAttribute(params).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.$Message.info('温馨提示：保存成功！');
                        this.GetPrepGoodsAttributeById();
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                        this.$FromLoading.hide();
                    }
                });
            });    
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
        getNextPre(id){
            var listID = JSON.parse(window.localStorage.getItem("listID"));
            for(var i=0;i<listID.length;i++){
                if(id==listID[i]){
                    this.preId = listID[i-1];
                    this.nextId = listID[i+1];
                }
            }
        },
        prePage(){
            this.$router.push({name:'ViewNewProduct',query: {id:this.preId}});
        },
        nextPage(){
            this.$router.push({name:'ViewNewProduct',query: {id:this.nextId}});
        },
        init(){
            this.$FromLoading.show();
            this.getFormData();
            this.GetGoodsSupplierPage();
            this.GetPrepGoodsAttributeById();
            this.GetOperationLogPage();
            this.getNextPre(this.productId);
        }
    },
    created() {
        this.productId = this.$route.query.id;
        this.init();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
.top_tabale1{
    background-color: #FFFFFF;
}
</style>
