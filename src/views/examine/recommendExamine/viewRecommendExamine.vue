<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-09 17:49:00
-->
<template>
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
import config from "@views/sell/sellManager/viewFinishProductConfig";
import {
    CreateRecommendGoods,
    UpdateRecommendGoods,
    GetRecommendGoodsById
} from "@service/sellService"
export default {
    name: "viewRecommendExamine",
    components: {
        ViewForm,
    },
    data() {
        return {
            preId:'',
            nextId:'',
            id:''
        }
    },
    mixins: [config],
    watch:{
        $route:function(to,from){
            if(to.query.id!=from.query.id){
                this.id = to.query.id;
                if(this.id)
                    this.init();
            }
        }
    },
    methods: {
        save() {
            var params = this.formValidate;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateRecommendGoods(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.$router.go(-1);
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
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateRecommendGoods(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
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
        clearFormData() {
            this.formValidate.id = '';
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        goReturn(){
            this.$router.push({name:'recommendExamineList'});
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
                                imgUrl: [{
                                    filePath:res.result.item.imgOne,
                                    type:res.result.item.imgOne ? res.result.item.imgOne.substring(res.result.item.imgOne.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgOne,
                                },
                                {
                                    filePath:res.result.item.imgTwo,
                                    type:res.result.item.imgTwo ? res.result.item.imgTwo.substring(res.result.item.imgTwo.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgTwo,
                                },
                                {
                                    filePath:res.result.item.imgThree,
                                    type:res.result.item.imgThree ? res.result.item.imgThree.substring(res.result.item.imgThree.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgThree,
                                }],
                                urlOne: res.result.item.urlOne,
                                remark: res.result.item.remark,
                            }
                        } else  {
                            this.$FromLoading.hide();
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        getNextPre(id){
            var listID = JSON.parse(window.localStorage.getItem("listID"));
            for(var i=0;i<listID.length;i++){
                if(id==listID[i]){
                    this.preId = listID[i-1];
                    this.nextId = listID[i+1];
                }
            }
        },
        prePage(){
            this.$router.push({name:'viewRecommendExamine',query: {id:this.preId}});
        },
        nextPage(){
            this.$router.push({name:'viewRecommendExamine',query: {id:this.nextId}});
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