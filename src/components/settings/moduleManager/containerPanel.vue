<template>
    <div class="form-container" v-if="visible">
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                容器配置
            </div>
            <div class="ef-node-form-body">
                <!--开始节点-->
                <Form :model="data" ref="formValidate" :label-width="80">
                    <FormItem label="容器编码">
                        <Input v-model="data.containerCode" @on-blur="change"></Input >
                    </FormItem>
                    <FormItem label="容器名称">
                        <Input v-model="data.containerName"></Input >
                    </FormItem>
                    <FormItem label="是否显示">
                        <RadioGroup v-model="data.config.hidden">
                            <Radio label="false" >
                                是
                            </Radio>
                            <Radio label="true" >
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>

</template>

<script>
    import {
    Row,
    Col,
    } from "view-design";

    export default {
        name:'ContainerPanel',
        props:{
            visible: {
                type: Boolean,
                default: false
            },
            data:{
                type:Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                
            }
        },
        watch:{

        },
        methods: {
            save() {
                this.$emit('save',this.node);
            },
            change(value){
                this.$emit('set-container',this.data);
            }
        },
        created(){
            
        }
    }
</script>
<style scoped>
>>>.ivu-form-item-content {
    text-align: left;
}
</style>
<style lang="less" scoped>
    .ef-node-form-header{
        text-align: left;
        padding: 5px 0 0 5px;
    }
    .form-container{
        width: 300px;
        border: 1px solid rgb(220, 227, 232);
        text-align: center;
        background-color: #FFFFFF; 
        .ef-node-form-body{
            padding: 10px 10px 0 0;
        }
    }
    .el-node-form-tag {
        position: absolute;
        top: 50%;
        margin-left: -15px;
        height: 40px;
        width: 15px;
        background-color: #fbfbfb;
        border: 1px solid rgb(220, 227, 232);
        border-right: none;
        z-index: 0;
    }
</style>
