<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-18 20:49:46
-->
<template>
<div>
    <div v-if="formStatus">
        <div class="addFinishProduct">
            <div class="top">
                <Divider orientation="left" size="small">推品信息</Divider>
                <div class="top_tabale">
                    <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                                </div>
                            </FormItem>
                        </template>
                    </ViewForm>
                </div>
            </div>
        </div>    
    </div>
    <div v-else>
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
    <div class="prevPage" v-if="preId"  @click="prePage">
        <Icon type="ios-arrow-back" />
    </div>
    <div class="nextPage" v-if="nextId" @click="nextPage">
        <Icon type="ios-arrow-forward" />
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
            formStatus:false,
            preId:'',
            nextId:'',
            id:''
        }
    },
    watch:{
        $route:function(to,from){
            if(to.name==from.name){
                if(to.query.id!=from.query.id){
                    this.id = to.query.id;
                    if(this.id)
                    this.init();
                }
            }
        }
    },
    methods: {
        clearFormData(){
                 
        },
        getFormData(){
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
                                imgUrl: [],
                                urlOne: res.result.item.urlOne,
                                remark: res.result.item.remark,
                                status: res.result.item.status,
                            }
                            if(res.result.item.imgOne){
                                this.formValidate['imgUrl'].push({
                                    filePath:res.result.item.imgOne,
                                    type:res.result.item.imgOne ? res.result.item.imgOne.substring(res.result.item.imgOne.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgOne,
                                    status:'finished',
                                });
                            }
                            if(res.result.item.imgTwo){
                                this.formValidate['imgUrl'].push({
                                    filePath:res.result.item.imgTwo,
                                    type:res.result.item.imgTwo ? res.result.item.imgTwo.substring(res.result.item.imgTwo.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgTwo,
                                    status:'finished',
                                });
                            }
                            if(res.result.item.imgThree){
                                this.formValidate['imgUrl'].push({
                                    filePath:res.result.item.imgThree,
                                    type:res.result.item.imgThree ? res.result.item.imgThree.substring(res.result.item.imgThree.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgThree,
                                    status:'finished',
                                });
                            }
                            this.formStatus = res.result.item.status;
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
            this.$router.push({name:'recommendExamineList'});
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
                                    this.getFormData();
                                    // this.goReturn();
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
        },
        getNextPre(id){
            var listID = JSON.parse(window.localStorage.getItem("listID"));
            for(var i=0;i<listID.length;i++){
                if(id==listID[i]){
                    this.preId = listID[i-1];
                    this.nextId = listID[i+1];
                }
            }
            this.$FromLoading.hide();
        },
        prePage(){
            this.$router.push({name:'addRecommendExamine',query: {id:this.preId}});
        },
        nextPage(){
            this.$router.push({name:'addRecommendExamine',query: {id:this.nextId}});
        },
        init(){
            this.$FromLoading.show();
            this.getFormData();
            this.getNextPre(this.id);
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.init();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
