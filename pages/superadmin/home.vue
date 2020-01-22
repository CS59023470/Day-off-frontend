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
                /> 
            </div>
        </div>
        <div class="layout-card-request">
            <LayoutListCard
                :listCardRequest="listCard"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Calendar from "../../components/Calendar/Calendar";
import ColorTitle from "../../components/Calendar/ColorTitle";
import LayoutListCard from "../../components/CardRequest/LayoutListCard";
import Provider from '../../service/provider'
const provider = new Provider()

export default {
    components:{
        Calendar,
        ColorTitle,
        LayoutListCard
    },
    data(){
        return{
            api:provider,
            controCalendar: { height: 0 },
            listCard: []
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
                                detail: leave.detail,
                                email:leave.user.email
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
        }
    }
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