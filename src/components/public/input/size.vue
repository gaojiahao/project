<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 17:34:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-10 17:40:55
-->
<template>
<div class="size-content">
    <div class="list">
        <span style="margin-right:10px">长</span><Input v-model="list.long" placeholder="" style="width: 100px" @on-blur="handleInput" :disabled="disabled" /><span style="margin-left:10px">cm</span>
    </div>
    <div class="list">
        <span style="margin-right:10px">宽</span><Input v-model="list.wide" placeholder="" style="width: 100px" @on-blur="handleInput" :disabled="disabled" /><span style="margin-left:10px">cm</span>
    </div>
    <div class="list">
        <span style="margin-right:10px">高</span><Input v-model="list.high" placeholder="" style="width: 100px" @on-blur="handleInput" :disabled="disabled" /><span style="margin-left:10px">cm</span>
    </div>
    <div class="list">
        <span style="margin-right:10px">体积</span><Input v-model="list.volume" placeholder="" style="width: 100px" @on-blur="handleInput" :disabled="disabled" /><span style="margin-left:10px">cm³</span>
    </div>
</div>
</template>

<script>
export default {
    name: "size",
    components: {},
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
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        value:{        
            handler(val){
                this.list = val;
            }
        }
    },
    data() {
        return {
            list: {
                long: '',
                wide: '',
                high: '',
                volume: '',
            }
        }
    },
    methods: {
        add() {
            this.list.push('')
        },
        handleInput() {
            // var jsonData = JSON.stringify(this.list);
            this.$emit('change', this.list)
        }
    },
    created() {}

}
</script>

<style lang="less" scoped>
.size-content{
    display: inline-block;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    .list {
        display: inline-block;
        overflow: hidden;
        position: relative;
        margin-right: 4px;
    }
}
</style>
