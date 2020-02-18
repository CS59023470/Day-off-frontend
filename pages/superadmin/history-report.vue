<template>
    <div id="history_report_wrapper" class="history_report_wrapper">
        <!-- <div class="layout_filter_data">

        </div> -->
        <headerCompanyReport
            @dataFilter="startFilter"
        />
        <div class="title-header">
            <div class="print">
                <button>
                    <i class="material-icons">print</i>
                    <div class="text-print">Print Report</div> 
                </button>
            </div>
            <div class="personal">
                <div class="color-personal"></div>
                <div class="text">Personal Leave</div>
            </div>
            <div class="sick">
                <div class="color-sick"></div>
                <div class="text">Sick Leave</div>
            </div>
            <div class="vacation">
                <div class="color-vaction"></div>
                <div class="text">Vacation Leave</div>
            </div>
        </div>
        <div id="layout_content_report" class="layout_content_report"> 
            <div class="layout_content_user">
                <div class="title_name_user content_center">
                    Name
                </div>
                <!-- <div class="list_name_user">
                    <div 
                        class="text_name centent_right" 
                        v-for="(user, index) in getDataLeaveUserToReport" :key="index"
                    >
                        {{user.nameUser}}
                    </div>
                </div> -->
            </div>
            
            <div class="table_content_report" :max-height="`${heightContent - 120}`">
                
                <div class="title_date">
                    <div class="content_position">
                        <div class="title_position">Position</div>
                    </div>
                    <div 
                        class="group_title_year"
                        v-for="(year, index_year) in titleDateShow" :key="index_year"
                    >
                        <!-- <div class="text_year content_center">{{year.year}}</div> -->
                        <div class="layout_title_month">
                            <div 
                                class="group_title_month"
                                v-for="(month, index_month) in year.listMonth" :key="index_month"
                            >
                                <div class="text_month content_center">{{month.nameMonth}} {{year.year}}</div>
                                <div class="layout_title_day">
                                    <div
                                        class="group_title_day"
                                        v-for="(day, index_day) in month.listDay" :key="index_day"
                                    >
                                        <div class="text_day content_center">{{day}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="test_box">
                <div
                    class="data_leave_user"
                    v-for="(user, index_user) in getDataLeaveUserToReport" :key="index_user"
                >
              
                    <div class="data_name_user">{{user.name}}</div>  
                    <div class="data_position">{{user.position}}</div>
                    <div
                        class="box_detail_leave content_center"
                        v-for="(leave, index_leave) in user.listLeave" :key="index_leave"
                    >
                        <div class="box_day_detail">
                            <div 
                                class="box-morning"
                                v-bind:class="{ leaveActive: leave.statusMorning === true }"
                            ></div>
                            <div 
                                class="box-afternoon"
                                v-bind:class="{ leaveActive: leave.statusAfternoon === true }"
                            ></div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment"
import { mapState } from 'vuex'
import Provider from '../../service/provider'
import headerCompanyReport from '../../components/headerCompanyReport'
const provider = new Provider()
export default {
    components:{
        headerCompanyReport
    },
    data(){
        return{
            heightContent: 0,
            api: provider,
            list_total_day: [],
            nameDepartment: [],
            name_month: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'],
            dateSearch: {
                startDate: '',
                endDate: ''
            },
            titleDateShow: [
                {
                    year: '',
                    listMonth: [
                        {
                            nameMonth: '',
                            listDay: []
                        }
                    ]
                }
            ],
            listUserShow: [
                {
                    userId: '',
                    name: '',
                    department:'',
                    listLeave: []

                },
            ],
        }
    },
    mounted(){
        this.allnameuser();
        this.createNowMonth()
        this.heightContent = document.getElementById("history_report_wrapper").offsetHeight
        this.createDataDateSearch()
        this.queryLeaveReport()
        console.log('555555 =>',this.listNameUser)
    },
    methods: {
        moment,
        allnameuser(){
            let result = this.api.getqueryUsers()
            let listDepartment = new Set();
            result.then(re => {
                this.$store.commit('leaveHistory/setSearchListName', re)
                this.listUserShow = re
                console.log('7777777 =>', re)
                this.listUserShow.forEach(each => {
                    let array = each.department
                    listDepartment.add(array)
                })
                let dataSet = []
                listDepartment.forEach(datalist => {
                    dataSet.push(datalist)
                })
                this.$store.commit('leaveHistory/setDepartment', listDepartment)
            })
        },
        createNowMonth() {
            let nowDate = new Date()
            let indexMonth = nowDate.getMonth()
            let year = nowDate.getFullYear()
            let fullDayOfMonth = this.getDaysInMonth(indexMonth, year)
            
            let startDate = new Date()
            startDate.setDate(1)
            let endDate = new Date()
            endDate.setDate(fullDayOfMonth)
            let textmonthnow = new Date()
            textmonthnow.setDate(fullDayOfMonth)

            this.dateSearch = {
                startDate: moment(startDate).format("YYYY-MM-DD"),
                endDate: moment(endDate).format("YYYY-MM-DD"),
            }
            // this.searchAuto()
            },
            getDaysInMonth(month, year) {
            let date = new Date(year, month, 1)
            let days = []
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1)
            }
            return days.length
        },
        startFilter(model){
            this.dateSearch.startDate= model.startdate
            this.dateSearch.endDate= model.enddate
            this.createDataDateSearch()
        },
        getstartDate(startdate){
            this.dateSearch.startDate = startdate
            console.log(this.dateSearch.startDate)
        },
        getEndDate(enddate) {
            this.dateSearch.endDate = enddate
            console.log(this.dateSearch.startDate)
        },
        searchName(){
        },


        queryLeaveReport(){
            let result = this.api.getLeaveReport(this.listUserShow)
            result.then(re => {
                console.log('asdasdsdads =>',re)
                this.$store.commit('report/setLeaveReport', re)

            })
        },
        clearTitle(){
             this.titleDateShow = [
                {
                    year: '',
                    listMonth: [
                        {
                            nameMonth: '',
                            listDay: []
                        }
                    ]
                }
            ]
        },
        createDataDateSearch(){
            //---- *** ปิดไว้อาจจะได้ใช้ ถ้า input ที่รับค้า วันที่ไม่ตรงตาม format ที่ต้องการ
            //let startDate = moment(this.dateSearch.startDate).format('YYYY-MM-DD')
            //let endDate = moment(this.dateSearch.endDate).format('YYYY-MM-DD')
            let startDate = new Date(this.dateSearch.startDate)
            let endDate = new Date(this.dateSearch.endDate)

            if(startDate.getFullYear() == endDate.getFullYear()){
                //ค้นหา ปีเดียวกัน
                if(startDate.getMonth() == endDate.getMonth()){
                    //ค้นหาเดือนเดือนกัน
                    if(startDate.getDate() == endDate.getDate()){
                        //ค้นหาวันเดียวกัน
                        this.createTitleDataShow(1)
                    }else{
                        //ค้นหาคนละวัน
                        this.createTitleDataShow(2)
                    }
                }else{
                     //ค้นหาคนละเดือน
                     this.createTitleDataShow(3)
                }
            }else{
                //ค้นหา ข้ามปี
                //อาจจะมี กรณี ที่ข้ามหลายปี เช่น 10 ปี (120 เดือน) 
                this.createTitleDataShow(4)
            }
            this.calTotalDayForUser()
        },
        createTitleDataShow(case_search){
            this.clearTitle()
            let startDate = new Date(this.dateSearch.startDate)
            let endDate = new Date(this.dateSearch.endDate)

            if(case_search === 1 || case_search === 2){
                this.titleDateShow[0].year = startDate.getFullYear()
                this.titleDateShow[0].listMonth[0].nameMonth = this.name_month[startDate.getMonth()]
                this.titleDateShow[0].listMonth[0].listDay = this.createListDayInMonth(startDate.getDate(), endDate.getDate())
            }else if(case_search === 3){
                this.titleDateShow[0].year = startDate.getFullYear()
                this.titleDateShow[0].listMonth = this.createListMonthInYear(startDate.getMonth(), endDate.getMonth())
                this.titleDateShow[0].listMonth.forEach((month,i) => {
                    if(i === 0){
                        let fullDayOfMonth = this.getDaysInMonth(startDate.getMonth(), startDate.getFullYear())
                        month.listDay = this.createListDayInMonth(startDate.getDate(), fullDayOfMonth)
                    }else if((i+1) === this.titleDateShow[0].listMonth.length){
                        month.listDay = this.createListDayInMonth(1, endDate.getDate())
                    }else{
                        let fullDayOfMonth = this.getDaysInMonth((startDate.getMonth()+i), startDate.getFullYear())
                        month.listDay = this.createListDayInMonth(1, fullDayOfMonth)
                    }
                })
            }else if(case_search === 4){
                this.titleDateShow = this.createListYear(startDate.getFullYear(), endDate.getFullYear())
                this.titleDateShow.forEach((year,i) => {
                    if(i === 0){
                        year.listMonth = this.createListMonthInYear(startDate.getMonth(), 11)
                    }else if((i+1) === this.titleDateShow.length){
                        year.listMonth = this.createListMonthInYear(0, endDate.getMonth())
                    }else{
                        year.listMonth = this.createListMonthInYear(0, 11)
                    }
                    year.listMonth.forEach((month,j) => {
                        if(i === 0 && j === 0){
                            let fullDayOfMonth = this.getDaysInMonth(startDate.getMonth(), startDate.getFullYear())
                            month.listDay = this.createListDayInMonth(startDate.getDate(), fullDayOfMonth)
                        }else if((i+1) === this.titleDateShow.length && (j+1) === year.listMonth.length){
                            month.listDay = this.createListDayInMonth(1, endDate.getDate())
                        }else{
                            let fullDayOfMonth = null
                            if(i === 0){
                                fullDayOfMonth = this.getDaysInMonth((startDate.getMonth()+j), year.year)
                            }else{
                                fullDayOfMonth = this.getDaysInMonth(j, year.year)
                            }
                            month.listDay = this.createListDayInMonth(1, fullDayOfMonth)
                        }
                    })
                })
            }
        },
        createListYear(startYear, endYear){
            let listYear = []
            while (startYear <= endYear) {
                listYear.push(
                    {
                        year: startYear,
                        listMonth: []
                    }
                )
                startYear++
            }
            return listYear
        },
        createListMonthInYear(monthStart,monthEnd){
            let listMonth = []
            while (monthStart <= monthEnd) {
                listMonth.push(
                    {
                        nameMonth: this.name_month[monthStart],
                        listDay: []
                    }
                )
                monthStart++
            }
            return listMonth
        },
        createListDayInMonth(startDay,endDay){
            let listDay = []
            while (startDay <= endDay) {
                listDay.push(startDay)
                startDay++
            }
            return listDay
        },
        getDaysInMonth(month, year) {
            let date = new Date(year, month, 1)
            let days = []
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1)
            }
            return days.length
        },
        calTotalDayForUser(){
            this.list_total_day = []
            this.titleDateShow.forEach(year => {
                let stringYear = year.year+''
                year.listMonth.forEach(month => {
                    let stringMonth = this.createMonthTostring(month.nameMonth)
                    month.listDay.forEach(day => {
                        let stringDay = this.createDayTostring(day)
                        this.list_total_day.push(`${stringYear}-${stringMonth}-${stringDay}`)
                    })
                })
            })
        },
        createMonthTostring(nameMonth){
            let numberMonth = null
            let stringReturn = ''
            this.name_month.forEach((m,i) => {
                if(m === nameMonth){
                    numberMonth = i+1
                }
            })
            if(numberMonth < 10){
                stringReturn = '0'+numberMonth
            }else{
                stringReturn = ''+numberMonth
            }
            return stringReturn
        },
        createDayTostring(day){
            let stringReturn = ''
            if(day < 10){
                stringReturn = '0'+day
            }else{
                stringReturn = day
            }
            return stringReturn
        },
    },
    computed: {
        ...mapState({
            allLeave: state => state.report.list_leave,
        }),
        getDataLeaveUserToReport(){
            this.listUserShow.forEach(user => {
                user.listLeave = []
            })
            this.listUserShow.forEach(user => {
                let user_store = this.allLeave.filter(filter_store => {
                return user.userId === filter_store.userId
                
            })
                if(user_store.length > 0){
                    this.list_total_day.forEach(day_select => {
                        let leave_user = user_store[0].listLeave.filter(filter_leave_store => {
                            return filter_leave_store.date == day_select
                        })
                        if(leave_user.length > 0){
                            let model = {
                                date: day_select,
                                statusMorning: leave_user[0].statusMorning,
                                statusAfternoon: leave_user[0].statusAfternoon
                            }
                            user.listLeave.push(model)
                        }else{
                            let model = {
                                date: day_select,
                                statusMorning: false,
                                statusAfternoon: false
                            }
                            user.listLeave.push(model)
                        }
                    })
                }else{
                    this.list_total_day.forEach(day_select => {
                        let model = {
                                date: day_select,
                                statusMorning: false,
                                statusAfternoon: false
                            }
                        user.listLeave.push(model)
                    })
                }
            })
            return this.listUserShow
        }
    }
}
</script>
<style lang="scss">
html {
    overflow: hidden;
}
.history_report_wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 10px;

    // .layout_filter_data{
    //     width: 100%;
    //     height: 20%;
    //     background-color: antiquewhite;
    // }
    .title-header{
        width: 100%;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        .print{
            button{
                border: 1px solid black;
                background-color: #5F5F5F;
                color: #FFF;
                border-radius: 4px;
                display: flex;
                padding: 5px;
                border: none;
                .text-print{
                    padding: 3px;
                }
            }
        }
        .personal{
            padding: 10px;
            display: flex;
            .color-personal{
                border: 1px solid #4C86B8;
                width: 20px;
                height: 20px;
                background-color: #4C86B8;
            }
            .text{
                padding-left: 5px;
            }
        }
        .sick{
            padding: 10px;
            display: flex;
            .color-sick {
                border: 1px solid #B84C4C;
                width: 20px;
                height: 20px;
                background-color: #B84C4C;
            }
            .text{
                padding-left: 5px;
            }
            
        }
        .vacation{
            padding: 10px;
            display: flex;
            .color-vaction{
                border: 1px solid #F97111;
                width: 20px;
                height: 20px;
                background-color: #F97111;
            }
            .text{
                padding-left: 5px;
            }
        }
    }

    .layout_content_report{
        width: 100%;
        height: 100%;
        display: flex;
        .layout_content_user{
            width: 15%;
            background-color: blueviolet;
            min-width: 250px;
            height: 80px;
            position: absolute;
            top: 0px;
            left: 0px;

            .title_name_user{
                width: 100%;
                height: 80px;
                background-color: #4C86B8;
                border-right: 1px solid black;
                color: #fff;
            }

            .list_name_user{
                width: 100%;
                background-color: deepskyblue;

                .text_name{
                    width: 100%;
                    height: 40px;
                    padding: 0px 10px
                }
            }
        }
        .table_content_report{
            //height: fit-content;
            //max-height: 500px;
            overflow-x: auto;
            overflow-y: hidden;
            width: 100%;

            .title_date{
                margin-left: 250px;
                height: auto;
            }
            .content_position{
                width: 15%;
                background-color: blueviolet;
                min-width: 250px;
                height: 80px;
                 .title_position{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 80px;
                    background-color: #4C86B8;
                    color: #fff;
                    border-left: 1px solid black;
                }
            }
           
            .test_box{
                width: fit-content;
                max-height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
            .data_leave_user{
                height: 40px;
                display: flex;

                .data_name_user{
                    min-width: 250px;
                    height: 40px;
                    border: 1px solid black;
                    padding: 3px;
                }
                .data_position{
                    min-width: 250px;
                    height: 40px;
                    border: 1px solid black;
                    padding: 3px;
                    
                }
                
                .box_detail_leave{
                    height: 40px;
                    min-width: 40px;
                    border: 1px solid black;

                    .box_day_detail{
                        width: 100%;
                        height: 100%;
                        display: flex;

                        .box-morning{
                            width: 50%;
                        }
                        .box-afternoon{
                            width: 50%;
                            
                        }
                        
                    }
                }
            }
            }
        }
    }
}

.title_date, .layout_title_month, .layout_title_day{
    display: flex;
} 

.text_month,.text_day{
    height: 40px;
    background-color: #0F4C81;
    border: 1px solid black;
    color: #fff;
    font-weight: 300;
}


.text_day{
    width: 40px;
    background-color:#FFFFFF;
    color: black;
    font-weight: 600;
}

.leaveActive{
    background-color: #2196F3;
    opacity: 0.5;
}

/* width */
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(15, 76, 129,0.5); 

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(15, 76, 129,1); 
}

::-webkit-scrollbar-track {
  background: transparent; 
}

</style>