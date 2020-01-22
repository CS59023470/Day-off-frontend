<template>
  <div class="Wrap-Content">
    <div class="Container"  v-for="(dataYear, idx) in DetalCard" :key="idx">


      <div class="BoxcontentFulltime" v-if="status = true">
        <div class="HeadBox">
          <div class="UserType">
            พนักงาน
          </div>
          <div class="LogoType"></div>
        </div>
        <div class="Name">{{ dataYear.startdate }} - {{ dataYear.enddate }}</div>
        <div class="ScoreLeaves">
          <div class="WorkLeave">
            {{ dataYear.detailleave }}
          </div>
        </div>
        <div class="more">
          <button @click="show">
            <i class="material-icons">more_horiz</i>
          </button>
        </div>
      </div>
      

      <div class="BoxcontentIntern" v-else>
        <div class="UserType">
          ฝึกงาน
        </div>
        <div class="Name">{{ dataYear.startdate }} - {{ dataYear.enddate }}</div>
        <div class="ScoreLeaves">
          <div class="WorkLeave">
            {{ dataYear.detailleave }}
          </div>
        </div>
        <div class="more">
          <button @click="show">
            <i class="material-icons">more_horiz</i>
          </button>
        </div>
      </div>
    </div>
    <PopupDetail
      v-if="popupDetail"
    />
  </div>
</template>

<script>
import PopupDetail from '../components/Popup/PopupDetail'
import { mapState } from 'vuex'
export default {
  props:["DetalCard","status"],
   components: {
        PopupDetail,
    },
  data() {
    return {
    }
  },
  methods:{
      show(){
        this.$store.commit('popup/showPopupDetail')
      }
  },
   computed: {
        ...mapState({
          popupDetail: state => state.popup.popup_detail,
        })
    },
}
</script>

<style lang="scss">
.Wrap-Content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .Container {
    margin: 15px;
    width: 325px;
    height: 180px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px gray;
    display: flex;
    ////////////////// Style Card FullTime ////////////////
    .BoxcontentFulltime {
      padding: 5% 5% 5% 0;
      width: 100%;
      height: auto;
      .HeadBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .UserType {
          color: white;
          background: #0f4c81;
          padding: 5px 10px 5px 3px;
          border-radius: 0 50px 50px 0;
          height: auto;
          width: auto;
          font-size: 15px;
        }
        .LogoType {
          background-image: url("~assets/image1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .Name {
        width: 100%;
        text-align: center;
        margin-left: 5%;
        font-size: 20px;
        font-weight: 500;
        padding: 10px 0;
        color: #0f4c81;
      }
      .ScoreLeaves {
        display: flex;
        width: 100%;
        // margin-left: 5%;
        height: auto;
        justify-content: center;
        .WorkLeave {
          color: #0f4c81;
        }
      }
      .more {
        display: flex;
        justify-content: center;
        .material-icons {
          background-color: transparent;
          border: none;
        }
      }
    }
    ////////////// Style Card Intern //////////////////
    .BoxcontentIntern {
      padding: 5% 5% 5% 0;
      width: 100%;
      height: auto;
      .UserType {
        color: black;
        background: white;
        padding: 5px 10px 5px 3px;
        border-top: solid black 1px;
        border-right: solid black 1px;
        border-bottom: solid black 1px;
        border-radius: 0 50px 50px 0;
        height: auto;
        width: fit-content;
        font-size: 15px;
      }
      .Name {
        width: 100%;
        margin-left: 5%;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        padding: 10px 0;
        color: black;
      }
      .ScoreLeaves {
        display: flex;
        margin-left: 5%;
        width: 100%;
        height: auto;
        justify-content: center;
        .WorkLeave {
          color: black;
        }
      }
      .more {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
