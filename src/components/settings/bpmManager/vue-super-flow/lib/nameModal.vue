<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-28 15:02:06
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        draggable >
        <Form :model="node" ref="dataForm" :label-width="80">
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
                <Input  v-model="node.data&&node.data.business"></Input >
            </FormItem>
        </Form>
    </Modal>   
</template>
<script>
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
            this.$emit('show','NameModal',false);
        }
    }
}
</script>
