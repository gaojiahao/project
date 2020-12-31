<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-05 20:22:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-31 11:40:31
-->
<template>
<Tabs type="card" :animated="false" @on-click="selectTab">
    <TabPane label="分类属性">
        <Table border :columns="columns" :data="data.attributeBinds" :loading="loading" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <i-switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageAttrData.totalPage" :current="pageAttrData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageAttrData.pageSizeOpts" :page-size="pageAttrData.skipTotal" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </TabPane>
    <TabPane label="制作文件">
        <div style="width:100%;height:38px;margin-top:10px">
            <div style="float:left">
                <RadioGroup v-model="platform">
                    <Radio label="all">全平台</Radio>
                    <Radio label="yms">亚马孙</Radio>
                    <Radio label="smt">速卖通</Radio>
                    <Radio label="eBay">eBay</Radio>
                </RadioGroup>
            </div>
        </div>
        <Table border :columns="columns2" :data="data2" stripe></Table>
    </TabPane>
    <Button type="primary" size="small" slot="extra" v-show="activeTab==0" class="tabsButton" @click.native="showPop(true)">添加属性</Button>
    <Button type="primary" size="small" slot="extra" v-show="activeTab==0" class="tabsButton" @click.native="save()">保存</Button>
    <Button type="primary" size="small" slot="extra" v-show="activeTab==1" class="tabsButton">保存</Button>
    <ModalForm :titleText="titleText" :formValidate="formValidate2" :ruleValidate="ruleValidate2" :showModel='showModel' :formConfig="formConfig2" @save="add" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
    <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </div>
    </Modal>
</Tabs>
</template>

<script>
import {
    Tabs,
    TabPane,
} from "view-design";
import ModalForm from "@components/public/form/modalForm";
import config from "@views/settings/typeManager/typeManagerConfig";
import {
    BindAttributeCategory
} from "@service/settingsService"
export default {
    name: 'TypeManagerTab',
    components: {
        Tabs,
        TabPane,
        ModalForm
    },
    mixins: [config],
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type:Boolean,
            default: true
        },
        pageAttrData:{
            type: Object,
            default () {
                return {}
            }
        },
    },
    watch:{
        list:{
            handler(val){
                this.data.categoryId = this.$parent.formValidate.id;
                this.data.attributeBinds = val.map((e,index)=>{
                    e.isCheck = true;
                    return e;
                });
            }
        }
    },
    data() {
        return {
            columns: [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                },
                {
                    title: '属性名称',
                    key: 'attributeName'
                },
                // {
                //     title: '属性值',
                //     key: 'proValue',
                //     render: (h, params) => {
                //         return h("span", {
                //             style: {
                //                 display: "inline-block",
                //             },
                //         }, params.attributesValues ? console.log(params.attributesValues .filter(item => item.valueName)) : '');//  展示的内容
                //     }
                // },
                {
                    title: '是否启用',
                    key: 'isCheck',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                single: false,
                                value:  this.data['attributeBinds'][params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.data['attributeBinds'][params.index][params.column.key] = event; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                }
            ],
            data: {
                categoryId:'',
                attributeBinds:[]
            },
            columns2: [{
                    title: '输出文件名称',
                    key: 'name'
                },
                {
                    title: '数量',
                    key: 'count',
                    align: 'center',
                    render: (h, params) => {
                        return h('Input', {
                            style: {
                                width: '100px',
                            },
                            props: {
                                value: params.row.conName,
                            },
                            on: {
                                'on-change': (event) => {
                                    this.data2[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                },
                {
                    title: '是否需要',
                    key: 'isCheck',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                single: false
                            },
                            on: {
                                'on-change': (event) => {
                                    this.data2[params.index][params.column.key] = event; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                }
            ],
            data2: [{
                    name: '主视图',
                },
                {
                    name: '详情图',

                },
                {
                    name: '3D建模',
                },
                {
                    name: '视频文件',
                },
                {
                    name: '音频文件',
                },
                {
                    name: '其他文件',
                }
            ],
            activeTab: '',
            platform: 'all',
            titleText: '添加属性',
            showModel: false
        }
    },
    methods: {
        selectTab(name) {
            this.activeTab = name;
        },
        add() {
            this.data.categoryId = this.data.categoryId?this.data.categoryId:this.$parent.formValidate.id;
            this.data.attributeBinds.push({
                ...this.formValidate2,
                categoryId: this.$parent.formValidate.id,
                categoryName: this.$parent.formValidate.name,
                isCheck: true
            });
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        BindAttributeCategory(){
            if (this.data.categoryId) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    BindAttributeCategory(this.data).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
                            this.$$emit('get-data');
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            } else {
                this.$Message.error({
                    background: true,
                    content: '请选择属性'
                }); 
            }
        },
        save(){
            this.BindAttributeCategory();
            this.data = {
                categoryId:'',
                attributeBinds:[]    
            }
        },
        clearFormData() {},
        showPop(flag, row) {
            if (row && row.id) {
                this.formValidate['id'] = row.id;
                this.titleText = '编辑';
            } else {
                this.titleText = '新建';
            }
            this.showModel = flag;
        },
        changePage(page){
            this.$emit('change-page',page);
        },
        onPageSizeChange(pagesize){
            this.$emit('on-page-size-change',pagesize);
        },
    }
}
</script>

<style lang="less" scoped>
.tabsButton {
    margin-right: 10px;
}
</style><style scoped>
>>>.ivu-tabs-bar {
    border-bottom: 0;
    margin-bottom: 0;
}
</style>
