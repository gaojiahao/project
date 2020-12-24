<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-14 17:21:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-21 16:48:03
-->
<template>
    <div>
        <Drawer :closable="false" width="640" v-model="showPanel" @on-close="onClose">
            <slot name='info'>
            </slot>
        </Drawer>
    </div>
</template>
<script>
import {
    Drawer,
    Row,
    Col
} from "view-design";
    export default {
        components: {
            Drawer,
            Row,
            Col,
        },
        props:{
            show: {
                type: Boolean,
                default: false,
            },
            pStyle: {
                type:Object,
                default () {
                    return {
                        fontSize: '16px',
                        color: 'rgba(0,0,0,0.85)',
                        lineHeight: '24px',
                        display: 'block',
                        marginBottom: '16px'
                    }
                }
            }
        },
        watch:{
            show:{
                handler(val){
                    this.showPanel = val;
                }
            }
        },
        data () {
            return {
                showPanel: false,
                // value: false,
                // pStyle: {
                //     fontSize: '16px',
                //     color: 'rgba(0,0,0,0.85)',
                //     lineHeight: '24px',
                //     display: 'block',
                //     marginBottom: '16px'
                // }
            }
        },
        methods:{
            onClose(){
                this.$emit('show','ShowPanel',false);
            }
        }
    }
</script>
<style>
    .demo-drawer-profile{
        font-size: 14px;
    }
    .demo-drawer-profile .ivu-col{
        margin-bottom: 12px;
    }
</style>