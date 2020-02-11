<template>
    <div class="layout_menu_leave">
        <div
            class="box_btn_leave content_center"
            v-for="(list, index) in getListLeave"
            :key="index"
        >
            <div
                v-if="menuSelect !== index"
                :class="list.class"
                @click="selectType(list.value)"
            >
                <div class="icon content_center">
                    <i class="material-icons">{{list.icon}}</i>
                </div>
                <div class="text content_center">
                    {{list.text}}
                </div>
                <div class="count centent_left">
                    <div class="count_show content_center">{{list.size}}</div>
                </div>
            </div>
            <div 
                v-else
                :class="`${list.class}_select`"
            >
                <div class="icon content_center">
                    <i class="material-icons">{{list.icon}}</i>
                </div>
                <div class="text content_center">
                    {{list.text}}
                </div>
                <div class="count centent_left">
                    <div class="count_show content_center">{{list.size}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["sizePersonal", "sizeSick", "sizeVacation", "status"],
    data(){
        return{
            menuSelect: null,
            listBtn: [
                { text: 'Personal Leave', class: 'personal_leave_btn', icon: 'work_outline', value: 'personal_leave', size: 0 },
                { text: 'Sick Leave', class: 'sick_leave_btn', icon: 'local_hospital', value: 'sick_leave', size: 0 },
                { text: 'Vacation Leave', class: 'vacation_leave_btn', icon: 'commute', value: 'vacation_leave', size: 0 }
            ]
        }
    },
    mounted(){
        this.menuSelect = 0
        this.returnDataTypeSelect()
    },
    methods: {
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
        }
    },
    computed: {
        getListLeave(){
            this.listBtn[0].size = this.$props.sizePersonal
            this.listBtn[1].size = this.$props.sizeSick
            this.listBtn[2].size = this.$props.sizeVacation
            return this.listBtn
        }
    }
}
</script>
<style lang="scss" scoped>
.layout_menu_leave{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 8%;

    .box_btn_leave{
        width: 100%;
        height: 100%;

        //-- 
        .personal_leave_btn, .sick_leave_btn, .vacation_leave_btn,
        .personal_leave_btn_select, .sick_leave_btn_select, .vacation_leave_btn_select{
            display: flex;
            width: 80%;
            height: 100%;
            border-radius: 5px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
            .icon{
                width: 20%;
                height: 100%;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                color: #fff;
            }
            .text{
                width: 65%;
                height: 100%;
                font-weight: 300;
            }
            .count{
                width: 15%;
                height: 100%;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                .count_show{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    font-size: 12px;
                    font-weight: 300;
                }
            }
        }

        .personal_leave_btn, .personal_leave_btn_select{
            .icon{
                background-color: #4C86B8;
            }
        }
        .sick_leave_btn, .sick_leave_btn_select{
            .icon{
                background-color: #FF9797;
            }
        }
        .vacation_leave_btn, .vacation_leave_btn_select{
            .icon{
                background-color: #FFB987;
            }
        }

        //-- not select
        .personal_leave_btn, .sick_leave_btn, .vacation_leave_btn{
            background-color: #fff;
            cursor: pointer;
            .count{
                .count_show{
                    background-color: #858585;
                    color: #fff;
                }
            }
        }
        .personal_leave_btn:hover, .sick_leave_btn:hover, .vacation_leave_btn:hover{
            opacity: 0.5;
        }

        //-- select
        .personal_leave_btn_select{
            .text{ 
                background-color: #0F4C81;
                color: #fff;
            }
            .count{
                background-color: #0F4C81;
                .count_show{
                    background-color: #fff;
                    color: #0F4C81;
                }
            }
        }
        .sick_leave_btn_select{
            .text{ 
                background-color: #B84C4C;
                color: #fff;
            }
            .count{
                background-color: #B84C4C;
                .count_show{
                    background-color: #fff;
                    color: #B84C4C;
                }
            }
        }
        .vacation_leave_btn_select{
            .text{ 
                background-color: #F97111;
                color: #fff;
            }
            .count{
                background-color: #F97111;
                .count_show{
                    background-color: #fff;
                    color: #F97111;
                }
            }
        }
    }
}
</style>