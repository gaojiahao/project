<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-22 11:53:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-23 10:01:43
-->
<template>
    <div class="flow">
        <div class="panel-body scrollbar-hover">
            <div class="row row-admin">
                <div class="flow-item flow-item-0"><div title="管理员">新品开发</div></div>
                <div class="flow-item flow-item-1"><div title="创建产品">销售组长审核</div></div>
                <div class="flow-item flow-item-3"><div title="维护模块">销售经理审核</div></div>
                <div class="flow-item flow-item-4"><div title="添加用户">侵权审核</div></div>
                <div class="flow-item flow-item-5"><div title="维护权限">制图审核</div></div>
            </div>
            <div class="row row-product">
                <div class="flow-item flow-item-0"><div title="产品经理">销售推荐</div></div>
                <div class="flow-item flow-item-1"><div title="创建产品">销售组长审核</div></div>
                <div class="flow-item flow-item-2"><div title="维护模块">销售经理审核</div></div>
                <div class="flow-item flow-item-3"><div title="维护计划">新品开发</div></div>
            </div>
            <div class="row row-project">
                <div class="flow-item flow-item-0"><div title="项目经理">选品</div></div>
                <div class="flow-item flow-item-1"><div title="创建项目">创建项目</div></div>
                <div class="flow-item flow-item-2"><div title="维护团队">维护团队</div></div>
                <div class="flow-item flow-item-3"><div title="关联产品">关联产品</div></div>
                <div class="flow-item flow-item-4"><div title="关联需求">关联需求</div></div>
                <div class="flow-item flow-item-5"><div title="分解任务">分解任务</div></div>
            </div>
            <div class="row row-dev">
                <div class="flow-item flow-item-0"><div title="研发人员">制图</div></div>
                <div class="flow-item flow-item-1"><div title="领取任务和Bug">领取任务和Bug</div></div>
                <div class="flow-item flow-item-2"><div title="更新状态">更新状态</div></div>
                <div class="flow-item flow-item-3"><div title="完成任务和Bug">完成任务和Bug</div></div>
            </div>
            <div class="row row-tester">
                <div class="flow-item flow-item-0"><div title="测试人员">上架</div></div>
                <div class="flow-item flow-item-1"><div title="撰写用例">撰写用例</div></div>
                <div class="flow-item flow-item-2"><div title="执行用例">执行用例</div></div>
                <div class="flow-item flow-item-3"><div title="提交Bug">提交Bug</div></div>
                <div class="flow-item flow-item-4"><div title="验证Bug">验证Bug</div></div>
                <div class="flow-item flow-item-5"><div title="关闭Bug">关闭Bug</div></div>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    name:"Flow",
    data() {
        return {
            flowList:[
                ['管理员','维护公司','添加用户','维护权限'],
                ['产品经理','创建产品','维护模块','维护计划','维护需求','创建发布'],
                ['项目经理','创建项目','维护团队','关联产品','关联需求','分解任务'],
                ['研发人员','领取任务和Bug','更新状态','完成任务和Bug'],
                ['测试人员','撰写用例','执行用例','提交bug','验证bug','关闭bug']
            ]
        }
    },
}
</script>
<style lang="less" scoped>
.flow{
    .panel-body {
        padding: 0 30px 0 20px;
        .row {
            margin-right: -10px;
            margin-left: -10px;
            display: flex;
        }
        .row:after{
            clear: both;
        }
        .row:before{
            display: table;
            content: " ";
        }
    }
}
.flow-item {
    float: left;
    width: 16.66667%;
    max-width: 180px;
    text-align: center;
    margin-bottom: 9px;
    padding-right: 15px;
}
.flow-item > div {
    position: relative;
    padding: 5px 0 5px 8px;
    line-height: 20px;
    background: #E8EBEF;
    white-space: nowrap;
    overflow: visible;
    color: #3c4353;
}
.flow-item > div:before, .flow-item > div:after {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 10px;
    border-color: transparent transparent transparent #E8EBEF;
    position: absolute;
    left: 0;
    top: 0;
}
.flow-item > div:after {
    left: auto;
    right: -10px;
    z-index: 2;
}
.flow-item > div:before {
    border-left-color: #fff;
    z-index: 1;
}
.flow-item-0 > div {
    color: #838A9D;
    font-weight: bold;
    padding-left: 0;
}
.flow-item-1 > div {
    background: #E3F2FD;
}
.flow-item-1 > div:after {
    border-left-color: #E3F2FD;
}
.flow-item-1 > div:hover {
    background: #1565C0;
    color: #fff;
}
.flow-item-1 > div:hover:after {
    border-left-color: #1565C0;
}
.flow-item-2 > div:after {
    border-left-color: #E8F5E9;
}
.flow-item-2 > div {
    background: #E8F5E9;
}
.flow-item-2 > div:hover {
    background: #43A047;
    color: #fff;
}
.flow-item-2 > div:hover:after {
    border-left-color: #43A047;
}
.flow-item-3 > div {
    background: #FFF3E0;
}
.flow-item-3 > div:after {
    border-left-color: #FFF3E0;
}
.flow-item-3 > div:hover {
    background: #EF6C00;
    color: #fff;
}
.flow-item-3 > div:hover:after {
    border-left-color: #EF6C00;
}
.flow-item-4 > div {
    background: #FFEBEE;
}
.flow-item-4 > div:after {
    border-left-color: #FFEBEE;
}
.flow-item-4 > div:hover {
    background: #E53935;
    color: #fff;
}
.flow-item-4 > div:hover:after {
    border-left-color: #E53935;
}
.flow-item-5 > div {
    background: #F3E5F5;
}
.flow-item-5 > div:after {
    border-left-color: #F3E5F5;
}
.flow-item-5 > div:hover {
    background: #9C27B0;
    color: #fff;
}
.flow-item-5 > div:hover:after {
    border-left-color: #9C27B0;
}
</style>