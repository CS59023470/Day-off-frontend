<template>
     <div class="home-wrapper display_row">
        <div class="layout-calendar">
            <div class="content-color-title">
                <ColorTitle/>
            </div>
            <div id="box-calendar" class="content-calendar">
                <Calendar 
                    v-if="controCalendar.height !== 0"
                    :contro="controCalendar"
                /> 
            </div>
        </div>
    </div>
</template>
<script>
import Calendar from "../../components/Calendar/Calendar";
import ColorTitle from "../../components/Calendar/ColorTitle";
export default {
    components: {
       Calendar,
       ColorTitle
    },
       data(){
        return{
            controCalendar: { height: 0 }
        }
    },
    mounted(){
        this.controCalendar.height = document.getElementById("box-calendar").offsetHeight
    },
}
</script>

</script>
<style lang="scss">
$heightFull: 100%;
$widthFull: 100%;
$heightColorTitle: 6%;
$heightCalendar: $heightFull - $heightColorTitle;

.home-wrapper{
    width: $widthFull;
    height: $heightFull;
    overflow: hidden;

    .layout-calendar{
        width: $widthFull;
        height: $heightFull;
        
        .content-color-title{
            width: $widthFull;
            height: $heightColorTitle;
        }

        .content-calendar{
            width: $widthFull;
            height: $heightCalendar;
        }
    }
}
</style>