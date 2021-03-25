<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 17:14:15
-->
<template>
<div class="content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" label-colon>
        <slot name='other'>
        </slot>
        <template v-for="(item, index) in formValidate">
            <Divider orientation="left" size="small" v-if="index==divisionField.value">{{divisionField.name}}</Divider>
            <!--文本框-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='text')&&!formConfig[index]['hidden']">
               <Input v-model="formValidate[index]" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" :maxlength="formConfig[index]['length']||20"></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--文本去空格-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='textTrim')&&!formConfig[index]['hidden']">
               <Input v-model.trim="formValidate[index]" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" :maxlength="formConfig[index]['length']||20"></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!-- 文本转数字 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='number')&&!formConfig[index]['hidden']">
               <Input v-model="formValidate[index]" type="number" :number="true" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" ></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--数值控件-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='numbers'">
                <InputNumber :max="999999999999999999" :min="0" v-model="formValidate[index]" :style="{width:'200px'}" :editable="formConfig[index]['disabled']" :precision="formConfig[index]['precision']" v-show="!formConfig[index]['hidden']"></InputNumber><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--单选框-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='radio'">
                <!-- <RadioGroup v-model="formValidate[index]" v-show="!formConfig[index]['hidden']" @on-change="formConfig[index]['hiddenFun']"> -->
                    <RadioGroup v-model="formValidate[index]" v-show="!formConfig[index]['hidden']" @on-change="radioOnChangeFun(index,$event)">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value" :key="ditem.value" :disabled="formConfig[index]['disabled']">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <!--复选框-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='checkbox'">
                <CheckboxGroup v-model="formValidate[index]" v-show="!formConfig[index]['hidden']" :editable="formConfig[index]['disabled']">
                    <template v-for="(item,index) in formConfig[index]['dataSource']['data']">
                        <Checkbox :label="item.value">{{item.name}}</Checkbox>
                    </template>
                </CheckboxGroup>
            </FormItem>
            <!--formConfig[index]['dataSource']['multiple']控制选择器是否多选，单选-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="(formConfig[index]&&formConfig[index]['type']=='select')&&!formConfig[index]['hidden']">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable :disabled="formConfig[index]['disabled']" :label-in-value='true' v-show="!formConfig[index]['hidden']" @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id" :tag="index">{{ item.name }}</Option>
                </Select>
                <span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--图片上传-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='uploadImage'">
                <UploadImg v-model="formValidate[index]" :disabled="formConfig[index]['disabled']" :length="formConfig[index]['length']" v-show="!formConfig[index]['hidden']" ></UploadImg>
            </FormItem>
            <!--附件上传-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='uploadFile'">
                <UploadFile v-model="formValidate[index]" :disabled="formConfig[index]['disabled']" :length="formConfig[index]['length']" v-show="!formConfig[index]['hidden']" ></UploadFile>
            </FormItem>
            <!--文本域-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='textarea'">
                <Input v-model="formValidate[index]" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :style="{width:'400px'}" :disabled="formConfig[index]['disabled']" />
            </FormItem>
            <!--添加多个input-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='texts'">
                <Texts v-model="formValidate[index]" :disabled="formConfig[index]['disabled']" v-show="!formConfig[index]['hidden']"></Texts>
            </FormItem>
            <!--商品体积-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="(formConfig[index]&&formConfig[index]['type']=='size')&&!formConfig[index]['hidden']">
                <Size v-model="formValidate[index]" :disabled="formConfig[index]['disabled']" v-show="!formConfig[index]['hidden']"></Size>
            </FormItem>
            <!--单项选择器-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectorSingle'">
                <SelectorSingle v-model="formValidate[index]" :config="formConfig[index]"></SelectorSingle>
            </FormItem>
            <!--多项选择器-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectorMulti'">
                <SelectorMulti v-model="formValidate[index]" :config="formConfig[index]"></SelectorMulti>
            </FormItem>
            <!--人员分配-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='distributionPeople'">
                <DistributionPeople v-model="formValidate[index]" :config="formConfig[index]" :parmas="formConfig[index]['parmas']"></DistributionPeople>
            </FormItem>
            <!-- 时间段控件 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dataTimes'">
                <DatePicker v-model="formValidate[index]" @on-change="formValidate[index]=$event" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="" style="width: 400px" :disabled="formConfig[index]['disabled']"></DatePicker>
            </FormItem>
            <!-- 日期控件 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTime'">
                <DatePicker v-model="formValidate[index]" @on-change="formValidate[index]=$event" format="yyyy-MM-dd HH:mm" type="date" placeholder="" style="width: 200px" :disabled="formConfig[index]['disabled']"></DatePicker> 
            </FormItem>
            <!-- 密码控件 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="(formConfig[index]&&formConfig[index]['type']=='password')&&!formConfig[index]['hidden']">
                <Input v-model="formValidate[index]" :style="{width:'300px'}" :disabled="formConfig[index]['disabled']" type="password" password :placeholder="formConfig[index]['placeholder']"></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!-- 自定义下拉控件 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectCustom'">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" :allow-create="formConfig[index]['allow']" filterable :multiple="formConfig[index]['multiple']" @on-create="formConfig[index]['createFun']" :disabled="formConfig[index]['disabled']" v-show="!formConfig[index]['hidden']"  @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id" :tag="index">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <!-- 下拉关联层级控件 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectCascade'">
                <SelectCascade :name="index" v-model="formValidate[index]" :formConfig="formConfig[index]" v-show="!formConfig[index]['hidden']" ></SelectCascade>
            </FormItem>
            <!-- 树形控件 -->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='tree'">
                <XTree :configName="index" v-model="formValidate[index]" :config="formConfig[index]" v-show="!formConfig[index]['hidden']" :disabled="formConfig[index]['disabled']" @on-select="onChange"></XTree>
            </FormItem>
        </template>
        <slot name='button'>
            <FormItem>
                <div style="width:100%">
                    <Button type="primary" @click="handleSubmit('formValidate')" style="float: left;">保存</Button>
                </div>
            </FormItem>
        </slot>
    </Form>
</div>
</template>

<script>
import {
    InputNumber
} from "view-design";
import UploadImg from '@components/public/upload/uploadImg';
import UploadFile from '@components/public/upload/uploadFile';
import Texts from '@components/public/input/texts';
import Size from '@components/public/input/size';
import SelectorSingle from '@components/public/xSelect/selectorSingle';
import SelectorMulti from '@components/public/xSelect/selectorMulti';
import DistributionPeople from "@components/charting/distributionPeople";
import SelectCascade from "@components/public/xSelect/selectCascade";
import XTree from "@components/public/tree/xTree";
import $flyio from '@plugins/ajax'

export default {
    name: 'XForm',
    components: {
        InputNumber,
        UploadImg,
        UploadFile,
        Texts,
        Size,
        SelectorSingle,
        SelectorMulti,
        DistributionPeople,
        SelectCascade,
        XTree
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
        divisionField:{
            type: Object,
            default () {
                return {}
            }
        }

    },
    data() {
        return {
            data: {},
        }
    },
    watch: {
        formConfig: {
            handler(val) {
                // console.log(val)
            },
            deep:true,
            immediate:true
        },
        showModel: {
            handler(val) {
                // console.log(val)
                this.show = val
            }
        },
        'formValidate.id':{
            handler(val){
                this.initForm();
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
                    this.$emit('show-pop', false);
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                //if (i == 0 && controls[i].type == 'text' && !controls[i].value) { //第一个输入框获取焦点
                if (i == 0 && controls[i].type == 'text') { //第一个输入框获取焦点
                    setTimeout(() => {
                        controls[0].focus();
                        // console.log(controls[0].value);
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
            document.onkeypress = function (e) {
                var e = event || e;
                var idx = inputGroupArr.indexOf(e.srcElement);
                // console.log(e, e.keyCode, e.srcElement, e.which);
                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    // console.log(idx)
                    if (idx == iGlength - 1) { //表明已经是最后一个输入框
                        buttonGroup.focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
                // console.log(e, e.keyCode, e.srcElement, e.which);
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
                    })
                }
                if(this.formConfig[item].hiddenFun){
                    form.$on('on-change-' + item,function(item){
                        form.formConfig[item.data].hiddenFun(item.event);
                    })
                    this.radioOnChangeFun(item,form.formValidate[item]);
                }
                if((['select','selectCustom','tree'].indexOf(this.formConfig[item].type)!=-1)&&this.formConfig[item].dataSource.type=='dynamic'&&this.formConfig[item].dataSource.url){
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
        initDataSource(){

        },
        onChange(data){
            this.$emit('value-change-'+data.tag,data);
        },
        radioOnChangeFun(data,event){
            this.$emit('on-change-'+data,{data:data,event:event});
        },
    },
    mounted() {
        this.initClick();
    },
    created() {
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
