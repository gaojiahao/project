<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-17 18:18:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-17 19:17:03
-->
<template>
    <Modal :title="srcData.imgName" v-model="show" fullscreen footer-hide>      
        <img :src="srcData.src" v-if="show" style="width: 100%">
    </Modal>
</template>
<script>
import {
    Modal,
} from "view-design";
export default {
    name: 'ImageModel',
    components: {
        Modal
    },
    props:{
        srcData: {
            type: Object,
            default () {
                return {
                    imgName:'',
                    src:''
                }
            }
        },
        visible:{
            type:Boolean,
            default: false
        }
    },
    watch:{
        visible:{
            handler(val){
                this.show = val
            }
        }
    },
    data(){
        return {
            show:false,        
        }
    }
}
</script>