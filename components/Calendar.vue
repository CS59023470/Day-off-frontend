<template>
  <div>
        <PopupDetail 
            v-if="popupDetail" 
             :nameuser="propsToPopup.nameuser"
        />
    <Fullcalendar
      class="fullcalendar"
      :plugins="calendarPlugins"
      :header="{
                left:'prev  ',
                center:'title',
                right:'next'
            }"
      :timeZone="timeZone"
      :events="chengeEventColor"
      :displayEventEnd="true"
      :eventLimit="true"
      :height="600"
      :handleWindowResize="true"
      @eventClick="handleClick" 
    /> 
    
    <!-- <modal name="datailevent" :height="'auto'" :width="300">
      <Detailpopup
        :startDate="propsToPopup.startDate"
        :endDate="propsToPopup.endDate"
        :nameuser="propsToPopup.nameuser"
      />
    </modal> -->
   
  </div>
</template>
<script>

require('@fullcalendar/core/main.css')
require('@fullcalendar/daygrid/main.css')
require('@fullcalendar/timegrid/main.css')

import Fullcalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { mapState } from 'vuex'
import { toMoment } from '@fullcalendar/moment'; // only for formatting
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import listPlugin from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import PopupDetail from "./Popup/PopupDetail"
// import PopupConfirm from "../components/Popup/PopupConfirm"
import Tooltip from 'tooltip.js'
import Provider from '../service/provider'
const provider = new Provider()
export default {
    data(){
        return{
            api:provider,
            propsToPopup:{
                startDate:'',
                endDate:'',
                nameuser:'',
                typeuser:'',
                textDetail:'',
                startTime:'',
                endTime:'',
                type:'',
                nameApprove:'',
                email:''

            },
            calendarPlugins: [
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interaction,
                resourceTimelinePlugin,
                momentTimezonePlugin
            ],
            timeZone: 'local',
            events:[],
            eventDetail:null

        }
    },
    components:{
        Fullcalendar,
        PopupDetail,
    },
    methods:{
       handleClick (events) {    
           this.$store.commit('popup/showPopupDetail')
        // console.log("TEST Cilck=> ",event)
        this.propsToPopup.startDate = events.event.start
        // this.propsToPopup.endDate = event.event.end
        this.propsToPopup.nameuser = events.event.title
        // this.propsToPopup.textDetail = events.event.textDetail
        console.log("TEST DATA => ", this.propsToPopup)
       },

        eventCalendar(){
            let dataevent = provider.getEventCelendar()
            dataevent.then(re=>{
                console.log(re)
                this.events = re.map(data => {
                    let modal = {
                        id:data.id,  //ลาป่วย
                        title:data.title,
                        start:data.startdate,
                        end:data.enddate,
                       
                    }
                    return modal
                })
            })
        }
    },
    computed:{
        ...mapState({
            popupDetail: state => state.popup.popup_detail,
            popupFinish: state => state.popup.popup_finish,
            statusload: state => state.formRequest.loading,
        }),
        chengeEventColor(){
            return this.events.map(data => {
                let model = {
                    id: data.id,
                    title:data.title,
                    start:data.start,
                    end:data.end,
                    color: '',
                    allDay:true
                
                }
                if(data.id === 'SL'){
                    model.color = '#B84C4C'
                }else if(data.id === 'PL'){
                    model.color = '#4C86B8'
                }else if(data.id === 'VL'){
                    model.color = '#F97111'
                }else{
                    model.color = '#0B8043'
                }
                return model 
                
            }) 
            
        },
    },

    mounted(){
        // console.log("dateevent",this.events)
        this.eventCalendar()
    }

}
</script>
<style lang="scss" scoped>
    .fullcalendar {
    margin: 20px;
    background-color: #fff;
    padding: 10px;
    }
    .popup{
        width: 300px;
        display: flex;
    }
</style>