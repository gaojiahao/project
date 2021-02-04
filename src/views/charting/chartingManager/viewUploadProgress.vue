<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-03 19:28:21
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">基本信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData">
                <template slot="button">
                    <div style="width:100%">   
                    </div>
                </template>
            </ViewForm>
        </div>
    </div>
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
            <ViewForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <div style="width:100%">
                    </div>
                </template>
            </ViewForm>
        </div>
    </div>
    <!-- <div class="top">
        <Divider orientation="left" size="small">上传文件</Divider>
        <div class="top_tabale">
            <div class="myTable">
                <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
                    </div>
                </div>
            </div>
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form" v-if="isForm">
                <div slot="other">
                    <MultUpload v-model="formValidate2['data']" :config="config"></MultUpload> 
                </div>
                <template slot="button">
                    <div style="line-height:32px height:32px; display:flex">
                        <div style="width:100%">
                            <Button type="primary" size="small" @click="save" style="float: left;">保存</Button>
                            <Button size="small" @click="cancel" style="float: left; margin-left:10px">取消</Button>
                        </div>
                    </div>
                </template>
            </XForm>
        </div>
    </div> -->
</div>
</template>

<script>
import config2 from "@views/charting/chartingManager/editProductAppointStoreConfig";
import ViewForm from "@components/public/form/viewForm";

import {
    GetFileDistributionById,
    CreateGoodsFile,
    GetGoodsFileById
} from "@service/tortExamineService";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
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
    },
    mixins: [config2],
    data(){
        return{
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
            isForm: false
        }
    },
    methods: {
        getFormData(){
            this.id = this.$route.query.goodsId;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetGoodsFileById({goodsId:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                code:res.result.item.code,
                                name: res.result.item.name,
                                categoryId: res.result.item.categoryId,
                                categoryName: res.result.item.categoryName,
                                productImg:[{name:'',url:res.result.item.imgOne},{name:'',url:res.result.item.imgTwo},{name:'',url:res.result.item.imgThree}]
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
        GetFileDistributionById(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetFileDistributionById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate3 = {
                                id: res.result.item.id,
                                fileType: res.result.item.fileType,
                                remark: res.result.item.remark,
                                startTime: res.result.item.startTime,
                                endTime: res.result.item.endTime,
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
        clearFormData() {
            this.formValidate2 = {
                id:"",
                data:[],
            }
        },
        goReturn(){
            this.$router.go(-1);
        },
        save() {
            var params = [];
            for(var i=0;i<this.formValidate2.img.length;i++){
                var obj = {}
                obj = {
                    name: this.formValidate2.img[i].name,
                    suffix: '',
                    fileType: this.formValidate3.fileType,
                    fileTypeName:'',
                    fileSize: this.formValidate2.img[i].size,
                    fileUrl: this.formValidate2.img[i].filePath,
                    status:1,
                    goodsId: this.formValidate.id,
                };
                this.$refs['form'].$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateGoodsFile(obj).then(res => {
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
        }
    },
    created() {
        this.getFormData();
        this.GetFileDistributionById();
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>
<style lang="less" scoped>
@import  "~@less/form.less";
.myTable{
    padding:10px;
}
</style>
