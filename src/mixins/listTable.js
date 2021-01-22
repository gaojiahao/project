/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-18 14:29:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-31 16:48:39
 */
import ModalForm from "@components/public/form/modalForm";
import SeniorFilter from "@components/public/filter/seniorFilter";
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import CustomColumns from "@components/public/customColumns/customColumns";
import ImageModel from "@components/public/model/imageModel";

export default {
    components: {
        ModalForm,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel,
        CustomColumns
    },
    data() {
        return {
            showFilterModel: false,
            visible:false,
            srcData:{},
            selectedList:[],
            activatedRow:{},
        }
    },
    methods: {
        setFilter() {},
        showFilter(flag) {
            this.showFilterModel = flag;
        },
        showImageModel(flag){
            this.visible = flag;
        },
        onSelect(selection,row){
            this.selectedList.push(row);
        },
        onSelectCancel(selection,row){
            this.selectedList.splice(row.id, 1);
        },
        onSelectAllCancel(selection){
            this.selectedList = [];
        },
        onSelectAll(selection){
            this.selectedList = selection;
        },
        refresh() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
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
        //批量删除
        deletesData() {
            for(var i=0;i<this.selectedList.length;i++){
                for(var j=0;j<this.data.length;j++){
                    if(this.selectedList[i].id==this.data[j].id){
                        this.data.splice(j, 1);   
                    }
                }
            }
        },
        onClear(){
            console.log('清空了关键词');
        },
        setFilter(data){
            console.log(data);
        },
        onCurrentChange(currentRow,oldCurrentRow){
            this.activatedRow = currentRow;    
        },
        sureDeleteConfirm (flag) {
            if(this.activatedRow.id){
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '数据删除后将无法恢复！',
                    onCancel: () => {
                        this.$Message.info('取消');
                    },
                    onOk: () => {
                        flag ? this.deletesData() : this.deleteData();
                    },
                });
            }
        },
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}

