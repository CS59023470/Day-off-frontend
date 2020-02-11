<template>
    <div class="layout-color-wrapper centent_right">
        <div class="content-color display_row">
            <div class="color" :style="`background-color: ${keyColor.color_Holiday}`"></div>
            <div class="textcolor">Holiday</div> 
            <div class="color" :style="`background-color: ${keyColor.color_personal_leave}`"></div>
            <div class="textcolor">Personal Leave</div> 
            <div class="color" :style="`background-color: ${keyColor.color_sick_leave}`"></div>
            <div class="textcolor">Sick Leave</div> 
            <div class="color" :style="`background-color: ${keyColor.color_vacation_leave}`"></div>
            <div class="textcolor">Vacation Leave</div> 
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({ keyColor: state => state.calendar.keyColorCalendar })
    },
    
}
</script>
<style lang="scss" scoped>
.layout-color-wrapper{
    width: 100%;
    height: 100%;
    padding: 0px 2%; 
}
.color{
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-left: 20px;
}
.textcolor{
    font-family: roboto;
}
</style>