<template>
<li class="ivu-menu-submenu" :class="[ activeMenu ? 'ivu-menu-opened':'ivu-menu-submenu-color']">
    <div class="ivu-menu-submenu-title" @click="clickMenu2(parentItem&&parentItem.oneLevel,item)" v-if="item&&item.enabled">
        <i class="ivu-icon ivu-icon-ios-navigate" v-if="!item.icon"></i>
        <img class="icon" :src="this.$base_url+item.icon" v-else></img>
        <span class="ivu-menu-text" v-if="!isCollapsed">{{item.name}}</span>
        <i class="ivu-icon ivu-icon-ios-arrow-down" :class="[(opendedChild||opendedChildCom) ? 'ivu-menu-submenu-title-icon-up' : 'ivu-menu-submenu-title-icon-down']" v-if="item&&item.children&&item.children.length&&!isCollapsed"></i>
    </div>
    <collapse-transition v-if="mode === 'vertical'">
        <ul class="ivu-menu" v-show="opendedChild||opendedChildCom">
            <template v-for="(data,k) in item.children">
                <li class="ivu-menu-item ivu-menu-box" :key="k" :class="[activeMenu2==data.code ? 'ivu-menu-box-active':'']" @click="clickMenu(parentItem&&parentItem.oneLevel,item,data,false)" v-if="data.enabled">{{data.name}}
                </li>
            </template>
        </ul>
    </collapse-transition>
</li>
</template>

<script>
import {
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

            if (this.opened && this.$store.state.menuRouter.twoLevel && (this.$store.state.menuRouter.twoLevel.code == this.item.code)) {
                type = 'ivu-menu-submenu-title-icon-up';
            } else {
                if (this.$store.state.menuRouter.thirdLevel && this.$store.state.menuRouter.thirdLevel.code) {
                    type = 'ivu-menu-submenu-title-icon-up';
                }
            }
            return type;
        },
        activeMenu() {
            if (this.$store.state.menuRouter.twoLevel && (this.$store.state.menuRouter.twoLevel.code == this.item.code)) {
                return true; //需要监听的数据
            } else {
                return false;
            }
        },
        activeMenu2() {
            if (this.$store.state.menuRouter.thirdLevel && (this.$store.state.menuRouter.thirdLevel.code)) {
                return this.$store.state.menuRouter.thirdLevel.code; //需要监听的数据
            } else {
                return false;
            }
        },
        opendedChildCom() {
            if (this.$store.state.menuRouter.twoLevel && this.$store.state.menuRouter.twoLevel.code == this.item.code) {

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
                routerPath = routerPath + one.code;
            }
            if (two) {
                data['twoLevel'] = two;
                routerPath = routerPath + '/' + two.code;
            }
            if (third) {
                data['thirdLevel'] = third;
                routerPath = routerPath + '/' + third.code;
            }
            this.activeIndex = data;
            this.$store.commit('setMenuRouter', data);
            this.$router.push(routerPath);
        },
        clickMenu2(one, two, third, flag = true) {
            var data = {};
            var routerPath = "/";
            if (one) {
                data['oneLevel'] = one;
                routerPath = routerPath + one.code;
            }
            if (two) {
                data['twoLevel'] = two;
                routerPath = routerPath + '/' + two.code;
            }
            if (third) {
                data['thirdLevel'] = third;
                routerPath = routerPath + '/' + third.code;
            }
            this.activeIndex = data;
            this.$store.commit('setMenuRouter', data);
            if(data['twoLevel']&&data['twoLevel'].children&&data['twoLevel'].children.length){
                
            } else {
                this.$router.push(routerPath);    
            }
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
.ivu-menu-box-active {
    color: #447ED9;
    border-right: 2px solid #447ED9;
    margin-right: 1px;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding: 14px 14px 14px 40px;
}
.ivu-menu-submenu /deep/ .ivu-menu-submenu-title img {
    width: 16px;
    vertical-align:middle;
}
</style>
<style scoped>
>>> .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title  {
    padding: 14px 14px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all 0.2s ease-in-out;
    text-align: center;
}
.ivu-menu-submenu-title > i, .ivu-menu-submenu-title span > i {
    margin-right: 0;
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

.ivu-menu-submenu-color {
    background: #DEE7F4;    
}
</style>
