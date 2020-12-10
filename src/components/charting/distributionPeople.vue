<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 17:34:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-10 09:46:58
-->
<template>
<div class="size-content">
    <div class="box">
        <Button size="small" type="success" @click="add">新增</Button>
    </div>
    <div class="box" v-for="(item,index) in data" :key="index">
        <div class="list">
            <span style="float:left; line-height:34px">制作类型：</span>
            <Select v-model="item.type" :style="{width:'200px',float: 'left'}" clearable>
                <Option v-for="item in typeList" :value="item.value" :key="item.value" >{{ item.name }}</Option>
            </Select>
        </div>
        <div class="list">
            <span style="float:left; line-height:34px">人员：</span>
            <SelectorSingle v-model="item.people" :config="people"></SelectorSingle>
        </div>
        <div class="list">
            <span style="line-height:34px">时间：</span>
            <DatePicker v-model="item.date" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="" style="width: 400px"></DatePicker>
        </div>
        <div class="list">
            <Icon type="md-close" style="line-height:34px" @click.native="del(index)"/>
        </div>
    </div>
</div>
</template>

<script>
const selectorSingle = ()=>import("@components/public/xSelect/selectorSingle");
export default {
    name: "DistributionPeople",
    components: {
        SelectorSingle:selectorSingle
    },
    model: {
        prop: 'value', // prop说:我要将value1作为该组件被使用(被父组件调用)时,v-model能取到的值
        event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: {
                long: '',
                wide: '',
                high: '',
                volume: '',
            },
            typeList:[
                {name:'psd',value:'psd'},
                {name:'视频',value:'video'},
                {name:'3D建模',value:'3d'},
            ],
            people:{
                name: 'psd',
                type:'selectorMulti',
                dataSource: {
                    data:[
                      {id:1,platform:'李四',url:"美工组",comment:"无"},
                      {id:2,platform:'王五',url:"美工组",comment:"无1"},
                      {id:3,platform:'马六',url:"美工组",comment:"无2"}
                    ]
                  },
                  proertyContext: {
                    "dataSourceCols": [
                      {
                        "title": "id",
                        "key": "id"
                      },
                      {
                        "title": "人员",
                        "key": "platform"
                      },
                      {
                        "title": "部门",
                        "key": "url"
                      },
                      {
                        "title": "备注",
                        "key": "comment"
                      },
                    ]
                  },
                  valueField: "id",  //值字段
                  displayField: "platform", //显示字段
            },
            data:[
                {
                    type:'',
                    people:'',
                    date:''
                }
            ]
        }
    },
    watch:{
        data:{
            handler(val){
                this.handleInput(val);
            }
        }
    },
    methods: {
        add() {
            this.data.push({
                type:'',
                people:'',
                date:''
            });
        },
        handleInput(data) {
            var jsonData = JSON.stringify(data);
            this.$emit('change', jsonData)
        },
        del(index){
            this.$delete(this.data,index);
        }
    },
    created() {
        this.handleInput(this.data);
    }

}
</script>

<style lang="less" scoped>
.size-content{
    display: inline-block;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    .box{
        display: flex;
        .list {
            margin-right: 4px;
        }
    }
}
.size-content /deep/ .list /deep/ .x-select /deep/ .box{ width: 150px; float: left;line-height:32px}
</style>
