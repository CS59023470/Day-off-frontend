<template>
  <div id="popup" class="confrim-wrapper">
    <div class="background-popup" ></div>
    <div class="layout-popup">
      <div class="contant-icon">
        <button class="icon-close" @click="returnEvent">
          <i class="material-icons">close</i>
        </button>
      </div>
        <div class="content-icon-popup content_center" v-if="status === 'APPROVE'">
            <div class="icon-popup content_center">
                <img src="~/assets/approved.png" >
            </div>
            <div class="content-title content_center">
            {{text}}
          </div>
        </div>

          <div class="content-icon-popup content_center" v-if="status === 'REJECT'">
            <div class="icon-popup content_center">
                <img src="~/assets/cencel.png" >
            </div>
            <div class="content-reject content_center">
            {{text}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text','status'],
  methods: {
    returnEvent(event) {
      this.$emit("eventClick", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.confrim-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  .background-popup {
    z-index: 500;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0px;
    left: 0px;
  }

  .layout-popup {
    min-width: 15%;
    max-width: 30%;
    min-height: 10%;
    max-height: fit-content;
    background-color: #fff;
    z-index: 1000;
    border-radius: 15px;
    padding: 10px 10px 20px 20px;
    align-items: center;

    .content-icon-popup{
        width: 100%;
        height: fit-content;
        .icon-popup{
          width: 40px;
          margin-right: 15px;
        }
    }
    .contant-icon{
      width: 100%;
      display: flex;
      justify-content: flex-end;
        .icon-close{
       
          border: 1px solid;
          width: auto;
          padding: inherit;
          height: auto;
          background-color: #858585;
          color: #fff;
          border-radius: 50%;
          i{
            font-size: 15px;
            padding: 5px;
          }
        }
    }
    .content-title{
        // padding-left: 20px;
         font-weight:600;
        text-align: center;
        color:#2D810F ;
    }

    .content-reject{
        // padding-left: 20px;
         font-weight:600;
        text-align: center;
        color:#D91616 ;
    }
  }
}

#popup {
  animation-name: animationPopup;
  animation-duration: 0.5s;
}
@keyframes animationPopup {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
