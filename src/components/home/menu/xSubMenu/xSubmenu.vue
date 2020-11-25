<template>
<!--<li class="ivu-menu-submenu" :class="[ opened&&(activeMenu==parentItem.oneLevel.value) ? 'ivu-menu-opened':'']">-->
<li class="ivu-menu-submenu" :class="[ activeMenu ? 'ivu-menu-opened':'ivu-menu-submenu-color']">
    <div class="ivu-menu-submenu-title" @click="clickMenu(parentItem&&parentItem.oneLevel,item)" v-if="item&&item.status">
        <i class="ivu-icon ivu-icon-ios-navigate"></i>
        <span class="ivu-menu-text" v-if="!isCollapsed">{{item.name}}</span>
        <i class="ivu-icon ivu-icon-ios-arrow-down" :class="[(opendedChild||opendedChildCom) ? 'ivu-menu-submenu-title-icon-up' : 'ivu-menu-submenu-title-icon-down']" v-if="item&&item.children&&item.children.length&&!isCollapsed"></i>
    </div>
    <collapse-transition v-if="mode === 'vertical'">
        <ul class="ivu-menu" v-show="opendedChild||opendedChildCom" v-for="(data,k) in item.children" :key="k">
            <li class="ivu-menu-item ivu-menu-box" @click="clickMenu(parentItem&&parentItem.oneLevel,item,data,false)" v-if="data.status">{{data.name}}
            </li>
        </ul>
    </collapse-transition>
</li>
</template>

<script>
import {
    Icon,
    Drop
} from "view-design";
import CollapseTransition from './js/collapse-transition';
import {
    getStyle,
    findComponentUpward,
    findComponentsDownward
} from './js/assist';
import Emitter from './js/emitter';
import mixin from './js/mixin';

const prefixCls = 'ivu-menu';

export default {
    name: 'XSubmenu',
    mixins: [Emitter, mixin],
    components: {
        Icon,
        Drop,
        CollapseTransition
    },
    props: {
        item: {
            type: Object,
            default () {
                return {}
            },
        },
        disabled: {
            type: Boolean,
            default: false
        },
        parentItem: {
            type: Object,
            default () {
                return {}
            },
        },
        isCollapsed: {
            type: Boolean,
            dafault: false
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            active: false,
            opened: false,
            dropWidth: parseFloat(getStyle(this.$el, 'width')),
            opendedChild: false,
        };
    },
    computed: {
        arrowType() {
            let type = 'ivu-menu-submenu-title-icon-down';

            if (this.opened && this.$store.state.menuRouter.twoLevel && (this.$store.state.menuRouter.twoLevel.value == this.item.value)) {
                type = 'ivu-menu-submenu-title-icon-up';
            } else {
                if (this.$store.state.menuRouter.thirdLevel && this.$store.state.menuRouter.thirdLevel.value) {
                    type = 'ivu-menu-submenu-title-icon-up';
                }
            }
            return type;
        },
        activeMenu() {
            if (this.$store.state.menuRouter.twoLevel && (this.$store.state.menuRouter.twoLevel.value == this.item.value)) {
                return true; //需要监听的数据
            } else {
                return false;
            }
        },
        opendedChildCom() {
            if (this.$store.state.menuRouter.twoLevel && this.$store.state.menuRouter.twoLevel.value == this.item.value) {

                return this.opendedChild ? false : true; //需要监听的数据
            } else {
                return false;
            }
        }
    },
    methods: {
        clickMenu(one, two, third, flag = true) {
            var data = {};
            var routerPath = "/";
            if (one) {
                data['oneLevel'] = one;
                routerPath = routerPath + one.value;
            }
            if (two) {
                data['twoLevel'] = two;
                routerPath = routerPath + '/' + two.value;
            }
            if (third) {
                data['thirdLevel'] = third;
                routerPath = routerPath + '/' + third.value;
            }
            this.activeIndex = data;
            this.$store.commit('setMenuRouter', data);
            this.$router.push(routerPath);
        },
        opendedChildFun() {
            this.opendedChild = this.opendedChild ? false : true;
        }
    },
};
</script>

<style lang="less" scoped>

.ivu-menu-opened {
    color: #FFFFFF;
    background: #447ED9;
    z-index: 2;
}

.ivu-menu-text {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.ivu-menu-box{
    background: rgb(220, 222, 226);
    text-align: left;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding: 14px 14px 14px 40px;
}
</style>
<style scoped>
>>> .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title  {
    padding: 14px 14px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all 0.2s ease-in-out;
    text-align: left;
}
.ivu-icon /deep/ {
    vertical-align: middle;
    font-size: 16px;
    margin-right: 6px;
}

.ivu-menu-opened /deep/ {
    color: #FFFFFF;
    background: #447ED9;
    z-index: 2;
}

.ivu-menu-submenu-title-icon-up {
    /*flex: ;position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%) rotate(180deg);*/
}

.ivu-menu-submenu-title-icon-down {
    /*position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);*/
}
.ivu-menu-submenu-color {
    background: #DEE7F4;    
}
</style>
