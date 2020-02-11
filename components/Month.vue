<template>
    <div>
        <fieldset>
            <div class="LineMonth">
                <div style= "height: auto; width: 100%">
                    <div v-if="page === 'history'" class="ColorLineMonth" style="position: absolute,height: 100px">
                        <legend>{{showmonth.nameMonth}} {{year}}</legend>
                    </div>
                    <div v-else class="ColorLineMonth" style="position: absolute,height: 100px">
                        <legend>{{datamonth.name}} {{year}}</legend>
                    </div>
                </div>
                
                <div style= "height: auto, display:flex">
                    <div class="BoxCard" v-if="page === 'history'">
                         <div class="Card"  v-for="(leave, idx) in showmonth.listLeave" :key="idx">
                            <CardHistory
                            :detailCard="leave" 
                            :status="statusUser"
                            :indexcard="idx"
                            @eventShowDetail="clickPopup"
                            />
                        </div>
                    </div> 
                    <div class="BoxCard"  v-if="page === 'searchhistory'">
                        <div class="Card" v-for="(datacard, idx) in datamonth.data" :key="idx">
                            <CardInAdminHistory 
                                :dataUser="datacard.user"
                                :indexCard="idx"
                                @cardadmin="topathHistory"
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>
<script>

import CardHistory from "../components/CardHistory";
import CardInAdminHistory from "../components/CardInAdminHistory";
import { mapState } from 'vuex'
export default {
    props:["showmonth","year","page", "statusUser","indexmonth","indexyear","datamonth","cardSearch","detailCard"],
    components: {
        CardHistory,
        CardInAdminHistory,
    },
    data() {
        return{
            path:'',
            month : [],
            nowDate : new Date(),
        }
    },
    mounted(){ 
        this.path = this.$route.name
    },
    methods:{
        topathHistory(user){
            this.$emit('clickcard',user)
        },
        clickPopup(indexcard){
            let model ={
                indexcard:indexcard,
                indexmonth:this.$props.indexmonth
            }
             this.$emit('popupDetail',model)
        }
    },
    computed:{
        ...mapState({
            pathDefult: state => state.pathDefult.path,
            popupDetail: state => state.popup.popup_detail,
        }),
        MonthNow(){
            return this.month[this.nowDate.getMonth()]
        },
        YearNow(){
            return this.nowDate.getFullYear()
        },
    },    
}
</script>
<style lang="scss">
    $colorlinemonth:#858585;
    fieldset{
        border-bottom: 0px;
        border-left: 0px;
        border-right: 0px;
        color:$colorlinemonth;
        border: none;
        background-color: #f0f0f0;
        .LineMonth {
            width: 100%;
            height: auto;
            .ColorLineMonth {
                width: 100%;
                height: 10px;
                border-top: black 1px solid;
                margin-top: 50px; 
                padding-bottom: 10px;
            }
            legend{
                margin-top: -22px;
                background-color: #f0f0f0;
                color: $colorlinemonth;
                text-align: center;     
                height: 50px;
                width: fit-content;
                font-size: 30px;
                margin-left: 3%; 
            }
        }
        
    }

    .BoxCard {
        padding: 20px 3% 20px 3%;
        height: auto;
        background-color:transparent;
        width: fit-content;
        display: flex;
        flex-wrap: wrap;
        .Card {
            height: auto; 
            width: 325px; 
            display:flex;
        }
    }
</style>