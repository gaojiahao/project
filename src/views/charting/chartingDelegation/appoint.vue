<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 12:03:58
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
                <FormItem>
                    <div style="width:100%">
                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                        <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                    </div>
                </FormItem>
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
        save() {},
    },
    created(){ 
        this.getFormData();
    }
}
</script>

<style lang="less" scoped>
@import  "~@less/form.less";
</style>
