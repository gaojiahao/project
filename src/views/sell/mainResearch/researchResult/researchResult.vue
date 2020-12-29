<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 16:07:41
-->
<template>
<div>
    <Tabs type="card" :animated="false">
        <TabPane label="基本信息">
            <div class="bottom-title">
                商品信息
            </div>
            <div class="top">
                <XForm :formValidate="formValidate.productInfo" :ruleValidate="ruleValidate" :formConfig="formConfig.productInfo.field" @save="save" @clear-form-data="clearFormData" ref="form">
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
            <div class="bottom-title">
                调研结果
            </div>
            <div class="top">
                <XForm :formValidate="resultFormValidate" :ruleValidate="resultRuleValidate" :formConfig="resultFormConfig" @save="save" @clear-form-data="clearFormData" ref="resultform">
                    <template slot="button">
                        <div></div>
                    </template>
                </XForm>
            </div>
            <div class="bottom-title">
                调研意见
            </div>
            <div class="top">
                <XForm :formValidate="finalFormValidate" :ruleValidate="finalRuleValidate" :formConfig="finalFormConfig" @save="save" @clear-form-data="clearFormData" ref="finalform">
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
        <Button @click="goReferenceComparison" size="small" slot="extra" type="primary">参考比价</Button>
    </Tabs>
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";
import resultConfig from "@views/sell/mainResearch/researchResult/researchResultConfig";
import researchFinalConfig from "@views/sell/mainResearch/researchResult/researchFinalConfig";
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
    name: 'ResearchResult',
    components: {
        Tabs,
        TabPane,
        XForm,
        AddNewProductTable,
        AddNewProductTableUploadPic,
        AddNewProductTableUploadVideo,
        AddNewProductTableUpload3D,
        AddNewProductTableUploadMusic,
        AddNewProductTableLog,
    },
    data() {
        return {
            id: ''
        }
    },
    mixins: [config, resultConfig, researchFinalConfig],
    methods: {
        clearFormData() {},
        save() {},
        goReferenceComparison() {
            this.$router.push({
                name: 'ReferenceComparison',
                params: {
                    id: this.id || '123'
                }
            })
        }
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
