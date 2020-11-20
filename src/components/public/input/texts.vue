<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 17:34:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 14:51:31
-->
<template>
<div class="size-content">
    <div class="list" v-for="(item,index) in list" :key="index">
        <Input v-model="list[index]" placeholder="" style="width: 100px" @on-blur="handleInput" :disabled="disabled" />
    </div>
    <div class="list" v-if="!disabled">
        <Button type="primary" shape="circle" icon="md-add" @click.native="add"></Button>
    </div>
</div>
</template>

<script>
export default {
    name: "texts",
    components: {},
    model: {
        prop: 'value', // prop说:我要将value1作为该组件被使用(被父组件调用)时,v-model能取到的值
        event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: [
                ''
            ]
        }
    },
    methods: {
        add() {
            this.list.push('')
        },
        handleInput() {
            var jsonData = JSON.stringify(this.list);
            this.$emit('change', jsonData)
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
