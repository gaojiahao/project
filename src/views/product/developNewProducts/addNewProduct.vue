<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 12:29:20
-->
<template>
<div>
    <Tabs type="card" :animated="false">
        <TabPane label="基本信息">
            <div class="bottom-title">
                基本信息
            </div>
            <div class="top">
                <XForm :formValidate="formValidate.productInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.productInfo.field" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                        </div>
                    </template>
                </XForm>
            </div>
            <div class="bottom-title">
                其他信息
            </div>
            <div class="top">
                <XForm :formValidate="formValidate.otherInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.otherInfo.field" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                        </div>
                    </template>
                </XForm>
            </div>
        </TabPane>
        <TabPane label="销售信息">
            <AddNewProductTable></AddNewProductTable>
            <div class="bottom-title">
                采购信息
            </div>
            <div class="top">
                <XForm :formValidate="formValidate.purchase" :ruleValidate="ruleValidate" :formConfig="formConfig.purchase.field" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                        </div>
                    </template>
                </XForm>
            </div>
        </TabPane>
        <TabPane label="制作文件">
            <div class="bottom-title">
                文件上传
            </div>
            <div class="top" style="flex:display;padding:20px;flex-direction:column;display:flex">
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
                <XForm :formValidate="formValidate.property" :ruleValidate="ruleValidate" :formConfig="formConfig.property.field" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                        </div>
                    </template>
                </XForm>
            </div>
        </TabPane>
        <TabPane label="详细描述">
            <div class="bottom-title">
                属性
            </div>
            <div class="top">
                <XForm :formValidate="formValidate.detailInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.detailInfo.field" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                        </div>
                    </template>
                </XForm>
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
import XForm from "@components/public/form/xForm";
import config from "@views/product/developNewProducts/addNewProductConfig";
import AddNewProductTable from "@components/product/addNewProductTable";
import AddNewProductTableUploadPic from "@components/product/addNewProductTableUploadPic";
import AddNewProductTableUploadVideo from "@components/product/addNewProductTableUploadVideo";
import AddNewProductTableUpload3D from "@components/product/addNewProductTableUpload3D";
import AddNewProductTableUploadMusic from "@components/product/addNewProductTableUploadMusic";
import AddNewProductTableLog from "@components/product/addNewProductTableLog";

import {
    Tabs,
    TabPane
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
    methods: {
        clearFormData() {},
        save() {}
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
