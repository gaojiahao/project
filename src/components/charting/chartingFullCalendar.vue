<template>
  <div style="display:flex;">
    <div id='external-events' style="    margin: 20px 0 20px 20px;" v-if="eventInfo.id">
      <p>
        <strong>任务信息</strong>
      </p>

      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        <div class='fc-event-main'>产品名称：{{eventInfo.goodsName}}</div>
        <div class='fc-event-main'>制作人员：{{eventInfo.userName}}</div>
        <div class='fc-event-main'>预计开始时间：{{eventInfo.startTime}}</div>
        <div class='fc-event-main'>预计完成时间：{{eventInfo.endTime}}</div>
        <!-- <div class='fc-event-main'>任务1</div> -->
      </div>
      <!-- <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        <div class='fc-event-main'>任务2</div>
      </div>
      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        <div class='fc-event-main'>任务3</div>
      </div>
      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        <div class='fc-event-main'>任务4</div>
      </div>
      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        <div class='fc-event-main'>任务5</div>
      </div>

      <p>
        <input type='checkbox' id='drop-remove' />
        <label for='drop-remove'>remove after drop</label>
      </p> -->
    </div>
    <div id='calendar-container' style="width: 100%;">
      <div id='calendar'></div>
    </div>
  </div>
</template>

<script>
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import calendarjs from "@mixins/calendar";
import {
    GetFileDistributionPage,
    UpdateFileDistribution
} from "@service/tortExamineService";

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
        eventInfo:{}
      }
  },
  components: {
  },
  mixins:[calendarjs],
  watch:{
    config:{
      handler(val){
        this.GetFileDistributionPageById();
      },
      deep:true,
      immediate:true,
    }
  },
  methods: {
    // 点击当天
    dateClick (info) {
        console.log('info', info)
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
    GetFileDistributionPageById(){
      this.id = this.$route.query.id;
      if(this.config.userId) {
        return new Promise((resolve, reject) => {
          GetFileDistributionPage({userId:this.config.userId,maxResultCount:200}).then(res => {
            if (res.result.code == 200) {
              this.events = [];
              var data = res.result.item.items;
              for(var i=0;i<data.length;i++){
                var obj = {};
                obj = {
                  groupId: data[i]['id'],
                  title: '产品:'+ data[i]['goodsName'],
                  start: data[i]['startTime'],
                  end: data[i]['endTime'],
                  extendedProps: data[i],
                  allDay: true, //控制拖动
                }
                this.events.push(obj);
              }
              this.initCale()
            } else if (res.result.code = 400) {
              this.$Message.error({
                background: true,
                content: res.result.msg
              });
            }
          });
        });    
      }
    },
    UpdateFileDistribution(data){
      var params = {},
      params = {
        fileType: data['event']['_def']['extendedProps']['fileType'],
        userId: data['event']['_def']['extendedProps']['userId'],
        remark: data['event']['_def']['extendedProps']['remark'],
        startTime: data['event']['startStr'],
        endTime: data['event']['endStr'],
        goodsId: data['event']['_def']['extendedProps']['goodsId'],
        goodsName: data['event']['_def']['extendedProps']['goodsName'],
        id: data['event']['_def']['extendedProps']['id'],
      };
      if(params.id) {
        return new Promise((resolve, reject) => {
            this.$FromLoading.show();
            UpdateFileDistribution(params).then(res => {
                if (res.result.code == 200) {
                    this.$FromLoading.hide();
                    this.$Message.info('温馨提示：调换成功！');
                } else if (res.result.code == 400) {
                    this.$Message.error({
                        background: true,
                        content: res.result.msg
                    });
                    this.$FromLoading.hide();
                }
            });
        });   
      } else {
        this.$Message.error('保存失败');
      }
    },
    initCale(){
      var calendarEl = document.getElementById('calendar');
      // let draggableEl = document.getElementById('external-events');
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
              return {html:`<p><label>${_dateF.cDay}</label><span>${_dateF.IDayCn}</span><span style="color:red">${_dateF.Term}</span><span style="color:red">${_dateF.festival}</span><span style="color:red">${_dateF.lunarFestival}</span></p>`}
              }
          },
        },
        events: this.events,
        // events: [
        //   { groupId: 'blueEvents',title: '产品11-主图', date: '2021-01-01',classNames:['cal'], extendedProps:{ fileType:'1',userId:'2'}},
        //   { title: '产品22-详情图', date: '2021-01-02',classNames:['inv'] },
        //   { title: '产品V字形从V型从v-主图', start: '2021-01-22 09:05', end:'2021-01-23 12:00',classNames:['cal'] },
        //   { title: '产品的发生范德萨发多少啊-视频', start: '2021-01-22 09:05',end:'2021-01-23 12:00',classNames:['cal'] },
        // ],
        //事件点击
        eventClick : function( event ){
          me.eventInfo = event['event']['_def']['extendedProps'];
        },
        //事件调整大小
        eventResize: function(event) {
          console.log(event);
          me.UpdateFileDistribution(event);
          // {description: "Lecture", department: "BioChemistry"}
        },
        //事件拖动
        eventDrop : function( event, dayDelta, revertFunc ) {
          console.log(event);
          me.UpdateFileDistribution(event);
          // var color = event.color;
          // if(color=='gray'){
          //   layer.alert("已上课和已关闭的班级课次不能被拖动修改！", {skin:'layui-layer-red',closeBtn:0,icon:2});
          //   revertFunc(); //恢复原状
          //   return;
          // }
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
        displayEventEnd: true, //所有视图显示结束时间
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
      // new Draggable(draggableEl,{
      //    itemSelector: '.fc-event',
      //    eventData: function(eventEl) {
      //     return {
      //       title: eventEl.innerText
      //     };
      //   }
      // });
      calendar.render();
      calendarEl.addEventListener('contextmenu', (e)=>{
        e.preventDefault()
        console.log('点击了右键',e);
      });
    }
  },
  mounted(){
    
  },
  created(){
    var f = this.solar2lunar('2021','02','12');
    console.log(f);
  }
}
</script>
<style>
#external-events {
  /* position: fixed;
  z-index: 2;
  top: 20px;
  left: 20px; */
  width: 300px;
  padding: 0 10px;
  border: 1px solid #ccc;
  background: #eee;
  height: 120px;

}

#external-events .fc-event {
  cursor: move;
  margin: 3px 0;
}

#calendar-container {
  position: relative;
  z-index: 1;
  /* margin-left: 50px; */
}

#calendar {
  max-width: 1100px;
  margin: 20px;
}
</style>