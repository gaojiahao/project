/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-18 14:29:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 19:01:44
 */
import ModalForm from "@components/public/form/modalForm";
import SeniorFilter from "@components/public/filter/seniorFilter";
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import CustomColumns from "@components/public/customColumns/customColumns";
import ImageModel from "@components/public/model/imageModel";
import ModalDetail from "@components/public/form/modalDetail";

export default {
    components: {
        ModalForm,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel,
        CustomColumns,
        ModalDetail
    },
    data() {
        return {
            showFilterModel: false,
            loading: true,
            visible:false,
            srcData:{},
            selectedList:[],
            activatedRow:{},
            isMult:false,
            showModelDetail:false,
            pageDataDetail:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],    
            },
            totalPageDetail:0,
            dataDetail:[],
            loadingDetail:true,
            columnsDetail: this.getTableColumnDetail(),
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
            for(var i=0;i<this.selectedList.length;i++){
                if(row.id==this.selectedList[i]['id']){
                    this.selectedList.splice(i, 1);
                    break;
                }
            }
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
            if(flag){
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
            } else {
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
            }
        },
        openMult(){
            this.isMult = this.isMult ? false : true;
            if(this.isMult){
                var columns = [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                ];
                columns.push.apply(columns,this.columns);
                this.columns = columns;
            } else {
                this.columns.splice(0, 1);
            } 
        },
        showModalDetail(value,id){
            this.showModelDetail = value;
            if(value)
                this.getDetail(id);   
        },
        getTableColumnDetail(){
            
        }
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}

