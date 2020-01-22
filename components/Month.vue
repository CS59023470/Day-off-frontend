<template>
    <div>
        <fieldset>
            <div class="LineMonth" v-for="(dataYear, idx) in showmonth" :key="idx">
                <div style= "height: auto; width: 100%">
                    <div class="ColorLineMonth" style="position: absolute,height: 100px">
                        <legend>{{dataYear.nameMonth}} {{year}}</legend>
                    </div>
                </div>
                
                <div style= "height: auto">
                    <div class="BoxCard">
                        
                        <div style= "height: auto,widgt: 500px" v-if="page === 'history'">
                            <CardHistory
                            :DetalCard="dataYear.listLeave" 
                            :status='status'/>
                        </div> 
                        <div @click="topathHistory" v-else>
                            <CardInAdminHistory />
                        </div>
                        <div >
                            <CardHistory />
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
    props:['listMonth','showmonth','year','page','status'],
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
        console.log("TEST MONTH => ",this.$props.page)
        this.path = this.$route.name
    },
    methods:{
        topathHistory(){
            this.$router.push(this.pathDefult+'history')
        }
    },
    computed:{
        ...mapState({pathDefult: state => state.pathDefult.path,}),
        MonthNow(){
            return this.month[this.nowDate.getMonth()]
        },
        YearNow(){
            return this.nowDate.getFullYear()
        }
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
                width: 250px;
                font-size: 30px;
                margin-left: 3%; 
            }
        }
        
    }

    .BoxCard {
        padding: 20px 3% 20px 3%;
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        background-color:transparent;
        a {
            text-decoration: none;
        }
    }
</style>