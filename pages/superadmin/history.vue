<template>
  <div class="layout_history_wrapper">
    <div v-if="dataHistory === null" class="layout_loading_history">
        <LoadingPage/>
    </div>
    <div v-else-if="dataHistory === 'Not_Data'" class="layout_loading_history content_center">
        <div class="box_not_found">
            <div class="icon_not_found content_center">
                <i class="material-icons">cloud_off</i>
            </div>
            <div class="text_not_found content_center">You do not have leave history</div>
        </div>
    </div>
    <div v-else class="layout_full_content">
      <div class="layout_header_history">
        <div class="layout_user_profile content_center">
          <ProfileUser
            :year="yearSelect"
            :status="data_prop_profile_user.status"
            :user="data_prop_profile_user.dataUser"
            :total="data_prop_profile_user.totalLeave"        
          />
        </div>
        <div class="layout_filter_data">
          <div class="filter_year">
            <FilterYear
              :list_year="data_prop_year"
              :sizeYear="data_prop_year.length"
              @returnYear="setYearSelect"
            />
          </div>
          <div class="filter_type_leave">
            <MenuLeave
              :sizePersonal="totalDataLaveShow.sizePersonal"
              :sizeSick="totalDataLaveShow.sizeSick"
              :sizeVacation="totalDataLaveShow.sizeVacation"
              @returnTypeLeave="setTypeSelect"
            />
          </div>
        </div>
      </div>
      <div class="layout_content_card">
        <div
          v-if="data_prop_month.data === null || data_prop_month.data.length === 0"
          class="content_card_not_found content_center"
        >
          <div class="box_not_found">
            <div class="icon_not_found content_center">
                <i class="material-icons">cloud_off</i>
            </div>
            <div :class="`text_not_found_${statusSelectType} content_center`">
              You do not have&nbsp;
              <label>{{data_notfound_by_type.type}}</label>
              &nbsp;history in&nbsp;
              <label>{{data_notfound_by_type.year}}</label>
            </div>
          </div>
        </div>
        <div>
          <div v-for="(loop, idx) in getListLeaveShow" :key="idx">
            <Month
              :showmonth="loop"
              :year="yearSelect"
              :statusUser="data_prop_month.statusUser"
              :indexmonth="idx"
              page="history"
              @popupDetail="showPopupDetail"
            />
          </div>
        </div>
      </div>

      <PopupDetail
        v-if="popupDetail"
        :datashow="propsToPopup"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import PopupDetail from "../../components/Popup/PopupDetail"
import LoadingPage from "../../components/LoadingPage"
import Month from "../../components/Month"
import ProfileUser from "../../components/History/ProfileUser"
import FilterYear from "../../components/History/FilterYear"
import MenuLeave from "../../components/History/MenuLeave"
import Provider from "../../service/provider"
const provider = new Provider();
export default {
  components: {
    Month,
    LoadingPage,
    PopupDetail,
    ProfileUser,
    FilterYear,
    MenuLeave
  },
  data() {
    return {
      api: provider,
      data_prop_year: null,
      data_prop_profile_user: {
        status: null,
        totalLeave: null,
        dataUser: {
          name: null,
          email: null,
          img: null
        }
      },
      totalDataLaveShow: {
        sizePersonal: 0,
        sizeSick: 0,
        sizeVacation: 0
      },
      yearSelect: null,
      typeSelect: null,
      statusSelectType: null,
      data_prop_month: {
        data: null,
        statusUser: null
      },
      data_notfound_by_type: {
        type: '',
        year: ''
      },

      dataHistory: null,
      propsToPopup: null,
    };
  },
  mounted() {
    this.queryMyLeave();
  },

  methods: {
    queryMyLeave() {
      let dataLogin = JSON.parse(localStorage.getItem("userprofile"));
      let result = this.api.getHistoryLeaveByUserId(dataLogin.userId);
      result.then(re => {
        if(re.length > 0){
          this.dataHistory = re;
          this.setListYearToComponent(re)
        }else{
          this.dataHistory = 'Not_Data'
        }
      })
    },

    setListYearToComponent(list){
      let list_not_sort = []
      list.forEach(list_year => {
        list_not_sort.push(list_year.year)
      })
      this.data_prop_year = list_not_sort.sort(function(a, b){return a-b});
    },

    setYearSelect(year){
      this.yearSelect = year
      this.calCountLeave()
    },

    calCountLeave(){
      this.dataHistory.forEach((myHistory, i) => {
        if (this.yearSelect == myHistory.year) {
            this.totalDataLaveShow.sizePersonal = myHistory.totalPersonalLeave;
            this.totalDataLaveShow.sizeSick = myHistory.totalSickLeave;
            this.totalDataLaveShow.sizeVacation = myHistory.totalVacation;
        }
      })

      if(this.statusSelectType !== null){
        this.setTypeSelect(this.statusSelectType)
      }
    },

    setTypeSelect(type){
      this.statusSelectType = type
      this.setDataUserToComponent()
    },

    setDataUserToComponent(){
      let dataLogin = JSON.parse(localStorage.getItem("userprofile"));
      this.data_prop_profile_user.status = dataLogin.statusWorking
      let data = {
          name: dataLogin.name,
          email: dataLogin.email,
          img: dataLogin.img,
      }
      this.data_prop_profile_user.dataUser = data
      this.data_prop_profile_user.totalLeave = this.totalDataLaveShow.sizePersonal + this.totalDataLaveShow.sizeSick + this.totalDataLaveShow.sizeVacation 
      this.createDataLeaveSelect()    
    },

    createDataLeaveSelect(){
      let data_show = null
      this.dataHistory.forEach((history, i) => {
        if(this.yearSelect == history.year) {
          switch(this.statusSelectType){
            case 'personal_leave':
                this.data_prop_month.data = history.listLeaveFullYear.listPersonalLeave
                break;
            case 'sick_leave':
                this.data_prop_month.data = history.listLeaveFullYear.listSickLeave
                break;
            case 'vacation_leave':
                this.data_prop_month.data = history.listLeaveFullYear.listVacationLeave
                break;
            default: break;
          }
          this.data_prop_month.statusUser = this.data_prop_profile_user.status
          if(this.data_prop_month.data.length === 0){
            this.setDataNotfoundByType()
          }
        }
      })
    },
    setDataNotfoundByType(){
      this.data_notfound_by_type.year = this.yearSelect
      switch(this.statusSelectType){
          case 'personal_leave':
              this.data_notfound_by_type.type = 'Personal leave'
              break;
          case 'sick_leave':
              this.data_notfound_by_type.type = 'Sick leave'
              break;
          case 'vacation_leave':
              this.data_notfound_by_type.type = 'Vacation leave'
              break;
          default: break;
      }
    },



    showPopupDetail(data) {
      let data_DB = this.data_prop_month.data[data.indexmonth].listLeave[data.indexcard]
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
    }),
    getListLeaveShow(){
      return this.data_prop_month.data
    }
  }
};
</script>
<style lang="scss">
.layout_history_wrapper{
    width: 100%;
    height: 100%;

    .layout_full_content{
        width: 100%;
        height: 100%;
        .layout_header_history{
            width: 100%;
            height: 18%;
            padding: 10px 0px;
            display: flex;
            background-color: #fff;
            .layout_user_profile{
                width: 35%;
                height: 100%;
                border-right: 2px solid rgba(15, 76, 129, 0.3); 
            }
            .layout_filter_data{
                width: 65%;
                height: 100%;
                border-left: 2px solid rgba(15, 76, 129, 0.3); 

                .filter_year{
                  width: 100%;
                  height: 50%;
                  padding: 5px 35%;
                }
                .filter_type_leave{
                  width: 100%;
                  height: 50%;
                  padding-top: 5px;
                }
            }
        }
        .layout_content_card{
            height: 82%;
            background-color: #f0f0f0;
            overflow: auto;
            .content_card_not_found{
                width: 100%;
                height: 100%;
                .box_not_found{
                    width: 100%;
                    .icon_not_found{
                        color: rgba(0,0,0,0.1);
                        .material-icons{
                            font-size: 60px;
                        }
                    }

                    .text_not_found_personal_leave{
                        color: rgba(0,0,0,0.2);
                        label{
                          color: rgba(15, 76, 129,0.5)
                        }
                    }

                    .text_not_found_sick_leave{
                        color: rgba(0,0,0,0.2);
                        label{
                          color: rgba(184, 76, 76,0.5);
                        }
                    }

                    .text_not_found_vacation_leave{
                        color: rgba(0,0,0,0.2);
                        label{
                          color: rgba(249, 113, 17, 0.5);
                        }
                    }
                }
            }
        }
    }

    .layout_loading_history{
        background-color: #fff;
        width: 100%;
        height: 100%;
        .box_not_found{
            width: 100%;
            .icon_not_found{
              color: rgba(0,0,0,0.1);
              .material-icons{
                font-size: 60px;
              }
            }

            .text_not_found{
              color: rgba(0,0,0,0.2);
            }
        }
    }
}
</style>
