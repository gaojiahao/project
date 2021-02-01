<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-01 09:22:39
-->
<template>
<div class="content">
    <div class="head">
        <span class="text">平台类目</span>
    </div>
    <div style="margin:5px">
        <Input search clearable placeholder="" size="small" @on-search="onSearch" @on-clear="onCler" />
    </div>
    <div class="list">
        <Tree ref="tree" :data="data" :render="renderContent" show-checkbox @on-check-change="checkChange" check-strictly expand-node></Tree>
    </div>
</div>
</template>

<script>
export default {
    name: 'PlatformCategoryBind',
    props:{
        data:{
            type:Array,
            default () {
                return []
            }           
        },
    },
    data() {
        return {
            loop: 0
        }
    },
    methods: {
        selectChangeAll() {

        },
        renderContent (h, { root, node, data }) {
            var t = this,
            e = t.$createElement;
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.name)
                ]),
            ]);
        },
        checkChange(items, item) {
            this.$emit('select-platform-bind', item);
            if (items.length > 1) {
                this.loop = 0;
                this.childnodes(this.data, items, item)
            }
        },
        childnodes(data, items, item) {
            if (this.loop) return false
            const len = data.length
            const its = items.length
            let i = 0
            let j = 0
            for (i = 0; i < len; i++) {
                for (j = 0; j < its; j++) {
                    if (items[j].id === data[i].id) {
                        if (items[j].id === item.id) {
                            break
                        } else {
                            this.loop = 1
                            data[i].checked = false
                            return false
                        }
                    }
                }
                if (!this.loop && data[i].children && data[i].children.length > 0) {
                    this.childnodes(data[i].children, items, item)
                }
            }
        },
        clear(){
            var checkData = this.$refs.tree.getCheckedNodes();
            if(checkData.length){
                checkData[0].checked = false;
            }
        },
        onSearch(value){
            this.$emit('set-filter',value);
        },
        onCler(){
            this.$emit('set-filter','');
        }
    }
}
</script>
<style lang="less" scoped>
.content {
    margin: 0 10px 0 0;
    background-color: #ffffff;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;

    .head {
        width: 100%;
        height: 30px;
        background:#d2effd;
        line-height: 30px;
        .text {
            margin-left: 5px;
        }
    }
    .list{
        overflow-y: scroll;
        height: 375px;
        position: relative;    
    }
}
</style>
