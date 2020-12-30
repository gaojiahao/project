<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-30 17:03:51
-->
<template>
<div>
    <Tabs type="card" :animated="false">
        <TabPane label="基本信息">
            <div class="top-title">
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
            <div class="top-title">
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
            <div class="top-title">
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
            <div class="top-title">
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
            <div class="top-title">
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
            <div class="top-title">
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
        <Button @click="goResearch" size="small" slot="extra" type="warning">查看调研</Button>
    </Tabs>
    <div>
        <div class="top-title">
            审核建议
        </div>
        <div class="top">
            <div style="height:40px;width:100%;padding:10px">
                <div style="float:left">
                    平台：
                    <RadioGroup v-model="platForm">
                        <Radio label="亚马逊" border></Radio>
                        <Radio label="ebay" border></Radio>
                        <Radio label="速卖通" border></Radio>
                    </RadioGroup>
                </div>
            </div>
            <ViewForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2">
                <template slot="button">
                    
                </template>
            </ViewForm>
        </div>
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import config from "@views/basicinfo/developNewProducts/viewNewProductConfig";
import config2 from "@views/examine/tortExamine/viewTortExamineConfig";
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
    name: 'viewTortExamine',
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
    },
    mixins: [config,config2],
    data(){
        return{
            platForm: '亚马逊'
        }
    },
    methods: {
        goResearch(row){
            this.$router.push({name:'viewResearch',query: {id:row.id}}); 
        },
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
    background-color: #ffffff;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
}

.top-title {
background: #ffffff;
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
</style>
