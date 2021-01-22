<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 16:00:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 20:31:31
-->
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-21 15:51:00
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        draggable >
        <Form :model="formData" ref="formData" :label-width="120">
            <FormItem label="无参与者">
                <Select v-model="formData['noParPolicy']" :style="{width:'200px',float: 'left'}" clearable  filterable>
                    <Option v-for="item in noParticipantList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="参与者是发起人">
                <Select v-model="formData['dupParPolicy']" :style="{width:'200px',float: 'left'}" clearable  filterable>
                    <Option v-for="item in noParticipantList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="已经参与过">
                <Select v-model="formData['participatedParPolicy']" :style="{width:'200px',float: 'left'}" clearable  filterable>
                    <Option v-for="item in noParticipantList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>   
</template>
<script>
export default {
    name: 'ParticipantDecisionModal',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '参与者决策'
        },
        nodeSetting:{
            type:Object,
            default () {
                return {}
            }
        },
        data:{
            type:Object,
            default () {
                return {}
            }
        },
        selectParticipantDecision:{
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
                // this.formData.nodeId = val.id;
                // this.formData = {
                //     ...this.data[val.id]
                // }
                this.formData = this.nodeSetting['parPolicies'];
            },
            deep:true,
        },
        // data:{
        //     handler(val){
        //         this.formData = val[this.nodeSetting.id];
        //     }
        // }
    },
    data () {
        return {
            visble: false,
            value: '',
            formData:{
                noParPolicy:'',
                dupParPolicy:'',
                participatedParPolicy:'' 
            },
            noParticipantList:[
                {name:'不处理',value:'001'},
                {name:'使用上一步审核结果',value:'002'},
                {name:'审核通过',value:'003'},
                {name:'审核拒绝',value:'004'},
            ],
            isSponsorList:[
                {name:'不处理',value:'001'},
                {name:'使用上一步审核结果',value:'002'},
                {name:'审核通过',value:'003'},
                {name:'审核拒绝',value:'004'},
            ],
            alreadyList:[
                {name:'不处理',value:'001'},
                {name:'使用上一步审核结果',value:'002'},
                {name:'审核通过',value:'003'},
                {name:'审核拒绝',value:'004'},     
            ]
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','ParticipantDecisionModal',false);
        },
        ok(){
            this.$emit('save',this.formData);
            this.$refs['formData'].resetFields();
            this.$emit('show','ParticipantDecisionModal',false);
        }
    },
}
</script>
