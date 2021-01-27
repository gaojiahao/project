<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-27 15:42:21
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">基本信息</Divider>
        <div class="top_tabale">
            <div class="top-box">
                <div class="item">
                    <label>商品编号：</label>
                    <Input v-model="formData['code']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>商品名称：</label>
                    <Input v-model="formData['name']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>商品类目：</label>
                    <Input v-model="formData['categoryName']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>品牌：</label>
                    <Input v-model="formData['brandName']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>是否带包装：</label>
                    <RadioGroup v-model="formData['isPackage']">
                        <Radio :label="true" disabled>
                            是
                        </Radio>
                        <Radio :label="false" disabled>
                            否
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
        </div>
    </div>
    <div class="research-container">
        <div class="filter">
            <div class="filter-button">
                <Button size="small" type="primary" icon="ios-add" @click.native="showPop(true)">添加调研</Button>
                <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm">删除</Button>
                <Button size="small" @click="goReturn">返回</Button>
            </div>
        </div>
        <div class="myTable">
            <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
                </div>
            </div>
        </div>
    </div>
    <Research v-show="showResearchStatus" ref="research"></Research>
    <div slot="footer">
        
    </div>
    <ModalForm ref="form":titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showPopModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
</div>
</template>

<script>
import Research from "@components/basicinfo/developNewProductList/research";
import ModalForm from "@components/public/form/modalForm";
import config from "@views/basicinfo/developNewProducts/researchConfig";
import {
    GetPrepGoodsById,
    CreatePriceComparison
} from "@service/basicinfoService"

export default {
    name: 'ResearchDevelopNewProducts',
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
            formData: {},
            columns: [
                {
                    title: '调研编号',
                    key: 'researchNum',
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
                        },params.row.researchNum);//  展示的内容
                    }
                },
                {
                    title: '调研平台',
                    key: 'researchPlatform',
                },
                {
                    title: '调研链接',
                    key: 'researchUrl',
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                },
                {
                    title: '创建者',
                    key: 'creater',
                },
            ],
            data: [
                {
                    id:'fds',
                    researchNum: 'DY000001',
                    createTime: "2020-11-06",
                    creater:"王五",
                    researchPlatform:"亚马逊",
                    researchUrl:"www.amazon.cn"
                },
                {
                    id:'cxvxc',
                    researchNum: 'DY000002',
                    createTime: "2020-11-06",
                    creater:"王五",
                    researchPlatform:"亚马逊",
                    researchUrl:"www.amazon.cn"
                },
                {
                    id:'czxcxvxc',
                    researchNum: 'DY000003',
                    createTime: "2020-11-06",
                    creater:"王五",
                    researchPlatform:"亚马逊",
                    researchUrl:"www.amazon.cn"
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
            this.titleText = '添加调研';
            this.showPopModel = flag;
        },
        save(){
            this.$Message.info({content:'温馨提示：保存成功'});
            this.$refs.form.$refs['formValidate'].resetFields();
            this.data.push({
                id:'fds',
                researchNum: 'DY000001',
                createTime: "2020-11-06",
                creater:"王五",
                researchPlatform:"亚马逊",
                researchUrl:"www.amazon.cn"    
            }) 

        },
        clearFormData(){
            
        },
        handleClearCurrentRow () {
            this.$refs.selection.clearCurrentRow();
        },
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPrepGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formData = {
                                id: res.result.item.id,
                                code:res.result.item.code,
                                name: res.result.item.name,
                                categoryName: res.result.item.categoryName,
                                brandName:res.result.item.brandName,
                                isPackage: res.result.item.isPackage,
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        goReturn(){
            this.$router.go(-1);
        }
    },
    created(){
        this.getFormData();
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>
<style lang="less" scoped>
@import  "~@less/form.less";
.top {
    // flex: 1;
    // background-color: #ffffff;
    // border: 1px solid #dcdee2;
    // border-color: #e8eaec;
    // transition: all 0.2s ease-in-out;
    // padding: 5px;

    .top-box {
        width: 100%;
        height: 55px;
        padding: 10px;
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
background: #ffffff;
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


