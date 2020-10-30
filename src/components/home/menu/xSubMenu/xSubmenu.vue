<template>
<li class="ivu-menu-submenu" :class="[ opened ? 'ivu-menu-opened':'']">
    <div class="ivu-menu-submenu-title" @click="clickMenu(parentItem&&parentItem.oneLevel,item)">
        <i class="ivu-icon ivu-icon-ios-navigate"></i>
        <span class="ivu-menu-text">{{item.name}}</span>
        <i class="ivu-icon ivu-menu-submenu-title-icon" :class="arrowType" v-if="item&&item.children&&item.children.length"></i>
    </div>
    <collapse-transition v-if="mode === 'vertical'">
        <ul class="ivu-menu" v-show="opened" v-for="(data,k) in item.children">
            <li class="ivu-menu-item" style="padding-left: 43px; background: #dcdee2;" @click="clickMenu(parentItem&&parentItem.oneLevel,item,data,false)">{{data.name}}
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
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            active: false,
            opened: false,
            dropWidth: parseFloat(getStyle(this.$el, 'width')),
        };
    },
    computed: {
        arrowType() {
            let type = 'ivu-icon-ios-arrow-down';

            if (this.opened) {
                type = 'ivu-icon-ios-arrow-up';
            }
            return type;
        },
    },
    methods: {
        clickMenu(one, two, third, flag = true) {
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

<style>
.ivu-menu-opened {
    color: #FFFFFF;
    background: #447ED9;
    z-index: 2;
}

.ivu-menu-text {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
</style>
<style scoped>
.ivu-menu-submenu-title /deep/ {
    padding: 14px 14px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all 0.2s ease-in-out;
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

.ivu-icon-ios-arrow-up {
    transform: translateY(-50%) rotate(180deg);
}
</style>
