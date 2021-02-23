<template>
  <div style="display:flex;">
    <div id='calendar-container' style="width: 100%;">
      <div id='calendar'></div>
    </div>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
         >
        <Form :model="note" ref="formData" :label-width="80">
            <FormItem label="待办名称">
                <Input  v-model="note.title"></Input >
            </FormItem>
            <FormItem label="优先级">
              <Select v-model="note.level" clearable filterable>
                <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="日期">
              <DatePicker v-model="note.start" @on-change="note.start=$event" format="yyyy-MM-dd HH:mm" type="date" placeholder="" style="width: 200px"></DatePicker> 
            </FormItem>
            <FormItem label="起止">
              <TimePicker v-model="note.time" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>  
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import calendarjs from "@mixins/calendar";
import {
    TimePicker
} from "view-design";

export default {
  props:{
    config:{
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      events:[],
      eventInfo:{},
      visble:false,
      title:'待办事项',
      note:{
        title:'',
        level:'',
        start:'',
        time:''
      },
      levelList:[
        {name:'一般',value:'0'},
        {name:'最高',value:'1'},
        {name:'较低',value:'2'},
        {name:'最低',value:'3'}
      ]
    }
  },
  components: {
    TimePicker
  },
  mixins:[calendarjs],
  watch:{

  },
  methods: {
    // 点击当天
    dateClick (info) {
      console.log('info', info)
      this.visble = true;
    },
    // 查看更多
    moreClick (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    initCale(){
      var calendarEl = document.getElementById('calendar');
      var checkbox = document.getElementById('drop-remove');
      var me = this;
      var calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin,interactionPlugin ],
        views:{
          dayGridMonth:{
            dayMaxEventRows:3,
            displayEventTime:false,
            dayCellContent(item){
              let _date=me.formatDate(item.date).split('-')
              let _dateF=me.solar2lunar(_date[0],_date[1],_date[2]);
              _dateF.Term = _dateF.Term ? _dateF.Term : '';
              _dateF.festival = _dateF.festival ? _dateF.festival : '';
              _dateF.lunarFestival = _dateF.lunarFestival ? _dateF.lunarFestival : '';
              return {html:`<p><label>${_dateF.cDay}</label><span>${_dateF.IDayCn}</span></br><span style="color:red">${_dateF.Term}</span><span style="color:red">${_dateF.festival}</span><span style="color:red">${_dateF.lunarFestival}</span></p>`}
              }
          },
        },
        events: this.events,
        //事件点击
        eventClick : function( event ){
          me.eventInfo = event['event']['_def']['extendedProps'];
        },
        //事件调整大小
        eventResize: function(event) {
          me.UpdateFileDistribution(event);
        },
        //事件拖动
        eventDrop : function( event, dayDelta, revertFunc ) {
          me.UpdateFileDistribution(event);
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        },
        buttonText:{
          today:'今天',
          month:'月视图',
          week:'周视图',
          day:'日视图',
          list:'列表视图',
        },
        displayEventEnd: true,
        dateClick:function(info) {
          me.dateClick(info)
        },
        locale:'zh-cn',
        editable: true,
        droppable: true,
        drop: function(info) {
          if (checkbox.checked) {
            info.draggedEl.parentNode.removeChild(info.draggedEl);
          }
        }
      });
      calendar.render();
      calendarEl.addEventListener('contextmenu', (e)=>{
        e.preventDefault()
        console.log('点击了右键',e);
      });
    },
    ok(){
      this.events.push(this.note);
      this.initCale();
    },
    cancel(){

    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
  },
  mounted(){
    this.initCale();
  },
  created(){
    this.events=[
      {"title":"待办","level":"1","start":"2021-02-10 00:00","time":["",""]},
      {"title":"待办","level":"1","start":"2021-02-18 00:00","time":["",""]}
    ]
  }
}
</script>
<style>
#external-events {
  width: 300px;
  padding: 0 10px;
  border: 1px solid #ccc;
  background: #eee;
  height: 135px;
}
#external-events .fc-event {
  cursor: move;
  margin: 3px 0;
}
#calendar-container {
  position: relative;
  z-index: 1;
}
#calendar {
  max-width: 1100px;
  margin: 20px;
}
</style>