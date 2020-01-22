<template>
     <div class="Box-Home">
        <div class="Heads">
            <div class="Heads-Content">
                <CardHeaderInHistory
                    :sizePersonal="totalDataLaveShow.sizePersonal"
                    :sizeSick="totalDataLaveShow.sizeSick"
                    :sizeVacation="totalDataLaveShow.sizeVacation"
                />
                <div v-if="dataHistory !== null" class="Select-Year">
                    <select name="selectYear" @change="selectDropdownYear" v-model="yearAtSelect">
                        <option :value="year" v-for="(year, idx) in craeteListYear" :key="idx" >{{ year }}</option>
                    </select>
                </div>
            </div>
        </div>
        <BarComfrim 
            v-if="dataHistory !== null"
            textmenuleft="ลากิจ"
            textmenumiddle="ลาป่วย"
            textmenuright="ลาพักร้อน"
            :sizePersonal="totalDataLaveShow.sizePersonal"
            :sizeSick="totalDataLaveShow.sizeSick"
            :sizeVacation="totalDataLaveShow.sizeVacation"
            @eventClick="eventClick"
        />
        <div v-if="data_prop_month.data !== null" class="HistoryOfMonth">
             <Month 
                :listMonth="data_prop_month"
                :showmonth="typeLeave"
                :year ="yearAtSelect"
                :status="data_prop_month.statusUser"
                page="history"
            />
        </div>
    </div>
</template>
<script>
import CardHeaderInHistory from "../../components/CardHeaderInHistory";
import BarComfrim from "../../components/BarComfrim";
import Month from "../../components/Month";
import Provider from '../../service/provider'
const provider = new Provider()
export default { 
    components: {
        CardHeaderInHistory,
        Month,
        BarComfrim,
    },
    data() {
        return{
            dataHistory: null,
            typeLeave: null,
            data_prop_month: {
                data: null,
                statusUser: null,
            },
            api : provider,
            yearAtSelect : null,
            totalDataLaveShow : {
                sizePersonal: 0,
                sizeSick: 0,
                sizeVacation: 0
            },
        }
    },
    mounted(){
        this.queryMyLeave()
        
        // console.log('123456789', page);
    },
   
    methods: {
        queryMyLeave(){
            let dataLogin = JSON.parse(localStorage.getItem('userprofile'))
            let result = this.api.getHistoryLeaveByUserId(dataLogin.userId)
            result.then(re => {
                this.dataHistory = re
                console.log(re)
                if(dataLogin.user.statusWorking === 'internship'){
                    this.data_prop_month.statusUser = false
                }else{
                    this.data_prop_month.statusUser = true
                }
            })
        },
        selectDropdownYear(){
            this.dataHistory.forEach(myHistory => {  
                if(this.yearAtSelect == myHistory.year) {
                    this.totalDataLaveShow.sizePersonal = myHistory.totalPersonalLeave
                    this.totalDataLaveShow.sizeSick = myHistory.totalSickLeave
                    this.totalDataLaveShow.sizeVacation = myHistory.totalVacation
                    this.data_prop_month.data = myHistory
                }
            })
        },
        eventClick(event){
            this.dataHistory.forEach(myHistory => { 
                if (event === "personal"){
                    this.typeLeave = myHistory.listLeaveFullYear.listPersonalLeave
                }else if(event === "sick"){
                    this.typeLeave = myHistory.listLeaveFullYear.listSickLeave
                }else{
                    this.typeLeave = myHistory.listLeaveFullYear.listVacationLeave
                }
            }
        )}
    },
    computed:{
        craeteListYear() {
            let listYear = []
            this.dataHistory.forEach(myHistory => {  
                listYear.push(myHistory.year)
            })
            return listYear
        },
         
    }
}
</script>
<style lang="scss">
    .Box-Home {
        width: 100%;
        height: auto;
        .Heads {
            width: 100%;
            height: auto;
            .Heads-Content {
                display: flex;
                justify-content: space-between;
                .Select-Year {
                    width: 100px;
                    padding: 25px 20px;
                    height: auto;
                    justify-content: flex-end;
                    display: flex;
                    align-items: flex-end;
                    select {
                        border: solid black 1px;
                        color: gray;
                    }
                }
            }

        }
        .HistoryOfMonth {
           height: auto;
        }
    }
</style>