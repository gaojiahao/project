<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 16:56:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-09 10:25:52
-->
<template>
<div class="break-container">
    <Breadcrumb :style="{ margin: '16px 0', float: 'left', height: '20px',lineHeight: '20px' }">
        <BreadcrumbItem v-if="leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.name">{{leftMenu.oneLevel.name}}</BreadcrumbItem>
        <template v-for="(item,index) in data">
            <BreadcrumbItem  @click.native="goMenu2(item.path)">
                {{item.meta.title}}
            </BreadcrumbItem>    
        </template>
    </Breadcrumb>
</div>
</template>

<script>
import {
    Breadcrumb,
    BreadcrumbItem,
} from "view-design";

export default {
    name: "breadCrumbNav",
    props: {},
    components: {
        Breadcrumb,
        BreadcrumbItem,
    },
    computed: {
        leftMenu() {
            if (this.$store.state.menuRouter) {
                return this.$store.state.menuRouter;
            } else {
                return JSON.parse(window.sessionStorage.getItem('activeMenu'));
            }
        }
    },
    data() {
        return {
            data:[],
        };
    },
    methods: {
        goMenu(one, two, third) {
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
        goMenu2(path){
            this.$router.push({path:path});
        },
        setMenu(to,form,flag){
            if(flag){
                this.data = [];
            }
            if(form.name=='index'){
                this.data.push(to)
            }
            var a = this.data.find(obj => obj.name == to.name);
            if(!(a&&a.name))
                this.data.push(to);
            if(!flag&&(to.meta.level < form.meta.level)){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].name == form.name){
                        this.data.splice(i, 1);   
                    }
                }
            }
            
        }
    }
};
</script>

<style lang="less" scoped>
.break-container {
    width: 100%;
    display: inline-block;
}
</style>
