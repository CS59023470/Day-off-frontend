<template>
   <div id="popup" class="confrim-wrapper content_center">
    <div class="background-popup" @click="clickBackground"></div>
    <div class="layout-popup">
      <div class="typeuser">
        <div v-if="datashow.statusUser" class="content_center user box-employee">
          Employee
        </div>
        <div v-else class="content_center user box-intern">
          Intern
        </div>
        <div class="content-icon">
          <button class="content_center"  @click="clickBackground">
             <i class="material-icons">close</i>
          </button>
        </div>
      </div>
      <div v-if="datashow.userName !== null" class="content">
        <div class="haedarname">Name</div>
        <div :class="`subname ${classColor}`">
          {{datashow.userName}}
        </div>      
      </div>
      <!-- วันเดียว -->
      <div v-if="datashow.startDate == datashow.endDate" class="content-time">
        <div class="start">
          <div class="haedarname">
            Requested Data
          </div>
          <div :class="`subname ${classColor}`">
            {{datashow.startDate}}
          </div>
        </div>
        <div class="time">
          <div class="haedarname">Time Period</div>
          <div :class="`subname ${classColor}`">{{datashow.startTime}}</div>
        </div>
      </div>
      <!-- หลายวัน -->
      <div v-else>
        <div class="content-time" >
        <div class="start">
          <div class="haedarname">
            Absent Since
          </div>
          <div :class="`subname ${classColor}`">
            {{datashow.startDate}}
          </div>
        </div>
        <div class="time">
          <div class="haedarname">Time Period</div>
          <div :class="`subname ${classColor}`">{{datashow.startTime}}</div>
        </div>
      </div>
      <div class="content-time">
        <div class="start">
          <div class="haedarname">
            To
          </div>
          <div :class="`subname ${classColor}`">
            {{datashow.endDate}}
          </div>
        </div>
        <div class="time">
          <div class="haedarname">Time Period</div>
          <div :class="`subname ${classColor}`">{{datashow.endTime}}</div>
        </div>
      </div>
      </div>
      
      <div class="content">
        <div class="haedarname">
          Type of Leave
        </div>
        <div :class="`subname ${classColor}`">
          {{datashow.type}}
        </div>
      </div>
      <div class="content">
        <div class="haedarname">Description</div>
        <div :class="`subname box-detail ${classColor}`">{{datashow.detail}}</div>
      </div>
      <div v-if="datashow.email !== null" class="content">
        <div class="haedarname">E-mail</div>
        <div :class="`subname ${classColor}`">{{datashow.email}}</div>
      </div>
      <!-- approval -->
      <div v-if="datashow.admin_approve !== null" class="content">
        <div class="haedarname">Approval</div>
        <div :class="`subname ${classColor}`">{{datashow.admin_approve}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['datashow'],
  data(){
    return{
      classColor: ''
    }
  },
  mounted(){
    if(this.$props.datashow.statusUser){
      this.classColor = 'color_fulltime'
    }else{
      this.classColor = 'color_intern'
    }
  },
  methods: {
    clickBackground(){
       this.$store.commit('popup/closePopupDetail')
    }
  },
}
</script>
<style lang="scss" scoped>
  .confrim-wrapper{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  
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
    width: 300px;
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
      margin-bottom: 10px;
      .user{
        padding: 1px 20px;
        border-radius: 10px;
      }
      .content-icon{
        button{
          width: 30px;
          height: 30px;
          border: 1px solid black;
          border-radius: 50px;
          background-color: #858585;
          border: none;
          padding: 3px;
        }
        i{
          font-size: 24px;
          color: white;
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
    }
    .subname{
      font-size: 16px;
    }
    .box-detail{
      height: fit-content;
      max-height: 100px;
      overflow: auto;
    }
   
  }
}
.color_fulltime{
  color: #0F4C81;
}
.color_intern{
  color: #000;
}
.box-employee{
  background-color:#0F4C81;
  color:#fff;
}
.box-intern{
  background-color: transparent;
  border: 1px solid #000;
  color: #000;
}
/*
  
*/
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