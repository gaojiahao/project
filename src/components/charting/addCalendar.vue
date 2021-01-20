<template>
  <div style="display:flex;">
    <div id='external-events' style="    margin: 20px 0 20px 20px;">
      <p>
        <strong>任务列表</strong>
      </p>

      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        <div class='fc-event-main'>任务1</div>
      </div>
      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
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
      </p>
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
    selectData:{
      type: Object,
      default () {
          return {}
      }
    }
  },
  data() {
      return {
        
      }
  },
  components: {
  },
  mixins:[calendarjs],
  watch:{
    selectData:{
      handler(val){
        debugger
        this.GetFileDistributionPageById();
      },
      deep:true,
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
      if(this.id) {
        return new Promise((resolve, reject) => {
          GetFileDistributionPage({userId:this.selectData.userId,maxResultCount:200}).then(res => {
            if (res.result.code == 200) {
              this.peopleData = res.result.item.items;
            } else if (res.result.code = 400) {
              this.$Message.error({
                background: true,
                content: res.result.msg
              });
            }
          });
        });    
      }
    }
  },
  mounted(){
    var calendarEl = document.getElementById('calendar');
    let draggableEl = document.getElementById('external-events');
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
      events: [
        { groupId: 'blueEvents',title: '产品11-主图', date: '2021-01-01',classNames:['cal'], extendedProps:{ fileType:'1',userId:'2'}},
        { title: '产品22-详情图', date: '2021-01-02',classNames:['inv'] },
        { title: '产品V字形从V型从v-主图', start: '2021-01-22 09:05', end:'2021-01-23 12:00',classNames:['cal'] },
        { title: '产品的发生范德萨发多少啊-视频', start: '2021-01-22 09:05',end:'2021-01-23 12:00',classNames:['cal'] },
      ],
      //事件点击
      eventClick : function( event ){
        console.log(event)
      },
      //事件加载
      eventDidMount: function(info) {
        console.log(info.event.extendedProps);
        // {description: "Lecture", department: "BioChemistry"}
      },
      //事件拖动
      eventDrop : function( event, dayDelta, revertFunc ) {
        console.log(event,dayDelta); return;
        var color = event.color;
        if(color=='gray'){
          layer.alert("已上课和已关闭的班级课次不能被拖动修改！", {skin:'layui-layer-red',closeBtn:0,icon:2});
          revertFunc(); //恢复原状
          return;
        }
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
    new Draggable(draggableEl,{
       itemSelector: '.fc-event',
       eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });
    calendar.render();
    calendarEl.addEventListener('contextmenu', (e)=>{
      e.preventDefault()
      console.log('点击了右键',e);
    });
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
}

#external-events .fc-event {
  cursor: move;
  margin: 3px 0;
}

#calendar-container {
  position: relative;
  z-index: 1;
  margin-left: 50px;
}

#calendar {
  max-width: 1100px;
  margin-bottom: 20px;
}
</style>