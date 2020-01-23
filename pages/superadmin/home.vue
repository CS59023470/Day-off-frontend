<template>
    <div class="home-wrapper display_row">
        <div class="layout-calendar">
            <div class="content-color-title">
                <ColorTitle/>
            </div>
            <div id="box-calendar" class="content-calendar">
                <Calendar 
                    v-if="controCalendar.height !== 0"
                    :contro="controCalendar"
                    @showPopupDetail="showPopupDetailCalendar"
                /> 
            </div>
        </div>
        <div class="layout-card-request">
            <LayoutListCard
                :listCardRequest="listCard"
                @showPopupDetail="showPopupDetailCard"
            />
        </div>

         <PopupDetail
            v-if="popupDetail"
            :datashow="propsToPopup"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Calendar from "../../components/Calendar/Calendar";
import ColorTitle from "../../components/Calendar/ColorTitle";
import LayoutListCard from "../../components/CardRequest/LayoutListCard";
import PopupDetail from "../../components/Popup/PopupDetail"
import Provider from '../../service/provider'
const provider = new Provider()

export default {
    components:{
        Calendar,
        ColorTitle,
        LayoutListCard,
        PopupDetail
    },
    data(){
        return{
            api:provider,
            controCalendar: { height: 0 },
            listCard: [],
            propsToPopup: null
        }
    },
    mounted(){
        this.controCalendar.height = document.getElementById("box-calendar").offsetHeight
        this.querydatacard()
    },
    methods:{
        moment,
        querydatacard(){
            let dataLogin = JSON.parse(localStorage.getItem('userprofile'))         
            let result = this.api.getLeaveRequestForSuperAdmin({userid:dataLogin.userId})
            result.then(re => {
                if(re.length !== 0){
                    this.listCard = re.map(leave => {
                        let model = {
                            statusUser: null,
                            datashow: {
                                rowId : leave.rowId,
                                name: leave.user.name,
                                startDate: moment(leave.startDate).format('YYYY-MM-DD'),
                                endDate: moment(leave.endDate).format('YYYY-MM-DD'),
                                starttime:leave.starttime,
                                endtime:leave.endtime,
                                type: leave.type,
                                detail: leave.detail,
                                email:leave.user.email,
                            }
                        }
                        if(leave.user.statusWorking === 'internship'){
                            model.statusUser = false
                        }else{
                            model.statusUser = true
                        }
                        return model
                    })
                }else{
                    this.listCard = null
                }
            })
        },
        showPopupDetailCalendar(data){
            this.propsToPopup = this.createModelToPopupDetail('calendar',data)
            this.$store.commit('popup/showPopupDetail')
        },
        showPopupDetailCard(data){
            this.propsToPopup = this.createModelToPopupDetail('card',data)
            this.$store.commit('popup/showPopupDetail')
            console.log(this.propsToPopup)
        },
        createModelToPopupDetail(type,data){
            if(type === 'card'){
                let model = {
                    userName: data.datashow.name,
                    startDate: data.datashow.startDate,
                    startTime: data.datashow.starttime,
                    endDate: data.datashow.endDate,
                    endTime: data.datashow.endtime,
                    type: data.datashow.type,
                    detail: data.datashow.detail,
                    email: data.datashow.email,
                    admin_approve: null,
                    statusUser: data.statusUser
                }
                return model
            }else{
                let model = {
                    userName: data.title,
                    startDate: data.data_Leave.startdate,
                    startTime: data.data_Leave.starttime,
                    endDate: data.data_Leave.enddate,
                    endTime: data.data_Leave.endtime,
                    type: data.data_Leave.type,
                    detail: data.data_Leave.detail,
                    email: data.data_Leave.email,
                    admin_approve: '',
                    statusUser: null
                }
                if(data.data_Leave.statusWorking !== 'internship'){
                    model.statusUser = true
                }else{
                    model.statusUser = false
                }
                if(data.data_Leave.type === 'ลาป่วย'){
                    model.admin_approve = 'System'
                }else{
                    model.admin_approve = data.data_Leave.admin_approve.name
                }
                return model
            }
        }
    },
    computed: {
         ...mapState({
            popupDetail: state => state.popup.popup_detail
        }),
    },
}
</script>

<style lang="scss">
$heightFull: 100%;
$widthFull: 100%;
$widthCard: 20%;
$heightColorTitle: 6%;
$widthCalendar: $widthFull - $widthCard;
$heightCalendar: $heightFull - $heightColorTitle;

.home-wrapper{
    width: $widthFull;
    height: $heightFull;
    overflow: hidden;

    .layout-calendar{
        width: $widthCalendar;
        height: $heightFull;
        
        .content-color-title{
            width: $widthFull;
            height: $heightColorTitle;
        }

        .content-calendar{
            width: $widthFull;
            height: $heightCalendar;
        }
    }

    .layout-card-request{
        width: $widthCard;
        height: $heightFull;
        border-left: 2px double #00294d;
    }
}
</style>