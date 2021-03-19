<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-19 14:49:23
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">派店信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="form">
                <template slot="button">
                    <div style="width:100%">
                        
                    </div>
                </template>
            </ViewForm>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">选品人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="selectionColumns" :data="selectedGoods" height="300" width="820"></Table>
                        <span style="margin: 10px;">
                            <Button size="small" @click="handleSelectAll(true)">全选</Button>
                            <Button size="small" @click="handleSelectAll(false)">取消</Button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">未选人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="notSelectedColumns" :data="notSelectedGoods" height="300" width="820"></Table>
                        <span style="margin: 10px;">
                            <Button size="small" @click="handleSelectAll2(true)">全选</Button>
                            <Button size="small" @click="handleSelectAll2(false)">取消</Button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">不选人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="dontSelectedColumns" :data="dontSelectedGoods" height="300" width="820"></Table>
                        <span style="margin: 10px;">
                            <Button size="small" @click="handleSelectAll3(true)">全选</Button>
                            <Button size="small" @click="handleSelectAll3(false)">取消</Button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;" v-if="dispatchedList.length">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">已派人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="dispatchedColumns" :data="dispatchedList" height="300" width="820" ref="dontSelectedColumns"></Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">审核信息</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" ref="examine">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button type="primary" @click="save(true)" style="float: left;">保存</Button>
                            <!-- <Button @click="save(false)" style="float: left; margin-left:10px">不同意</Button> -->
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
import config from "@views/examine/appointStoreExamine/viewProductConfig";
import config2 from "@views/examine/appointStoreExamine/productAppointStoreConfig";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import {
    CreateReviewAction
} from "@service/tortExamineService";
import {
    GetPieShopById,
    CreatePieShop
} from "@service/sellService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'AddPieShow',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
    },
    mixins: [config,config2],
    data(){
        return{
            selectionColumns: [
                {
                    title: '委派',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:  this.selectedGoods[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectedGoods[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'selectName',
                    width:120
                },
                {
                    title: '选品时间',
                    key: 'selectOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            notSelectedColumns: [
                 {
                    title: '委派',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:  this.notSelectedGoods[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.notSelectedGoods[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'selectName',
                    width:120
                },
                {
                    title: '选品时间',
                    key: 'selectOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            dontSelectedColumns: [
                 {
                    title: '委派',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:  this.dontSelectedGoods[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.dontSelectedGoods[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'selectName',
                    width:120
                },
                {
                    title: '不选时间',
                    key: 'selectOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            dispatchedColumns: [
                {
                    title: '平台',
                    key: 'platformName',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'storeName',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'sellerName',
                    width:120
                },
                {
                    title: '选品时间',
                    key: 'createdOn',
                    width:160
                },
                {
                    title: '意见',
                    key: 'remark',
                }
            ],
            selectedGoods:[],
            dontSelectedGoods:[],  //不选人员
            notSelectedGoods:[],    //未选
            dispatchedList:[]  //已派
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
                                remark:res.result.item.remark,
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
        save(){
            var pieShops=[];
            for(var i=0;i<this.selectedGoods.length;i++){
                this.selectedGoods[i]['goodsId'] = this.formValidate['id'];
                this.selectedGoods[i]['goodsName'] = this.formValidate['name'];
                this.selectedGoods[i]['remark'] = this.formValidate2['reviewRemark'];
                this.selectedGoods[i]['seller'] = this.selectedGoods[i]['selectBy'];
                pieShops.push(this.selectedGoods[i]);
            };
            for(var i=0;i<this.dontSelectedGoods.length;i++){
                this.dontSelectedGoods[i]['goodsId'] = this.formValidate['id'];
                this.dontSelectedGoods[i]['goodsName'] = this.formValidate['name'];
                this.dontSelectedGoods[i]['remark'] = this.formValidate2['reviewRemark'];
                this.dontSelectedGoods[i]['seller'] = this.dontSelectedGoods[i]['selectBy'];
                pieShops.push(this.dontSelectedGoods[i]);
            };
            for(var i=0;i<this.notSelectedGoods.length;i++){
                this.notSelectedGoods[i]['goodsId'] = this.formValidate['id'];
                this.notSelectedGoods[i]['goodsName'] = this.formValidate['name'];
                this.notSelectedGoods[i]['remark'] = this.formValidate2['reviewRemark'];
                this.notSelectedGoods[i]['seller'] = this.notSelectedGoods[i]['selectBy'];
                pieShops.push(this.notSelectedGoods[i]);
            };

            if (pieShops.length) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreatePieShop({pieShops:pieShops}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：审核成功！');
                            this.goReturn();
                        } else  {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            } else {
                this.$Message.error({
                    background: true,
                    content: '请选择派店人员'
                });
            }
        },
        GetPieShopById(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPieShopById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.selectedGoods = res.result.item.selectedGoods;
                            this.dontSelectedGoods = res.result.item.dontSelectedGoods;
                            this.notSelectedGoods = res.result.item.notSelectedGoods;
                            for(var i=0;i<this.selectedGoods.length;i++){
                                this.$set(this.selectedGoods[i],'status',true);
                            }
                            for(var i=0;i<this.dontSelectedGoods.length;i++){
                                this.$set(this.dontSelectedGoods[i],'status',false);
                            }
                            for(var i=0;i<this.notSelectedGoods.length;i++){
                                this.$set(this.notSelectedGoods[i],'status',false);
                            }
                            this.dispatchedList = res.result.item.dispatchedList;
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
        handleSelectAll(status){
            for(var i=0;i<this.selectedGoods.length;i++){
                this.$set(this.selectedGoods[i],'status',status);
            }
        },
        handleSelectAll2(status){
            for(var i=0;i<this.notSelectedGoods.length;i++){
                this.$set(this.notSelectedGoods[i],'status',status);
            }    
        },
        handleSelectAll3(status){
            for(var i=0;i<this.dontSelectedGoods.length;i++){
                this.$set(this.dontSelectedGoods[i],'status',status);
            }    
        }
    },
    created() {
        this.getFormData();
        this.GetPieShopById();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
