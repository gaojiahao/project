<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-18 12:01:51
-->
<template>
    <div class="addFinishProduct">
        <div class="top">
            <Divider orientation="left" size="small">推品信息</Divider>
            <div class="top_tabale">
                <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <FormItem>
                            <div style="width:100%">
                                <Button type="primary" @click="save" style="float: left;">保存</Button>
                                <Button @click="clearFormData" style="float: left; margin-left:10px" v-if="!formValidate.id">重置</Button>
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
import XForm from "@components/public/form/xForm";
import config from "@views/sell/sellManager/addFinishProductConfig";
import {
    CreateRecommendGoods,
    UpdateRecommendGoods,
    GetRecommendGoodsById
} from "@service/sellService";
import {
    GetSystemConfigList
} from "@service/settingsService";
export default {
    name: "EditFinishProduct",
    components: {
        XForm,
    },
    data() {
        return {
            upLoadSize:0,
        }
    },
    mixins: [config],
    methods: {
        save() {
            var params = this.formValidate;
            var check = params['imgUrl'].length <= this.upLoadSize;
            if (!check) {
                this.$Notice.warning({
                    title: '已达到最大上传数'+this.upLoadSize+'个文件！'
                });
                return ;
            }
            params = {
                ...params,
                imgOne:params['imgUrl'][0]&&params['imgUrl'][0].filePath||'',
                imgTwo:params['imgUrl'][1]&&params['imgUrl'][1].filePath||'',
                imgThree:params['imgUrl'][2]&&params['imgUrl'][2].filePath||'',
            }
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
            var me = this;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetRecommendGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            me.$FromLoading.hide();
                            me.formValidate = {
                                id: res.result.item.id,
                                code: res.result.item.code,
                                name: res.result.item.name,
                                categoryId: res.result.item.categoryId,
                                categoryName: res.result.item.categoryName,
                                imgUrl: [],
                                urlOne: res.result.item.urlOne,
                                remark: res.result.item.remark,
                                merchantId: res.result.item.merchantId
                            }
                            if(res.result.item.imgOne){
                                me.formValidate['imgUrl'].push({
                                    filePath:res.result.item.imgOne,
                                    type:res.result.item.imgOne ? res.result.item.imgOne.substring(res.result.item.imgOne.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgOne,
                                    status:'finished',
                                });
                            }
                            if(res.result.item.imgTwo){
                                me.formValidate['imgUrl'].push({
                                    filePath:res.result.item.imgTwo,
                                    type:res.result.item.imgTwo ? res.result.item.imgTwo.substring(res.result.item.imgTwo.lastIndexOf('.') + 1):'',
                                    name:res.result.item.imgTwo,
                                    status:'finished',
                                });
                            }
                            if(res.result.item.imgThree){
                                me.formValidate['imgUrl'].push({
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
        GetSystemConfigList(){
            return new Promise((resolve, reject) => {
                GetSystemConfigList({name:'图片张数'}).then(res => {
                    if(res.result.code==200){
                        this.upLoadSize = res.result.item[0]['code'];
                    }
                });
            });    
        }
    },
    created() {
        this.getFormData();
        this.GetSystemConfigList();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>

