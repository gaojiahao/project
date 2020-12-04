<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-21 10:58:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 16:24:48
-->
<template>
    <div>
        <Dropdown style="margin-left: 20px">
            <Button type="primary" size="small">
                列
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;float: left;margin-left: 5px;">
                    <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <template v-for="(item,index) in data">
                        <Checkbox :label="item.value">{{item.name}}</Checkbox>
                    </template>
                </CheckboxGroup>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "view-design";
export default {
    name:"CustomColumns",
    components: {
        Dropdown,
        DropdownMenu,
        DropdownItem,
    },
    props:{
        columns: {
            type: Array,
            default () {
                return []
            }
        },
    },
    data(){
        return {
            indeterminate: true,
            checkAll: true,
            checkAllGroup: [],
            data:[],
            defaultCheckAllGroup:[]
        }
    },
    watch:{

    },
    methods: {
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;
            if (this.checkAll) {
                this.defaultCheckAllGroup.forEach(col => {
                    if(col.key){
                        this.checkAllGroup.push(col.key);
                    }

                });
            } else {
                this.checkAllGroup = [];
            }
            this.$emit('change-coulmns',this.checkAllGroup);
        },
        checkAllGroupChange (data) {
            if (data.length == this.data.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
            this.$emit('change-coulmns',this.checkAllGroup);
        },
        init(){
            this.data = [];
            this.checkAllGroup = [];
            this.defaultCheckAllGroup = this.columns
            this.defaultCheckAllGroup.forEach(col => {
                if(col.key){
                    this.data.push({name:col.title,value:col.key});
                    this.checkAllGroup.push(col.key); 
                    this.checkAll = true;   
                    this.indeterminate = false;
                }

            });
        }
    },
    created(){
        this.init();    
    }
    
}
</script>
<style lang="less" scoped>
.ivu-checkbox-group-item {
    float: left;
    margin-left: 5px;
}
</style>