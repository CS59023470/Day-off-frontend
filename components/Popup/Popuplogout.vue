<template>
    <div id="popup" class="confrim-wrapper">
        <div class="background-popup"  ></div>
        <div class="layout-popup">
            <div class="content-card">
                <div class="content-text">
                    <div class="text">Are you sure to Sign Out?</div>
                </div>
                <div class="content-button">
                    <button class="cancel" @click="clickBackground">Cancel</button>
                    <button class="logout" @click="onLogout">Sing out</button>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import * as firebase from 'firebase/app' 
import 'firebase/auth'
export default {
    methods:{
        clickBackground(){
            this.$store.commit('popup/closePopuplogout')
        },
        onLogout() {
            //window.location.href = 'https://accounts.google.com/logout'
            
            firebase.auth().signOut().then(function() {

                localStorage.setItem('userprofile',null)

                window.location.href = '/'
            }).catch(function(error) {
                alert("Sign Out Fail")
            });
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
  z-index: 5000;
  
  .background-popup{
    z-index: 100;
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
    z-index: 100;
    border-radius: 15px;
    padding: 20px;

    .content-card{
        width: 100%;
        height: 100%;
        .content-text{
            width: 100%;
            padding: 20px;
            .text{
                font-size: 16px;
                font-weight: 600;
            }
        }
        .content-button{
            width: 100%;
            display: flex;
            justify-content: space-around;
            .cancel{
                border:1px solid black;
                background-color: #fff;
                border: none;  
                font-size: 16px;
                color: #5F5F5F;
                padding:10px
            }
            .logout{
                border: 1px solid black;
                border: none;
                border-radius: 10px;
                background-color: #0F4C81;
                color: #fff;
                font-size: 16px;
                padding: 10px;
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
