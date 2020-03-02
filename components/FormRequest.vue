<template>
    <div id="layout_con_form">
        <div class="content_row content_center margin_bottom_head">
            <label class="title-text">Leave Request Form</label>
        </div>
        <div class="content_row margin_bottom_standard">
            <div class="content_center box_dropdown_leave">
                <select
                    name="typeLeave" 
                    class="dropdown-leave content_center height_standard_input" 
                    v-model="dataForm.type"
                    @change="selectTypeLeave"
                >
                    <option 
                        v-for="(type, index) in list_leave" 
                        :key="index" 
                        :value="type.value"
                    >
                        {{type.text}}
                    </option>
                </select>
            </div>
            <div v-if="dataForm.type !== 'none' && dataForm.type === 'SL'" class="content_center">
                <div v-if="day_left_show > 0">
                    <label class="day-stack">You have {{day_left_show}} days left</label>
                </div>
                <div v-else>
                    <label class="day-stack-out">You don't have day enough to leave</label>
                </div>
            </div>
            <div v-if="dataForm.type !== 'none' && dataForm.type !== 'SL'" class="content_center">
                <div v-if="day_left_show > 0">
                    <label class="day-stack">You have  {{day_left_show}} days left</label>
                    <label class="special-scatk">You have  {{user_day_left.compensationday}} compensation days</label>
                </div>
                <div v-else>
                    <label class="day-stack-out">You don't have day enough to leave</label>
                    <label class="special-scatk">You have  {{user_day_left.compensationday}} compensation days</label>
                </div>
            </div>
        </div>

        <div class="content_row display_row margin_bottom_standard">
            <div class="box-radio content_center">
                <input 
                    type="radio" 
                    name="day" 
                    value="0" 
                    v-model="dataForm.typeday"
                    @change="selectRadio"
                >
                <label style="font-family: roboto;" id="text_radio_0"> Single Leave</label>
            </div>
            <div class="box-radio content_center">
                <input 
                    type="radio" 
                    name="day" 
                    value="1" 
                    v-model="dataForm.typeday"
                    @change="selectRadio"
                > 
                <label style="font-family: roboto;" id="text_radio_1"> Extended Leave</label>
            </div>
        </div>

        <div class="content_row content-calendar margin_bottom_standard">

            <div id="layout_calendar" class="calendar content_center">
                <v-date-picker 
                    v-if="dataForm.typeday === '1'"
                    mode="range"
                    :disabled-dates="excludeDates" 
                    v-model="picker.date" 
                    is-inline
                    locale="en"
                    :attributes="attributes"
                    @input="selectDate()"
                    
                >
                </v-date-picker>
                <v-date-picker
                    v-else
                    :disabled-dates="excludeDates" 
                    is-inline 
                    locale="en"
                    :attributes="attributes"
                    v-model="picker.date"
                    @input="selectDate()"
                >
                </v-date-picker>
            </div>

            <div class="text-stack">

                <div id="layout_start_date" class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start" style="font-family: roboto;">
                            Requested Date : 
                            <label v-if="date_start_show === null">MM/DD/YYYY</label>
                            <label v-else>{{moment(new Date(date_start_show)).format('DD MMMM YYYY')}}</label>
                        </div>
                        <select 
                            id="timeStart"
                            name="timeStart" 
                            class="height_standard_input" 
                            v-model="dataForm.starttime"
                            @change="selectDropdownTimeStart"
                        >
                            <option 
                                v-for="(time, index) in list_time_start" 
                                :key="index" 
                                :value="time.value"
                            >
                                {{time.text}}
                            </option>
                        </select>
                    </div>
                </div>

                <div id="layout_end_date" class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            To : 
                            <label v-if="date_end_show === null">MM/DD/YYYY</label>
                            <label v-else>{{moment(new Date(date_end_show)).format('DD MMMM YYYY')}}</label>
                        </div>
                        <select 
                            id="timeEnd"
                            name="timeEnd" 
                            class="height_standard_input" 
                            v-model="dataForm.endtime" 
                            @change="selectDropdownTimeEnd"
                        >
                            <option 
                                v-for="(time, index) in list_time_end" 
                                :key="index" 
                                :value="time.value"
                            >
                                {{time.text}}
                            </option>
                        </select>
                    </div>
                </div>

                <div v-if="check_validation.status" class="boxtext1">
                    <div class="BoxSelectLeave">
                        <div :class="`Box-Start content_center ${check_validation.classShow}`">
                           {{check_validation.text_validation}}
                           {{check_validation.textDate}}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div id="layout_detail" class="content_row margin_bottom_standard">
            <div class="Head-Detail">Description :</div>
            <textarea 
                id="form_detail"
                class="color_placeholder" 
                name="detail" 
                v-model="dataForm.detailleave"
                @keyup="keyupInputDetail"
            >
            </textarea>
        </div>
        <div id="layout_btn_submit" class="content_row centent_right">
            <button 
                id="btn_save" 
                class="theme_background_color_blue model_btn font_color_white" 
                type="button"
                @click="onSave"
            >
                Send
            </button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapState , mapGetters } from 'vuex'
export default {  
    data(){
        return{
            list_leave: [
                { text: 'Type Of Leave',value: 'none' },
                { text: 'Personal Leave',value: 'PL' },
                { text: 'Sick Leave',value: 'SL' },
                { text: 'Vacation Leave',value: 'VL' }
            ],
            list_time: [
                { text: 'Time Period',value: 'none' },
                { text: 'Morning (09:00-12:00)',value: 'morning' },
                { text: 'Afternoon (13:00-18:00)',value: 'afternoon' },
                { text: 'All-Day',value: 'allday' }
            ],
            list_time_start: [],
            list_time_end: [],
            day_left_show : 0,
            check_validation: {
                status: false,
                text_validation : '',
                classShow : ''
            },
            dateEndTextValidation: '',
            max_day_leave : 0,
            sizeDayPicker : 0,
            date_start_show: null,
            date_end_show: null,
            calendar: {
                attributes: [
                    {
                        dates: [] 
                    },
                    {
                        dates: [] 
                    }
                ]
            },
            picker: {
                date: null
            },
            dataForm : {
                idemployee: '',
                type: 'none',
                typeday: 'none',
                startdate: '',
                starttime: 'none',
                enddate: '',
                endtime: 'none',
                statusHoliday: false,
                amountHoliday: 0,
                detailleave: '',
                totalDay: 0,
                user: null
            },
            opacity_disabled_global: '0.2',
            opacity_enabled_global: '1'
        }
    },
    mounted(){
        this.disabledForm()
        //this.list_leave = this.checkNowDateHoliday()
    },
    methods:{
        moment,
        checkNowDateHoliday(){
            let result = true
            let nowDate = new Date()
            let date = moment(new Date()).format('YYYY-MM-DD')
            let statusCheck = true
            for(let i = 0 ; i < this.day_off.length ; i++){
                if(date === moment(this.day_off[i].startdate).format('YYYY-MM-DD')){
                    result = false
                    statusCheck = false
                    break;
                }
            }

            if(statusCheck){
                for(let j = 0 ; j < this.listWeekend.length ; j++){
                    if(this.listWeekend[j] === (nowDate.getDay()+1)){
                        result = false
                        break;
                    }
                }
            }

            if(!result){
                this.disabledRadio_0()
            }

            /*if(result){
                return this.list_leave
            }else{
                let newList = []
                this.list_leave.forEach(list => {
                    if(list.value !== 'SL'){
                        newList.push(list)
                    }
                })
                return newList
            }*/
        },
        //----------------------------------
        selectTypeLeave(){
            let type = this.dataForm.type
            this.clearAllDataForm()
            if(type !== 'none'){
                switch(type){
                    case 'PL': this.day_left_show = this.user_day_left.businessday; break;
                    case 'SL': this.day_left_show = this.user_day_left.sickday; break;
                    case 'VL': this.day_left_show = this.user_day_left.vacationday; break;
                }
                if(type === 'SL'){
                    if(this.day_left_show > 0 && this.day_left_show < 1){
                        this.enabledRadio_0()
                    }else if(this.day_left_show >= 1){
                        this.enabledRadio_0()
                        this.enabledRadio_1()
                    }
                    this.checkNowDateHoliday()
                }else{
                    let sum_day_left = this.day_left_show + this.user_day_left.compensationday
                    if(sum_day_left > 0 && sum_day_left < 1){
                        this.enabledRadio_0()
                    }else if(sum_day_left >= 1){
                        this.enabledRadio_0()
                        this.enabledRadio_1()
                    }
                }
            }
            this.dataForm.type = type
        },
        selectRadio(){
            this.clearDataFormBySelectRadio()
            if(this.dataForm.typeday == '0'){
                
                if(this.dataForm.type === 'SL'){
                    this.enabledCalendar(-1,1)
                    this.autoSetDateSickLeave()
                }else{
                    this.enabledCalendar(this.configday.day,null)
                }
                this.setDisabledByuser()
                this.setDisabledWeekEnd()
                this.setDisabledDayOff()
                this.setDotsandPopovers()
            }else{
                if(this.dataForm.type === 'SL'){
                    this.enabledCalendar(-1,null)
                    this.autoSetDateSickLeave()
                }else{
                    this.enabledCalendar(this.configday.day,null)
                }
                this.setDotsandPopovers()
            }
        },
        autoSetDateSickLeave(){
            if(this.dataForm.typeday == '0'){
                this.picker = { date : new Date() }
            }
        },
        selectDate(){
            if(this.picker.date !== null){
                if(this.dataForm.typeday === '0'){
                    this.date_start_show = moment(this.picker.date).format('YYYY-MM-DD')
                    this.createDropdownTimeStart()
                    this.enabledStartDate()
                    this.selectDropdownTimeStart()
                }else{
                    if(this.checkDateInput()){
                        if(this.checkTotalDay()){
                            this.date_start_show = moment(this.picker.date.start).format('YYYY-MM-DD')
                            this.date_end_show = moment(this.picker.date.end).format('YYYY-MM-DD')
                            if(this.sizeDayPicker === this.max_day_leave){
                                this.createDropdownTimeStart()
                                this.enabledStartDate()
                                this.selectDropdownTimeStart()
                            }else{
                                this.createDropdownTimeStart()
                                this.enabledStartDate()
                                this.selectDropdownTimeStart()
                            }
                        }else{
                            this.date_start_show = null
                            this.date_end_show = null
                            this.dataForm.starttime = 'none'
                            this.dataForm.endtime = 'none'
                            this.list_time_start = []
                            this.list_time_end = []
                            this.disabledStartDate()
                            this.disabledEndDate()
                        }
                    }else{
                        this.date_start_show = null
                        this.date_end_show = null
                        this.dataForm.starttime = 'none'
                        this.dataForm.endtime = 'none'
                        this.list_time_start = []
                        this.list_time_end = []
                        this.disabledStartDate()
                        this.disabledEndDate()
                        this.controTextValidation('close',null)
                    }
                }
            }else{
                if(this.dataForm.typeday === '0'){
                    this.date_start_show = null
                    this.dataForm.starttime = 'none'
                    this.list_time_start = []
                    this.disabledStartDate()
                    this.controTextValidation('close',null)
                }
            }
        },
        selectDropdownTimeStart(){
            if(this.dataForm.typeday === '0'){
                if(this.dataForm.starttime === 'allday'){
                    this.dataForm.totalDay = 1
                }else{
                    this.dataForm.totalDay = 0.5
                }
                this.controTextValidation('open',true)
            }else{
                if(this.day_left_show === 1){
                    this.dataForm.totalDay = 0.5
                    this.createDropdownTimeEnd()
                    this.enabledEndDate()
                    this.selectDropdownTimeEnd()
                }else{
                    if(this.sizeDayPicker === this.max_day_leave){
                        this.createDropdownTimeEnd()
                        this.enabledEndDate()
                        this.selectDropdownTimeEnd()
                    }else{
                        this.totalDayLeave()
                        this.createDropdownTimeEnd()
                        this.enabledEndDate()
                    }
                }
            }
        },
        selectDropdownTimeEnd(){
            if(this.day_left_show === 1){
                this.dataForm.totalDay = this.dataForm.totalDay + 0.5
            }else{
                if(this.sizeDayPicker === this.max_day_leave){
                    this.totalDayLeave()
                }else{
                    this.totalDayLeave() 
                }
            }
        },
        keyupInputDetail(){
            if(this.dataForm.detailleave !== ''){
                this.enabledSubmit()
            }else{
                this.disabledSubmit()
            }
        },

        controTextValidation(status,statusShow){
            if(status === 'open'){
                if(statusShow){
                    this.check_validation = {
                        status: true,
                        text_validation : `You spent ${this.dataForm.totalDay} days on this leave.`,
                        classShow : 'validation_success'
                    }
                }else{
                    this.check_validation = {
                        status: true,
                        text_validation : `You can only leave until ${this.dateEndTextValidation}`,
                        classShow : 'validation_fail'

                    }
                }
            }else{
                this.check_validation = {
                    status: false,
                    text_validation : '',
                    classShow : ''
                }
            }
        },

        offsetFromToday(days){
            let dt = new Date();
            dt.setDate(dt.getDate() + days);
            return dt
        },

        // ----- Check Data Form  ------------------------------------------------------------------------------------------------------->
        checkDateInput(){
            let result = true
            if(this.dataForm.typeday === '1'){
                let start = moment(this.picker.date.start).format('YYYY-MM-DD')
                let end = moment(this.picker.date.end).format('YYYY-MM-DD')
                let dateStart = new Date(start)
                let dateEnd = new Date(end)
                let list_day_off = this.day_off
                let list_leaveuser = this.date_check
                if(start === end){
                    alert('The start date and end date should not the same day')
                    result = false
                }else{
                    let statusCheck = true
                    for(let i = 0 ; i < list_day_off.length ; i++){
                        if(start === moment(list_day_off[i].startdate).format('YYYY-MM-DD') ||
                            end === moment(list_day_off[i].startdate).format('YYYY-MM-DD'))
                        {
                            alert('The start date and end date should not a day off')
                            result = false
                            statusCheck = false
                            break;
                        }
                    }

                    if(statusCheck){
                        for(let j = 0 ; j < this.listWeekend.length ; j++){
                            if(this.listWeekend[j] === (dateStart.getDay()+1) || this.listWeekend[j] === (dateEnd.getDay()+1)){
                                alert('The start date and end date should not a day off')
                                result = false
                                break;
                            }
                        }
                    }
                    if(statusCheck){
                        for(let l = 0 ; l < list_leaveuser.length ; l++){
                            if(start === moment(list_leaveuser[l].startdate).format('YYYY-MM-DD') ||
                                end === moment(list_leaveuser[l].startdate).format('YYYY-MM-DD'))
                            {
                                alert('Cannot Select, You have a leave request on this day')
                                result = false
                                statusCheck = false
                                break;
                            }
                        }
                    }
                }
            }

            if(result === false){
                this.picker.date.start = null
                this.picker.date.end = null
            }
            return result
        },
        
        checkTotalDay(){
            let total_day = 0
            let max_day = 0
            if(this.dataForm.type === 'SL'){
                total_day = this.day_left_show
            }else{
                total_day = this.day_left_show + this.user_day_left.compensationday
            }

            if(total_day % 1 !== 0){
                max_day = total_day + 0.5
            }else{
                max_day = total_day + 1
            }

            this.max_day_leave = max_day
            this.sizeDayPicker = this.calAllDayLeave()

            if(this.sizeDayPicker > max_day){
                this.dateEndTextValidation = this.createDateEndCheck(max_day,this.picker.date.start)
                this.controTextValidation('open',false)
                return false
            }else{
                this.dataForm.totalDay = this.sizeDayPicker
                this.controTextValidation('open',true)
                return true
            }
        },
        calAllDayLeave(){
            let stringStartDate = moment(this.picker.date.start).format('YYYY-MM-DD')
            let stringEndDate = moment(this.picker.date.end).format('YYYY-MM-DD')
            let between = this.calculateBetweenDateInput(stringStartDate,stringEndDate) // list จำนวนวันที่ลา รวมวันหยุด
            let allDatePicker = this.cutDateInput(between,stringStartDate)      //list วันทั้งหมดที่ลา ไม่รวมวันหยุด
            return allDatePicker.length
        },
        calculateBetweenDateInput(startDate,endDate){
            let array_start = startDate.split('-')
            let array_end = endDate.split('-')
            let start = moment([Number(array_start[0]), (Number(array_start[1])-1), Number(array_start[2])]);
            let end = moment([Number(array_end[0]), (Number(array_end[1])-1), Number(array_end[2])]);
            let between = end.diff(start, 'days') + 1
            return between
        },
        cutDateInput(amountDay,start){
            //วันที่ลามาทั้งหมด
            let listDatePicker = []
            for(let i = 0 ; i < amountDay ; i++){
                let startDate = new Date(start)
                startDate.setDate(startDate.getDate()+i)
                listDatePicker.push(moment(startDate).format('YYYY-MM-DD'))
            }

            //วันหยุดของบริษัท
            let listDayOff = []
            this.day_off.forEach(dayoff => {
                listDayOff.push(moment(dayoff.startdate).format('YYYY-MM-DD'))
            })

            //list ของวันหยุด ที่ ได้ลาค่อมไว้ (ไม่รวม weekend)
            let listDayOff_filter = []
            listDatePicker.forEach(dayinput_string => {
                listDayOff.forEach(dayoff_string =>{
                    if(dayinput_string === dayoff_string){
                        listDayOff_filter.push(dayinput_string)
                    }
                })
            })

            //list วันที่ลาโดยตัดวันหยุดบริษัทออก
            let listPicker_Cut_Dayoff = []
            listDatePicker.forEach(dayinput_string => {
                let statusFilter = null
                statusFilter = listDayOff_filter.filter(fil_ter => {
                    return fil_ter === dayinput_string
                })
                if(statusFilter.length === 0){
                    listPicker_Cut_Dayoff.push(dayinput_string) //ไม่วันลาทั้งหมด ที่ไม่ใช้วันหยุดบริษัท แต่ยังไม่คัด weekend ออก
                }
            })

            //list วันลาทั้งหมดที่ คัด วันหยุด และ weekend ออกแล้ว
            let list_result = []
            listPicker_Cut_Dayoff.forEach(pcdf => {
                let d = new Date(pcdf)
                let result_weekend = null
                result_weekend = this.listWeekend.filter(weekend => {
                    let dayOfweek = d.getDay() + 1
                    return dayOfweek === weekend
                })
                if(result_weekend.length === 0){
                    list_result.push(pcdf)   //ได้ วันลาทั้งหมดที่ คัด วันหยุด และ weekend ออกแล้ว
                }
            })

            return list_result
        },
        createDateEndCheck(date_up,date_input_start){
            let list_df = this.day_off.map(dayoff => {
                let array_date = dayoff.startdate.split('-')
                let newdate = moment([Number(array_date[0]), (Number(array_date[1])-1), Number(array_date[2])]);
                return moment(newdate).format('YYYY-MM-DD')
            })

            let string_date_return = ''
            for(let i = 0 ; i < date_up ; i++){
                let picker_date_string = moment(date_input_start).format('YYYY-MM-DD')
                let picker_date_type = new Date(picker_date_string)
                picker_date_type.setDate(picker_date_type.getDate() + i)
                let date_filter = moment(picker_date_type).format('DD MMMM YYYY')
                let result = list_df.filter(df => {
                    return df === date_filter
                })
                if(result.length !== 0){
                    date_up = date_up + 1
                }else{
                    let re_we = this.listWeekend.filter(we => {
                        return we === (picker_date_type.getDay() + 1)
                    })
                    if(re_we.length !== 0){
                        date_up = date_up + 1
                    }
                }
                string_date_return = date_filter
            }
            return string_date_return
        },

        // ----- Create Dropdown Time  ------------------------------------------------------------------------------------------------------->
        createDropdownTimeStart(){
            this.list_time_start = []
            let sum_day_left = this.day_left_show + this.user_day_left.compensationday
            if(this.dataForm.typeday === '0'){
                // 1 day
                if(this.dataForm.type === 'SL'){
                    let dateNow = new Date()
                    if(dateNow.getHours() < 12){
                        //ลาเช้าได้
                        if(this.day_left_show < 1){
                            this.list_time.forEach(time => {
                                if(time.value !== 'none' && time.value !== 'allday'){
                                    this.list_time_start.push(time) 
                                }
                            })
                        }else{
                            this.list_time.forEach(time => {
                                if(time.value !== 'none'){
                                    this.list_time_start.push(time) 
                                }
                            })
                        }
                    }else{
                        //ลาเช้าไม่ได้
                        this.list_time.forEach(time => {
                            if(time.value === 'afternoon'){
                                this.list_time_start.push(time) 
                            }
                        })
                    }
                }else{
                    if(sum_day_left < 1){
                        this.list_time.forEach(time => {
                            if(time.value !== 'none' && time.value !== 'allday'){
                                this.list_time_start.push(time) 
                            }
                        })
                    }else{
                        this.list_time.forEach(time => {
                            if(time.value !== 'none'){
                                this.list_time_start.push(time) 
                            }
                        })
                    }
                }
            }else{
                // > 1 day
                if(this.day_left_show === 1){
                    this.list_time.forEach(time => {
                        if(time.value === 'afternoon'){
                            this.list_time_start.push(time)
                        }
                    })
                }else{
                    if(this.dataForm.type === 'SL'){
                        if(this.sizeDayPicker === this.max_day_leave){
                           if(this.day_left_show % 1 !== 0){
                                let nowDate = new Date()
                                if(nowDate.getHours() < 12){
                                    this.list_time.forEach(time => {
                                        if(time.value === 'afternoon' || time.value === 'allday'){
                                            this.list_time_start.push(time)
                                        }
                                    })
                                }else{
                                     this.list_time.forEach(time => {
                                        if(time.value === 'afternoon'){
                                            this.list_time_start.push(time)
                                        }
                                    })
                                }
                           }else{
                                this.list_time.forEach(time => {
                                    if(time.value === 'afternoon'){
                                        this.list_time_start.push(time)
                                    }
                                })
                           }
                        }else{
                            //มีแก้ไข ควรเช็คเวลาจริงด้วย
                            let nowDate = new Date()
                            if(moment(this.picker.date.start).format('YYYY-MM-DD') === moment(nowDate).format('YYYY-MM-DD')){
                                if(nowDate.getHours() < 12){
                                    this.list_time.forEach(time => {
                                        if(time.value === 'afternoon' || time.value === 'allday'){
                                            this.list_time_start.push(time)
                                        }
                                    })
                                }else{
                                    this.list_time.forEach(time => {
                                        if(time.value === 'afternoon'){
                                            this.list_time_start.push(time)
                                        }
                                    })
                                }
                            }else{
                                this.list_time.forEach(time => {
                                    if(time.value === 'afternoon' || time.value === 'allday'){
                                        this.list_time_start.push(time)
                                    }
                                })
                            }
                            
                        }
                    }else{
                        if(this.sizeDayPicker === this.max_day_leave){
                            if(sum_day_left % 1 !== 0){
                                this.list_time.forEach(time => {
                                    if(time.value === 'afternoon' || time.value === 'allday'){
                                        this.list_time_start.push(time)
                                    }
                                })
                           }else{
                                this.list_time.forEach(time => {
                                    if(time.value === 'afternoon'){
                                        this.list_time_start.push(time)
                                    }
                                })
                           }
                        }else{
                            this.list_time.forEach(time => {
                                if(time.value === 'afternoon' || time.value === 'allday'){
                                    this.list_time_start.push(time)
                                }
                            })
                        }
                    }
                }
            }
            this.dataForm.starttime = this.list_time_start[0].value
        },
        createDropdownTimeEnd(){
            let sum_day_left = this.day_left_show + this.user_day_left.compensationday
            this.list_time_end = []
            if(this.day_left_show === 1){
                this.list_time.forEach(time => {
                    if(time.value === 'morning'){
                        this.list_time_end.push(time)
                    }
                })
            }else{
                if(this.dataForm.type === 'SL'){
                    if(this.sizeDayPicker === this.max_day_leave){
                        if(this.day_left_show % 1 !== 0){
                            if(this.dataForm.starttime === 'allday'){
                                this.list_time.forEach(time => {
                                    if(time.value === 'morning'){
                                        this.list_time_end.push(time)
                                    }
                                })
                            }else{
                                this.list_time.forEach(time => {
                                    if(time.value === 'morning' || time.value === 'allday'){
                                        this.list_time_end.push(time)
                                    }
                                })
                            }
                        }else{
                            this.list_time.forEach(time => {
                                if(time.value === 'morning'){
                                    this.list_time_end.push(time)
                                }
                            })
                        }
                    }else{
                        this.list_time.forEach(time => {
                            if(time.value === 'morning' || time.value === 'allday'){
                                this.list_time_end.push(time)
                            }
                        })
                    }
                }else{
                    if(this.sizeDayPicker === this.max_day_leave){
                         if(sum_day_left % 1 !== 0){
                            if(this.dataForm.starttime === 'allday'){
                                this.list_time.forEach(time => {
                                    if(time.value === 'morning'){
                                        this.list_time_end.push(time)
                                    }
                                })
                            }else{
                                this.list_time.forEach(time => {
                                    if(time.value === 'morning' || time.value === 'allday'){
                                        this.list_time_end.push(time)
                                    }
                                })
                            }
                        }else{
                            this.list_time.forEach(time => {
                                if(time.value === 'morning'){
                                    this.list_time_end.push(time)
                                }
                            })
                        }
                    }else{
                        this.list_time.forEach(time => {
                            if(time.value === 'morning' || time.value === 'allday'){
                                this.list_time_end.push(time)
                            }
                        })
                    }
                }
            }
            this.dataForm.endtime = this.list_time_end[0].value
        },
        totalDayLeave(){
            let sum_day = this.sizeDayPicker
            if(this.dataForm.starttime !== 'allday'){
                sum_day = sum_day - 0.5
            }
            if(this.dataForm.endtime !== 'allday'){
                sum_day = sum_day - 0.5
            }

            this.dataForm.totalDay = sum_day
            this.controTextValidation('open',true)
        },

        // ----- Clear DataForm  ------------------------------------------------------------------------------------------------------->
        clearAllDataForm(){
            this.list_time_start = [],
            this.list_time_end = [],
            this.day_left_show = 0,
            this.check_validation = {
                status: false,
                text_validation : '',
                classShow : ''
            }
            this.date_start_show = null,
            this.date_end_show = null,
            this.calendar = {
                attributes: [
                    {
                        dates: [] 
                    },
                    {
                        dates: [] 
                    }
                ]
            }
            this.picker = {
                date: null
            }
            this.dataForm = {
                idemployee: '',
                type: 'none',
                typeday: 'none',
                startdate: '',
                starttime: 'none',
                enddate: '',
                endtime: 'none',
                statusHoliday: false,
                amountHoliday: 0,
                detailleave: '',
                totalDay: 0,
                user: null
            }
            this.disabledForm()
        },
        clearDataFormBySelectRadio(){
            this.list_time_start = [],
            this.list_time_end = [],
            this.check_validation = {
                status: false,
                text_validation : '',
                classShow : ''
            }
            this.date_start_show = null,
            this.date_end_show = null,
            this.calendar = {
                attributes: [
                    {
                        dates: [] 
                    },
                    {
                        dates: [] 
                    }
                ]
            }
            this.picker = {
                date: null
            }
            
            this.dataForm.idemployee = ''
            this.dataForm.startdate = ''
            this.dataForm.starttime = 'none'
            this.dataForm.enddate = ''
            this.dataForm.endtime = 'none'
            this.dataForm.statusHoliday = false
            this.dataForm.amountHoliday = 0
            this.dataForm.detailleave = ''
            this.dataForm.totalDay = 0
            this.dataForm.user = null
            this.disabledCalendar()
            this.disabledStartDate()
            this.disabledEndDate()
            this.disabledDetail()
            this.disabledSubmit()
        },
        clearDataFormBySelectDate(){
            this.list_time_start = [],
            this.list_time_end = [],
            this.date_start_show = null,
            this.date_end_show = null,
            this.dataForm.idemployee = ''
            this.dataForm.startdate = ''
            this.dataForm.starttime = 'none'
            this.dataForm.enddate = ''
            this.dataForm.endtime = 'none'
            this.dataForm.statusHoliday = false
            this.dataForm.amountHoliday = 0
            this.dataForm.detailleave = ''
            this.dataForm.totalDay = 0
            this.dataForm.user = null
            this.disabledStartDate()
            this.disabledEndDate()
            this.disabledDetail()
            this.disabledSubmit()
        },

        // ----- Contro Calendar ------------------------------------------------------------------------------------------------------->
        setDisabledByuser(){
            console.log(this.date_check)
            this.date_check.forEach(result => {
                let data = {
                    start: new Date(result.startdate),
                    end: new Date(result.enddate),
                }
                this.calendar.attributes[0].dates.push(data)
            })   
        },
        setDisabledWeekEnd(){
            let data = {
                start: new Date(),
                weekdays: this.listWeekend
            }
            this.calendar.attributes[0].dates.push(data)
        },
        setDisabledDayOff(){
            this.day_off.forEach(result => {
                let data = {
                    start: new Date(result.startdate),
                    end: new Date(result.enddate),
                }
                this.calendar.attributes[0].dates.push(data)
            })   
        },
        setDotsandPopovers(){
            this.calendar.attributes[1].dates = []
            this.day_off.forEach(result => {
                let data_day_off = {
                    start: new Date(result.startdate),
                    end: new Date(result.enddate),
                    description: result.description
                }
                this.calendar.attributes[1].dates.push(data_day_off)
            })   
            this.date_check.forEach(result => {
                let leaveuser = {
                    start: new Date(result.startdate),
                    end: new Date(result.enddate),
                    description: "(You) "+result.description
                }
                this.calendar.attributes[1].dates.push(leaveuser)
            })   
        },

        // ----- Style Contro ------------------------------------------------------------------------------------------------------->
        disabledForm(){
            this.disabledRadio_0()
            this.disabledRadio_1()
            this.disabledCalendar()
            this.disabledStartDate()
            this.disabledEndDate()
            this.disabledDetail()
            this.disabledSubmit()
        },

        // Contro Radio
        disabledRadio_0(){
            document.getElementsByName("day")[0].disabled = true
            document.getElementById("text_radio_0").style.opacity = this.opacity_disabled_global
        },
        enabledRadio_0(){
            document.getElementsByName("day")[0].disabled = false
            document.getElementById("text_radio_0").style.opacity = this.opacity_enabled_global
        },
        disabledRadio_1(){
            document.getElementsByName("day")[1].disabled = true
            document.getElementById("text_radio_1").style.opacity = this.opacity_disabled_global
        },
        enabledRadio_1(){
            document.getElementsByName("day")[1].disabled = false
            document.getElementById("text_radio_1").style.opacity = this.opacity_enabled_global
        },

        // Contro Calendar
        disabledCalendar(){
            this.calendar.attributes[0].dates = []
            this.calendar.attributes[0].dates.push({end: this.offsetFromToday(0)},{start: this.offsetFromToday(1)})
            document.getElementById("layout_calendar").style.opacity = this.opacity_disabled_global
        },
        enabledCalendar(end_dis,start_dis){
            this.calendar.attributes[0].dates = []
            if(start_dis === null){
                this.calendar.attributes[0].dates.push({end: this.offsetFromToday(end_dis)})
            }else{
                this.calendar.attributes[0].dates.push({end: this.offsetFromToday(end_dis)},{start: this.offsetFromToday(start_dis)})
            }
            document.getElementById("layout_calendar").style.opacity = this.opacity_enabled_global
        },

        // Contro Dropdown Time
        disabledStartDate(){
            document.getElementById("layout_start_date").style.opacity = this.opacity_disabled_global
            document.getElementById("timeStart").disabled = true
            this.disabledDetail()
        },
        enabledStartDate(){
            document.getElementById("layout_start_date").style.opacity = this.opacity_enabled_global
            document.getElementById("timeStart").disabled = false

            if(this.dataForm.typeday === '0'){
                this.enabledDetail()
            }
        },
        disabledEndDate(){
            if(this.dataForm.typeday == '1'){
                document.getElementById("layout_end_date").hidden = false
                document.getElementById("layout_end_date").style.opacity = this.opacity_disabled_global
                document.getElementById("timeEnd").disabled = true
            }else{
                document.getElementById("layout_end_date").hidden = true
            }
            this.disabledDetail()
        },
        enabledEndDate(){
            if(this.dataForm.typeday == '1'){
                document.getElementById("layout_end_date").style.opacity = this.opacity_enabled_global
                document.getElementById("timeEnd").disabled = false
                this.enabledDetail()
            }
        },

        // Contro Detail
        disabledDetail(){
           document.getElementById("layout_detail").style.opacity = this.opacity_disabled_global
           document.getElementById("form_detail").disabled = true
           this.disabledSubmit()
        },
        enabledDetail(){
            document.getElementById("layout_detail").style.opacity = this.opacity_enabled_global
            document.getElementById("form_detail").disabled = false
            if(this.dataForm.detailleave !== ''){
                this.enabledSubmit()
            }
        },

        //Contro Button Submit
        disabledSubmit(){
            document.getElementById("layout_btn_submit").style.opacity = this.opacity_disabled_global
            document.getElementById("btn_save").disabled = true
        },
        enabledSubmit(){
            document.getElementById("layout_btn_submit").style.opacity = this.opacity_enabled_global
            document.getElementById("btn_save").disabled = false
        },

        //-- Menthod Save Data Form To Database Sheet --------------------------------------------------------------------->
            onSave(){
                let result = this.createDataFormToDataBase()
                if(result === true){
                    this.$emit('form_request',this.dataForm)
                }
            },
            createDataFormToDataBase(){
                if(this.dataForm.typeday === '0'){
                    this.dataForm.startdate = moment(this.picker.date).format('YYYY-MM-DD')
                    this.dataForm.enddate = moment(this.picker.date).format('YYYY-MM-DD')
                    this.dataForm.endtime = this.dataForm.starttime
                }else{
                    this.dataForm.startdate = moment(this.picker.date.start).format('YYYY-MM-DD')
                    this.dataForm.enddate = moment(this.picker.date.end).format('YYYY-MM-DD')
                }
                
                if(this.dataForm.type !== 'SL' && this.user_day_left.compensationday > 0){
                    this.dataForm.statusHoliday = true
                    if(this.dataForm.totalDay <= this.user_day_left.compensationday){
                        this.dataForm.amountHoliday = this.dataForm.totalDay
                    }else{
                        this.dataForm.amountHoliday = this.user_day_left.compensationday
                    }
                }

                let dataUser = JSON.parse(localStorage.getItem('userprofile'))
                this.dataForm.user = dataUser
                this.dataForm.idemployee = dataUser.userId
                return true
            }

    },
    computed: {
        ...mapState({
            statusload: state => state.formRequest.loading,
            configday: state => state.formRequest.configDay,
            user_day_left: state => state.formRequest.userdayleft,
            date_check: state => state.formRequest.date_check
        }),

        ...mapGetters({ listWeekend: 'formRequest/getWeekendModel' }),
        ...mapGetters({ day_off: 'formRequest/getDayoffCompany' }),

        excludeDates() {
            return this.calendar.attributes[0].dates
        },
        attributes() {
            return [
                ...this.calendar.attributes[1].dates.map(todo => ({
                    dates: todo.start,
                    dot: {},
                    popover: {
                        label: todo.description
                    },
                })),
            ];
        },
    }
}
</script>
<style lang="scss" scoped>
#layout_con_form{
    width: 100%;
    height: 100%;
}

.box_dropdown_leave{
    margin-bottom: 2px;
}

.box-radio{
    width: 50%;

    input{
        margin-right: 10px;
    }
}

.title-text{
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    font-family: roboto;
}

.dropdown-leave{
    width: 40%;
    border-radius: 5px;
    text-align-last: center;
    text-align: center;
    font-family: roboto;
}
  .day-stack{
    text-align: center;
    width: fit-content;
    border-radius: 10px;
    color: #2D810F;
    font-size: 12px;
    padding: 2px 15px;
    background-color: rgba(45, 129, 15, 0.1);
  }

  .day-stack-out{
    text-align: center;
    width: fit-content;
    border-radius: 10px;
    color: #ff4d4d;
    font-size: 12px;
    padding: 2px 15px;
    background-color: rgba(255, 77, 77,0.2);
  }

  .special-scatk{
    text-align: center;
    width: fit-content;
    border-radius: 10px;
    color: #d3b402;
    font-size: 12px;
    padding: 2px 15px;
    background-color: rgba(248, 218, 50,0.2);
  }

.content-calendar{
    display: flex;
    justify-content: space-between;
    padding: 0px 5%;
    .calendar{
        width: 50%;
        position: relative;
    }
    .text-stack{
        width: 50%;
        .boxtext1{
            width: 100%;
            .BoxSelectLeave{
                select {
                    width: 100%;
                    border-radius: 5px;
                    border: solid 1px black;
                    margin: 4px 0;
                }
            }
        }            
                        
    }
}
.content_row{
    .Head-Detail {
        color: black;
        float: left;
        font-size: 15px;
        padding: 2px;
    }
    textarea {
        min-width: 100%;
        max-width: 100%;
        min-height: 100px;
        max-height: 100px;
        padding: 10px;
        border-radius: 5px;
        border: solid 1px;
        background-color: white;
    }
}

.color_placeholder::placeholder {
  color: red;
  opacity: 0.5;
}
//----------------------------------------------------
.validation_fail{
    color: red;
    width: 75%;
}
.validation_success{
    color: #2D810F;
}
.set_opacity{
    opacity: 0.5;
}
.textfail{
    border: 1px solid #D91616;
}
</style>
