<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-02 19:05:15
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">基本信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <div style="width:100%">   
                    </div>
                </template>
            </ViewForm>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">人员分配</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
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
import config from "@views/charting/chartingDelegation/productAppointStoreConfig";
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import {
    Tabs,
    TabPane,
} from "view-design";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import {
    CreateFileDistribution,
} from "@service/tortExamineService";

export default {
    name: 'Appoint',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
    },
    mixins: [config],
    data(){
        return{
        }
    },
    methods: {
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPrepGoodsById({id:this.id}).then(res => {
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
        clearFormData() {},
        goReturn(){
            this.$router.go(-1);
        },
        save() {
            var data = this.formValidate2.data;
            var params = [];
            for(var i=0;i<data.length;i++){
                var obj={};
                obj={
                    fileType: data[i].fileType,
                    userId: data[i].userId,
                    remark: this.formValidate2.remark,
                    startTime: data[i].date[0],
                    endTime: data[i].date[1],
                    goodsId: this.formValidate.id,
                    goodsName: this.formValidate.name,
                    // status:1,
                };
                // params.push(obj);
                this.$refs['form'].$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateFileDistribution(obj).then(res => {
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
            
            // this.$refs['form'].$refs['formValidate'].validate((valid) => {
            //     if (valid) {
            //         return new Promise((resolve, reject) => {
            //             this.$FromLoading.show();
            //             CreateFileDistribution(params).then(res => {
            //                 if (res.result.code == 200) {
            //                     this.$FromLoading.hide();
            //                     this.$Message.info('温馨提示：保存成功！');
            //                 } else if (res.result.code == 400) {
            //                     this.$Message.error({
            //                         background: true,
            //                         content: res.result.msg
            //                     });
            //                     this.$FromLoading.hide();
            //                 }
            //             });
            //         });   
            //     } else {
            //         this.$Message.error('保存失败');
            //     }
            // })
        },
    },
    created(){ 
        this.getFormData();
    }
}
</script>

<style lang="less" scoped>
@import  "~@less/form.less";
</style>
