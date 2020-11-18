<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-18 15:42:13
-->
<template>
<div>
    <Tabs type="card" :animated="false">
        <TabPane label="基本信息">
            <div class="bottom-title">
                基本信息
            </div>
            <div class="top">
                <ViewForm :formValidate="formValidate.productInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.productInfo.field">
                    <template slot="button">
                        <div style="width:100%">
                            
                        </div>
                    </template>
                </ViewForm>
            </div>
            <div class="bottom-title">
                其他信息
            </div>
            <div class="top">
                <ViewForm :formValidate="formValidate.otherInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.otherInfo.field">
                    <template slot="button">
                        <div style="width:100%">
                        </div>
                    </template>
                </ViewForm>
            </div>
        </TabPane>
        <TabPane label="销售信息">
            <AddNewProductTable></AddNewProductTable>
            <div class="bottom-title">
                采购信息
            </div>
            <div class="top">
                <ViewForm :formValidate="formValidate.purchase" :ruleValidate="ruleValidate" :formConfig="formConfig.purchase.field">
                    <template slot="button">
                        <div style="width:100%">
                        </div>
                    </template>
                </ViewForm>
            </div>
        </TabPane>
        <TabPane label="制作文件">
            <div class="bottom-title">
                文件上传
            </div>
            <div class="top" style="flex:display;padding:20px;flex-direction:column;display:flex">
                <!--上传的配置要传入-->
                <AddNewProductTableUploadPic></AddNewProductTableUploadPic>
                <AddNewProductTableUploadVideo></AddNewProductTableUploadVideo>
                <AddNewProductTableUpload3D></AddNewProductTableUpload3D>
                <AddNewProductTableUploadMusic></AddNewProductTableUploadMusic>
            </div>
        </TabPane>
        <TabPane label="属性">
            <div class="bottom-title">
                属性
            </div>
            <div class="top">
                <ViewForm :formValidate="formValidate.property" :ruleValidate="ruleValidate" :formConfig="formConfig.property.field">
                    <template slot="button">
                        <div style="width:100%">
                        </div>
                    </template>
                </ViewForm>
            </div>
        </TabPane>
        <TabPane label="详细描述">
            <div class="bottom-title">
                属性
            </div>
            <div class="top">
                <ViewForm :formValidate="formValidate.detailInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.detailInfo.field">
                    <template slot="button">
                        <div style="width:100%">
                        </div>
                    </template>
                </ViewForm>
            </div>
        </TabPane>
        <TabPane label="日志文件">
            <AddNewProductTableLog></AddNewProductTableLog>
        </TabPane>
        <Button @click="" size="small" slot="extra" type="warning">查看调研</Button>
    </Tabs>
    
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

import {
    Tabs,
    TabPane
} from "view-design";
export default {
    name: 'viewNewProduct',
    components: {
        Tabs,
        TabPane,
        ViewForm,
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

        }
    },
    methods: {

    },
    created() {}
}
</script>

<style scoped>
>>>.ivu-tabs-bar {
    margin-bottom: 0;
}
</style><style lang="less" scoped>
.top {
    flex: 1;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
}

.bottom-title {
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 10px 20px;
}

.bottom {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
}
</style>
