<template>
  <div class="form-request-wrapper">
    <div v-if="showCard.length > 0" class="content_form">
      <div v-bind:class="{ customContent: statusShow, box_content: !statusShow }"></div>
      <div class="search">
        <btnsearch @returnUserId="searchName" />
      </div>
      <div>
        <filterhistory @startdate="getStartDate" @enddate="getEndDate" />
      </div>
      <!-- <div v-for="(datalistmonth , idx) in dataDate" :key="idx">
        {{datalistmonth.start}}   {{datalistmonth.end}}
      </div> -->
      <!-- <button v-on:click="dateRange()">click</button> -->
      <div v-if="showCard.length > 0">
        <div v-for="(year,indexyear) in showCard" :key="indexyear">
          <div v-for="(month,indexmonth) in showCard[indexyear].list_month" :key="indexmonth">
            <Month
              :year="year.year"
              :datamonth="month"
              :indexmonth="indexmonth"
              :indexyear="indexyear"
              page="searchhistory"
              @clickcard="cardAdmin"
            />
          </div>
        </div>
      </div>
      <div class="No_Data" v-else>Data not found</div>
    </div>
    <div class="page_loading" v-else>
      <LoadingPage/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BarComfrim from "../../components/BarComfrim";
import LoadingPage from "../../components/LoadingPage"
import CardRequest from "../../components/CardRequest/CardRequest";
import filterhistory from "../../components/filterhistory";
import btnsearch from "../../components/BtnSearch";
import Month from "../../components/Month";
import Provider from "../../service/provider";
import moment from "moment";

const provider = new Provider();
export default {
  components: {
    CardRequest,
    BarComfrim,
    filterhistory,
    btnsearch,
    LoadingPage,
    Month,
  },
  data() {
    return {
      statusLoad: true,
      statusShow: false,
      search: {
        userid: "",
        startdate: '',
        enddate: ''
      },
      found: false,
      api: provider,
      rendered: true,
      loading: false,
    };
  },
  mounted() {
    this.$store.commit('menu/setStatusSelectByLoadURL',{mainPath : 'superadmin',subPath : 'search-history'})
    this.createNowMonth();
    this.allnameuser();
  },
  methods: {
    moment,
    testBtn(event) {
      if (this.statusShow === true) {
        this.statusShow = false;
      } else {
        this.statusShow = true;
      }
    },
    searchName(userId) {
      this.search.userid = userId
      // console.log("TEST => ",this.search)
      this.searchAuto()
    },
    getStartDate(startdate) {
      this.search.startdate = startdate;
    //   console.log('startdate => ',this.search.startdate)
    },
    getEndDate(enddate) {
      this.search.enddate = enddate;
    //   console.log('startdate => ',this.search.enddate)
    },

    searchAuto() {
      let result = this.api.historyall(this.search);
      result.then(re => {
        console.log('LogdatasearchformStore =>',re)
        this.$store.commit('leaveHistory/setHistoryAllBySearch', re)
      });
    },

    allnameuser(){
        let result = this.api.getqueryUsers();
            result.then(re => {
            this.$store.commit('leaveHistory/setSearchListName', re)
        });
    },
    
    createNowMonth() {
      let nowDate = new Date();
      let indexMonth = nowDate.getMonth();
      let year = nowDate.getFullYear();
      let fullDayOfMonth = this.getDaysInMonth(indexMonth, year);
     
      let startDate = new Date(); //-- nowDate => 2020-01-24
      startDate.setDate(1); //-- nowDate => 2020-01-01
      let endDate = new Date();
      endDate.setDate(fullDayOfMonth);
      let textmonthnow = new Date();
      textmonthnow.setDate(fullDayOfMonth);

      this.search = {
        userid: "",
        startdate: moment(startDate).format("YYYY-MM-DD"),
        enddate: moment(endDate).format("YYYY-MM-DD"),
        // startdate: moment(startDate).format("YYYY-MM-DD"),
        // enddate: moment(endDate).format("YYYY-MM-DD"),
        // textmonthnow: moment(textmonthnow).format("MMMM YYYY"),
      };
      console.log('search => ',this.search)
      // this.dataDate = {
      //   textmonthnow: moment(textmonthnow).format("MMMM YYYY"),
      // } 
      //   console.log('date =>',this.dataDate);
      this.searchAuto();
    },
    getDaysInMonth(month, year) {
      let date = new Date(year, month, 1);
      let days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days.length;
    },
    cardAdmin(model){
      let iduser = model
      console.log("iduser",iduser)
      this.$store.commit('leaveHistory/setCardAdmin', iduser)
      if (iduser) {
        this.$store.commit('navbarBack/showNavbarBack')
        this.$router.push(this.pathDefult+'history-select')
      }
      
    }
   
  },
  computed: {
      ...mapState({
          showCard: state => state.leaveHistory.history_search,
          linkpage: state => state.leaveHistory.cardAdmin,
          pathDefult: state => state.pathDefult.path,
          icon: state => state.navbarBack.iconBack,
          manu: state => state.navbarBack.showmanu,
      })
  },
};
</script>
<style lang="scss" scoped>
.form-request-wrapper {
  width: 100%;
  height: 100%;
}
.search {
  padding: 20px;
  justify-content: center;
  display: flex;
  padding-top: 40px;
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
.No_Data {
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
}
.page_loading{
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>