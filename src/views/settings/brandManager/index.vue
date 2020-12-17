<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-17 19:09:54
-->
<template>
<div class="brandManager-container">
    <div class="brandManager-container-panel">
        <div class="left">
            <BrandManagerList :list="listData" @select-item="selectItem" @show-add="showAdd" :loading="listLoading" @del="sureDeleteConfirm"></BrandManagerList>
        </div>
        <div class="right">
            <div class="item" v-show="isShowAdd">
                <div class="top">
                    <Divider orientation="left" size="small">{{title}}</Divider>
                    <div class="top_tabale">
                        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                            <template slot="button">
                                <FormItem>
                                    <div style="width:100%">
                                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                                        <Button @click="clearFormData" style="float: left; margin-left:10px" v-if="!formValidate.id">取消</Button>
                                    </div>
                                </FormItem>
                            </template>
                        </XForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Tree,
    Card
} from "view-design";
import BrandManagerList from "@components/settings/brandManager/brandManagerList";
import config from "@views/settings/brandManager/brandManagerConfig";
import XForm from "@components/public/form/xForm";
import {
    addEcommercePlatform,
    getEcommercePlatformList
} from "@service/basicinfoService"

export default {
    name: "BrandManager",
    mixins: [config],
    components: {
        Card,
        BrandManagerList,
        XForm,
    },
    data() {
        return {
            listData: [
                {id:'1',name:'森宝',code:'senbao'},
                {id:'2',name:'嘉宝',code:'jiabao'},
                {id:'3',name:'美宝',code:'meibao'},
            ],
            selectPBind: {},
            selectSBind: {},
            isShowAdd: true,
            listLoading: true,
            title:'新建'
        }
    },
    methods: {
        // getEcommercePlatformList() {
        //     return new Promise((resolve, reject) => {
        //         getEcommercePlatformList().then(res => {
        //             this.$nextTick(() => {
        //                 this.listData = res.data.items;
        //             });
        //         });
        //     });
        // },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    addEcommercePlatform(params).then(res => {
                        if (res.status == 200) {
                            this.$Message.info('温馨提示：成功');
                            this.getEcommercePlatformList();
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                        } else if (res.status == 403) {
                            this.$Message.error({
                                background: true,
                                content: res.message
                            });
                        }
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$Message.info('更新成功');
                });
            }
        },
        showAdd() {
            this.title = '新建';
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$refs['form'].initEL('input');
        },
        clearFormData() {
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        selectItem(index) {
            this.clearFormData();
            this.title = '编辑';
            //用接口去获取明细数据，不要用list去做双向绑定
            this.formValidate = {
                "code":"ssss",
                "name":"森宝",
            };
            this.isShowAdd = true;
            this.isShowBind = true;
        },
        sureDeleteConfirm (index,flag) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    flag ? this.deletesData() : this.deleteData(index);
                    this.$Message.info({
                        content: '删除成功',
                        duration: 2
                    });
                },
            });
        },
        deleteData(index){
            this.$delete(this.listData,index);
            this.isShowAdd = false;
        }
    },
    created() {
        setTimeout(() => {
            this.listLoading = false;
        }, 500);     
    }
}
</script>

<style lang="less" scoped>
.brandManager-container {
    .brandManager-container-panel {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
        .left {
            width: 350px;
            background-color: #f5fffa;
            height: 750px;
            border: 1px solid #dcdee2;
            border-color: #e8eaec;
            transition: all 0.2s ease-in-out;
        }
        .right {
            flex: 1;
            .top {
                flex: 1;
                transition: all 0.2s ease-in-out;
                margin: 0 0 10px 10px;
                .top_tabale{
                    background-color: #f5fffa;
                    border: 1px solid #dcdee2;
                    border-color: #e8eaec;    
                }
                .top_tabale_white{
                    border: 1px solid #dcdee2;
                    border-top:0;
                    border-color: #e8eaec;    
                }
            }
            .right-bottom {
                transition: all 0.2s ease-in-out;
                display: flex;
                flex-direction: row;
            }
        }
    }
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-center, 
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-left, 
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-right
    {
        margin: 8px 0 0 0;
        font-weight: 600;
        color: #515a6e;
    }
}
</style>
