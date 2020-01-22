<template>
  <div class="page">
    <div class="box">
      <div class="icon">
      </div>
      <div class="head">
       ยกเลิกคำร้องนี้หรือไม่
      </div>
      <div class="header">
          <div class="text-1">
            <button class="btnNo" @click="onClickBtn(false)">ไม่ใช่</button> 
            <button class="btnYes" @click="onClickBtn(true)">ใช่</button> 
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    methods:{
        onClickBtn(status){
          this.$emit('statusReject',status)
        }
    }
}
</script>
<style lang="scss" scoped>
 @import "@/assets/style/Popup.scss";
 .modal-content  {
    -webkit-border-radius: 25px !important;
    -moz-border-radius: 25px !important;
    border-radius: 25px !important; 
}
</style>
