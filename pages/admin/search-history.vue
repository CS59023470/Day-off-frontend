<template>
  <div class="form-request-wrapper">
    <div class="content_form">
      <div v-bind:class="{ customContent: statusShow, box_content: !statusShow }"></div>
      <div class="search">
        <btnsearch @name="searchName" />
      </div>

      <div>
        <filterhistory @startdate="getStartDate" @enddate="getEndDate" />
      </div>
      <div v-if="rendered">
        <Month
          :listMonth="null"
          :showmonth="null"
          :year="null"
          :datamonth="search.textmonthnow"
          :detailCard="showCard"
          page="searchhistory"
        />
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
import Provider from "../../service/provider";
import moment from "moment";

const provider = new Provider();

export default {
  components: {
    CardRequest,
    BarComfrim,
    filterhistory,
    btnsearch,
    Month,
  },
  data() {
    return {
      statusLoad: true,
      statusShow: false,
      search: {
        userid: "",
        startdate: "",
        enddate: "",
        textmonthnow: ""
      },
      found: false,
      api: provider,
      showCard: [],
      rendered: true,
      loading: false

      // statusLeave : 0,
      // listdata : {},
      // cardSelect : {},

      // detailCard : null
    };
  },
  mounted() {
    this.createNowMonth();
    this.searchAuto();
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
    searchName(name) {
      this.rendered = false;
      this.found = false;
      this.loading = true;
      let nowDate = new Date(this.search.startdate);
      let indexMonth = nowDate.getMonth();
      let year = nowDate.getFullYear();
      let fullDayOfMonth = this.getDaysInMonth(indexMonth, year);
      let textmonthnow = new Date(this.search.startdate);
      textmonthnow.setDate(fullDayOfMonth);
      this.search.textmonthnow = moment(textmonthnow).format("MMMM YYYY");
      this.search.userid = name;

      if (this.search.userid != "") {
        this.api.getAllUser().then(res => {
          res.forEach(ele => {
            if (ele.name == name) {
              this.search.userid = ele.userId;
              this.found = true;
              if (this.found) {
                let result = this.api.historyall(this.search);
                result.then(re => {
                  this.showCard = re.map(data => {
                    let model = {
                      id: data.id,
                      name: data.name,
                      statusUser: data.typeUser
                    };
                    return model;
                  });
                });
              }
            }
          });
          if (!this.found) {
            alert("No user found!");
          }
        });
      }
      if (this.search.userid == "") {
        let result = this.api.historyall(this.search);
        result.then(re => {
          this.showCard = re.map(data => {
            let model = {
              id: data.id,
              name: data.name,
              statusUser: data.typeUser
            };
            return model;
          });
        });
      }
      this.loading = false;
      this.rendered = true;
      //   console.log(this.search);
    },
    getStartDate(startdate) {
      this.search.startdate = startdate;
    },
    getEndDate(enddate) {
      this.search.enddate = enddate;
    },

    searchAuto() {
      let result = this.api.historyall(this.search);
      result.then(re => {
        this.showCard = re.map(data => {
          let model = {
            id: data.id,
            name: data.name,
            statusUser: data.typeUser
          };
          return model;
        });
        //  console.log('31256487 ==',this.showCard)
        // if(re.status === true){
        //      alert(re.text)
        // }else if(re.status === false){
        //      alert(re.text)
        // }else{
        //      alert(re.text)
        // }
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
        textmonthnow: moment(textmonthnow).format("MMMM YYYY")
      };
      //   console.log(this.search);
    },
    getDaysInMonth(month, year) {
      let date = new Date(year, month, 1);
      let days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days.length;
    }
  }
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