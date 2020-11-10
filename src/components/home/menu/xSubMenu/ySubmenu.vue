<template>
<li class="ivu-menu-submenu" :class="[ opened&&activeMenu==item.value ? 'ivu-menu-opened':'']" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" style="height:64px">
    <div class="ivu-menu-submenu-title" @click="clickMenu(item)">
        <i class="ivu-icon ivu-icon-ios-navigate"></i>
        {{item.name}}
        <i class="ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon" :class="[ openedDrop ? 'ivu-icon-ios-arrow-down-transform':'']" v-if="item&&item.children&&item.children.length&&item.status"></i>
    </div>
    <div class="ivu-select-dropdown" :style="dropStyle" :class="[ openedDrop ? 'ivu-select-dropdown-display':'ivu-select-dropdown-none']" v-if="item&&item.children&&item.children.length&&item.status">
        <ul class="ivu-menu-drop-list" v-for="(data,k) in item.children" :key='k'>
            <li class="ivu-menu-item-group" v-if="data.status">
                <div class="ivu-menu-item-group-title" @click="clickMenu(item,data)">{{data.name}}</div>
                <ul v-for="(dItem,y) in data.children" :key="y">
                    <li class="ivu-menu-item" @click="clickMenu(item,data,dItem)" v-if="dItem.status">
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
    name: 'YSubmenu',
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
            return this.$store.state.menuRouter.oneLevel.value; //需要监听的数据
        }
    },
    methods: {
        handleMouseenter() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.openedDrop = true;
                this.opened = this.opened ? false : true;
            }, 250);
        },
        handleMouseleave() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.openedDrop = false;
                this.opened = this.opened ? false : true;
            }, 250);
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
    top: 60px;
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
</style>
