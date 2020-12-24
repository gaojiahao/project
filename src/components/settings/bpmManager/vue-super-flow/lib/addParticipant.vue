<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-24 14:22:32
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
                            <span>[角色] {{item.name}}</span>
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
                        <li class="ivu-transfer-list-content-item" v-for="(item,index) in selectAddParticipant.config">
                            <span v-if="item.type=='user'">[员工] {{item.name}}</span>
                            <span v-else-if="item.type=='role'">[角色] {{item.name}}</span>
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
        selectAddParticipant:{
            type:Object,
            default () {
                return {
                        
                }
            }           
        },
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
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
                {
                    name:'开发人员',
                    value:'dsfa',
                    type:'role'
                },
                {
                    name:'销售人员',
                    value:'dsfa13',
                    type:'role'
                },
                {
                    name:'开发主管',
                    value:'dsfa13243',
                    type:'role'
                },
                {
                    name:'销售主管1',
                    value:'rewqr',
                    type:'role'
                },
                {
                    name:'销售主管2',
                    value:'rewqr432',
                    type:'role'
                },
                {
                    name:'销售主管3',
                    value:'rewqr432',
                    type:'role'
                },
                {
                    name:'销售主管4',
                    value:'rewqr567',
                    type:'role'
                },
                {
                    name:'销售主管4sdf',
                    value:'rewqr567234',
                    type:'role'
                },
                {
                    name:'销售主管4654',
                    value:'rewqr567sg',
                    type:'role'
                },
                {
                    name:'销售主管47',
                    value:'rewqr567te',
                    type:'role'
                },
                {
                    name:'销售主管46',
                    value:'rewqr567qw',
                    type:'role'
                },
                {
                    name:'销售主管478',
                    value:'rewqr567z',
                    type:'role'
                }
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
            selectList:[]
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','AddParticipantModal',false);
        },
        ok(){
            this.$emit('save',this.selectAddParticipant.nodeId,this.selectAddParticipant);
            this.$emit('show','AddParticipantModal',false);
        },
        del(e,index){
            this.selectAddParticipant.config.splice(index, 1);   
        },
        select(item){
            var flag = false
            for(var j=0;j<this.selectAddParticipant.config.length;j++){
                if(item.value == this.selectAddParticipant.config[j].value) {
                    flag = true
                    break;
                }
            }
            if(!flag){
                this.selectAddParticipant.config.push(item);
            }
        }
    },
    mounted(){
        console.log(this.selectAddParticipant.nodeId);
    },
    updated() {
        this.$nextTick(function(){
            console.log(this.selectAddParticipant.nodeId); 
        })   
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
