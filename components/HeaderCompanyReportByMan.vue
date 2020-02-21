<template>
    <div class="page">
        <div class="box_loading" v-if="dataFilter.length === 0 || allUser.length === 0">
            <LoadingPage/>
        </div>
        <div class="box_filter" v-else>
            <div class="filter_date">
                <div class="text_date">
                    Absent Since
                </div>
                <div class="select_date">
                    <div>
                        <input type="date" v-model="startDate" @change="selectStartDate" class="unstyled"/>
                    </div>
                    <div class="text">To</div>
                    <div>
                        <input type="date" v-model="endDate" :min="startDate" class="unstyled"/>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="filter_multiple_data">
                <div class="multiple_data">
                    <div class="type_filter">
                        <div class="dropdown_type">
                            <select v-model="selectTypeFilter" @change="selectType" class="dropdown">
                                <option  v-for="(type, index) in dropdownType" :key="index" :value="type.value" class="dropdowntext">
                                    {{type.text}}
                                </option>
                            </select>
                        </div>
                        <div class="type_value_select">
                            <div v-if="selectTypeFilter === 'all_user'" class="type_all_user"></div>
                            <div v-else-if="selectTypeFilter === 'name'"  class="type_name">
                                <select v-model="selectUser">
                                    <option :value="null">Select Name</option>
                                    <option v-for="(user, index) in allUser" :key="index" :value="user">
                                        {{user.name}}
                                    </option>
                                </select>
                            </div>
                            <div v-else class="type_department">
                                <div 
                                    v-for="(department, index) in createListDepartment" :key="index"
                                    @click="selectDepartment(department.text)"
                                    :class="`name_department ${department.style}`" 
                                >
                                    {{department.text}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position_filter" v-if="listSelectDepartment.length > 0">
                        <div class="text_position">Position : </div>
                        <div class="value_list_position">
                            <div
                                v-for="(position, index) in createListPosition" :key="index"
                                @click="selectPosition(position.text)"
                                :class="`name_position ${position.style}`" 
                            >
                                {{position.text}}
                            </div>
                        </div>
                    </div>
                    <div class="type_leave_filter">
                        <div class="text_type_leave">Type Of Leave : </div>
                        <div class="value_list_leave">
                            <div
                                v-for="(leave, index) in createListTypeLeave" :key="index"
                                @click="selectTypeLeave(leave.value)"
                                :class="`name_leave ${leave.style}`"
                            >
                                {{leave.text}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn_filter">
                    <button type="button" @click="startFilter">
                        <i class="material-icons">search</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from "moment"
import LoadingPage from './LoadingPage'
import Provider from '../service/provider'
const provider = new Provider()
export default {
    components: {
        LoadingPage
    },
  data() {
    return {
        api: provider,
        dropdownType: [
            { text: 'All User', value: 'all_user' },
            { text: 'Name', value: 'name' },
            { text: 'Department', value: 'department' }
        ],
        selectTypeFilter: 'all_user',
        listSelectDepartment: [],
        listSelectPosition: [],
        listShowPosition: [],
        listLeave: [
            { text: 'All Leave', value: 'all',class:'all_leave' },
            { text: 'Personal Leave', value: 'personal',class:'personal_leave' },
            { text: 'Sick Leave', value: 'sick',class:'sick_leave' },
            { text: 'Vacation Leave', value: 'vacation',class:'vacation_leave' }
        ],
        listSelectTypeLeave: ['all'],
        selectUser: null,
        startDate: '',
        endDate: ''
    }
  },
  mounted(){
        this.createNowMonth()
        this.queryDataFilter()
        this.queryAllUser()
    },
  methods: {
        moment,
        createNowMonth() {
            let nowDate = new Date()
            let indexMonth = nowDate.getMonth()
            let year = nowDate.getFullYear()
            let fullDayOfMonth = this.getDaysInMonth(indexMonth, year)
            
            let startDate = new Date()
            startDate.setDate(1)
            let endDate = new Date()
            endDate.setDate(fullDayOfMonth)

            this.startDate = moment(startDate).format("YYYY-MM-DD")
            this.endDate = moment(endDate).format("YYYY-MM-DD")
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
        queryDataFilter(){
            let result = this.api.getFilterReport()
            result.then(re => {
                this.$store.commit('report/setFilterReport', re)
            })
        },
        queryAllUser(){
            let result = this.api.getAllUser()
            result.then(re => {
                this.$store.commit('report/setAlluser', re)
            })
        },
        selectStartDate(){
            this.endDate = this.startDate
        },
        selectType(){
            this.listSelectDepartment = []
            this.listSelectPosition = []
            this.listShowPosition = []
            this.listSelectTypeLeave = ['all']
            this.selectUser = null
        },
        selectDepartment(text){
            let result = this.listSelectDepartment.filter(data => {
                return data === text
            })
            if(result.length > 0){
                const index_remove = this.listSelectDepartment.indexOf(text);
                if (index_remove > -1) {
                    this.listSelectDepartment.splice(index_remove, 1);
                }
                this.removePositionSelect(text)
            }else{
                this.listSelectDepartment.push(text)
            }
        },
        removePositionSelect(text){
            let list_position = []
            let result = this.dataFilter.filter(data => {
                return data.department === text
            })
            if(result.length > 0){
                list_position = result[0].position
            }
            list_position.forEach(text_remove => {
                let result = this.listSelectPosition.filter(data => {
                    return data === text_remove
                })
                if(result.length > 0){
                    const index_remove = this.listSelectPosition.indexOf(result[0]);
                    if (index_remove > -1) {
                        this.listSelectPosition.splice(index_remove, 1);
                    }
                }
            })
        },
        selectPosition(text){
            let result = this.listSelectPosition.filter(data => {
                return data === text
            })
            if(result.length > 0){
                const index_remove = this.listSelectPosition.indexOf(text);
                if (index_remove > -1) {
                    this.listSelectPosition.splice(index_remove, 1);
                }
            }else{
                this.listSelectPosition.push(text)
            }
        },
        selectTypeLeave(value){
            if(value === 'all'){
                this.listSelectTypeLeave = ['all']
            }else{
                let result = this.listSelectTypeLeave.filter(leave => {
                    return leave === 'all'
                })
                if(result.length > 0){
                    const index_remove = this.listSelectTypeLeave.indexOf(result[0]);
                    if (index_remove > -1) {
                        this.listSelectTypeLeave.splice(index_remove, 1);
                    }
                }
                let result2 = this.listSelectTypeLeave.filter(leave => {
                    return leave === value
                })
                if(result2.length > 0){
                    const index_remove = this.listSelectTypeLeave.indexOf(value);
                    if (index_remove > -1) {
                        this.listSelectTypeLeave.splice(index_remove, 1);
                    }
                }else{
                    this.listSelectTypeLeave.push(value)
                }
            }
        },
        startFilter(){
            let status = this.checkDataFilter()
            if(status){
                let moderEmit = {
                    typeFilter: null,
                    startDate: this.startDate,
                    endDate: this.endDate
                }
                if(this.selectTypeFilter === 'all_user'){
                    //เลือกดูทุกคน จะต้องมี list ประเภทการลา
                    moderEmit.typeFilter = 1
                    moderEmit = {
                        ...moderEmit,
                        listTypeLeave: this.listSelectTypeLeave
                    }
                }else if(this.selectTypeFilter === 'name'){
                    //เลือกดูด้วยชื่อ จะต้องมี opject user และ list ประเภทการลา
                    moderEmit.typeFilter = 2
                    moderEmit = {
                        ...moderEmit,
                        user: this.selectUser,
                        listTypeLeave: this.listSelectTypeLeave
                    }
                }else if(this.selectTypeFilter === 'department'){
                    moderEmit.typeFilter = 3
                    moderEmit = {
                        ...moderEmit,
                        listPosition: this.listSelectPosition,
                        listTypeLeave: this.listSelectTypeLeave
                    }
                }
                console.log(moderEmit)
                this.$emit('filterReport',moderEmit)
            }
        },
        checkDataFilter(){
            if(this.startDate === ''){
                alert('ไม่ได้เลือกวันเริ่มต้น')
                return false
            }else if(this.endDate === ''){
                alert('ไม่ได้เลือกวันสิ้นสุด')
                return false
            }else if((this.selectTypeFilter === 'all_user' && this.listSelectTypeLeave.length === 0) || (this.selectTypeFilter === 'name' && this.listSelectTypeLeave.length === 0)){
                alert('ไม่ได้เลือกประเภทการลา')
                return false
            }else if(this.selectTypeFilter === 'name' && this.selectUser === null){
                alert('ไม่ได้เลือก User')
                return false
            }else if(this.selectTypeFilter === 'department' && this.listSelectDepartment.length === 0){
                alert('ไม่ได้เลือก แผนก')
                return false
            }else if(this.selectTypeFilter === 'department' && this.listSelectPosition.length === 0){
                alert('ไม่ได้เลือก ตำแหน่งงาน')
                return false
            }else if(this.selectTypeFilter === 'department' && this.listSelectTypeLeave.length === 0){
                alert('ไม่ได้เลือกประเภทการลา')
                return false
            }else{
                return true
            }
        }
  },
    computed: {
        ...mapState({
            dataFilter: state => state.report.data_filter,
            allUser: state => state.report.list_user
        }),
        createListDepartment(){
            let list = []
            this.dataFilter.forEach(data => {
                let model = {
                    text: data.department,
                    style: ''
                }
                let resultSelect = this.listSelectDepartment.filter(textSelect => {
                    return textSelect === data.department
                })
                if(resultSelect.length > 0){
                    model.style = 'department_select'
                }else{
                    model.style = 'department_defult'
                }
                list.push(model)
            })
            return list
        },
        createListPosition(){
            let list = []
            this.dataFilter.forEach(store_department => {
                let result = this.listSelectDepartment.filter(select_department => {
                    return select_department === store_department.department
                })
                if(result.length > 0){
                    store_department.position.forEach(position => {
                        let model = {
                            text: position,
                            style: ''
                        }
                        let resultSelect = this.listSelectPosition.filter(textSelect => {
                            return textSelect === position
                        })
                        if(resultSelect.length > 0){
                            model.style = 'position_select'
                        }else{
                            model.style = 'position_defult'
                        }
                        list.push(model)
                    })
                }
            })
            return list
        },
        createListTypeLeave(){
            let list = []
            this.listLeave.forEach(leave => {
                let model = {
                    text: leave.text,
                    value: leave.value,
                    style: ''
                }
                let result = this.listSelectTypeLeave.filter(select_leave => {
                    return select_leave === leave.value
                })
                if(result.length > 0){
                   
                    console.log("result",result[0])
                    switch(result[0]){
                        case 'all': 
                             model.style = 'leave_all'
                        break;
                        case 'personal': 
                            model.style = 'leave_personal'
                        break;
                        case 'sick': 
                            model.style = 'leave_sick'
                        break;
                        case 'vacation': 
                            model.style = 'leave_vacation'
                        break;
                    }

                }else{
                    model.style = 'leave_defult'
                }
                list.push(model)
            })
            return list
        }
    }
};
</script>

<style lang="scss" scoped>
    .page{
        width: 100%;
        display: flex;
        padding: 2% 2% 0.5% 2%;
        height: 200px;

        .box_loading{
            width: 100%;
            height: 100%;
        }

        .box_filter{
            display: flex;
            width: 100%;
            height: 100%;
            .filter_date{
                width: 20%;
                height: 100%;
                display: flex;
                background-color: white;
                margin-right: 50px;
                .text_date{
                    width: 50%;
                    height: 100%;
                    font-weight: 600;
                }
                .select_date{
                    width: 50%;
                    height: 100%;
                    .text{
                        display: flex;
                        justify-content: center;
                        padding: 5px;
                    }
                    ::-webkit-calendar-picker-indicator {
                        color: rgba(0, 0, 0, 0);
                        opacity: 1;
                        background-image: url('data:image/svg+xml;charset=utf8,%3Csvg fill="%23000" fill-opacity=".54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/%3E%3Cpath d="M0 0h24v24H0z" fill="none"/%3E%3C/svg%3E');
                        background-repeat: no-repeat;
                        width: 20px;
                        height: 20px;
                        margin-left: .5rem;
                    }
                    ::-webkit-calendar-picker-indicator:hover {
                        -webkit-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
                        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
                    }
                    .unstyled::-webkit-inner-spin-button{
                        display: none;
                        -webkit-appearance: none;
                    }
                    .unstyled{
                        border: 1px solid #858585;
                        padding: 5px;
                        border-radius: 4px;
                    }
                }
            }

            .line{
                margin: 0px 10px 10px 10px;
                height: 90%;
                width: 0.5%;
                border-radius: 10px;
                background-color: #858585;
                border: none;
            }

            .filter_multiple_data{
                width: 79.5%;
                height: 100%;
                display: flex;
                .multiple_data{
                    height: 100%;
                    width: 55%;
                    background-color: white;
                    padding: 5px 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .type_filter{
                        width: 100%;
                        height: 40px;
                        display: flex;
                        .dropdown_type{
                            height: 100%;
                            width: 25%;
                            .dropdown{
                                width: 100%;
                                height: 100%;
                                background-color: #D6D6D6;
                                border: 1px solid black;
                                border: none;
                                border-radius: 10px 0px 0px 10px;
                                .dropdowntext{
                                    display: flex;
                                    justify-content: center;
                                    background-color: #fff;
                                }
                            }
                        }
                        .type_value_select{
                            height: 100%;
                            min-width: 70%;
                            max-width: 70%;
                            background-color: #4C86B8;
                            border: 1px solid black;
                            border-radius: 0px 10px 10px 0px;
                            border: none;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .type_all_user{
                                width: 100%;
                                height: 100%;
                            }
                            .type_name{
                                width: 100%;
                                height: 80%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 5px;
                                select{
                                    width: 100%;
                                    height: 100%;
                                    border: 1px solid black;
                                    border-radius: 10px;
                                    border: none;
                                   
                                }
                            }
                            .type_department{
                                height: 100%;
                                min-width: 100%;
                                max-width: 100%;
                                overflow-x: auto;
                                display: flex;
                                align-items: center;
                                .name_department{
                                    min-width: fit-content;
                                    height: 80%;
                                    padding: 3px 5px 5px 5px;
                                    cursor: pointer;
                                    margin-right: 5px;
                                }
                                .department_select{
                                    opacity: 1;
                                    background-color: #fff;
                                    border-radius: 10px;
                                    align-content: center;
                                    border: 1px solid #0F4C81;
                                    color: #0F4C81;
                                }
                                .department_defult{
                                    opacity: 0.5;
                                    border-radius: 10px;
                                    background-color: #fff;
                                  
                                }
                            }
                        }
                    }
                    .position_filter{
                        width: 100%;
                        height: 40px;
                        // background-color: crimson;
                        display: flex;
                        .text_position{
                            height: 100%;
                            width: 25%;
                            background-color: #D6D6D6;
                            border-radius: 10px 0px 0px 10px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            padding: 3px;
                        }
                        .value_list_position{
                            height: 100%;
                            min-width: 70%;
                            max-width: 70%;
                            background-color: #D6D6D6;
                            overflow-x: scroll;
                            display: flex;
                            align-items: center;
                            .name_position{
                                min-width: fit-content;
                                height: 80%;
                                padding: 5px;
                                cursor: pointer;
                                margin-right: 5px;
                                padding: 3px 5px 5px 5px;
                            }
                            .position_select{
                                opacity: 1;
                                background-color: #fff;
                                color: #858585;
                                border: 1px solid #858585;
                                border-radius: 20px;
                            }
                            .position_defult{
                                opacity: 0.5;
                                border: 1px solid #858585;
                                background-color: #fff;
                                border-radius: 20px;
                                color: #858585;
                            }
                        }
                    }
                    .type_leave_filter{
                        width: 100%;
                        height: 40px;
                        // background-color: darkgoldenrod;
                        display: flex;
                        .text_type_leave{
                            padding: 10px;
                            height: 100%;
                            width: 25%;
                            background-color: #fff;
                            border: 1px solid black;
                            border-right: none;
                            border-radius: 10px 0px 0px 10px;
                            
                        }
                        .value_list_leave{
                            height: 100%;
                            border-radius: 0px 10px 10px 0px;
                            min-width: 70%;
                            max-width: 70%;
                            border: 1px solid black;
                            border-left: none;
                            background-color: #fff;
                            overflow-x: scroll;
                            display: flex;
                            align-items: center;
                            
                            .name_leave{
                                min-width: fit-content;
                                height: 80%;
                                padding: 3px 5px 5px 5px;
                                cursor: pointer;
                                margin-right: 5px;
                              
                                
                            }

                            // .leave_select{
                            //     opacity: 1;
                            //     background-color: #fff;
                            //     border-radius: 20px;
                            //     border: 1px solid #858585;
                             
                            // }
                            .leave_all{
                                opacity: 1;
                                background-color: #5F5F5F;
                                border-radius: 20px;
                                border: 1px solid #858585;
                                border: none;
                                color: #fff;
                             
                            }
                            .leave_personal{
                                opacity: 1;
                                background-color: #0F4C81;
                                border-radius: 20px;
                                border: 1px solid #858585;
                                border: none;
                                color: #fff;
                             
                            }
                            .leave_sick{
                                opacity: 1;
                                background-color: #B84C4C;
                                border-radius: 20px;
                                border: 1px solid #858585;
                                border: none;
                                color: #fff;
                             
                            }
                             .leave_vacation{
                                opacity: 1;
                                background-color: #F97111;
                                border-radius: 20px;
                                border: 1px solid #858585;
                                border: none;
                                color: #fff;
                             
                            }
                            .leave_defult{
                                opacity: 0.5;
                                border: 1px solid #858585;
                                border-radius: 20px;
                                background-color: #fff;
                               
                            }
                        }
                    }
                }
                .btn_filter{
                    height: 100%;
                    width: 5%;
                    // background-color: blueviolet;
                    button{
                        width: 100%;
                        height: 100%;
                        border: none;
                        border-radius: 10px;
                        outline: none;
                        background-color: #0F4C81;
                        i{
                            color: #fff;
                            font-size: 50px;
                        }
                    }
                    button:active{
                        opacity: 0.7;
                    }
                }
            }
        }
    }
.type_department::-webkit-scrollbar, .value_list_position::-webkit-scrollbar, .value_list_leave::-webkit-scrollbar {
  width: 0px;
  height: 5px;
}
</style>