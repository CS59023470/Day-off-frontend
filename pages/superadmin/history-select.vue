<template>
  <div class="Box-Home">
    <div v-if="dataHistory !== null">
    <div class="Heads">
      <div class="Heads-Content">
        <CardHeaderInHistory
          :sizePersonal="totalDataLaveShow.sizePersonal"
          :sizeSick="totalDataLaveShow.sizeSick"
          :sizeVacation="totalDataLaveShow.sizeVacation"
          :dataInHeader = "linkpage"
          page="history-select"
        />
        <div v-if="dataHistory !== null" class="Select-Year">
          <select
            name="selectYear"
            @change="selectDropdownYear"
            v-model="yearAtSelect"
          >
            <option
              :value="year"
              v-for="(year, idx) in craeteListYear"
              :key="idx"
              >{{ year }}</option
            >
          </select>
        </div>
      </div>
    </div>
    <BarComfrim
      v-if="yearAtSelect !== null"
      textmenuleft="Personal Leave"
      textmenumiddle="Sick Leave"
      textmenuright="Vacation Leave"
      :sizePersonal="totalDataLaveShow.sizePersonal"
      :sizeSick="totalDataLaveShow.sizeSick"
      :sizeVacation="totalDataLaveShow.sizeVacation"
      @eventClick="eventClick"
    />
    <div v-if="data_prop_month.data !== null" class="HistoryOfMonth">
      <div class="not-found" v-if="loopmount.length === 0">
        Data not found
    </div>
      <div v-else>
        <div v-for="(loop, idx) in loopmount" :key="idx">
          <Month
            :showmonth="loop"
            :year="yearAtSelect"
            :statusUser="linkpage.statusWorking"
            :indexmonth="idx"
            page="history"
            @popupDetail="showPopupDetail"
          />
        </div>
      </div>
    </div>
    
    <PopupDetail v-if="popupDetail" :datashow="propsToPopup" />
    </div>
    <div v-else class="layout_loading">
        <LoadingPage/>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import PopupDetail from "../../components/Popup/PopupDetail";
import LoadingPage from "../../components/LoadingPage"
import CardHeaderInHistory from "../../components/CardHeaderInHistory";
import BarComfrim from "../../components/BarComfrim";
import Month from "../../components/Month";
import Provider from "../../service/provider";
const provider = new Provider();
export default {
  components: {
    CardHeaderInHistory,
    Month,
    BarComfrim,
    PopupDetail,
    LoadingPage
  },
  data() {
    return {
      dataHistory: null,
      typeLeave: null,
      data_prop_month: {
        data: null,
        statusUser: null
      },
      api: provider,
      yearAtSelect: null,
      totalDataLaveShow: {
        sizePersonal: 0,
        sizeSick: 0,
        sizeVacation: 0
      },

      loopmount: [],
      indexselect: null,
      propsToPopup: null
    };
  },
  mounted() {
    this.queryMyLeave();

    // console.log('123456789', this.linkpage);
  },

  methods: {
    queryMyLeave() {
      let result = this.api.getHistoryLeaveByUserId(this.linkpage.userId);
      result.then(re => {
        this.dataHistory = re;
        this.yearAtSelect = new Date().getFullYear();
        this.selectDropdownYear();
      });
    },
    selectDropdownYear() {
      this.dataHistory.forEach((myHistory, i) => {
        if (this.yearAtSelect == myHistory.year) {
          this.indexselect = i;
          this.totalDataLaveShow.sizePersonal = myHistory.totalPersonalLeave;
          this.totalDataLaveShow.sizeSick = myHistory.totalSickLeave;
          this.totalDataLaveShow.sizeVacation = myHistory.totalVacation;
          this.data_prop_month.data = myHistory;
        }
      });
      this.loopmount = this.dataHistory[
          this.indexselect
        ].listLeaveFullYear.listPersonalLeave;
    },
    eventClick(event) {
      if (event === "personal") {
        this.loopmount = this.dataHistory[
          this.indexselect
        ].listLeaveFullYear.listPersonalLeave;
        //this.typeLeave = myHistory.listLeaveFullYear.listPersonalLeave
      } else if (event === "sick") {
        //this.typeLeave = myHistory.listLeaveFullYear.listSickLeave
        this.loopmount = this.dataHistory[
          this.indexselect
        ].listLeaveFullYear.listSickLeave;
      } else {
        //this.typeLeave = myHistory.listLeaveFullYear.listVacationLeave
        this.loopmount = this.dataHistory[
          this.indexselect
        ].listLeaveFullYear.listVacationLeave;
      }
    },
    showPopupDetail(data) {
      let data_DB = this.loopmount[data.indexmonth].listLeave[data.indexcard];
      let model = {
        userName: null,
        startDate: data_DB.startdate,
        startTime: data_DB.starttime,
        endDate: data_DB.enddate,
        endTime: data_DB.endtime,
        type: data_DB.type,
        detail: data_DB.detailleave,
        email: null,
        admin_approve: "",
        statusUser: this.data_prop_month.statusUser
      };
      if (data_DB.type === "Sick Leave") {
        model.admin_approve = "System";
      } else {
        model.admin_approve = data_DB.admin_approve.name;
      }
      this.propsToPopup = model;
      this.$store.commit("popup/showPopupDetail");
    }
  },
  computed: {
    ...mapState({
      popupDetail: state => state.popup.popup_detail,
      linkpage: state => state.leaveHistory.cardAdmin,
    }),
    craeteListYear() {
      let listYear = [];
      this.dataHistory.forEach(myHistory => {
        listYear.push(myHistory.year);
      });
      return listYear;
    }
  }
};
</script>
<style lang="scss">
.Box-Home {
  width: 100%;
  height: auto;
  .Heads {
    width: 100%;
    height: auto;
    .Heads-Content {
      display: flex;
      justify-content: space-between;
      .Select-Year {
        width: 100px;
        padding: 25px 20px;
        height: auto;
        justify-content: flex-end;
        display: flex;
        align-items: flex-end;
        select {
          border: solid black 1px;
          color: gray;
        }
      }
    }
  }
  .HistoryOfMonth {
    background-color: #f0f0f0;
    height: auto;
  }
}
.not-found{
    display: flex;
    justify-content: center;
    margin-top: 100px;
    color: #858585;
}
.layout_loading{
        background-color: #fff;
        margin-top: 23%;
        width: 100%;
        height: 100%;
    }
</style>
