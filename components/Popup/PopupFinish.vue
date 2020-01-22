<template>
  <div id="popup" class="confrim-wrapper">
    <div class="background-popup" @click="returnEvent"></div>
    <div class="layout-popup">
        <div class="content-icon-popup content_center">
            <div class="icon-popup content_center">
                <i class="material-icons">done</i>
            </div>
        </div>
        <div class="content-title content_center">
            {{text}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text'],
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
    padding: 20px;
    align-items: center;

    .content-icon-popup{
        width: 100%;
        height: fit-content;
        
        .icon-popup{
            width: fit-content;
            height: fit-content;
            color: #fff;
            background-color: #2D810F;
            border-radius: 50%;
            padding: 2px;

            .material-icons{
                font-size: 25px;
            }
        }
    }

    .content-title{
        padding-top: 15px;
        text-align: center;
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
