<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-09 19:52:57
-->
<template>
<div>
    <Tabs type="card" :animated="false" :value="tabName">
        <TabPane label="基本信息" name="basicInfo">
            <div class="top">
                <Divider orientation="left" size="small">基本信息</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="productInfoFormValidate" :ruleValidate="ruleValidate" :formConfig="productInfo" @save="save" @clear-form-data="clearFormData" ref="form" :divisionField="divisionField">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%"> 
                                    <Button type="primary" @click="save" style="float: left;">保存</Button>
                                    <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="销售信息" name="sellInfo" :disabled="disabled">
            <AddNewProductTable :data="dataPruch" :loading="loadingPruch" :pageData="pageDataPruch" @change-page="changePagePruch" @on-page-size-change="onPageSizeChangePruch"></AddNewProductTable>
            <div class="top">
                <Divider orientation="left" size="small">其他信息</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="purchaseFormValidate" :ruleValidate="ruleValidate" :formConfig="purchase" @save="save" @clear-form-data="clearFormData" ref="formPurch">
                        <template slot="button">
                            <div style="width:100%">
                                <FormItem>
                                    <Button type="primary" @click="savePurchase" style="float: left;">保存</Button>
                                    <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                </FormItem>
                            </div>
                        </template>
                    </XForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="制作文件" name="uploadInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">上传信息</Divider>
                <div class="top_tabale" style="flex:display;padding:20px;flex-direction:column;display:flex">
                <!--上传的配置要传入-->
                    <AddNewProductTableUploadPic></AddNewProductTableUploadPic>
                    <AddNewProductTableUploadVideo></AddNewProductTableUploadVideo>
                    <AddNewProductTableUpload3D></AddNewProductTableUpload3D>
                    <AddNewProductTableUploadMusic></AddNewProductTableUploadMusic>
                    <div style="width:100%">
                        <Button type="primary" @click="saveUpload" style="float: left;">保存</Button>
                        <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                    </div>
                </div>
            </div>
        </TabPane>
        <TabPane label="属性" name="propertyInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">属性</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="propertyFormValidate" :ruleValidate="ruleValidate" :formConfig="property" @save="save" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button type="primary" @click="saveProperty" style="float: left;">保存</Button>
                                    <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="详细描述" name="detailInfo" :disabled="disabled">
            <div class="top">
                <Divider orientation="left" size="small">详细描述</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="detailInfoFormValidate" :ruleValidate="ruleValidate" :formConfig="detailInfo" @save="save" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button type="primary" @click="saveDetailInfo" style="float: left;">保存</Button>
                                    <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="日志文件" name="logInfo" :disabled="disabled">
            <AddNewProductTableLog></AddNewProductTableLog>
        </TabPane>
    </Tabs>
    
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";
import AddNewProductTable from "@components/basicinfo/developNewProducts/addNewProductTable";
import AddNewProductTableUploadPic from "@components/basicinfo/developNewProducts/addNewProductTableUploadPic";
import AddNewProductTableUploadVideo from "@components/basicinfo/developNewProducts/addNewProductTableUploadVideo";
import AddNewProductTableUpload3D from "@components/basicinfo/developNewProducts/addNewProductTableUpload3D";
import AddNewProductTableUploadMusic from "@components/basicinfo/developNewProducts/addNewProductTableUploadMusic";
import AddNewProductTableLog from "@components/basicinfo/developNewProducts/addNewProductTableLog";
import {
    CreatePrepGoods,
    CraeteGoodsSupplier,
    GetGoodsSupplierPage,
    GetPrepGoodsById,
    UpdatePrepGoods
} from "@service/basicinfoService"
import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'editNewProduct',
    components: {
        Tabs,
        TabPane,
        XForm,
        AddNewProductTable,
        AddNewProductTableUploadPic,
        AddNewProductTableUploadVideo,
        AddNewProductTableUpload3D,
        AddNewProductTableUploadMusic,
        AddNewProductTableLog
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
            loadingPruch:true
        }
    },
    computed:{
        disabled(){
            return this.productId ? false : false;
        }
    },
    methods: {
        clearFormData() {},
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
            this.$refs['form'].$refs['productInfoFormValidate'].validate((valid) => {
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
                                        content: res.result.message
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
                                        content: res.result.message
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
                            this.prod
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
                                description:res.result.item.description
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
                            });
                        }
                    });
                });    
            }
        },
    },
    created() {
        this.productId = this.$route.query.id;
        this.getFormData();
        this.GetGoodsSupplierPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
