<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 20:08:57
-->
<template>
    <Modal v-model="visble" :title="title" @on-ok="ok" @on-cancel="cancel" width="800" draggable >
        <div class="ivu-transfer">
            <div class="ivu-transfer-list">
                <div class="ivu-transfer-list-header">
                    <span class="ivu-transfer-list-header-title">角色</span> 
                </div> 
                <div class="ivu-transfer-list-body ivu-transfer-list-body-with-search">
                    <div class="ivu-transfer-list-body-search-wrapper">
                        <div class="ivu-transfer-list-search">
                            <div class="ivu-input-wrapper ivu-input-wrapper-small ivu-input-type-text">
                                <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal"></i>
                                <input autocomplete="off" spellcheck="false" type="text" placeholder="请输入搜索内容" class="ivu-input ivu-input-small">
                            </div>
                        </div>
                    </div> 
                    <ul class="ivu-transfer-list-content">
                        <li class="ivu-transfer-list-content-item" v-for="(item,index) in roleList" @click="select(item)">
                            <span>[角色] {{item.roleName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="ivu-transfer-list">
                <div class="ivu-transfer-list-header">
                    <span class="ivu-transfer-list-header-title">员工</span> 
                </div> 
                <div class="ivu-transfer-list-body ivu-transfer-list-body-with-search">
                    <div class="ivu-transfer-list-body-search-wrapper">
                        <div class="ivu-transfer-list-search">
                            <div class="ivu-input-wrapper ivu-input-wrapper-small ivu-input-type-text">
                                <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal"></i>
                                <input autocomplete="off" spellcheck="false" type="text" placeholder="请输入搜索内容" class="ivu-input ivu-input-small">
                            </div>
                        </div>
                    </div> 
                    <ul class="ivu-transfer-list-content">
                        <li class="ivu-transfer-list-content-item" v-for="(item,index) in userList">
                            <Checkbox v-model="item['checked']"></Checkbox>
                            <span>[员工] {{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div> -->
            <div class="ivu-transfer-list">
                <div class="ivu-transfer-list-header">
                    <span class="ivu-transfer-list-header-title">已选择列表</span> 
                </div> 
                <div class="ivu-transfer-list-body ivu-transfer-list-body-with-search">
                    <div class="ivu-transfer-list-body-search-wrapper">
                        <div class="ivu-transfer-list-search">
                            <div class="ivu-input-wrapper ivu-input-wrapper-small ivu-input-type-text">
                                <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal"></i>
                                <input autocomplete="off" spellcheck="false" type="text" placeholder="请输入搜索内容" class="ivu-input ivu-input-small">
                            </div>
                        </div>
                    </div> 
                    <ul class="ivu-transfer-list-content">
                        <li class="ivu-transfer-list-content-item" v-for="(item,index) in selectAddParticipant">
                            <span v-if="item.type==2">[员工] {{item.roleName}}</span>
                            <span v-else-if="item.type==1">[角色] {{item.roleName}}</span>
                            <span style="float:right">
                                <Icon type="md-close" @click.native="del($event,index)" />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Modal>   
</template>
<script>
import {
    AuthRoleList
} from "@service/settingsService";

export default {
    name: 'AddParticipant',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '添加参与者'
        },
        nodeSetting:{
            type:Object,
            default () {
                return {}
            }
        },
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
        },
        nodeSetting:{
            handler(val){
                this.selectAddParticipant = this.nodeSetting['participants'];
            },
            deep:true,
        },
        // roleList:{
        //     handler(val){
        //         debugger
        //         for(var i=0; i < val.length;i++){
        //             if(val[i].checked){
        //                 var flag = false
        //                 for(var j=0;j<this.selectAddParticipant.config.length;j++){
        //                     if(val[i].value == this.selectAddParticipant.config[j].value) {
        //                         flag = true
        //                     }
        //                 }
        //                 if(!flag){
        //                     this.selectAddParticipant.config.push(val[i]);
        //                 }
        //             } else {
        //                 for(var j=0;j<this.selectAddParticipant.config.length;j++){
        //                     if(val[i].value == this.selectAddParticipant.config[j].value) {
        //                         this.selectAddParticipant.config.splice(j, 1);
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     deep: true
        // },
        // userList:{
        //     handler(val){
        //         for(var i=0; i < val.length;i++){
        //             if(val[i].checked){
        //                 var flag = false
        //                 for(var j=0;j<this.selectAddParticipant.config.length;j++){
        //                     if(val[i].value == this.selectAddParticipant.config[j].value) {
        //                         flag = true
        //                     }
        //                 }
        //                 if(!flag){
        //                     this.selectAddParticipant.config.push(val[i]);
        //                 }
        //             } else {
        //                 for(var j=0;j<this.selectAddParticipant.config.length;j++){
        //                     if(val[i].value == this.selectAddParticipant.config[j].value) {
        //                         this.selectAddParticipant.config.splice(j, 1);
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     deep: true
        // }
    },
    data () {
        return {
            visble: false,
            roleList:[
                // {
                //     name:'开发人员',
                //     value:'dsfa',
                //     type:'role'
                // },
                // {
                //     name:'销售人员',
                //     value:'dsfa13',
                //     type:'role'
                // },
                // {
                //     name:'开发主管',
                //     value:'dsfa13243',
                //     type:'role'
                // },
                // {
                //     name:'销售主管1',
                //     value:'rewqr',
                //     type:'role'
                // },
                // {
                //     name:'销售主管2',
                //     value:'rewqr432',
                //     type:'role'
                // },
                // {
                //     name:'销售主管3',
                //     value:'rewqr432',
                //     type:'role'
                // },
                // {
                //     name:'销售主管4',
                //     value:'rewqr567',
                //     type:'role'
                // },
                // {
                //     name:'销售主管4sdf',
                //     value:'rewqr567234',
                //     type:'role'
                // },
                // {
                //     name:'销售主管4654',
                //     value:'rewqr567sg',
                //     type:'role'
                // },
                // {
                //     name:'销售主管47',
                //     value:'rewqr567te',
                //     type:'role'
                // },
                // {
                //     name:'销售主管46',
                //     value:'rewqr567qw',
                //     type:'role'
                // },
                // {
                //     name:'销售主管478',
                //     value:'rewqr567z',
                //     type:'role'
                // }
            ],
            userList:[
                {
                    name:'张三',
                    value:'dsfazc',
                    type:'user'
                },
                {
                    name:'李四',
                    value:'dsfa13vbc',
                    type:'user'
                },
                {
                    name:'王五',
                    value:'dsfa13243z',
                    type:'user'
                },
                {
                    name:'马六',
                    value:'rewqrre',
                    type:'user'
                }
            ],
            selectList:[],
            selectAddParticipant:[],
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','AddParticipantModal',false);
        },
        ok(){
            this.$emit('save',this.selectAddParticipant);
            this.$emit('show','AddParticipantModal',false);
        },
        del(e,index){
            this.selectAddParticipant.splice(index, 1);   
        },
        select(item){
            var flag = false
            for(var j=0;j<this.selectAddParticipant.length;j++){
                if(item.id == this.selectAddParticipant[j].id) {
                    flag = true
                    break;
                }
            }
            if(!flag){
                var obj = {
                    // ...item,
                    participantId:item.id,
                    roleName:item.roleName,
                    type:1 //角色类型    
                };
                this.selectAddParticipant.push(obj);
            }
        },
        AuthRoleList(){
            return new Promise((resolve, reject) => {
                AuthRoleList().then(res => {
                    if (res.result.code == 200) {
                        this.roleList = res.result.item;
                    }
                });
            });
        },
    },
    created(){
        this.AuthRoleList();
    },
}
</script>
<style lang="less" scoped>
    .ivu-transfer /deep/
    .ivu-transfer-list {
        display: inline-block;
        width: 230px;
        height: 400px;
        font-size: 14px;
        vertical-align: middle;
        position: relative;
        padding-top: 35px;
    }
</style>
