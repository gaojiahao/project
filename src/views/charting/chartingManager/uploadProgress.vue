<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 19:41:55
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
            <ViewForm :formValidate="formValidate3" :ruleValidate="ruleValidate3" :formConfig="formConfig3">
                <template slot="button">
                    <div style="width:100%">   
                    </div>
                </template>
            </ViewForm>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">上传</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <div style="width:100%">
                        <FormItem>
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                        </FormItem>
                    </div>
                </template>
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import config2 from "@views/charting/chartingManager/productAppointStoreConfig";
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
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
    GetFileDistributionById,
    CreateGoodsFile,
    GetDistributionAndRelation
} from "@service/tortExamineService";
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
    name: 'UploadProgress',
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
            dataConfig:[
                {
                    platform: '速卖通',
                    store: '玩具店铺1',
                    people: '李四'
                },
                {
                    platform: '速卖通',
                    store: '玩具店铺2',
                    people: '李四'
                },
                {
                    platform: '速卖通',
                    store: '玩具店铺3',
                    people: '李四'
                }
            ],
            columns: [
                {
                    title: '平台名称',
                    key: 'platform',
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.platform);//  展示的内容
                    }
                },
                {
                    title: '店铺',
                    key: 'store',
                },
                {
                    title: '制作类型',
                    key: 'type',
                },
                {
                    title: '制作人',
                    key: 'people',
                },
            ],
            data: [
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: 'psd',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: '视频',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: '3d建模',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: 'psd',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: 'psd',
                    people:"李四",
                },
            ],
            config:{
                disabled:false,
            },
            loading: true,
            isForm: false,
            upLoadSize:0,
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
            this.id = this.$route.query.goodsId;
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
        GetFileDistributionById(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetFileDistributionById({id:this.id}).then(res => {
                        if (res.result.code == 200) {

                            this.$FromLoading.hide();
                            
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
        clearFormData() {
            this.formValidate2 = {
                img:[],
            }
        },
        goReturn(){
            this.$router.push({name:'chartingManagerList'});
        },
        save() {
            var check = this.formValidate2['img'].length >= this.upLoadSize,
            goodsFileList = [];
            if(!this.upLoadSize){
                this.$Notice.error({
                    title: '制作数量为空，请联系管理员！'
                });
                return ;    
            }
            if (!check) {
                this.$Notice.warning({
                    title: '至少上传'+this.upLoadSize+'个文件！'
                });
                return ;
            }
            for(var i=0;i<this.formValidate2.img.length;i++){
                var obj = {}
                obj = {
                    fileDistributionId: this.$route.query.id,
                    name: this.formValidate2.img[i].name,
                    suffix: '',
                    fileType: this.formValidate3.fileType,
                    fileTypeName:'',
                    fileSize: this.formValidate2.img[i].size,
                    fileUrl: this.formValidate2.img[i].filePath,
                    status:1,
                    goodsId: this.productInfoFormValidate.id,
                }
                goodsFileList.push(obj);
            }
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        this.$FromLoading.show();
                        CreateGoodsFile({goodsFileList:goodsFileList}).then(res => {
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
        },
        cancel(){
            this.clearFormData();
            this.showForm(false);     
        },
        changePage() {},
        onCurrentChange(currentRow,oldCurrentRow){
            this.formValidate2['id'] = currentRow.id; 
            this.showForm(true);    
        },
        showForm(flag){
            this.isForm = flag;
        },
        GetDistributionAndRelation(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetDistributionAndRelation({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate3['id']=res.result.item.id;
                            this.formValidate3['storeName']=res.result.item.storeName;
                            this.formValidate3['fileType']=res.result.item.fileType;
                            this.formValidate3['fileTypeName']=res.result.item.fileTypeName;
                            this.formValidate3['userName']=res.result.item.userName;
                            this.formValidate3['remark']=res.result.item.remark;
                            this.formValidate3['startTime']=res.result.item.startTime;
                            this.formValidate3['endTime']=res.result.item.endTime;
                            this.formValidate3['quantity'] = res.result.item.quantity;
                            this.upLoadSize = res.result.item.quantity;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }    
        }
    },
    created() {
        this.productId = this.$route.query.goodsId;
        this.getFormData();
        this.GetGoodsSupplierPage();
        this.GetPrepGoodsAttributeById();
        this.GetOperationLogPage();
        //this.GetFileDistributionById();
        this.GetDistributionAndRelation();
    }
}
</script>
<style lang="less" scoped>
@import  "~@less/form.less";
.myTable{
    padding:10px;
}
.top_tabale1{
    background-color: #FFFFFF;
}
</style>
