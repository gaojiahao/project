<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-18 11:59:31
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
    name: "ViewFinishProduct",
    components: {
        ViewForm,
    },
    data() {
        return {

        }
    },
    mixins: [config],
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
            this.$router.go(-1);
        },
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
                                imgUrl: [],
                                urlOne: res.result.item.urlOne,
                                remark: res.result.item.remark,
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
    },
    created() {
        this.getFormData();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>