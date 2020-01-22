<template>
<div>
  <div class="size">
    <div class="full">
      <div class="txt-input">
        <input type="text" placeholder="ค้นหาชื่อ">
      </div>
      <div class="btn-icon">
        <button><i class="material-icons">search </i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.size{
   width: 500px;

    .full{
    background: rgb(255, 255, 255);
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    padding-left: 5px;
    border: 1px solid black;

    .txt-input{
      width: 90%;
      height: 100%;
      & input{
        width: 100%;
        height: 33px;
        border: none;
        outline: none;
      }
    }
    .btn-icon{
      width: 10%;
      height: 100%;
        & button{
        width: 100%;
        height: 33px;
        display: flex;
        background: transparent;
        border-left: 1px solid black;
        border-right: none;
        border-top: none;
        border-bottom: none;
        justify-content: center;
      }
      
    }
  }
}
</style>
