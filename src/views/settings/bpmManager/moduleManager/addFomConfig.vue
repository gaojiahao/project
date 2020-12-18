<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 11:40:24
-->
<template>
<div>
    <div class="top-title">
        {{title}}
    </div>
    <div class="research-container">
        <div class="filter">
            <div class="filter-button">
                <Button size="small" type="primary" icon="ios-add" @click.native="showPop(true)">添加视图</Button>
                <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm">删除</Button>
                <Button size="small" @click="">复制视图</Button>
            </div>
        </div>
        <div class="myTable">
            <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="success" icon="md-create" size="small" style="margin-right: 5px" @click="goConfig(row)">配置</Button>
                </template>
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
                </div>
            </div>
        </div>
    </div>
    <ModalForm ref="form":titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showPopModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
</div>
</template>

<script>
import Research from "@components/basicinfo/developNewProductList/research";
import ModalForm from "@components/public/form/modalForm";
import config from "@views/settings/bpmManager/moduleManager/addFormConfig";

export default {
    name: 'AddFomConfig',
    components: {
        Research,
        ModalForm
    },
    props: {
        showModel: {
            type: Boolean,
            default: false,
        },
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showPopModel: false,
            data: {},
            show: false,
            loading: true,
            activatedRow:{},
            showResearchStatus:false,
            title:'',
            formData: {
                productCode: 'TX23423',
                productType: '积木',
                brand: '森宝',
                isPacking: 'true',
                productName: '地方撒快乐'
            },
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        on:{
                            click:()=>{// 这里给了他一个打印事件，下面有展示图
                                this.goDetail(params.row.id)    
                            }
                        }
                        },params.row.id);//  展示的内容
                    }
                },
                {
                    title: '视图名称',
                    key: 'viewName',
                },
                {
                    title: '配置',
                    slot: 'action',
                    align: 'center',
                    width: 310
                }
            ],
            data: [
                {
                    id:'fds',
                    viewName: '提交视图',
                },
                {
                    id:'cxvxc',
                    viewName: '审核视图',
                },
                {
                    id:'zdc',
                    viewName: '修改视图',
                },
                {
                    id:'czxcxvxc',
                    viewName: '查看视图',
                },
            ],
        }
    },
    watch: {
        showModel: {
            handler(val) {
                this.show = val
            }
        },
    },
    methods: {
        ok(){
            this.showResearch(false)
        },
        cancel(){
            this.$emit('show-research-model', false);
            this.showResearch(false);
            this.handleClearCurrentRow();
            this.showResearchStatus = false;
        },
        changePage(){},
        handleSubmit(){},
        sureDeleteConfirm () {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    this.deleteData();
                    this.$Message.info({
                        content: '删除成功',
                        duration: 2
                    });
                    this.showResearchStatus = false;
                },
            });
        },
        onCurrentChange(currentRow,oldCurrentRow){
            this.activatedRow = currentRow;  
            this.showResearch(true);     
        },
        deleteData(){
            if(this.activatedRow.id){
                for(var j=0;j<this.data.length;j++){
                    if(this.activatedRow.id==this.data[j].id){
                        this.data.splice(j, 1);   
                    }
                }
            } 
        },
        showResearch(flag){
            this.showResearchStatus = flag;
        },
        showPop(flag) {
            this.titleText = '添加视图';
            this.showPopModel = flag;
        },
        save(){
            this.$Message.info({content:'温馨提示：保存成功'});
            this.$refs.form.$refs['formValidate'].resetFields();
            this.data.push({
                id:'11',
                viewName: '视图111',
            }) 

        },
        clearFormData(){
            
        },
        handleClearCurrentRow () {
            this.$refs.selection.clearCurrentRow();
        },
        goConfig(row){
            this.$router.push({name:'setFomConfig',params: {id:row.id||'1',name:row.name}});
        }
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
        this.title = this.$route.params.name;
    }
}
</script>
<style lang="less" scoped>
.top {
    // flex: 1;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    padding: 5px;

    .top-box {
        width: 100%;
        height: auto;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;

        .item {
            margin-right: 10px;
            line-height: 32px;
            height: 32px;
        }
    }
}

.content {
    margin: 10px;

    .content-box {
        display: flex;

        .content-item {
            display: inline-block;
            overflow: hidden;
            position: relative;
            margin-right: 10px;
        }
    }
}

.top-title {
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 5px;
}
.research-container {
    .head {
        height: 30px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 24px;
        margin: 10px 0;

        .filter-button {
            float: left;
        }

        .filter-search {
            float: right;
            display: flex;
        }
    }
}
</style>


