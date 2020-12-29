<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-29 20:17:26
-->
<template>
<div class="content">
    <div class="head">
        <span class="text">系统类目</span>
    </div>
    <div style="margin:5px">
        <Input search clearable placeholder="" />
    </div>
    <div class="list">
        <Tree :data="data" :render="renderContent" show-checkbox @on-check-change="checkChange" check-strictly></Tree>
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
            // data: [{
            //     id: 1,
            //     title: '电子器元件',
            //     loading: false,
            //     expand: true,
            //     children: [{
            //         id: 'a',
            //         title: '玩具类',
            //         loading: false,
            //         expand: true,
            //         children: [{
            //             id: 'a-1',
            //             title: '积木类',
            //             loading: false,
            //             expand: true,
            //             children: [{
            //                 id: 'a-1-1',
            //                 title: '木质积木',
            //                 loading: false,
            //                 children: []
            //             }, {
            //                 id: 'a-1-2',
            //                 title: 'pvc积木',
            //                 loading: false,
            //                 children: []
            //             }]
            //         }, {
            //             id: 'a-2',
            //             title: '遥控类',
            //             loading: false,
            //             expand: true,
            //             children: []
            //         }]
            //     }, ]
            // }],
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
        removeSelect(data) {
            var d = data || this.data;
            var len = d.length
            for (var i = 0; i < len; i++) {
                d[i].checked = false;
                if (d[i].children && d[i].children.length > 0) {
                    this.removeSelect(d[i].children)
                }
            }
        },
        clear(){
            var checkData = this.$refs.tree.getCheckedNodes();
            checkData[0].checked = false;     
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
    }
    .list{
        overflow-y: scroll;
        height: 375px;
        position: relative;    
    }
    .demo-tree-render /deep/ .ivu-tree-title{
        width: 100%;
    }
}
</style>