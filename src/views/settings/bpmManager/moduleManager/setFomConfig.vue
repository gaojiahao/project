<template>
    <div class="set_form_config">
        <div class="head">
            <div class="left">
                <Button type="primary" icon="md-add" size="small" @click.native="add()">新建容器
                </Button>
            </div>
        </div>
        <div class="content">
            <div class="left_panel">
                <template  v-for="(config,index) in formData" >
                    <Container :config="config" v-model="formData[index].config" :key="index" @click.native="clickContainer(config,index)" @del-container="delContainer" @show-add="showPop" @select-field="selectField"></Container>
                </template>
            </div>
            <div class="right_panel">
                <ContainerPanel :visible="visible" :data="containerSelect" ref="form" @set-container="setContainer"></ContainerPanel>
                <ConfigPanel :visible="configVisible" :data="configSelect" ref="form" @set-config="setConfig"></ConfigPanel>
            </div>
        </div>
        <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="modalForm"></ModalForm>
    </div>
</template>

<script>
import {
    Scroll,
    List,
    ListItem,
} from "view-design";
const container = ()=>import("@components/settings/moduleManager/container");
const modalForm = ()=>import("@components/public/form/modalForm");
const containerPanel = ()=>import("@components/settings/moduleManager/containerPanel");
const configPanel = ()=>import("@components/settings/moduleManager/configPanel");

import config from "@views/settings/bpmManager/moduleManager/setFomConfigs"
import {
    getEcommercePlatformList
} from "@service/settingsService"

export default {
    name: 'SetFomConfig',
    components: {
        Scroll,
        List,
        ListItem,
        Container: container,
        ModalForm: modalForm,
        ContainerPanel: containerPanel,
        ConfigPanel: configPanel
    },
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
        }
    },
    mixins:[config],
    data() {
        return {
            index: null,
            formData:{
                basinfo:{
                    containerCode: 'basinfo',
                    containerName:  '基本信息',
                    config:{
                        hidden:"false"
                    },
                    fields:[]
                }
            },
            titleText: '',
            showModel: false,
            visible:false,
            configVisible: false,
            containerSelect:{},
            configSelect:{},
            configIndex:null,
        }
    },
    watch:{

    },
    methods: {
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('get data');
                }, 1000);
            });
        },
        select(index) {
            this.selectIndex = index;
            this.$emit('select-item', index);
        },
        add() {
            var basinfo = {
                containerCode: 'container',
                containerName:  '容器',
                config:{
                    hidden:"false"
                },
                fields:[]
            }
            for(var k in this.formData){
                if(k==basinfo.containerCode){
                    this.$Message.error('温馨提示：已存在相同的容器ID！');
                    this.$refs['form'].$refs['formValidate'].resetFields();
                    return ''
                }
            }
            this.$set(this.formData,basinfo.containerCode,basinfo);
        },
        showPop(flag, row) {
            if (row && row.containerCode) {
                this.titleText = '编辑';
            } else {
                this.titleText = '新建';
            }
            this.showModel = flag;
        },
        save(data){
            this.formData[this.index]['fields'].push(this.formValidate);
            this.clearFormData();
        },
        clearFormData(){
            this.formValidate = {
                fieldCode:'',
                fieldName: '',
                type:'',
                config:{}
            };
        },
        clickContainer(data,index){
            this.visible = true;
            this.containerSelect = data;
            this.index = index;
        },
        setContainer(data){
            delete this.formData[this.index];
            this.$set(this.formData,data.containerCode,data);    
        },
        delContainer(containerCode){
            this.$delete(this.formData,containerCode);
        },
        selectField(data){
            this.configVisible = true;
            this.configSelect = data; 
        },
        setConfig(){

        }
    },
    created() {}
}
</script>
<style lang="less" scoped>
.set_form_config {
    width: 100%;
    .head {
        width: 100%;
        height: 40px;
        line-height: 40px;

        .left {
            float: left;
        }

        .right {
            float: right;
            margin-right: 10px;
        }
    }
    .content {
        width: 100%;
        .left_panel {
            float: left;
            width: calc(100% - 300px);
        }
        .right_panel {
            float: right;
            width: 300px;
        }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .ivu-list-item{
        padding: 3px 0;
    }
}
</style>>
