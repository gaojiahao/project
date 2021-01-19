<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 20:19:49
-->
<template>
<div>
    <div class="addFinishProduct">
        <div class="top">
            <Divider orientation="left" size="small">推品信息</Divider>
            <div class="top_tabale">
                <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" ref="form">
                    <template slot="button">
                        <FormItem>
                        </FormItem>
                    </template>
                </ViewForm>
            </div>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">审核建议</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" ref="examine">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button type="primary" @click="save(true)" style="float: left;">同意</Button>
                            <Button @click="save(false)" style="float: left; margin-left:10px">不同意</Button>
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
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import config from "@views/sell/sellManager/viewFinishProductConfig";
import config2 from "@views/examine/recommendExamine/addRecommendConfig";
import {
    CreateRecommendGoods,
    UpdateRecommendGoods,
    GetRecommendGoodsById
} from "@service/sellService"
import {
    CreateReviewAction
} from "@service/tortExamineService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'addRecommendExamine',
    components: {
        ViewForm,
        XForm
    },
    mixins: [config,config2],
    data(){
        return{
            platForm: '亚马逊',
        }
    },
    methods: {
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetRecommendGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                code: res.result.item.code,
                                name: res.result.item.name,
                                categoryId: res.result.item.categoryId,
                                categoryName: res.result.item.categoryName,
                                imgUrl: res.result.item.imgUrl,
                                urlOne: res.result.item.urlOne,
                                remark: res.result.item.remark,
                                status: res.result.item.status,
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
        save(status){
            var params = this.formValidate2;
            params = {
                ...params,
                relatedId: this.formValidate.id,
                reviewResult:0,
                reviewBefore: this.formValidate.status,
                isPass: status
            }
            this.$refs['examine'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (params.relatedId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateReviewAction(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：审核成功！');
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
        }
    },
    created() {
        this.getFormData();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
