<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 18:21:45
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        draggable >
        <Form :model="node" ref="formData" :label-width="80">
            <FormItem label="ID">
                <Input  v-model="node.id" disabled ></Input >
            </FormItem>
            <FormItem label="类型">
                <Input  v-model="node.data&&node.data.prop" disabled ></Input >
            </FormItem>
            <FormItem label="名称">
                <Input  v-model="node.data&&node.data.name"></Input >
            </FormItem>
            <FormItem label="业务">
                <Select v-model="node.data&&node.data.business" clearable filterable>
                    <Option v-for="item in businessList" :value="item.id" :key="item.id">{{ item.businessName }}</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>   
</template>
<script>
import {
    GetBusinessConfigList
} from "@service/settingsService";

export default {
    name: 'NameModal',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        nodeSetting:{
            type:Object,
            default () {
                return {}
            }
        }
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
        },
        nodeSetting:{
            handler(val){
                this.node = {
                    ...this.nodeSetting,
                };
            },
            deep:true
        },
    },
    data () {
        return {
            visble: false,
            value: '',
            node: {},
            businessList:[]
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','NameModal',false);
        },
        save() {
            this.$emit('save',this.node);
        },
        ok(){
            this.$emit('save',this.node);
            this.$refs['formData'].resetFields();
            this.$emit('show','NameModal',false);
        },
        GetBusinessConfigList(){
            return new Promise((resolve, reject) => {
                GetBusinessConfigList().then(res => {
                    if (res.result.code == 200) {
                        this.businessList = res.result.item;
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                    }
                });
            });
        },
    },
    created(){
        this.GetBusinessConfigList();
    }
}
</script>
