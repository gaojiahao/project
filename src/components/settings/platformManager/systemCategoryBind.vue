<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-19 16:50:56
-->
<template>
<div class="content">
    <div class="head">
        <span class="text">系统类目</span>
    </div>
    <div style="margin:5px 10px">
        <Input search clearable placeholder="" size="small" @on-search="onSearch" @on-clear="onCler" />
    </div>
    <div class="list">
        <Tree :data="data" :render="renderContent" show-checkbox @on-check-change="checkChange" check-strictly ref="tree"></Tree>
    </div>
</div>
</template>

<script>
export default {
    name: 'SystemCategoryBind',
    props:{
        data:{
            type:Array,
            default () {
                return []
            }           
        },
    },
    watch:{},
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
                    // h('Icon', {
                    //     props: {
                    //         type: 'ios-paper-outline'
                    //     },
                    //     style: {
                    //         marginRight: '8px'
                    //     }
                    // }),
                    h('span', data.name)
                ]),
            ]);
        },
        checkChange(items, item) {
            this.$emit('select-system-bind', item);
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
            if(checkData.length)
                checkData[0].checked = false;  
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
    border-radius: 3px;
    .head {
        width: 100%;
        height: 30px;
        background:#d2effd;
        line-height: 30px;
        border-radius: 3px 3px 0 0;
        .text {
            margin-left: 10px;
        }
    }
    .list{
        overflow-y: scroll;
        height: 375px;
        position: relative;
        .ivu-tree /deep/ ul li {
            list-style: none;
            margin: 3px 0 3px 10px;
            padding: 0;
            white-space: nowrap;
            outline: none;
        }
    }
    .demo-tree-render /deep/ .ivu-tree-title{
        width: 100%;
    }
}
</style>