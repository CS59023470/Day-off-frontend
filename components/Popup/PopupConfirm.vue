<template>
  <div id="popup" class="confrim-wrapper">
    <div class="background-popup" @click="clickBackground"></div>
    <div class="layout-popup">
      <div class="title-popup">
        {{controPopup.title_popup_confirm}}
      </div>
      <div class="btn-group-popup">
          <div class="btn-popup">
            <button class="btn-close" @click="returnEvent(false)">Cancel</button> 
          </div>
          <div v-if="controPopup.color_popup === 'APPROVE'" class="btn-popup">
            <button class="btn-confirm" @click="returnEvent(true)">Confirm</button> 
          </div>
          <div v-else class="btn-popup">
            <button class="btn-reject" @click="returnEvent(true)">Confirm</button> 
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['controPopup'],
    methods:{
        clickBackground(){
          this.$store.commit('popup/closePopupConfirm')
        },
        returnEvent(event){
          if(event){
            this.$emit('eventClick',event)
          }else{
            this.$store.commit('popup/closePopupConfirm')
          }
        }
    }
}
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
    max-width: 30%;
    width:  fit-content;
    min-height: 10%;
    max-height: fit-content;
    background-color: #fff;
    z-index: 1000;
    border-radius: 15px;
    padding: 20px;

    .title-popup, .btn-group-popup{
        display: flex;
        align-content: center;
        justify-content: center;
    }

    .title-popup{
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 25px;
      }

      .btn-group-popup{
        .btn-popup{
          width: 50%;
          display: flex;
          align-content: center;
          justify-content: center;

          .btn-close, .btn-confirm, .btn-reject{
            width: 60%;
            height: 30px;
            border-radius: 5px;
          }

          .btn-close{
            border: none;
            outline: none;
            background-color: transparent;
            color: red;
          }

          .btn-confirm{
            border: none;
            outline: none;
            background-color: #2D810F;
            color: #fff;
          }

          .btn-reject{
            border: none;
            outline: none;
            background-color: #D91616;
            color: #fff;
          }

          .btn-confirm:hover, .btn-close:hover, .btn-reject:hover{
            opacity: 0.5;
          }
        }
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
