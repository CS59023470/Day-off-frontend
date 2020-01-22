<template>
   <div id="popup" class="confrim-wrapper">
    <div class="background-popup"></div>
    <div class="layout-popup">
      <div class="typeuser">
        <div class="user">
          Employee
        </div>
        <div class="content-icon">
          <button  @click="clickBackground">
             <i class="material-icons">close</i>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="haedarname">Name</div>
        <div class="subname">
          <!-- {{datashow.title}} -->
        </div>      
      </div>
      <!-- วันเดียว -->
      <div class="content-time ">
        <div class="start">
          <div class="haedarname">
            Requested Data
          </div>
          <div class="subname">
            วันที่
          </div>
        </div>
        <div class="time">
          <div class="haedarname">Time Period</div>
          <div class="subname">ช่วงเวลา</div>
        </div>
      </div>
      <!-- หลายวัน -->
      <div class="content-time">
        <div class="start">
          <div class="haedarname">
            Absent Since
          </div>
          <div class="subname">
            <!-- {{datashow.start}} -->
          </div>
        </div>
        <div class="time">
          <div class="haedarname">Time Period</div>
          <div class="subname">ช่วงเวลา</div>
        </div>
      </div>
      <div class="content-time">
        <div class="start">
          <div class="haedarname">
            To
          </div>
          <div class="subname">
            วันที่
          </div>
        </div>
        <div class="time">
          <div class="haedarname">Time Period</div>
          <div class="subname">ช่วงเวลา</div>
        </div>
      </div>
      <div class="content">
        <div class="haedarname">
          Type of Leave
        </div>
        <div class="subname">
          type leave
        </div>
      </div>
      <div class="content">
        <div class="haedarname">Description</div>
        <div class="subname">ไปแอ่ว</div>
      </div>
      <div class="content">
        <div class="haedarname">E-mail</div>
        <div class="subname">kan23491@gmail.com</div>
      </div>
      <!-- approval -->
      <div class="content">
        <div class="haedarname">Approval</div>
        <div class="subname">พี่มิ้น</div>
      </div>

    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  // props: ["startDate","endDate","nameuser","typeuser","textDetail","startTime","endTime","type","nameApprove","email"],
  props:['datashow'],
  methods: {
    clickBackground(){
       this.$store.commit('popup/closePopupDetail')
    },
    setFormatDate(date) {
      return moment(date).format("L");
    },
    setFormatTime(time){
      return moment(time).format('LTS');
    }
  },
  mounted() {
    // console.log(this.$props.datashow);
  }
};
</script>
<style lang="scss" scoped>
  .confrim-wrapper{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .background-popup{
    z-index: 500;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0px;
    left: 0px;
  }

  .layout-popup{
    width:  auto;
    min-height: 10%;
    max-height: fit-content;
    background-color: #fff;
    z-index: 1000;
    border-radius: 15px;
    padding: 20px;
    .typeuser{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .user{
        border-radius: 5px;
        background-color:#0F4C81;
        color: white;
        padding: 5PX;
      }
      .content-icon{
        button{
          border: 1px solid black;
          border-radius: 50px;
          background-color: #858585;
          border: none;
          padding: 3px;
          
        }
        i{
          font-size: 15px;
          color: white;
          margin: 3px;
        }
      }
    }
   .content{
    width: 100%;
   }
   .content-time {
     width: 100%;
     display: flex;
     .start{
       width: 50%;
       margin-right: 10px;
     }
     .time{
       width: 50%;
     }
   }
    .haedarname{
      font-size: 12px;
      color: #ABABAB;
      padding: 5px;
    }
    .subname{
      font-size: 20px;
      color: #0F4C81;
    }
   
  }
}

#popup{
    animation-name: animationPopup;
    animation-duration: 0.5s;
}
@keyframes animationPopup {
    0% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>
