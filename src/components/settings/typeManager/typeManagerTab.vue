<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-05 20:22:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-27 15:39:46
-->
<template>
<Tabs type="card" :animated="false" @on-click="selectTab">
    <TabPane label="类目属性">
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
                <Page :total="pageAttrData.totalPage" :transfer="true" :current="pageAttrData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageAttrData.pageSizeOpts" :page-size="pageAttrData.skipTotal" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </TabPane>
    <TabPane label="制作文件">
        <div style="width:100%;height:38px;margin-top:10px">
            <div style="float:left">
                <RadioGroup v-model="platform" @on-change="onChange">
                    <template v-for="(ditem,dIndex) in platformList">
                        <Radio :label="ditem.id" :key="ditem.id">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </div>
        </div>
        <Table border :columns="columns2" :data="filesData" stripe v-if="platform"></Table>
    </TabPane>
    <Button type="primary" size="small" slot="extra" v-show="activeTab==0" class="tabsButton" @click.native="showPop(true)">添加属性</Button>
    <Button type="primary" size="small" slot="extra" v-show="activeTab==0" class="tabsButton" @click.native="save()">保存</Button>
    <Button type="primary" size="small" slot="extra" v-show="activeTab==1" class="tabsButton" @click.native="saveFileSettings()">保存</Button>
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
    BindAttributeCategory,
    GetPlatformsList,
    GetSystemConfigList,
    UpdateFileRelation,
    GetFileRelationList
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
        categoryId:{
            type:Number,

        }
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
        },
        categoryId:{
            handler(val){
                this.platform = this.firstPlatform;
                this.GetSystemConfigList();
            }
        },
        platform:{
            handler(val){
                this.filesData = [];
                this.initFile();
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
                                    this.data['attributeBinds'][params.index][params.column.key] = event;
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
            columns2: [
                {
                    title: '输出文件名称',
                    key: 'name'
                },
                {
                    title: '数量',
                    key: 'quantity',
                    align: 'center',
                    render: (h, params) => {
                        return h('Input', {
                            style: {
                                width: '100px',
                            },
                            props: {
                                value: this.filesData[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.filesData[params.index][params.column.key] = event.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                // {
                //     title: '是否需要',
                //     key: 'isCheck',
                //     align: 'center',
                //     render: (h, params) => {
                //         return h('Checkbox', {
                //             props: {
                //                 single: false,
                //                 value: params.row.isCheck
                //             },
                //             on: {
                //                 'on-change': (event) => {
                //                     this.filesData[params.index][params.column.key] = event;
                //                 }
                //             }
                //         });
                //     }
                // }
            ],
            filesData: [],
            activeTab: '',
            firstPlatform:'',
            platform: '',
            titleText: '添加属性',
            showModel: false,
            platformList:[],
            fileSettings:[]
        }
    },
    methods: {
        selectTab(name) {
            this.activeTab = name;
        },
        add() {
            this.data.categoryId = this.data.categoryId?this.data.categoryId:this.$parent.formValidate.id;
            for(var i=0;i<this.formValidate2.attributeId.length;i++){
                this.data.attributeBinds.push({
                    attributeId:this.formValidate2.attributeId[i]['value'],
                    attributeName:this.formValidate2.attributeId[i]['name'],
                    categoryId: this.$parent.formValidate.id,
                    categoryName: this.$parent.formValidate.name,
                    isCheck: true
                });
            }
            // this.data.attributeBinds.push({
            //     ...this.formValidate2,
            //     categoryId: this.$parent.formValidate.id,
            //     categoryName: this.$parent.formValidate.name,
            //     isCheck: true
            // });
            for(var i=0;i<this.$refs['form'].$refs["selectorMulti"].length;i++){
                this.$refs['form'].$refs["selectorMulti"][i].clear();
            }
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        BindAttributeCategory(){
            if (this.data.categoryId) {
                this.data.attributeBinds=this.data.attributeBinds.filter(function (item) {
                    if(item.isCheck)
                        return item;
                }); 
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    BindAttributeCategory(this.data).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：保存成功！');
                            this.$emit('get-data');
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
        GetPlatformsList() {
            return new Promise((resolve, reject) => {
                GetPlatformsList(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.platformList = res.result.item;
                            this.firstPlatform = this.platformList[0]['id'];
                        });
                    }
                });
            });
        },
        GetSystemConfigList() {
            return GetSystemConfigList({congfigType:'filetype'}).then(res => {
                if(res.result.code==200){
                    return res.result.item;  
                }
            }).catch(e =>{console.log(e)});  
        },
        onChange(e){

        },
        saveFileSettings(){
            var data = {
                categoryId:this.categoryId,
                platformId:this.platform,
            }
            var arr = [];
            for(var j=0;j<this.filesData.length;j++){
                if(this.filesData[j].quantity){
                    var obj = {
                        categoryId: this.categoryId,
                        platformId: this.platform,
                        fileTypeName: this.filesData[j].name,
                        fileTypeId: this.filesData[j].id,
                        quantity: this.filesData[j].quantity,
                    }
                    arr.push(obj);
                }
            }
            data['fileRelations'] = JSON.parse(JSON.stringify(arr));
            return new Promise((resolve, reject) => {
                this.$FromLoading.show();
                UpdateFileRelation(data).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.$Message.info('温馨提示：保存成功！');
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                        this.$FromLoading.hide();
                    }
                });
            });
        },
        GetFileRelationList(a){
            var me = this;
            return GetFileRelationList({categoryId:this.categoryId,platformId:this.platform}).then(res => {
                if (res.result.code == 200) {
                    var data = res.result.item;
                    for(var i=0;i<data.length;i++){
                        for(var j=0;j<a.length;j++){
                            if(data[i].fileTypeId==a[j].id){
                                a[j] = {
                                    ...a[j],
                                    quantity: data[i]['quantity']||1,
                                    isCheck: true   
                                }
                            }
                        }
                    }
                    me.filesData=a;
                }
            }).catch(e =>{console.log(e)}); 
        },
        async init(){
            await this.GetPlatformsList();
        },
        async initFile(){
            var a=await this.GetSystemConfigList();
            await this.GetFileRelationList(a);
        }
    },
    created(){
        this.init();
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
