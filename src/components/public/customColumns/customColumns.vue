<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-21 10:58:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-04 16:55:10
-->
<template>
    <div>
        <div class="filterColumns">
            <Button size="small" @click="show">
                <Icon type="md-settings"></Icon>
            </Button>
            <div class="filterColumnsBox" v-show="isShow">
                <Card>
                    <Row>
                        <Col span="24">
                            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;float: left;margin-left: 5px;width: 100%;line-height: 24px;">
                                <Checkbox
                                    :indeterminate="indeterminate"
                                    :value="checkAll"
                                    @click.prevent.native="handleCheckAll">全选</Checkbox>
                            </div>
                        </Col>
                    </Row>
                    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                        <Row>
                            <template v-for="(item,index) in data">
                                <Col span="12">
                                    <Checkbox :label="item.value">{{item.name}}</Checkbox>
                                </Col>
                            </template>
                        </Row>
                    </CheckboxGroup>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col
} from "view-design";
export default {
    name:"CustomColumns",
    components: {
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Row,
        Col
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
            defaultCheckAllGroup:[],
            isShow:false,
        }
    },
    watch:{
        columns:{
            handler(val){
                
            }
        }
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
                    if(col.slot){
                        this.checkAllGroup.push(col.slot);
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
        show(){
            this.isShow = this.isShow ? false:true;
        },
        init(){
            this.data = [];
            this.checkAllGroup = [];
            this.defaultCheckAllGroup = this.columns;
            this.defaultCheckAllGroup.forEach(col => {
                if(col.key){
                    this.data.push({name:col.title,value:col.key});
                    this.checkAllGroup.push(col.key); 
                    this.checkAll = true;   
                    this.indeterminate = false;
                }
                if(col.slot){
                    this.data.push({name:col.title,slot:col.slot,value:col.slot});
                    this.checkAllGroup.push(col.slot); 
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
.filterColumns{
    margin-left: 20px;
    .filterColumnsBox{
        transition: all .2s ease-in-out;
        position: absolute;
        right: 15px;
        // top: 113px;
        z-index: 10;
        width: 300px;
        background-color: #fff;    
    }
}
.ivu-checkbox-group-item {
    float: left;
    margin-left: 5px;
    line-height: 24px;
}
</style>