<template>
<li class="ivu-menu-submenu ivu-menu-submenu-height" :class="[ opened&&activeMenu==item.code ? 'ivu-menu-opened':'']" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div class="ivu-menu-submenu-title" @click="clickMenu(item)">
        <i class="ivu-icon ivu-icon-ios-navigate" v-if="!item.icon"></i>
        <img class="icon" :src="this.$base_url+item.icon" v-else></img>
        {{item.name}}
        <i class="ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon" :class="[ openedDrop ? 'ivu-icon-ios-arrow-down-transform':'']" v-if="item&&item.children&&item.children.length&&item.enabled"></i>
    </div>
    <div class="ivu-select-dropdown" :style="dropStyle" :class="[ openedDrop ? 'ivu-select-dropdown-display':'ivu-select-dropdown-none']" v-if="item&&item.children&&item.children.length&&item.enabled">
        <ul class="ivu-menu-drop-list" v-for="(data,k) in item.children" :key='k'>
            <li class="ivu-menu-item-group" v-if="data.enabled">
                <div class="ivu-menu-item-group-title" @click="clickMenu2(item,data)">{{data.name}}</div>
                <ul v-for="(dItem,y) in data.children" :key="y">
                    <li class="ivu-menu-item" @click="clickMenu(item,data,dItem)" v-if="dItem.enabled">
                        {{dItem.name}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
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
    name: 'YSubmenu',
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
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            active: false,
            opened: false,
            dropWidth: parseFloat(getStyle(this.$el, 'width')),
            openedDrop: false,
        };
    },
    computed: {
        classes() {
            return [
                `${prefixCls}-submenu`,
                {
                    [`${prefixCls}-item-active`]: this.active && !this.hasParentSubmenu,
                    [`${prefixCls}-opened`]: this.opened,
                    [`${prefixCls}-submenu-disabled`]: this.disabled,
                    [`${prefixCls}-submenu-has-parent-submenu`]: this.hasParentSubmenu,
                    [`${prefixCls}-child-item-active`]: this.active
                }
            ];
        },
        arrowType() {
            let type = 'ivu-icon-ios-arrow-down';

            if (this.opened) {
                type = 'ivu-icon-ios-arrow-up';
            }
            return type;
        },
        dropStyle() {
            let style = {};

            if (this.dropWidth) style.minWidth = `${this.dropWidth}px`;
            return style;
        },
        activeMenu() {
            return this.$store.state.menuRouter&&this.$store.state.menuRouter.oneLevel&&this.$store.state.menuRouter.oneLevel.code; //需要监听的数据
        }
    },
    methods: {
        handleMouseenter() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.openedDrop = true;
                this.opened = this.opened ? false : true;
            }, 100);
        },
        handleMouseleave() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.openedDrop = false;
                this.opened = this.opened ? false : true;
            }, 100);
        },
        clickMenu(one, two, third, flag = true) {
            clearTimeout(this.timeout);
            if (flag) {
                this.opened = this.opened ? false : true;
            }
            var data = {};
            var routerPath = "/";
            if (one) {
                data['oneLevel'] = one;
                routerPath = routerPath + one.code;
            }
            if (two) {
                data['twoLevel'] = two;
                routerPath = routerPath + '/' + two.code;
            } else {
                if(data['oneLevel']['code']!='index'){
                    return ;
                }
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
            clearTimeout(this.timeout);
            if (flag) {
                this.opened = this.opened ? false : true;
            }
            var data = {};
            var routerPath = "/";
            if (one) {
                data['oneLevel'] = one;
                routerPath = routerPath + one.code;
            }
            if (two) {
                data['twoLevel'] = two;
                routerPath = routerPath + '/' + two.code;
            } else {
                if(data['oneLevel']['code']!='index'){
                    return ;
                }
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
    },
};
</script>

<style scoped>
.ivu-menu-opened {
    color: #FFFFFF;
    background: #447ED9;
    z-index: 2;
}
</style><style scoped>
.ivu-menu-opened /deep/ {
    color: #FFFFFF;
    background: #447ED9;
    z-index: 2;
}

.ivu-icon-ios-arrow-down-transform {
    transform: rotate(180deg);
}

.ivu-select-dropdown-display /deep/ {
    min-width: 147.781px;
    transform-origin: center top;
    position: absolute;
    will-change: top, left;
    top: 50px;
    left: 0px;
}

.ivu-select-dropdown-none /deep/ {
    min-width: 147.781px;
    transform-origin: center top;
    display: none;
}

.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item /deep/ {
    color: #2b85e4;
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-group-title:hover{
    background: #f3f3f3;
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 8px;
    font-size: 14px;
    color: #515a6e;
}
.ivu-menu-submenu /deep/ .ivu-menu-submenu-title i {
    margin-right: 0;
}
.ivu-menu-submenu /deep/ .ivu-menu-submenu-title img {
    width: 16px;
    vertical-align:middle;
}
</style>
<style lang="less" scoped>
.ivu-menu-submenu-height{
    height: 54px;
}

</style>
