<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-19 10:48:41
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <PlatformManagerList :list="listData" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @del="sureDeleteConfirm"></PlatformManagerList>
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
            <div class="item"  v-show="isShowBind">
                <div class="top">
                    <Divider orientation="left" size="small">类目绑定</Divider>
                    <div class="" style="display:flex">
                        <PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind>
                        <SystemCategoryBind @select-system-bind="selectSystemBind" ref="selectSystemBind"></SystemCategoryBind>
                        <NowCategoryBind></NowCategoryBind>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/settings/platformManager/platformManagerConfig";
import XForm from "@components/public/form/xForm";
import PlatformManagerList from "@components/settings/platformManager/list";
import SystemCategoryBind from "@components/settings/platformManager/systemCategoryBind";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import CategoryBind from "@components/settings/platformManager/categoryBind";
import {
    addEcommercePlatform,
    getEcommercePlatformList
} from "@service/basicinfoService"

export default {
    name: "platformManager",
    mixins: [config],
    components: {
        PlatformManagerList,
        CategoryBind,
        XForm,
        SystemCategoryBind,
        PlatformCategoryBind,
        NowCategoryBind,
    },
    data() {
        return {
            listData: [],
            selectPBind: {},
            selectSBind: {},
            listLoading: true,
            isShowAdd: true,
            isShowBind:false,
            title:'新建'
        }
    },
    methods: {
        getEcommercePlatformList() {
            return new Promise((resolve, reject) => {
                getEcommercePlatformList().then(res => {
                    this.$nextTick(() => {
                        this.listData = res.data.items;
                        this.listLoading = false;
                    });
                });
            });
        },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    addEcommercePlatform(params).then(res => {
                        if (res.status == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：成功');
                            this.getEcommercePlatformList();
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                        } else if (res.status == 403) {
                            this.$Message.error({
                                background: true,
                                content: res.message
                            });
                            this.$FromLoading.show();
                        }
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    setTimeout(() => {
                        this.$FromLoading.hide();
                    }, 500);
                    this.$Message.info('更新成功');
                });
            }
        },
        showAdd() {
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.title = '新增';
            this.isShowBind = false;
            this.$refs.selectPlatformBind.clear();
            this.$refs.selectSystemBind.clear();
        },
        clearFormData() {
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        selectItem(index) {
            this.clearFormData();
            this.title = '编辑';
            //用接口去获取明细数据，不要用list去做双向绑定
            this.formValidate = {
                "code":"阿斯蒂芬",
                "name":"阿斯蒂芬",
                "url":"阿斯蒂芬",
                "chargeUserId":"1ea276b5-0e68-1fa8-0182-840eb50a415a",
                "lastModificationTime":null,
                "lastModifierId":null,
                "creationTime":"2020-12-10T17:31:51.76527",
                "creatorId":null,
                "id":"036ca4f2-0ae4-1d72-2e21-39f95e2aee54"
            };
            this.isShowAdd = true;
            this.isShowBind = true;
        },
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        //选择系统类目后的处理
        selectSystemBind(data) {
            this.selectSBind = data;
            if (this.selectPBind && this.selectSBind) {
                this.$Message.info('温馨提示：绑定成功');
                setTimeout(() => {
                    this.$refs.selectPlatformBind.removeSelect();
                    this.$refs.selectSystemBind.removeSelect();
                }, 1000);
            }
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
        this.getEcommercePlatformList();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
</style>
