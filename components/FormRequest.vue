<template>
    <div id="layout_con_form">
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
            <div v-if="dataForm.type !== 'none' && dataForm.type === 'SL'" class="content_center">
                <div v-if="day_left_show > 0">
                    <label class="day-stack">คุณเหลือวันลาอีก {{day_left_show}} วัน</label>
                </div>
                <div v-else>
                    <label class="day-stack-out">วันลาของคุณหมดแล้ว</label>
                </div>
            </div>
            <div v-if="dataForm.type !== 'none' && dataForm.type !== 'SL'" class="content_center">
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
                >
                <label id="text_radio_0"> ลา 1 วัน</label>
            </div>
            <div class="box-radio content_center">
                <input 
                    type="radio" 
                    name="day" 
                    value="1" 
                    v-model="dataForm.typeday"
                    @change="selectRadio"
                > 
                <label id="text_radio_1"> ลาหลายวัน</label>
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
                    :attributes="attributes"
                    @input="selectDate()"
                >
                </v-date-picker>
                <v-date-picker
                    v-else
                    :disabled-dates="excludeDates" 
                    is-inline 
                    :attributes="attributes"
                    v-model="picker.date"
                    @input="selectDate()"
                >
                </v-date-picker>
            </div>

            <div class="text-stack">

                <div id="layout_start_date" class="boxtext1 margin_bottom_standard">
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
                    <div v-if="dataForm.typeday === '1'" class="BoxSelectLeave">
                        <div class="Box-Start">
                            วันสิ้นสุด : 
                            <label v-if="date_end_show === null">ไม่ทราบ</label>
                            <label v-else>{{moment(new Date(date_end_show)).format('DD-MMM-YYYY')}}</label>
                        </div>
                        <select 
                            name="timeEnd" 
                            class="height_standard_input" 
                            v-model="dataForm.endtime" 
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

                <div v-if="check_validation.status" :class="`boxtext1 ${check_validation.classShow}`">
                    <div class="BoxSelectLeave">
                        <div class="Box-Start content_center" style="color: red">
                           {{check_validation.text_validation}}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div id="layout_detail" class="content_row margin_bottom_standard">
            <div class="Head-Detail">รายละเอียดการลา:</div>
            <textarea 
                id="form_detail"
                class="color_placeholder" 
                name="detail" 
                v-model="dataForm.detailleave"
            >
            </textarea>
        </div>
        <div id="layout_btn_submit" class="content_row centent_right">
            <button 
                id="btn_save" 
                class="theme_background_color_blue model_btn font_color_white" 
                type="button"
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
            day_left_show : 0,
            check_validation: {
                status: false,
                text_validation : '',
                classShow : ''
            },
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
    },
    methods:{
        moment,
        //----------------------------------
        selectTypeLeave(){
            let type = this.dataForm.type
            this.clearAllDataForm()
            if(type !== 'none'){
                switch(type){
                    case 'PL': this.day_left_show = this.user_day_left.personaldayleft; break;
                    case 'SL': this.day_left_show = this.user_day_left.sickdayleft; break;
                    case 'VL': this.day_left_show = this.user_day_left.vacationdayleft; break;
                }
                if(type === 'SL'){
                    if(this.day_left_show > 0 && this.day_left_show < 1){
                        this.enabledRadio_0()
                    }else if(this.day_left_show >= 1){
                        this.enabledRadio_0()
                        this.enabledRadio_1()
                    }
                }else{
                    let sum_day_left = this.day_left_show + this.user_day_left.specialholiday
                    if(this.day_left_show > 0 && this.day_left_show < 1){
                        this.enabledRadio_0()
                    }else if(this.day_left_show >= 1){
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
                    this.picker = { date : new Date() }
                }else{
                    this.enabledCalendar(this.configday.day,null)
                }
                this.setDisabledWeekEnd()
                this.setDisabledDayOff()
                this.setDotsandPopovers()
            }else{
                if(this.dataForm.type === 'SL'){
                    this.enabledCalendar(-1,null)
                }else{
                    this.enabledCalendar(this.configday.day,null)
                }
                this.setDotsandPopovers()
            }
        },
        selectDate(){
            if(this.picker.date !== null){
                if(this.checkDateInput()){
                    console.log("OK")
                    //////////// ทำต่อตรงี้ เริ่ม เช็ค list time
                }
            }
        },

        offsetFromToday(days){
            let dt = new Date();
            dt.setDate(dt.getDate() + days);
            return dt
        },
        
        controTextValidation(){
            console.log("--> Method controTextValidation")
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
                if(start === end){
                    alert('ระบบไม่อนุญาติให้วันเริ่มต้นและสิ้นสุดเป็นวันเดียวกัน')
                    result = false
                }else{
                    let statusCheck = true
                    for(let i = 0 ; i < list_day_off.length ; i++){
                        if(start === moment(list_day_off[i].startdate).format('YYYY-MM-DD') ||
                            end === moment(list_day_off[i].startdate).format('YYYY-MM-DD'))
                        {
                            alert('ระบบไม่อนุญาติให้วันเริ่มต้นหรือสิ้นสุดเป็นวันหยุด')
                            result = false
                            statusCheck = false
                            break;
                        }
                    }

                    if(statusCheck){
                        for(let j = 0 ; j < this.listWeekend.length ; j++){
                            if(this.listWeekend[j] === (dateStart.getDay()+1) || this.listWeekend[j] === (dateEnd.getDay()+1)){
                                alert('ระบบไม่อนุญาติให้วันเริ่มต้นหรือสิ้นสุดเป็นวันหยุด')
                                result = false
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
            document.getElementsByName("timeStart").disabled = true
        },
        enabledStartDate(){
            document.getElementById("layout_start_date").style.opacity = this.opacity_enabled_global
            document.getElementsByName("timeStart").disabled = false
        },
        disabledEndDate(){
            if(this.dataForm.typeday === '1'){
                document.getElementById("layout_end_date").style.opacity = this.opacity_disabled_global
                document.getElementsByName("timeEnd").disabled = true
            }
        },
        enabledEndDate(){
            if(this.dataForm.typeday === '1'){
                document.getElementById("layout_end_date").style.opacity = this.opacity_enabled_global
                document.getElementsByName("timeEnd").disabled = false
            }
        },

        // Contro Detail
        disabledDetail(){
           document.getElementById("layout_detail").style.opacity = this.opacity_disabled_global
           document.getElementById("form_detail").disabled = true
        },
        enabledDetail(){
            document.getElementById("layout_detail").style.opacity = this.opacity_enabled_global
            document.getElementById("form_detail").disabled = false
        },

        //Contro Button Submit
        disabledSubmit(){
            document.getElementById("layout_btn_submit").style.opacity = this.opacity_disabled_global
            document.getElementById("btn_save").disabled = true
        },
        enabledSubmit(){
            document.getElementById("layout_btn_submit").style.opacity = this.opacity_enabled_global
            document.getElementById("btn_save").disabled = false
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
//----------------------------------------------------
.validation_fail{
    color: red;
}
.validation_success{
    color: #2D810F;
}
.set_opacity{
    opacity: 0.5;
}
</style>

