<template>
    <div v-if="statusload === false" id="layout_con_form">
        <div class="content_row content_center margin_bottom_head">
            <label class="title-text">แบบฟอร์มการลา</label>
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
            <div class="content_center" v-if="dataForm.type !== 'none'">
                <div v-if="day_left_show > 0">
                    <label class="day-stack">คุณเหลือวันลาอีก {{day_left_show}} วัน</label>
                    <label class="special-scatk">วันหยุดชดเชย {{user_day_left.specialholiday}} วัน</label>
                </div>
                <div v-else>
                    <label class="day-stack-out">วันลาของคุณหมดแล้ว</label>
                    <label class="special-scatk">วันหยุดชดเชย {{user_day_left.specialholiday}} วัน</label>
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
                > ลา 1 วัน
            </div>
            <div class="box-radio content_center">
                <input 
                    type="radio" 
                    name="day" 
                    value="1" 
                    v-model="dataForm.typeday" 
                    @change="selectRadio"
                > ลาหลายวัน
            </div>
        </div>






        <div v-if="dataForm.typeday === 'none'" class="content_row content-calendar margin_bottom_standard">
            <div class="calendar content_center">
                <v-date-picker 
                    :disabled-dates="excludeDates"
                    :value="null" 
                    is-inline
                >
                </v-date-picker>
            </div>
            <div class="text-stack">
                <div class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">วันที่ลา : ไม่ทราบ</div>
                        <select name="timeStart" class="height_standard_input" disabled>
                            <option value="none">ไม่ทราบ</option>
                        </select>
                    </div>
                </div>
                <div v-if="user_day_left.specialholiday > 0" class="boxtext1">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            <input type="checkbox" name="box_holiday" disabled> ใช้วันหยุดชดเชย
                        </div>
                    </div>
                  </div>
            </div>
        </div>


        <div v-if="dataForm.typeday === '0'" class="content_row content-calendar margin_bottom_standard">
            <div class="calendar content_center">
                <v-date-picker 
                    :disabled-dates="excludeDates" 
                    is-inline 
                    :attributes="attributes"
                    v-model="picker.date"
                    @input="selectDate()"
                >
                </v-date-picker>
            </div>
            <div class="text-stack">
                <div class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            วันที่ลา : 
                            <label v-if="date_start_show === null">ไม่ทราบ</label>
                            <label v-else>{{moment(new Date(date_start_show)).format('DD-MMM-YYYY')}}</label>
                        </div>
                        <select 
                            name="timeStart" 
                            class="height_standard_input" 
                            v-model="dataForm.starttime" 
                            @change="selectDropdownTime"
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
                  <div v-if="user_day_left.specialholiday > 0" class="boxtext1">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            <input 
                                id="holiday_one_day"
                                type="checkbox" 
                                name="box_holiday"
                                v-model="dataForm.statusHoliday"
                                @change="selectHoliday"
                                disabled
                            > 
                                ใช้วันหยุดชดเชย
                                <label v-if="dataForm.amountHoliday > 0 && list_holiday.length === 0">{{dataForm.amountHoliday}} วัน</label>
                        </div>
                        <select 
                            v-if="dataForm.statusHoliday === true && list_holiday.length > 0"
                            name="dropdown_holiday" 
                            class="height_standard_input" 
                            v-model="dataForm.amountHoliday"
                        >
                            <option 
                                v-for="(holiday, index) in list_holiday" 
                                :key="index" 
                                :value="holiday.value"
                            >
                                {{holiday.text}}
                            </option>
                        </select>
                    </div>
                  </div>
            </div>
        </div>

        <div v-if="dataForm.typeday === '1'" class="content_row content-calendar margin_bottom_standard">
            <div class="calendar content_center">
                <v-date-picker 
                    mode="range"
                    :disabled-dates="excludeDates" 
                    v-model="picker.date" 
                    is-inline 
                    :attributes="attributes"
                    @input="selectDate()"
                >
                </v-date-picker>
            </div>
            <div class="text-stack">
                <div class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            วันที่ลา : 
                            <label v-if="date_start_show === null">ไม่ทราบ</label>
                            <label v-else>{{moment(new Date(date_start_show)).format('DD-MMM-YYYY')}}</label>
                        </div>
                        <select 
                            name="timeStart" 
                            class="height_standard_input" 
                            v-model="dataForm.starttime" 
                            @change="selectDropdownTime"
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
                  <div class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            วันสิ้นสุด : 
                            <label v-if="date_end_show === null">ไม่ทราบ</label>
                            <label v-else>{{moment(new Date(date_end_show)).format('DD-MMM-YYYY')}}</label>
                        </div>
                        <select 
                            name="timeEnd" 
                            class="height_standard_input" 
                            v-model="dataForm.endtime" 
                            @change="selectDropdownTime"
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
                  <div v-if="user_day_left.specialholiday > 0" class="boxtext1 margin_bottom_standard">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start">
                            <input 
                                id="holiday_many_day"
                                type="checkbox" 
                                name="box_holiday"
                                v-model="dataForm.statusHoliday"
                                @change="selectHoliday"
                                disabled
                            >
                                ใช้วันหยุดชดเชย
                        </div>
                        <select 
                            v-if="dataForm.statusHoliday === true"
                            name="dropdown_holiday" 
                            class="height_standard_input" 
                            v-model="dataForm.amountHoliday"
                        >
                            <option 
                                v-for="(holiday, index) in list_holiday" 
                                :key="index" 
                                :value="holiday.value"
                            >
                                {{holiday.text}}
                            </option>
                        </select>
                    </div>
                  </div>
                  <div v-if="text_validation !== ''" class="boxtext1">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start content_center" style="color: red">
                           {{text_validation}}
                        </div>
                    </div>
                  </div>
            </div>
        </div>
        <div class="content_row margin_bottom_standard">
            <div class="Head-Detail">รายละเอียดการลา:</div>
            <textarea 
                id="form_detail"
                class="color_placeholder" 
                name="detail" 
                v-model="dataForm.detailleave" 
                @keyup="inputDetailForm"
            >
            </textarea>
        </div>
        <div class="content_row centent_right">
            <button 
                id="btn_save" 
                class="theme_background_color_blue model_btn font_color_white" 
                type="button"
                @click="onSave"
            >
                แจ้งลา
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
                    { text: 'เลือกการลา',value: 'none' },
                    { text: 'ลากิจ',value: 'PL' },
                    { text: 'ลาป่วย',value: 'SL' },
                    { text: 'ลาพักร้อน',value: 'VL' }
                ],
                list_time: [
                    { text: 'ช่วงเวลา',value: 'none' },
                    { text: 'ช่วงเช้า',value: 'morning' },
                    { text: 'ช่วงบ่าย',value: 'afternoon' },
                    { text: 'เต็มวัน',value: 'allday' }
                ],
                list_time_start: [],
                list_time_end: [],
                list_holiday: [],
                day_left_show : 0,
                text_validation : '',
                date_start_show: null,
                date_end_show: null,
                checkTypeDateSelect: null,
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
                }
           }
        },
        mounted(){
            this.disabledForm()
        },
        methods:{
            moment,
            //-- Method Check Validate Form
            disabledForm(){
                document.getElementsByName("day")[0].disabled = true
                document.getElementsByName("day")[1].disabled = true
                this.controDetail(true)
                this.controlSubmitForm(true)
                this.clearDataForm()
                this.calendar.attributes[0].dates.push({end: this.offsetFromToday(0)},{start: this.offsetFromToday(1)})
            },
            clearDataForm(){
                this.clearDetail()
                this.date_start_show = null
                this.date_end_show = null
                this.picker.date = null
                this.list_time_start = []
                this.list_time_end = []
                this.text_validation = '',
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
                this.calendar = {
                    attributes: [
                        {
                            group: 'date',
                            dates: [] 
                        },
                        {   
                            group: 'day off',
                            dates: [] 
                        },
                    ]
                }
            },
            selectTypeLeave(){
                let type = this.dataForm.type
                if(this.dataForm.type === 'none'){
                    this.dataForm.typeday = 'none'
                    this.disabledForm()
                }else{
                    switch(this.dataForm.type){
                        case 'PL': this.day_left_show = this.user_day_left.personaldayleft; break;
                        case 'SL': this.day_left_show = this.user_day_left.sickdayleft; break;
                        case 'VL': this.day_left_show = this.user_day_left.vacationdayleft; break;
                    }
                    this.disabledForm()
                    this.dataForm.type = type
                    if(this.day_left_show !== 0 || this.user_day_left.specialholiday !== 0){
                        this.showRadio()
                    }
                }
            },
            showRadio(){
                document.getElementsByName("day")[0].disabled = false
                let total_day = this.day_left_show + this.user_day_left.specialholiday
                if(total_day >= 1){
                    document.getElementsByName("day")[1].disabled = false
                }
            },
            selectRadio(){
                this.text_validation = ''
                this.list_holiday = []
                this.dataForm.amountHoliday = 0
                this.dataForm.statusHoliday = false
                this.clearDetail()
                this.controDetail(true)

                if(this.dataForm.typeday === '0'){
                    this.setCalendarForOneday()
                }else{
                    this.setCalendarForManydays()
                }
            },
            setCalendarForOneday(){
                this.calendar.attributes[0].dates = []
                if(this.dataForm.type === 'SL'){
                    this.calendar.attributes[0].dates.push({end: this.offsetFromToday(-1)},{start: this.offsetFromToday(1)})
                }else{
                    this.calendar.attributes[0].dates.push({end: this.offsetFromToday(this.configday.day)})
                }
                this.setDisabledWeekEnd()
                this.setDisabledDayOff()
                this.setDotsandPopovers()
            },
            setCalendarForManydays(){
                this.calendar.attributes[0].dates = []
                if(this.dataForm.type === 'SL'){
                    let dateNow = new Date()
                    dateNow.setDate(dateNow.getDate() - 1)
                    this.calendar.attributes[0].dates.push({end: dateNow})
                }else{
                    this.calendar.attributes[0].dates.push({end: this.offsetFromToday(this.configday.day)})
                }
                this.setDotsandPopovers()
            },
            offsetFromToday(days){
                let dt = new Date();
                dt.setDate(dt.getDate() + days);
                return dt
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
            },
            selectDate(){
                if(this.checkTypeDateSelect === null || (this.checkTypeDateSelect === this.dataForm.typeday)){
                    if(this.dataForm.typeday === '0'){
                        //ลา 1 วัน 
                        if(this.picker.date === null){
                            this.date_start_show = null
                            this.list_time_start = []
                            this.list_time_end = []
                            this.clearDetail()
                            this.controDetail(true)
                        }else{
                            this.date_start_show = moment(this.picker.date).format('YYYY-MM-DD')
                            if(this.date_start_show === 'Invalid date'){
                                this.date_start_show = null
                            }
                            this.createTimeShow()
                        }
                    }else{
                        //ลาหลายวัน
                        if(this.checkDuplicateDay()){
                            if(this.checkPickerDateNotHoliday()){
                                this.list_holiday = []
                                if(this.user_day_left.specialholiday > 0){
                                    this.controHoliday(true)
                                }
                                this.text_validation = ''
                                this.date_start_show = moment(this.picker.date.start).format('YYYY-MM-DD')
                                this.date_end_show = moment(this.picker.date.end).format('YYYY-MM-DD')
                                this.controDetail(true)
                                this.createTimeShow()
                                this.clearDropdownTime()

                            }else{
                                this.clearPickerDate()
                            }
                        }else{
                            this.clearPickerDate()
                        }
                    }
                }else{
                    //ถ้ามีการเปลี่ยน ประเภทวันลา
                    this.picker.date = null
                    this.date_start_show = null
                    this.date_end_show = null
                    this.list_time_start = []
                    this.list_time_end = []
                }
                this.checkTypeDateSelect = this.dataForm.typeday
            },
            checkDuplicateDay(){
                let result = true
                if(moment(this.picker.date.start).format('YYYY-MM-DD') === moment(this.picker.date.end).format('YYYY-MM-DD')){
                    alert('ระบบไม่อนุญาติให้วันเริ่มต้นและสิ้นสุดเป็นวันเดียวกัน')
                    result = false
                }
                return result 
            },
            checkPickerDateNotHoliday(){
                let result = true
                let stringStartDate = moment(this.picker.date.start).format('YYYY-MM-DD')
                let stringEndDate = moment(this.picker.date.end).format('YYYY-MM-DD')
                let dateStart = new Date(stringStartDate)
                let dateEnd = new Date(stringEndDate)
                let list_day_off = this.day_off

                let statusCheck = true
                for(let i = 0 ; i < list_day_off.length ; i++){
                    if(stringStartDate === moment(list_day_off[i].startdate).format('YYYY-MM-DD') ||
                        stringEndDate === moment(list_day_off[i].startdate).format('YYYY-MM-DD'))
                    {
                        alert('ระบบไม่อนุญาติให้วันเริ่มต้นหรือสิ้นสุดเป็นวันหยุด')
                        result = false
                        statusCheck = false
                        break;
                    }
                }

                if(statusCheck === true){
                    for(let j = 0 ; j < this.listWeekend.length ; j++){
                        if(this.listWeekend[j] === (dateStart.getDay()+1) || this.listWeekend[j] === (dateEnd.getDay()+1)){
                            alert('ระบบไม่อนุญาติให้วันเริ่มต้นหรือสิ้นสุดเป็นวันหยุด')
                            result = false
                            break;
                        }
                    }
                }
                return result
            },

            clearPickerDate(){
                this.picker.date.start = null
                this.picker.date.end = null
                this.date_start_show = null
                this.list_time_start = []
                this.list_time_end = []
                this.dataForm.statusHoliday = false
                this.dataForm.amountHoliday = 0
                this.text_validation = ''
                if(this.user_day_left.specialholiday > 0){
                    document.getElementById("holiday_many_day").disabled = true
                }
                this.clearDetail()
                this.controDetail(true)
                this.controlSubmitForm(true)
            },

            createTimeShow(){
                let type_leave = this.dataForm.type
                let type_day = this.dataForm.typeday
                if(type_day === '0'){
                    //1 วัน
                    if(type_leave === 'PL'){
                        let total_day_off = this.user_day_left.personaldayleft + this.user_day_left.specialholiday
                        if(total_day_off >= 1){
                            //ลาได้เต็มวัน
                            this.setDropdownTime('full')
                        }else if(total_day_off > 0 && total_day_off < 1){
                            //ลาได้แต่ไม่เต็มวัน
                            this.setDropdownTime('not_full')
                        }else{
                            //console.log("ERROR")
                        }
                    }else if(type_leave === 'SL'){
                        let total_day_off = this.user_day_left.sickdayleft + this.user_day_left.specialholiday
                        if(total_day_off >= 1){
                            //ลาได้เต็มวัน
                            this.setDropdownTime('full')
                        }else if(total_day_off > 0 && total_day_off < 1){
                            //ลาได้แต่ไม่เต็มวัน
                            this.setDropdownTime('not_full')
                        }else{
                            //console.log("ERROR")
                        }
                    }else if(type_leave === 'VL'){
                        let total_day_off = this.user_day_left.vacationdayleft + this.user_day_left.specialholiday
                        if(total_day_off >= 1){
                            //ลาได้เต็มวัน
                            this.setDropdownTime('full')
                        }else if(total_day_off > 0 && total_day_off < 1){
                            //ลาได้แต่ไม่เต็มวัน
                            this.setDropdownTime('not_full')
                        }else{
                            //console.log("ERROR")
                        }
                    }else{
                        //console.log("ERROR")
                    }
                }else{
                    //>1วัน
                    this.setDropdownTime()
                }
            },
            setDropdownTime(status){
                this.list_time_start = []
                this.list_time_end = []
                if(this.dataForm.typeday === '0'){
                    if(status === 'full'){
                        this.list_time_start = this.list_time
                    }else{
                        this.list_time.forEach(time => {
                            if(time.value !== 'allday'){
                                this.list_time_start.push(time)
                            }
                        })
                    }
                }else{
                    this.list_time.forEach(time => {
                        if(time.value !== 'morning'){
                            this.list_time_start.push(time)
                        }

                        if(time.value !== 'afternoon'){
                            this.list_time_end.push(time)
                        }
                    })
                }
            },
            selectDropdownTime(){
                if(this.dataForm.typeday === '0'){
                    //ลา 1 วัน
                    if(this.dataForm.starttime !== 'none'){
                        this.controDetail(false)
                        if(this.user_day_left.specialholiday > 0){
                            this.controHoliday(false)
                        }
                    }else{
                        this.controDetail(true)
                        if(this.user_day_left.specialholiday > 0){
                            this.controHoliday(true)
                        }
                    }
                }else{
                    //ลาหลายวัน
                    if(this.dataForm.starttime !== 'none' && this.dataForm.endtime !== 'none'){
                        this.calculatDateInput()
                        this.controDetail(false)
                    }else{
                        this.controDetail(true)
                        if(this.user_day_left.specialholiday > 0){
                            this.controHoliday(true)
                        }
                    }
                }
            },
            calculatDateInput(){
                
                let total_day = this.day_left_show + this.user_day_left.specialholiday
                let stringStartDate = moment(this.picker.date.start).format('YYYY-MM-DD')
                let stringEndDate = moment(this.picker.date.end).format('YYYY-MM-DD')
                let between = this.calculateBetweenDateInput(stringStartDate,stringEndDate) // list จำนวนวันที่ลา รวมวันหยุด
                let allDatePicker = this.cutDateInput(between,stringStartDate)      //list วันทั้งหมดที่ลา ไม่รวมวันหยุด

                let sizeDayPicker = allDatePicker.length

                if(this.dataForm.starttime !== 'allday'){
                    sizeDayPicker = sizeDayPicker - 0.5
                }

                if(this.dataForm.endtime !== 'allday'){
                    sizeDayPicker = sizeDayPicker - 0.5
                }

                this.dataForm.totalDay = sizeDayPicker

                if(sizeDayPicker > total_day){
                    this.text_validation = 'จำนวนวันลาเกินกำหนด'
                    this.list_holiday = []
                    this.controlSubmitForm(true)
                    this.controHoliday(true)
                }else{
                    this.text_validation = ''
                    if(this.user_day_left.specialholiday > 0){
                        //มีวันหยุดชดเชย
                        if(total_day === sizeDayPicker){
                            this.list_holiday = []
                            //ลาพอดีกับวันลาที่มี
                            document.getElementById("holiday_many_day").disabled = true
                            this.dataForm.statusHoliday = true
                            let model = {
                                value : sizeDayPicker - this.day_left_show,
                                text : sizeDayPicker - this.day_left_show + " วัน"
                            }
                            this.list_holiday.push(model)
                            this.dataForm.amountHoliday = this.list_holiday[0].value
                        }else{
                            if(sizeDayPicker > this.day_left_show){
                                //วันที่ลา มากกว่า จำนวนวันลาปกติ 
                                document.getElementById("holiday_many_day").disabled = true
                                this.dataForm.statusHoliday = true

                                let min_dropdown = sizeDayPicker - this.day_left_show
                                let max_dropdowm = 0

                                if(this.user_day_left.specialholiday >= sizeDayPicker){
                                    max_dropdowm = sizeDayPicker
                                }else{
                                    max_dropdowm = this.user_day_left.specialholiday
                                }

                                this.list_holiday = []
                                for(let i = min_dropdown ; i <= max_dropdowm ; i = i +0.5){
                                    let model = {
                                        value : i,
                                        text : i + " วัน"
                                    }
                                    this.list_holiday.push(model)
                                    this.dataForm.amountHoliday = this.list_holiday[0].value
                                } 
                            }else{
                                //วันที่ลา น้อยกว่า หรือ เท่ากับ จำนวนวันลาปกติ 
                                document.getElementById("holiday_many_day").disabled = false
                                this.dataForm.statusHoliday = false
                                let min_dropdown = 0.5
                                let max_dropdowm = 0
                                if(this.user_day_left.specialholiday >= sizeDayPicker){
                                    max_dropdowm = sizeDayPicker
                                }else{
                                    max_dropdowm = this.user_day_left.specialholiday
                                }
                                this.list_holiday = []
                                for(let i = min_dropdown ; i <= max_dropdowm ; i = i +0.5){
                                    let model = {
                                        value : i,
                                        text : i + " วัน"
                                    }
                                    this.list_holiday.push(model)
                                    this.dataForm.amountHoliday = this.list_holiday[0].value
                                } 
                            }         
                        }
                    }
                }
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

                //list วันที่ลาโดยตัววันหยุดบริษัทออก
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
            controHoliday(status){
                if(this.dataForm.typeday === '0'){
                    //ลา 1 วัน
                    if(status === true){
                        //ปิด และ เครียค่า
                        document.getElementById("holiday_one_day").disabled = true
                        this.dataForm.statusHoliday = false
                        this.dataForm.amountHoliday = 0
                    }else{
                        //เปิดให้ใช้ได้
                        if(this.day_left_show === 0){
                            //ไม่มีวันลาปกติ
                            if(this.user_day_left.specialholiday > 0 && this.user_day_left.specialholiday < 1){
                                //มีวันหยุดพิเศษ 0.5
                                document.getElementById("holiday_one_day").disabled = true
                                this.dataForm.statusHoliday = true
                                this.dataForm.amountHoliday = this.user_day_left.specialholiday
                            }else{
                                //มีวันหยุดพิเศษตั้งแต่ 1 วัน ขึ้นไป
                                document.getElementById("holiday_one_day").disabled = true
                                this.dataForm.statusHoliday = true
                                switch(this.dataForm.starttime){
                                    case 'allday':  this.dataForm.amountHoliday = 1 ; break;
                                    default : this.dataForm.amountHoliday = 0.5 ; break;
                                }
                            }
                        }else if(this.day_left_show > 0 && this.day_left_show < 1){
                            //มีวันลาปกติไม่ถึง 1 วัน
                            if(this.user_day_left.specialholiday > 0 && this.user_day_left.specialholiday < 1){
                                //มีวันหยุดพิเศษ 0.5 วัน
                                switch(this.dataForm.starttime){
                                    case 'allday':  
                                        document.getElementById("holiday_one_day").disabled = true
                                        this.dataForm.statusHoliday = true
                                        this.dataForm.amountHoliday = this.user_day_left.specialholiday
                                        break;
                                    default : 
                                        document.getElementById("holiday_one_day").disabled = false
                                        this.dataForm.statusHoliday = false
                                        this.dataForm.amountHoliday = 0
                                        break;
                                }                                
                            }else if(this.user_day_left.specialholiday >= 1){
                                //มีวันหยุดพิเศษตั้งแต่ 1 วันขึ้นไป
                                
                                if(this.dataForm.starttime === 'allday'){
                                    document.getElementById("holiday_one_day").disabled = true
                                    this.dataForm.statusHoliday = true
                                    //this.dataForm.amountHoliday = 0
                                    this.list_holiday = []
                                    for(let i = 0.5 ; i <= 1 ; i=i+0.5){
                                        let model = {
                                             text: i+' วัน',
                                             value: i
                                        }
                                        this.list_holiday.push(model)
                                    }
                                    this.dataForm.amountHoliday = this.list_holiday[0].value
                                }else{
                                    document.getElementById("holiday_one_day").disabled = false
                                    this.dataForm.statusHoliday = false
                                    this.dataForm.amountHoliday = 0
                                    this.list_holiday = []
                                }
                            }else{
                                //ไม่มีวันหยุดพิเศษ
                                this.dataForm.statusHoliday = false
                                this.amountHoliday = 0
                                //console.log("ไม่มีวันหยุดพิเศษ")
                            }
                        }else{
                            //มีวันลาปกติตั้งแต่ 1 วันขึ้นไป
                            document.getElementById("holiday_one_day").disabled = false
                            this.dataForm.statusHoliday = false
                            this.dataForm.amountHoliday = 0
                            /*if(this.user_day_left.specialholiday >= 1){
                                if(this.dataForm.starttime === 'allday'){
                                    document.getElementById("holiday_one_day").disabled = false
                                    this.dataForm.statusHoliday = false
                                    this.list_holiday = []
                                    for(let i = 0.5 ; i <= 1 ; i=i+0.5){
                                        let model = {
                                            text: i+' วัน',
                                            value: i
                                        }
                                        this.list_holiday.push(model)
                                    }
                                    this.dataForm.amountHoliday = this.list_holiday[0].value
                                }else{
                                    document.getElementById("holiday_one_day").disabled = true
                                    this.dataForm.statusHoliday = true
                                    this.dataForm.amountHoliday = 0.5
                                }
                                
                            }else if(){
                                document.getElementById("holiday_one_day").disabled = false
                                this.dataForm.statusHoliday = false
                                this.dataForm.amountHoliday = 0
                            } */
                        }
                    }
                    //console.log(this.dataForm.statusHoliday+"----"+this.dataForm.amountHoliday)
                }else{
                    //ลา หลายวัน
                    if(status === true && this.user_day_left.specialholiday > 0){
                        //ปิด ไม่ใช้ วันหยุด
                        document.getElementById("holiday_many_day").disabled = true
                        this.dataForm.statusHoliday = false
                        this.dataForm.amountHoliday = 0
                        this.list_holiday = []
                    }
                }
            },
            selectHoliday(){
                if(this.dataForm.typeday === '0'){
                    //ลา 1 วัน
                    if(this.dataForm.statusHoliday === true){
                        if(this.user_day_left.specialholiday >= 1){
                            //วันหยุดพิเศษมีตั้งแต่ 1 วันขึ้นไป
                            switch(this.dataForm.starttime){
                                case 'allday':  
                                    this.list_holiday = []
                                    for(let i = 0.5 ; i <= 1 ; i=i+0.5){
                                        let model = {
                                            text: i+' วัน',
                                            value: i
                                        }
                                        this.list_holiday.push(model)
                                    }
                                    this.dataForm.amountHoliday = this.list_holiday[0].value
                                    break;
                                default : 
                                    this.list_holiday = []
                                    this.dataForm.amountHoliday = 0.5 
                                    break;
                            }
                        }else{
                            //วันหยุดพิเศษน้อยกว่า 1 วัน
                            this.dataForm.amountHoliday = this.user_day_left.specialholiday
                        }
                    }else{
                        this.dataForm.amountHoliday = 0
                    }
                }else{
                    //ลาหลายวัน
                    if(this.dataForm.statusHoliday === true){
                        this.dataForm.amountHoliday = this.list_holiday[0].value
                    }else{
                        this.dataForm.amountHoliday = 0
                    } 
                }
            },
            inputDetailForm(){
                if(this.text_validation != ''){
                    this.controlSubmitForm(true)
                }else{
                    if(this.dataForm.detailleave === ''){
                        this.controlSubmitForm(true)
                    }else{
                        this.controlSubmitForm(false)
                    }
                }
            },
            clearDropdownTime(){
                this.dataForm.starttime = 'none'
                this.dataForm.endtime = 'none'
            },
            clearDetail(){
                document.getElementById("form_detail").placeholder = "ขึ้นตอนก่อนหน้าไม่สมบูรณ์"
                this.dataForm.detailleave = ''
            },
            controDetail(status){
                document.getElementById("form_detail").disabled = status
                if(status === false){
                    document.getElementById("form_detail").placeholder = ""
                }else{
                    document.getElementById("form_detail").placeholder = "ขึ้นตอนก่อนหน้าไม่สมบูรณ์"
                }
                if(this.dataForm.detailleave !== ''){
                    this.controlSubmitForm(status)
                }
            },
            controlSubmitForm(status){
                document.getElementById("btn_save").disabled = status
            },
            //-- Method Check Data Form 

            //-- Menthod Save Data Form To Database Sheet
            onSave(){
                let result = this.createDataFormToDataBase()
                if(result === true){
                    this.$emit('form_request',this.dataForm)
                }
            },
            createDataFormToDataBase(){
                if(this.dataForm.typeday === '0'){
                    //ลาวันเดียว
                    this.dataForm.startdate = moment(this.picker.date).format('YYYY-MM-DD')
                    this.dataForm.enddate = moment(this.picker.date).format('YYYY-MM-DD')
                    this.dataForm.endtime = this.dataForm.starttime
                    if(this.dataForm.starttime === 'allday'){
                        this.dataForm.totalDay = 1
                    }else{
                        this.dataForm.totalDay = 0.5
                    }
                    
                }else{
                    //ลาหลายวัน
                    this.dataForm.startdate = moment(this.picker.date.start).format('YYYY-MM-DD')
                    this.dataForm.enddate = moment(this.picker.date.end).format('YYYY-MM-DD')
                }
                let dataUser = JSON.parse(localStorage.getItem('userprofile'))
                this.dataForm.user = dataUser
                this.dataForm.idemployee = dataUser.userId
                return true
            }
        },
        computed: {
            ...mapState({statusload: state => state.formRequest.loading}),
            ...mapState({configday: state => state.formRequest.configDay}),
            ...mapState({user_day_left: state => state.formRequest.userdayleft}),

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
}

.dropdown-leave{
    width: 40%;
    border-radius: 5px;
    text-align-last: center;
    text-align: center;
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
</style>

