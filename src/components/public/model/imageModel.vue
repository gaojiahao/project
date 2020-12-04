<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-17 18:18:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 16:27:00
-->
<template>
    <Modal :title="srcData.imgName" v-model="show"  @on-cancel="cancel" fullscreen footer-hide>      
        <img :src="srcData.src" v-if="show" style="width: 100%">
    </Modal>
</template>
<script>
export default {
    name: 'ImageModel',
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
    methods:{
        cancel() {
            this.$emit('show-image-model', false);
        },
    },
    data(){
        return {
            show:false,        
        }
    }
}
</script>