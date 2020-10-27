<template>
<div class="content">
    <!--日历-->
    <Calendar ref="Calendar" :markDate="arr2" v-on:changeMonth="changeDate"></Calendar>
</div>
</template>

<script>
import Calendar from "@components/public/calendar/calendar.vue";

export default {
    name: "XCalendar",
    data() {
        return {
            arr2: ["2019/4/2", "2019/4/3", "2019/4/4"],
            Today: '', //当前日期
        };
    },
    components: {
        Calendar
    },
    created() {

    },
    methods: {
        changeDate(data) {
            //console.log(data); //左右点击切换月份
        },
    },

    mounted() {

    }
};
</script>

<style scoped>
.content {
    padding: 10px 0px;
}

.cardsp {
    height: 28px;
    line-height: 28px;
    position: relative;
    padding-left: 15px;
    margin-bottom: 15px;
}

.cardsp img {
    position: absolute;
    top: 7px;
}

.cardsp .spantwo {
    margin-left: 16px;
}

.cardsp .spanthere {
    margin-left: 15px;
}

.circular {
    display: inline-block;
    /*width: 12px;*/
    /*height: 12px;*/
    border: 5px solid #136aa7;
    border-radius: 50%;
}

.titleP {
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    font-weight: bold;
    border-left: 3px solid #136aa7;
    padding-left: 12px;
    position: relative;
    margin-bottom: 15px;
}

.title {
    background-color: #2fd85e;
    font-size: 16px;
}

.div {
    margin: auto;
    width: 220px;
    height: 44px;
    line-height: 44px;
    background: red;
    color: black;
    font-size: 17px;
    text-align: center;
    margin-top: 20px;
}

.wh_container>>>.wh_content_all {
    background-color: #ffffff !important;
    border: 1px solid #dfe0e6;
    width: 400px;
    border-radius: 6px;
}

.wh_container {
    margin: 0px !important;
}

.wh_container>>>.wh_item_date {
    color: #211d48;

}

.wh_container>>>.wh_item_date:hover {
    color: #ffffff;
    background: #136aa7;
    border-radius: 50%;
}

.wh_container>>>.wh_other_dayhide {
    color: #cccccc;
}

.wh_container>>>.wh_content_item {
    margin-bottom: 5px;
    margin-top: 5px;
}

.wh_container>>>.wh_content {
    color: black;
}

.wh_container>>>.wh_top_tag {
    color: black;
}

.wh_container>>>.wh_content_li {
    color: #162947;
    font-weight: bold;
}

.wh_container>>>.wh_jiantou1 {
    border-top: 2px solid #162947;
    border-left: 2px solid #162947;
}

.wh_container>>>.wh_jiantou2 {
    border-top: 2px solid #162947;
    border-right: 2px solid #162947;
}

.wh_container>>>.wh_content_item>.wh_isMark {
    background-color: rgba(19, 105, 167, 0.15);
    /*border-radius: 0px;*/
}

.wh_container>>>.wh_content_item .wh_isToday {
    background-color: rgba(19, 105, 167, 1);
    /*border-radius: 0px;*/
    color: #ffffff;
}

.wh_container>>>.wh_content_item .wh_chose_day {
    background-color: rgba(19, 105, 167, 1);
    /*border-radius: 0px;*/
    color: #ffffff;
}
</style>
