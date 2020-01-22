<template>
  <div>
    <div class="box">
      <div class="head">
       ต้องการออกจากระบบหรือไม่
      </div>
      <div class="header">
          <button class="text-1" @click="$modal.hide('close')">ไม่</button>
          <button class="text-2" @click="onLogout()">
              ออกจากระบบ
          </button>
      </div>
    </div>
  </div>
</template>
<script>
import Popuplogout from "../components/Popuplogout"
import * as firebase from 'firebase/app' 
import 'firebase/auth'
export default {
  methods:{
        onLogout() {
            //window.location.href = 'https://accounts.google.com/logout'
            
            firebase.auth().signOut().then(function() {

                localStorage.setItem('userprofile',null)

                window.location.href = '/'
            }).catch(function(error) {
                alert("Sign Out Fail")
            });
        }
    },
    components:{
        Popuplogout,
    }
  
}
</script>
<style lang="scss" scoped>
.modal-overlay{
    border-radius: 30px;
}
.box {
//   border: solid 1px gray;
  /* text-align: center; */
  width: 300px;
  height: auto;
  padding: 5px;
//   border-radius: 20px;
  background-color: white;
  .head{
    text-align: center;
    font-weight: 800;
    height: auto;
    margin: 20px 15px 20px 15px;
   }
   .header{
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    align-items: center;
    padding-bottom: 15px;
        .text-1{
            /* background-color: dodgerblue; */
            font-size: 16px;
            padding: 5px 10px 5px 10px;
            background-color: white;
            border: none;
            color: #D91616;
        }
        .text-2{
            background-color: #0F4C81;
            border: none;
            font-size: 16px;
            padding: 15px 10px 15px 10px;
            border-radius: 8px;
            color: white;
        }
    }
}
</style>