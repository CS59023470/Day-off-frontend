<template>
  <div id="popup" class="confrim-wrapper">
    <div class="background-popup" @click="returnEvent"></div>
    <div class="layout-popup">
      <div class="close-popup">
       <i class="material-icons">close</i>
      </div>

      <div class="content-title content_center">
        <div class="success-ap"> 
          <img src="~/assets/approved.png" >
        </div>
        <div class="text-ap">
        {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"],
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
    min-width: 20%;
    max-width: 30%;
    min-height: 10%;
    max-height: fit-content;
    background-color: #fff;
    z-index: 1000;
    border-radius: 15px;
    padding: 10px 10px 20px 20px;
    align-items: center;

    .close-popup {
      display: flex;
      justify-content: flex-end;
      
      .material-icons{
        background-color: #858585;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
         i {
          font-size: 15px;
          padding: 2px;
        }
      }
    }
    .content-title {
      padding-top: 15px;
      text-align: center;
      color: #2D810F;
      .success-ap{
       width: 40px;
       margin-right: 15px;
      }
      .text-ap{
        margin-bottom: 10px;
      }
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
