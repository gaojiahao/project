<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-10 11:31:44
-->
<template>
<div>
    <Tabs type="card" :animated="false" :value="tabName">
        <TabPane label="基本信息" name="basicInfo">
            <div class="top">
                <Divider orientation="left" size="small">基本信息</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate.productInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.productInfo.field" @save="save" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <div style="width:100%"> 
                            </div>
                        </template>
                    </XForm>
                </div>
            </div>
            <div class="top">
                <Divider orientation="left" size="small">其他信息</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate.otherInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.otherInfo.field" @save="saveOtherInfo" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button type="primary" @click="saveOtherInfo" style="float: left;">保存</Button>
                                    <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                </div>
            </div>
        </TabPane>
        <TabPane label="销售信息" name="sellInfo" :disabled="disabledSell">
            <AddNewProductTable></AddNewProductTable>
            <div class="top">
                <Divider orientation="left" size="small">其他信息</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate.purchase" :ruleValidate="ruleValidate" :formConfig="formConfig.purchase.field" @save="save" @clear-form-data="clearFormData" ref="form">
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
        <TabPane label="制作文件" name="uploadInfo" :disabled="disabledUpload">
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
        <TabPane label="属性" name="propertyInfo" :disabled="disabledProperty">
            <div class="top">
                <Divider orientation="left" size="small">属性</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate.property" :ruleValidate="ruleValidate" :formConfig="formConfig.property.field" @save="save" @clear-form-data="clearFormData" ref="form">
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
        <TabPane label="详细描述" name="detailInfo" :disabled="disabledDetailInfo">
            <div class="top">
                <Divider orientation="left" size="small">详细描述</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate.detailInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.detailInfo.field" @save="save" @clear-form-data="clearFormData" ref="form">
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
        <TabPane label="日志文件" name="logInfo" :disabled="disabledLog">
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
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'addNewProduct',
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
            disabledSell: true,
            disabledUpload: true,
            disabledProperty: true,
            disabledDetailInfo: true,
            disabledLog: true,
            tabName:'basicInfo',
        }
    },
    methods: {
        clearFormData() {},
        save() {},
        saveOtherInfo(){
            if(this.formValidate.productInfo.productCode){
                this.$Message.info({content:'温馨提示：保存成功'});
                this.disabledSell = false;
                this.tabName = 'sellInfo';
            } else {
                this.$Message.info({content:'温馨提示：保存失败，已有类似商品！'});

            }
        },
        savePurchase(){
            this.$Message.info({content:'温馨提示：保存成功'});
            this.disabledUpload = false;
            this.tabName = 'uploadInfo';
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
        }
    },
    created() {}
}
</script>
<style lang="less" scoped>
.top {
    flex: 1;
    // background-color: #f5fffa;
    // border: 1px solid #dcdee2;
    // border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
}

.top-title {
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 5px;
}

.bottom {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
}
.ivu-divider-horizontal.ivu-divider-with-text-left:before {
    border-top: 1px solid #dcdee2;
    border-left: 1px solid #dcdee2;
    background-color: #f5fffa;
    width: 3%;
}
.ivu-divider-horizontal.ivu-divider-with-text-left:after {
    border-top: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
    background-color: #f5fffa;
}
.ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-center, 
.ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-left, 
.ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-right
 {
    margin: 8px 0 0 0;
    font-weight: 600;
    color: #515a6e;
}
.top_tabale{
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-top:0;
    border-color: #e8eaec;    
}
</style>
<style scoped>
>>>.ivu-tabs-bar {
    margin-bottom: 0;
}
</style>
