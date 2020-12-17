<template>
<div class="type-manager-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">当前属性</span>
        </div>
        <div class="right">
            <Button type="primary" icon="md-add" size="small" @click.native="add">新建
            </Button>
        </div>
    </div>
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <template v-else>
            <template v-if="data.length">
                <Input search enter-button placeholder="" size="small" style="padding:5px;"/>
                <Tree :data="data" :render="renderContent" @on-select-change="onSelectChange" class="demo-tree-render" expand-node @on-contextmenu="handleContextMenu()">
                    <template slot="contextMenu">
                        <DropdownItem @click.native="append">添加</DropdownItem>
                        <DropdownItem @click.native="edit">编辑</DropdownItem>
                        <DropdownItem @click.native="remove($event)" style="color: #ed4014">删除</DropdownItem>
                    </template>
                </Tree>
            </template>
            <template v-else>
                暂无数据
            </template>
        </template>
    </div>
</div>
</div>
</template>

<script>
import {
    Scroll,
    List,
    ListItem,
    DropdownItem
} from "view-design";
export default {
    name: 'PropertyManagerList',
    components: {
        Scroll,
        List,
        ListItem,
        DropdownItem
    },
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type:Boolean,
            default: true
        }
    },
    data() {
        return {
            data: [{
                id: '1',
                title: '材质',
                loading: false,
                parentId: '',
                code:'dzqyj',
                contextmenu: true,
                children: [{
                    id: 'a',
                    title: '金属',
                    loading: false,
                    parentId: '1',
                    code:'wjl',
                    contextmenu: true,
                    children: [{
                        id: 'a-1',
                        title: '黄金',
                        loading: false,
                        parentId: 'a',
                        code:'jml',
                        contextmenu: true,
                        children: [{
                            id: 'a-1-1',
                            title: '99金',
                            loading: false,
                            parentId: 'a-1',
                            code:'mzjm',
                            contextmenu: true,
                        }, {
                            id: 'a-1-2',
                            title: '95金',
                            loading: false,
                            parentId: 'a-1',
                            code:'pvcjm',
                            contextmenu: true,
                        }]
                    }, {
                        id: 'a-2',
                        title: '白银',
                        loading: false,
                        parentId: 'a',
                        code:'ykl',
                        contextmenu: true,
                    }]
                }, ]
            },
            {
                id: '2',
                title: '颜色',
                loading: false,
                parentId: '',
                code:'dzqyj2',
                contextmenu: true,
                children: [{
                    id: 'a1',
                    title: '红色',
                    loading: false,
                    parentId: '2',
                    code:'wjl2',
                    contextmenu: true,
                    children: [{
                        id: 'a-11',
                        title: '桃红色',
                        loading: false,
                        parentId: 'a1',
                        code:'jml2',
                        contextmenu: true,
                        children: [{
                            id: 'a-1-1',
                            title: '桃红色1',
                            loading: false,
                            parentId: 'a-11',
                            code:'mzjm2',
                            contextmenu: true,
                        }, {
                            id: 'a-1-21',
                            title: '桃红色2',
                            loading: false,
                            parentId: 'a-11',
                            code:'pvcjm2',
                            contextmenu: true,
                        }]
                    }, {
                        id: 'a-21',
                        title: '蓝色',
                        loading: false,
                        parentId: 'a1',
                        code:'ykl2',
                        contextmenu: true,
                    }]
                }, ]
            }],
        }
    },
    methods: {
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
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: (e) => { this.append(e,data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-create-outline'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: (e) => {
                                this.edit(e,data) 
                            }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-remove'
                        }),
                        on: {
                            click: (e) => { this.remove(e,root, node, data) }
                        }
                    })
                ])
            ]);
        },
        add() {
            this.$emit('show-add');
        },
        onSelectChange(index){
            this.$emit('select-item', index);
        },
        append(e,data) {
            e.stopPropagation();
            e.preventDefault();
            this.$emit('show-add',data.id);
        },
        edit(e,data){
            e.stopPropagation();
            e.preventDefault();
            this.$emit('edit', data);
        },
        remove(e,root, node, data) {
            e.stopPropagation();
            e.preventDefault();
            this.$emit('del',root, node, data)
        },
        handleContextMenu(e,data) {
            this.contextData = data;
        },
    },
    created() {
        
    }
}
</script>

<style lang="less" scoped>
.type-manager-list {
    width: 100%;

    .head {
        width: 100%;
        height: 40px;
        background: linear-gradient(to top, #d2effd, #ffffff);
        line-height: 40px;

        .left {
            float: left;
            margin-left: 10px;
        }

        .right {
            float: right;
            margin-right: 10px;
        }
    }
    .content {
        overflow-y: scroll;
        height: 710px;
        position: relative;
        .active {
            color: #2d8cf0;
        }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .ivu-list-item{
        padding: 3px 0;
    }
    .ivu-tree /deep/ ul /deep/ li {
        margin-left: 5px;
    }
    .demo-tree-render /deep/ .ivu-tree-title{
        width: 100%;
    }
}
</style>
