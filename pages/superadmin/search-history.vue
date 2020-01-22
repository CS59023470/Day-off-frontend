<template>
<div class="form-request-wrapper">
    <div class="content_form">
        <div v-bind:class="{ customContent: statusShow, box_content: !statusShow }">
          <div class="box-menu">
          <BarComfrim
            textmenuleft="พนักงาน"
            textmenuright="ฝึกงาน"
            @eventClick="eventClick"
          />
        </div>
      </div>
       <div class="search">
        <btnsearch />
      </div>

      <div>
        <filterhistory />
      </div>
      <div>
        <Month
        :listMonth="null"
        :showmonth="null"
        :year ="null"
        page="search"/>
      </div>

    </div>
</div>
    
</template>
<script>
import BarComfrim from "../../components/BarComfrim";
import CardRequest from "../../components/CardRequest/CardRequest";
import filterhistory from "../../components/filterhistory";
import btnsearch from "../../components/BtnSearch";
import Month from "../../components/Month";
import Provider from '../../service/provider'
const provider = new Provider()

export default {    
    components: {
      CardRequest,
      BarComfrim,
      filterhistory,
      btnsearch,
      Month,
    },
    data(){
        return{
            statusLoad : true,
            statusShow: false,
            search: {
                userid:'',
                startdate:'2020-01-01',
                enddate:'2020-01-20'
            },
            api : provider,
            // statusLeave : 0,
            // listdata : {},
            // cardSelect : {},

            // detailCard : null
        }
    },
    mounted(){
        
        //this.searchAuto()
    },
    methods:{
        testBtn(event){
            if(this.statusShow === true){
                this.statusShow = false
            }else{
                this.statusShow = true
            }
        },
        createTypeUser(status){
            switch(status){
                case 'Full Time' : return true
                case 'Intern' : return false
                default: return null
            }
        },
        eventClick(event){
            this.listdata = []
            if(event === 'PersonalLeave'){
                this.statusLeave = 0
                let result = this.api.getAllPersonalLeave()
                result.then(data => {
                    this.listdata = data;
                    this.statusLoad = false;
                })
            }else{
                this.statusLeave = 1
                let result = this.api.getAllSickLeave()
                result.then(data => {
                    this.listdata = data;
                    this.statusLoad = false;
                })
            }
        },
        eventStatusAllow(opj_event){

            this.cardSelect = opj_event

            if(opj_event.status === true){
                this.$modal.toggle('comfrim')
            }else{
                this.$modal.toggle('notcomfrim')
            }

        },
        popdetial(index){
            this.detailCard = this.listdata[index]
            this.$modal.show('detailintrun')
            //this.$modal.hide('detailintrun')
        },
        statusConfirm(status){
            if(status === true){
                /*let result = this.api.updatePersonalLeave(this.cardSelect)
                result.then(re => {
                    if(re.status === true){
                         alert(re.text)
                         window.location.reload()
                    }else if(re.status === false){
                         alert(re.text)
                    }else{
                        alert(re.text)
                    }
                })*/
            }else{
                this.$modal.hide('comfrim')
            }
        },
        statusReject(status){
            if(status === true){
                /*let result = this.api.removePersonalLeave(this.cardSelect)
                result.then(re => {
                    if(re.status === true){
                         alert(re.text)
                         window.location.reload()
                    }else if(re.status === false){
                         alert(re.text)
                    }else{
                         alert(re.text)
                    }
                })*/
            }else{
                this.$modal.hide('notcomfrim')
            }
        },
        searchAuto(){
            let result = this.api.getSearchHistory(this.search)    
             result.then(re => {
                 
                 console.log(re)
                    // if(re.status === true){
                    //      alert(re.text)
                    // }else if(re.status === false){
                    //      alert(re.text)
                    // }else{
                    //      alert(re.text)
                    // }
             })
        }
    }
    
}
</script>
<style lang="scss" scoped>
.form-request-wrapper{
    width: 100%;
    height: 100%;
}
.search{
    padding: 20px;
    justify-content: center;
    display: flex;
    // padding-top: 70px;
}

.BoxFilter {
    display: flex;
    justify-content: center;
}
.unstyled::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
}

</style>