<template>
<Tree :data="data5" :render="renderContent" class="demo-tree-render" show-checkbox multiple @on-check-change="selectChangeAll"></Tree>
</template>

<script>
import {

} from "view-design";
export default {
    name: 'XTree',
    components: {

    },
    data() {
        return {
            data5: [{
                title: '菜单',
                expand: true,
                render: (h, {
                    root,
                    node,
                    data
                }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-folder-outline'
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
                                    icon: 'ios-add',
                                    type: 'primary'
                                }),
                                style: {
                                    width: '64px'
                                },
                                on: {
                                    click: () => {
                                        this.append(data)
                                    }
                                }
                            })
                        ])
                    ]);
                },
                children: [{
                        title: '基础信息',
                        expand: true,
                        children: [{
                                title: '分类管理',
                                expand: true
                            },
                            {
                                title: '熟悉管理',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: '产品管理',
                        expand: true,
                        children: [{
                                title: '销售推品',
                                expand: true
                            },
                            {
                                title: '开发新品',
                                expand: true
                            }
                        ]
                    }
                ]
            }],
            buttonProps: {
                type: 'default',
                size: 'small',
            }
        }
    },
    methods: {
        renderContent(h, {
            root,
            node,
            data
        }) {
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
                            click: () => {
                                this.append(data)
                            }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-remove'
                        }),
                        on: {
                            click: () => {
                                this.remove(root, node, data)
                            }
                        }
                    })
                ])
            ]);
        },
        append(data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove(root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        selectChangeAll(selectedAll, selectedItem) {
            console.log(selectedAll, selectedItem)
        }
    }
}
</script>

<style scoped>
.demo-tree-render .ivu-tree-title {
    width: 100%;
}
</style><style lang="less" scoped>
.ivu-tree /deep/ {
    width: 600px;
}
</style>
