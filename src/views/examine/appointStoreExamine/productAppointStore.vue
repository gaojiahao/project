<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-06 14:59:21
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
                        <Table :columns="selectionPeopleColumns" :data="selectionPeopleData" :width="450">

                        </Table>
                        <span style="margin-left: 10px;"></span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">未选人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="selectionPeopleColumns" :data="selectionPeopleData" :width="450">

                        </Table>
                        <span style="margin-left: 10px;"></span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
            <div class="ivu-form-item">
                <label class="ivu-form-item-label" style="width: 120px;">派店人员:</label> 
                <div class="ivu-form-item-content" style="margin-left: 120px;">
                    <Table :columns="selectionPeopleColumns" :data="selectionPeopleData" :width="450">

                    </Table>
                    <span style="margin-left: 10px;"></span>
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
import config from "@views/examine/appointStoreExamine/viewProductConfig";
import config2 from "@views/examine/appointStoreExamine/productAppointStoreConfig";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import {
    CreateReviewAction
} from "@service/tortExamineService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'ProductAppointStore',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
    },
    mixins: [config,config2],
    data(){
        return{
            selectionPeopleColumns: [
                {
                    title: '平台',
                    key: 'title'
                },
                {
                    title: '对应类目',
                    key: 'name'
                },
                {
                    title: '选品时间',
                    key: 'date'
                },
                {
                    title: '意见',
                    key: 'address'
                }
            ],
            selectionPeopleData: [
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
            ],
            appointStoreColumns: [
                {
                    title: '平台',
                    key: 'title'
                },
                {
                    title: '对应类目',
                    key: 'name'
                },
                {
                    title: '选品时间',
                    key: 'date'
                },
                {
                    title: '意见',
                    key: 'address'
                }
            ],
            appointStorePeopleData: [
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
                {
                    name: '玩具',
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03'
                },
            ],
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
        save(status){
            var pieShopId = this.$route.query.pieShopId;
            var params = this.formValidate2;
            params = {
                ...params,
                relatedId: pieShopId,
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
