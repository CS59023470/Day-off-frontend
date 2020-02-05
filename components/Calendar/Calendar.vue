<template>
  <div class="calendar-wrapper">
    <LoadingPage v-if="events.length === 0"/>
    <Fullcalendar
        class="fullcalendar"
        :height="contro.height-20"
        :plugins="calendarPlugins"
        :header="{left:'prev  ',center:'title',right:'next'}"
        :timeZone="timeZone"
        :events="chengeEventColor"
        :displayEventEnd="true"
        :eventLimit="true"
        :handleWindowResize="true"
        @eventClick="handleClick" 
    /> 
    <!-- <PopupDetail
        v-if="popupDetail"
        :datashow="propsToPopup"
    /> -->
  </div>
</template>
<script>

require('@fullcalendar/core/main.css')
require('@fullcalendar/daygrid/main.css')
require('@fullcalendar/timegrid/main.css')

import { mapState } from 'vuex'
//import PopupDetail from "../Popup/PopupDetail"
import Fullcalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { toMoment } from '@fullcalendar/moment'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import listPlugin from '@fullcalendar/list'
import interaction from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import Tooltip from 'tooltip.js'
import LoadingPage from "../LoadingPage"
import Provider from '../../service/provider'
const provider = new Provider()
export default {
    props:['contro'],
    components:{
        Fullcalendar,
        //PopupDetail,
        LoadingPage
    },
    data(){
        return{
            api:provider,
            //propsToPopup: null,
            calendarPlugins: [
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interaction,
                resourceTimelinePlugin,
                momentTimezonePlugin
            ],
            timeZone: 'UTC',
        }
    },
    mounted(){
        if(this.events.length === 0){
            this.eventCalendar()
        }
    },
    methods:{
        handleClick (event) {
            let array = event.event.id.split('_')
             if(array[0] !== 'HD'){
                 this.$emit('showPopupDetail',this.events[Number(array[1])])
                //this.propsToPopup = this.events[Number(array[1])]
                //console.log("TEST EVENT = ",this.propsToPopup)
                //this.$store.commit('popup/showPopupDetail')
            }
        },
        eventCalendar (){
            let dataevent = provider.getEventCelendar()
            dataevent.then(re=>{
                let events = []
                
                events = re.map(data => {
                    let modal = {
                        id: data.id,
                        title: data.title,
                        start: data.startdate,
                        end: data.enddate,
                        data_Leave: data.leave  //ต้องสร้าง model ใหม่
                    }
                    return modal
                })
                this.$store.commit('calendar/updateListEvent', events)
            })
        }
    },
    computed:{
        ...mapState({
            //popupDetail: state => state.popup.popup_detail,
            keyColor: state => state.calendar.keyColorCalendar,
            events: state => state.calendar.list_event_all
        }),
        chengeEventColor(){
            return this.events.map((data,i) => {
                let model = {
                    id: data.id+'_'+i,
                    title:data.title,
                    start:data.start,
                    end:data.end,
                    color: '',
                    allDay:false
                }
                if(data.id === 'SL'){
                    model.color = this.keyColor.color_sick_leave
                }else if(data.id === 'PL'){
                    model.color = this.keyColor.color_personal_leave
                }else if(data.id === 'VL'){
                    model.color = this.keyColor.color_vacation_leave
                }else{
                    model.color = this.keyColor.color_Holiday
                }
                return model 
            }) 
        },
    }
}
</script>

<style lang="scss" scoped>
    .calendar-wrapper{
        width: 100%;
        height: 100%;
    }
    .fullcalendar {
        background-color: #fff;
        padding: 10px;
        margin: 0px 20px;
    }
</style>