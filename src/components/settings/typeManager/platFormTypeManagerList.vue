<template>
<div class="type-manager-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">当前分类</span>
        </div>
    </div>
    <div class="head">
        <div class="left">
            <Button type="primary" icon="md-add" size="small" @click.native="add">新建
            </Button>
            <Button type="success" icon="md-add" size="small" @click.native="append">新建子类
            </Button>
            <Button type="info" icon="ios-create-outline" size="small" @click.native="edit">编辑
            </Button>
            <Button type="error" icon="ios-close" size="small" @click.native="remove">删除
            </Button>
        </div>
    </div>
    <div style="display: flex;">
        <div style="width:34px;line-height:34px;margin-left:10px"><span>平台:</span></div>
        <div>
            <Select v-model="platFormId" :style="{width:'100px',float: 'left',padding:'5px'}" clearable  filterable @on-select="onChange" size="small">
                <Option v-for="item in platformList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <div>
            <Input search clearable placeholder="" size="small" style="padding:5px;width: 200px" @on-search="onSearch" @on-clear="onCler" />
        </div>
    </div>
    <Divider />
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <template v-else>
            <template v-if="data.length">
                <Tree :data="data" :render="renderContent" @on-select-change="onSelectChange" class="demo-tree-render" expand-node @on-contextmenu="handleContextMenu()" ref="tree">
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
import {
    getEcommercePlatformList,
    GetPlatformsList
} from "@service/settingsService"
export default {
    name: 'TypeManagerList',
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
    watch:{
        list:{
            handler(val){
                for(var i=0;i<val.length;i++){
                    val[i].title = val[i].name;
                    val[i].parentId = val[i].parentID;
                    val[i].code = val[i].id;
                }
                this.data= val;
            }    
        },
        platFormId:{
            handler(val){
                this.$emit('set-platform-filter',val);
            }
        }
    },
    data() {
        return {
            data: [],
            platFormId:'',
            platformList:[],
            selectItem:{}
        }
    },
    methods: {
        renderContent (h, { root, node, data }) {
            var t = this,
            e = t.$createElement;
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                    cursor: "pointer",
                },
                on: {
                    click: () => {
                    if (!node.node.selected)
                        this.$refs.tree.handleSelect(node.nodeKey); //手动选择树节点
                        this.selectItem = {
                            root:root,
                            node:node,
                            data:data
                        }
                    }
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
                    h('span', data.name)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    // h('Button', {
                    //     props: Object.assign({}, this.buttonProps, {
                    //         icon: 'ios-add'
                    //     }),
                    //     style: {
                    //         marginRight: '8px'
                    //     },
                    //     on: {
                    //         click: (e) => { this.append(e,data) }
                    //     }
                    // }),
                    // h('Button', {
                    //     props: Object.assign({}, this.buttonProps, {
                    //         icon: 'ios-create-outline'
                    //     }),
                    //     style: {
                    //         marginRight: '8px'
                    //     },
                    //     on: {
                    //         click: (e) => {
                    //             this.edit(e,root,node,data) 
                    //         }
                    //     }
                    // }),
                    // h('Button', {
                    //     props: Object.assign({}, this.buttonProps, {
                    //         icon: 'ios-remove'
                    //     }),
                    //     on: {
                    //         click: (e) => { this.remove(e,root, node, data) }
                    //     }
                    // })
                ])
            ]);
        },
        add() {
            this.$emit('show-add');
        },
        onSelectChange(index){
            this.$emit('select-item', index);
        },
        // append(e,data) {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     this.$emit('show-add',data);
        // },
        // edit(e,root,node,data){
        //     e.stopPropagation();
        //     e.preventDefault();
        //     this.$emit('edit', root,node,data);
        // },
        // remove(e,root, node, data) {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     this.$emit('del',root, node, data)
        // },
        append() {
            if(this.selectItem){
                this.$emit('show-add-child',this.selectItem.data);
            }
        },
        edit(){
            if(this.selectItem){
                this.$emit('edit', this.selectItem.root,this.selectItem.node,this.selectItem.data);
            }
        },
        remove() {
            if(this.selectItem){
                this.$emit('del',this.selectItem.root, this.selectItem.node, this.selectItem.data);
                this.selectItem = {};
            }
        },
        onSearch(value){
            this.$emit('set-filter',value);
        },
        onCler(){
            this.$emit('set-filter','');
        },
        onChange(){

        },
        GetPlatformsList() {
            return new Promise((resolve, reject) => {
                GetPlatformsList({platformId:this.platFormId}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.platformList = res.result.item;
                            this.platFormId = this.platformList[0]['id'];
                        });
                    }
                });
            });
        },
    },
    created() {
        this.GetPlatformsList();
    }
}
</script>

<style lang="less" scoped>
.type-manager-list {
    width: 100%;

    .head {
        width: 100%;
        height: 32px;
        background: #ffffff;
        line-height: 32px;

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
    .ivu-divider-horizontal{
        margin: 0;
    }
}
</style>
