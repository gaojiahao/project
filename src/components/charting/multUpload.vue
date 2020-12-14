<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-11 19:15:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-12 11:46:48
-->
<template>
    <div>
        <!-- <div class="top_tabale_header">
            <div class="item"><Icon type="ios-browsers" />{{item.platform}}</div>
            <div class="item"><Icon type="ios-basket" />{{item.store}}</div>
            <div class="item"><Icon type="md-person" />{{item.people}}</div>
        </div> -->
        <div style="margin-bottom:10px;"><Upload type="img" @set-data="setData" :disabled="config.disabled" v-model="data.img"></Upload></div> 
        <div style="margin-bottom:10px;"><Upload type="music" @set-data="setData" :disabled="config.disabled" v-model="data.music"></Upload></div>
        <div style="margin-bottom:10px;"><Upload type="vdieo" @set-data="setData" :disabled="config.disabled" v-model="data.vdieo"></Upload></div>
        <div style="margin-bottom:10px;"><Upload type="threed" @set-data="setData" :disabled="config.disabled" v-model="data.threed"></Upload></div>
    </div>
</template>
<script>
const upload = ()=>import("@components/public/upload/upload");
export default {
    name:'MultUpload',
    model: {
        prop: 'value', // prop说:我要将value1作为该组件被使用(被父组件调用)时,v-model能取到的值
        event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    }, 
    props: {
        value: {
            type: Object,
            default () {
                return {}
            }
        },
        config: {
            type: Object,
            default () {
                return {}
            }
        },
    },
    components: {
        Upload:upload
    },
    data(){
        return {
            data:{

            }
        }
    },
    watch:{
        
    },
    methods:{
        setData(type,data){
            this.$set(this.data,type,data);
            this.$emit('change', this.data);
        },
    },
    created() {
      this.data = this.value;  
    },
}
</script>
<style lang="less" scoped>
.top_tabale_header {
    height: 30px;
    line-height: 30px;
    .item {
        float: left;
        margin-right: 10px;
    }
}
</style>