<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-05 16:00:51
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="800" class="model_box">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <template v-for="(item, index) in formValidate">
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='text')&&!formConfig[index]['hidden']">
                <Input v-model="formValidate[index]" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" :maxlength="formConfig[index]['length']||20"></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='number')&&!formConfig[index]['hidden']">
               <Input v-model="formValidate[index]" type="number" :number="true" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" ></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--数值控件-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='numbers'">
                <InputNumber v-model="formValidate[index]" :style="{width:'200px'}" :editable="formConfig[index]['disabled']" :precision="formConfig[index]['precision']" v-show="!formConfig[index]['hidden']"></InputNumber><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='radio'">
                <RadioGroup v-model="formValidate[index]">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value" :key="ditem.value" :disabled="formConfig[index]['disabled']">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='select'">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable :disabled="formConfig[index]['disabled']" :label-in-value='true' v-show="!formConfig[index]['hidden']" @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id" :tag="index">{{ item.name }}</Option>
                </Select>
                <span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--图片上传-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='uploadImage'">
                <UploadImg v-model="formValidate[index]" :disabled="formConfig[index]['disabled']" :length="formConfig[index]['length']" v-show="!formConfig[index]['hidden']" ></UploadImg>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTime'">
                <DatePicker v-model="formValidate[index]" @on-change="formValidate[index]=$event" format="yyyy-MM-dd HH:mm" type="date" placeholder="" style="width: 200px" :disabled="formConfig[index]['disabled']"></DatePicker> 
            </FormItem>
            <!--单项选择器-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectorSingle'">
                <SelectorSingle v-model="formValidate[index]" :config="formConfig[index]"></SelectorSingle>
            </FormItem>
            <!--多项选择器-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectorMulti'">
                <SelectorMulti v-model="formValidate[index]" :config="formConfig[index]" ref="selectorMulti"></SelectorMulti>
            </FormItem>
            <!--文本域-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='textarea'">
                <Input v-model="formValidate[index]" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :style="{width:'400px'}" :disabled="formConfig[index]['disabled']" />
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTimes'">
                <DatePicker v-model="formValidate[index]" @on-change="formValidate[index]=$event" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="" style="width: 400px" disabled></DatePicker>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectMultiField'">
                <!-- <Select v-model="formValidate[index]" filterable multiple :disabled="formConfig[index]['disabled']" style="{width:'400px',float: 'left'}">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable :disabled="formConfig[index]['disabled']" :label-in-value='true' v-show="!formConfig[index]['hidden']" @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectCustom'">
                <Select v-model="formValidate[index]" :style="{width:'300px',float: 'left'}" multiple filterable :disabled="formConfig[index]['disabled']" :label-in-value="true" v-show="!formConfig[index]['hidden']">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='password'">
                <Input v-model="formValidate[index]" :style="{width:'300px'}" :disabled="formConfig[index]['disabled']" type="password" password :placeholder="formConfig[index]['placeholder']" ></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
        </template>
    </Form>
    <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </div>
</Modal>
</template>

<script>
import SelectorSingle from '@components/public/xSelect/selectorSingle'
import SelectorMulti from '@components/public/xSelect/selectorMulti'
import UploadImg from '@components/public/upload/uploadImg';
import $flyio from '@plugins/ajax'

export default {
    name: 'ModalForm',
    components: {
        SelectorSingle,
        SelectorMulti,
        UploadImg
    },
    props: {
        titleText: {
            type: String,
            default: '',
        },
        formValidate: {
            type: Object,
            default () {
                return {}
            }
        },
        ruleValidate: {
            type: Object,
            default () {
                return {}
            }
        },
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        showModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: {},
            show: false
        }
    },
    watch: {
        formConfig: {
            handler(val) {

            }
        },
        showModel: {
            handler(val) {
                this.show = val
                this.initEL('input');
            }
        },
        formValidate: {
            handler(val) {

            }
        }
    },
    methods: {
        ok() {

        },
        cancel() {
            this.$emit('clear-form-data');
            this.$emit('show-pop', false);
            this.$refs['formValidate'].resetFields();
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('save');
                    // this.$emit('show-pop', false);
                    this.$emit('clear-form-data');
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text') {
                    setTimeout(() => {
                        controls[0].focus();
                    }, 1000);
                }
            }
        },
        initClick() {
            this.initEL('input');
            var inputGroup = this.$el.getElementsByTagName("input");
            var inputGroupArr = Array.from(this.$el.getElementsByTagName("input"));
            var buttonGroup = this.$el.getElementsByTagName("button")[0];
            var iGlength = inputGroupArr.length;
            var model_box = document.getElementsByClassName("model_box")[0];
            model_box.onkeypress = function (e) {
                var e = event || e;
                var idx = inputGroupArr.indexOf(e.srcElement);
                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    if (idx == iGlength - 1) {
                        buttonGroup.focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
            }
        },
        //for循环异步处理
        async initForm(){
            for(var item in this.formConfig){
                var form = this;
                
                if(this.formConfig[item].bind&&this.formConfig[item].bind.bindValue){
                    var valueField = this.formConfig[item].bind.bindValue;
                    form.$on('value-change-' + item,function(data){
                        this.formValidate[this.formConfig[data.tag].bind.target] = data.label;
                        if(form.formConfig[data.tag]['bindOtherField']){
                            for(var i=0;i<form.formConfig[data.tag]['bindOtherField'].length;i++){
                                if(form.formConfig[data.tag]['bindOtherField'][i]['name']){
                                    form.formConfig[data.tag]['bindOtherField'][i]['parmas']['keyword'] = data.value;
                                    form.$emit('bind-change-'+form.formConfig[data.tag]['bindOtherField'][i]['name'],form.formConfig[data.tag]['bindOtherField'][i]['name'],form.formConfig[data.tag]['bindOtherField'][i]['parmas']);
                                }
                            }
                        }
                    })
                }
                if((['select','selectCustom'].indexOf(this.formConfig[item].type)!=-1)&&this.formConfig[item].dataSource.type=='dynamic'){
                    //绑定数据源改变
                    form.$on('bind-change-' + item,function(data,parmas){
                        //还未写完的参数查询
                        form.loadData(data,parmas);
                    })
                    //加载数据源配置
                    var parmas = this.formConfig[item].dataSource.parmas ? this.formConfig[item].dataSource.parmas:{};
                    await $flyio.post({
                        url: this.formConfig[item].dataSource.url,
                        data:{ ...parmas,maxResultCount:200}
                    }).then((res) => {
                        if(res.result.code==200){
                            if(this.formConfig[item].dataSource.col){
                                var data = res.result.item.map((e,index)=>{
                                    for(var i=0;i<this.formConfig[item].dataSource.col.length;i++){
                                        e[this.formConfig[item].dataSource.col[i]['k']] = e[this.formConfig[item].dataSource.col[i]['v']];
                                    }
                                    return e;
                                });    
                            } else {
                                var data = res.result.item.map((e,index)=>{
                                    e.value = e.id;
                                    return e;
                                });
                            }
                            this.formConfig[item].dataSource.data = data;
                        }
                    })
                }
            }   
        },
        onChange(data){
            this.$emit('value-change-'+data.tag,data);
        },
        async loadData(name,params){
            var parmas2={};
            var a = params['name'];
            parmas2[a] = '';
            parmas2[a] =params.keyword;
            var config = this.formConfig[name];
            await $flyio.post({
                url: config.dataSource.url,
                data:{ ...parmas2,maxResultCount:200}
            }).then((res) => {
                if(res.result.code==200){
                    if(config.dataSource.col){
                        var data = res.result.item.map((e,index)=>{
                            for(var i=0;i<config.dataSource.col.length;i++){
                                e[config.dataSource.col[i]['k']] = e[config.dataSource.col[i]['v']];
                            }
                            return e;
                        });    
                    } else {
                        var data = res.result.item.map((e,index)=>{
                            e.value = e.id;
                            return e;
                        });
                    }
                    config.dataSource.data = data;
                }
            })    
        },
    },
    mounted() {
        this.initClick();
    },
    created(){
        this.initForm();
    }
}
</script>
<style scoped>
.content {
    padding: 10px 10px 10px 10px;
}
>>>.ivu-form-item-content {
    display: flex;
}
</style>

