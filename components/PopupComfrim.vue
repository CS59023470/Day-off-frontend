<template>
  <div class="confrim-wrapper">
    <div class="confrim-popup">
      <div class="title-popup">
       {{handText}}
      </div>
      <div class="btn-group-popup">
          <div class="btn-popup">
            <button class="btn-close" @click="noClickBtn(false)">ยกเลิก</button> 
          </div>
          <div class="btn-popup">
            <button class="btn-confirm" @click="noClickBtn(true)">ยืนยัน</button> 
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['handText'],
    methods:{
        noClickBtn(status){
          this.$emit('statusConfirm',status)
        }
    }
}
</script>
<style lang="scss" scoped>
.confrim-wrapper{
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    align-content: center;
    justify-content: center;
  
    .confrim-popup{
      width: 100%;
      height: fit-content;

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

          .btn-close, .btn-confirm{
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

          .btn-confirm:hover, .btn-close:hover{
            opacity: 0.5;
          }
        }
      }
    }
}
</style>
