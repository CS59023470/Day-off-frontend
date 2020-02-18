<template>
    <div class="page">
        <div class="selectDate">
            <div class="text">Absent Since</div>
            <div class="box_SelectDate">
                <input type="date" v-model="startdate" :max="enddate" v-on:change="inputStartDate()" class="unstyled"/>
                <div class="text">To</div>
                <input type="date" v-model="enddate" :min="startdate" v-on:change="inputEndDate()" class="unstyled">
            </div>
        </div>
        <div class="line"></div>
        <div class="searchName_TypeLeave">
            <div class="departmentAndName">
                <select name="typesearch" v-model="typesearch">
                    <option value="Name">Name</option>
                    <option value="Department">Department</option>
                </select>
                <input type="text" v-model="name" placeholder="Search Name" list="nameUser" v-if="typesearch === 'Name'">
                <datalist id="nameUser">
                    <option v-for="(name , idx) in listNameUser" :key="idx">{{name.name}}</option>
                </datalist>
                <input type="text" v-model="name" placeholder="Search Department" list="department" v-if="typesearch === 'Department'">
                <datalist id="department">
                    <option v-for="(name , idx) in listNameDepartment" :key="idx">{{name}}</option>
                </datalist>
            </div>
            <div class="position" v-if="typesearch === 'Department'">
                <div class="text-Position">Position : </div>
                <div
                    class="box_btn_leave"
                    v-for="(list, index) in getListPosition"
                    :key="index"
                >
                    <div
                        v-if="positionselect !== index"
                        :class="list.class"
                        @click="selectPosition(list.value)"
                    >
                        <div class="text">
                            {{list.text}}
                        </div>
                    </div>
                    <div 
                        v-else
                        :class="`${list.class}_select`"
                    >
                        <div class="text">
                            {{list.text}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="typeLeave">
                <div class="text-TypeLeave">Type Of Leave :</div>
                <div
                    class="box_btn_leave"
                    v-for="(list, index) in getListLeave"
                    :key="index"
                >
                    <div
                        v-if="menuSelect !== index"
                        :class="list.class"
                        @click="selectType(list.value)"
                    >
                        <div class="text">
                            {{list.text}}
                        </div>
                    </div>
                    <div 
                        v-else
                        :class="`${list.class}_select`"
                    >
                        <div class="text">
                            {{list.text}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button>
            <i class="material-icons" v-on:click="input()">search </i>
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      startdate: "",
      enddate: "",
      name: "",
      typesearch: "Name",
      menuSelect: null,
      positionselect: null,
      department: [],
        listBtn: [
            { text: 'Personal Leave', class: 'personal_leave_btn', value: 'personal_leave'},
            { text: 'Sick Leave', class: 'sick_leave_btn', value: 'sick_leave'},
            { text: 'Vacation Leave', class: 'vacation_leave_btn', value: 'vacation_leave'}
        ],
      positionselect: null,
        listPosition: [
            { text: 'Back-End', class: 'personal_leave_btn', value: 'personal_leave'},
            { text: 'Front-End', class: 'sick_leave_btn', value: 'sick_leave'},
            { text: 'UX/UI Designer', class: 'vacation_leave_btn', value: 'vacation_leave'}
        ],
    };
  },
  mounted(){
        this.menuSelect = 0
        this.positionselect = 0
        this.returnDataTypeSelect()
        this.returnDataPositionSelect()
       
        // this.typeDepartment()
    },
  methods: {
    // typeDepartment() {
    //     let listDepartment = new Set();
    //     this.listNameUser.map(each => {
    //         let array = each.department
    //         listDepartment.add(array)
            
    //     }),console.log('98465312 =>',listDepartment)
    // },
    inputStartDate() {
      //this.$emit("startdate", this.startdate);
    },
    inputEndDate() {
      //this.$emit("enddate", this.enddate);
    },
    input() {
        let model = {
            startdate: this.startdate,
            enddate: this.enddate
        }
        this.$emit('dataFilter', model);
    },
    selectType(type){
        switch(type){
            case 'personal_leave':
                this.menuSelect = 0;
                break;
            case 'sick_leave':
                this.menuSelect = 1;
                break;
            case 'vacation_leave':
                this.menuSelect = 2
                break;
            default: break;
        }
        this.returnDataTypeSelect()
    },
    returnDataTypeSelect(){
        this.$emit('returnTypeLeave',this.listBtn[this.menuSelect].value)
    },
    selectPosition(type){
        switch(type){
            case 'personal_leave':
                this.positionselect = 0;
                break;
            case 'sick_leave':
                this.positionselect = 1;
                break;
            case 'vacation_leave':
                this.positionselect = 2
                break;
            default: break;
        }
        this.returnDataPositionSelect()
    },
    returnDataPositionSelect(){
        this.$emit('returnPosition',this.listPosition[this.positionselect].value)
    }
  },
  computed: {
        getListLeave(){
            this.listBtn[0]
            this.listBtn[1]
            this.listBtn[2]
            return this.listBtn
        },
        getListPosition(){
            this.listPosition[0]
            this.listPosition[1]
            this.listPosition[2]
            return this.listPosition
        },
        ...mapState({
            listNameUser: state => state.leaveHistory.listAllUser,
            listNameDepartment: state => state.leaveHistory.listDepartment
        })
    }
};
</script>

<style lang="scss" scoped>
    .page{
        width: 100%;
        display: flex;
        padding: 2%;
        height: 200px;
        .selectDate {
            width: fit-content;
            display: flex;
            .text {
                font-size: 20px;
            }
            .box_SelectDate {
                width: auto;
                height: auto;
                padding: 0px 0px 0px 10px;
                text-align: center;
                input {
                    width: 100%;
                    height: 40px;
                    border-radius: 10px;
                    border: solid 1px black;
                }
                .text {
                    font-size: 20px;
                    padding: 5px 0px;
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
            }
        }
        .line {
            width: 0.5%;
            border: solid 5px gray;
            border-radius: 50px;
            margin: 0px 3%;
            background-color: gray;
        }
        .searchName_TypeLeave {
            width: 40%;
            .departmentAndName {
                width: 100%;
                height: 40px;
                display: flex;
                margin-bottom: 10px;
                select {
                    font-size: 16px;
                    width: auto;
                    background-color: rgb(179, 179, 179);
                    border-radius: 5px 0px 0px 5px; 
                }
                input {
                    padding-left: 10px;
                    width: 100%;
                    border-radius: 0px 10px 10px 0px;
                    border: gray 1px solid;
                }
            }
            .position {
                height: 40px;
                width: fit-content;
                display: flex;
                border-radius: 5px;
                border: solid 1px gray;
                background-color: rgb(179, 179, 179);
                padding: 4px;
                align-items: center;
                margin-bottom: 10px;
                .text-Position {
                    font-size: 16px;
                    width: auto;
                    margin-right: 5px;
                }
                .box_btn_leave{
                    width: 140px;
                    height: auto;
                    margin-right: 5px;
                    //-- 
                    .personal_leave_btn, .sick_leave_btn, .vacation_leave_btn,
                    .personal_leave_btn_select, .sick_leave_btn_select, .vacation_leave_btn_select{
                        display: flex;
                        width: auto;
                        height: 100%;
                        border-radius: 20px;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
                        .text{
                            width: 100%;
                            height: 100%;
                            font-weight: 300;
                            // padding: 5%;
                            text-align: center;
                            color: gray;
                        }
                    }
                    //-- not select
                    .personal_leave_btn, .sick_leave_btn, .vacation_leave_btn{
                        background-color: #fff;
                        border-radius: 20px;
                        border: solid black 1px;
                        cursor: pointer;
                    }
                    .personal_leave_btn:hover, .sick_leave_btn:hover, .vacation_leave_btn:hover{
                        opacity: 0.5;
                    }

                    //-- select
                    .personal_leave_btn_select, .sick_leave_btn_select, .vacation_leave_btn_select{
                        .text{ 
                            // background-color: #eee;
                            color: blue;
                            width: 100%;
                            border-radius: 20px;
                            border: solid blue 1px;
                            background-color: white;
                        }
                    }
                }
            }
            .typeLeave {
                height: 40px;
                width: fit-content;
                display: flex;
                border-radius: 5px;
                border: solid 1px gray;
                background-color: white;
                padding: 4px;
                align-items: center;
                .text-TypeLeave {
                    font-size: 16px;
                    width: auto;
                    margin-right: 5px;
                }
                .box_btn_leave{
                    width: 140px;
                    height: auto;
                    margin-right: 5px;
                    //-- 
                    .personal_leave_btn,
                    .personal_leave_btn_select{
                        display: flex;
                        width: auto;
                        height: 100%;
                        border-radius: 20px;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
                        .text{
                            width: 100%;
                            height: 100%;
                            font-weight: 300;
                            // padding: 5%;
                            text-align: center;
                            color: #4C86B8;
                        }
                    }
                    .sick_leave_btn, .vacation_leave_btn,
                    .sick_leave_btn_select, .vacation_leave_btn_select{
                        display: flex;
                        width: auto;
                        height: 100%;
                        border-radius: 20px;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
                        .text{
                            width: 100%;
                            height: 100%;
                            font-weight: 300;
                            // padding: 5%;
                            text-align: center;
                            color: #B84C4C;
                        }
                    }
                    .vacation_leave_btn,
                    .vacation_leave_btn_select{
                        display: flex;
                        width: auto;
                        height: 100%;
                        border-radius: 20px;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
                        .text{
                            width: 100%;
                            height: 100%;
                            font-weight: 300;
                            // padding: 5%;
                            text-align: center;
                            color: #F97111;
                        }
                    }
                    //-- not select
                    .personal_leave_btn, .sick_leave_btn, .vacation_leave_btn{
                        background-color: #fff;
                        border-radius: 20px;
                        border: solid black 1px;
                        cursor: pointer;
                    }
                    .personal_leave_btn:hover, .sick_leave_btn:hover, .vacation_leave_btn:hover{
                        opacity: 0.5;
                    }

                    //-- select
                    .personal_leave_btn_select{
                        .text{ 
                            background-color: #0F4C81;
                            color: #fff;
                            width: 100%;
                            border-radius: 20px;
                            border: solid black 1px;
                        }
                    }
                    .sick_leave_btn_select{
                        .text{ 
                            background-color: #B84C4C;
                            color: #fff;
                            width: 100%;
                            border-radius: 20px;
                            border: solid black 1px;
                        }
                    }
                    .vacation_leave_btn_select{
                        .text{ 
                            background-color: #F97111;
                            color: #fff;
                            width: 100%;
                            border-radius: 20px;
                            border: solid black 1px;
                        }
                    }
                }
            }
            
        }
        button {
            width: auto;
            height: 100%;
            background-color: #0F4C81;
            border: 0px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            margin-left: 10px;
            i {
                font-size: 50px;
                color: white;
            }
        }
    }
</style>