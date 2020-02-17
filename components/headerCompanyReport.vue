<template>
    <div class="page">
        <div class="selectDate">
            <div class="text">Absent Since</div>
            <div class="box_SelectDate">
                <input type="date" value="DD-MM-YYYY" v-model="startdate" :max="enddate" v-on:change="inputStartDate()" class="unstyled"/>
                <div class="text">To</div>
                <input type="date" value="DD-MM-YYYY" v-model="enddate" :min="startdate" v-on:change="inputEndDate()" class="unstyled">
            </div>
        </div>
        <div class="line"></div>
        <div class="searchName_TypeLeave">
            <div class="departmentAndName">
                <select name="" id="">
                    <option value="">Department</option>
                    <option value="">Developer</option>
                    <option value="">Margetting</option>
                </select>
                <input type="text" v-model="name" placeholder="Search Name" @keyup="createListName">
            </div>
            <div class="position">
                <div class="text">Position : </div>
                <div class="back_end">Back-End</div>
                <div class="front_end">Front-End</div>
                <div class="designer">UX/UI Designer</div>
            </div>
            <div class="typeLeave">
                <div class="text">Type Of Leave :</div>
                <div class="personalLeave">Personal Leave</div>
                <div class="sickLeave">Sick Leave</div>
                <div class="vacationLeave">Vacation Leave</div>
            </div>
        </div>
        <button>
            <i class="material-icons" v-on:click="input()">search </i>
        </button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      startdate: "",
      enddate: "",
      name: "",
    };
  },
  methods: {
    inputStartDate() {
    //   this.$emit("startdate", this.startdate);
    },
    inputEndDate() {
    //   this.$emit("enddate", this.enddate);
    },
    createListName() {
    //   this.statusGroup = false
    //   this.listname = []
    //   this.listNameUser.forEach(element => {
    //     if(element.name.includes(this.name)){
    //       this.listname.push(element)
    //     }
    //   });
    },
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
                margin-bottom: 10px;
                border-radius: 5px;
                background-color: rgb(179, 179, 179);
                padding: 4px;
                align-items: center;
                .text {
                    font-size: 16px;
                }
                .back_end {
                    background-color: white;
                    padding: 0px 5px;   
                    margin: 0px 5px;
                    border-radius: 20px;
                }
                .front_end {
                    background-color: white;
                    padding: 0px 5px;   
                    margin: 0px 5px;
                    border-radius: 20px;
                }
                .designer {
                    background-color: white;
                    padding: 0px 5px;   
                    margin: 0px 5px;
                    border-radius: 20px;
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
                .text {
                    font-size: 16px;
                }
                .personalLeave {
                    color: blue;
                    background-color: white;
                    border: solid 1px gray;
                    padding: 0px 5px;   
                    margin: 0px 5px;
                    border-radius: 20px;
                }
                .sickLeave {
                    color: red;
                    background-color: white;
                    border: solid 1px gray;
                    padding: 0px 5px;   
                    margin: 0px 5px;
                    border-radius: 20px;
                }
                .vacationLeave {
                    color: orange;
                    background-color: white;
                    border: solid 1px gray;
                    padding: 0px 5px;   
                    margin: 0px 5px;
                    border-radius: 20px;
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
</style>