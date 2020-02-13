<template>
  <div class="full">
    <div class="pic-bg">
      <div class="box">
        <div class="pic-gg"></div>
        <div class="empty">
          <button class="button-gg" @click="onLogin">
            <div class="pic-google"></div>
            <div class="text">
              Sign in with Google
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as firebase from 'firebase/app' 
import 'firebase/auth'
import { mapState } from 'vuex'
import Provider from '../service/provider'
const provider = new Provider()

export default {
  data(){
    return {
      api : provider
    }
  },
  layout: 'nonav',
  methods:{
    onLogin(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        //let token = result.credential.accessToken;
        let user = result.user;
         let userShow = {
              name: user.displayName,
              img: user.photoURL,
              email: user.email
          }

          this.checkTypeUserLogin(userShow)

      }).catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
      });
    },
    checkTypeUserLogin(user){

      let result = this.api.checkUserLogin(user.email)
      result.then( re => {
        if(typeof re !== 'object'){

          switch(re){
            case 'Not_Active' : alert('ไม่สามารถเข้าสู่ระบบได้ในขณะนี้'); break;
            case 'Not_Found' : alert('ไม่ได้รับสิทธิ์การเข้าถึงเว็บไซต์'); break;
            default : alert('Server เกิดข้อผิดพลาด'); break;
          }

          localStorage.setItem('userprofile',null)
          window.location.reload()

        }else{

          let modelUser = {
            name: user.name,
            img: user.img,
            email: user.email,
            userId: re[0].userId+"",
            position: re[0].position,
            statusUser: re[0].statusUser+"",
            statusWorking: re[0].statusWorking+"",
            statusActive : re[0].statusActive+"",
            manager : re[0].manager
          }

          localStorage.setItem('userprofile',JSON.stringify(modelUser))

          if(modelUser.statusUser === 'super_admin'){
              this.$store.commit('pathDefult/setPath','/superadmin/')
          }else if(modelUser.statusUser === 'admin'){
              this.$store.commit('pathDefult/setPath','/admin/')
          }else{
              switch(modelUser.statusWorking){
                case 'full_time' : 
                    this.$store.commit('pathDefult/setPath','/employee/')
                    break;
                case 'internship' : 
                    this.$store.commit('pathDefult/setPath','/intern/')
                    break;
                case 'part_time' : 
                    this.$store.commit('pathDefult/setPath','/employee/')
                    break;
                default : 
                  this.$store.commit('pathDefult/setPath','/index')
                  localStorage.setItem('userprofile',null);
                  break;
              }
          }
          if(this.pathDefult !== '/index'){
            this.$router.push(this.pathDefult+'home')
          }else{
            this.$router.push(this.pathDefult)
          }
        }
      })
    }
  },
  computed:{
    ...mapState({
        pathDefult: state => state.pathDefult.path
    })
  }
}
</script>

<style scoped>
.full {
  width: 100vw;
  height: 100vh;
}
.pic-bg {
  background-image: url("~assets/bg_artisan.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
  height: 10%;
  width: 20%;
}
.pic-gg {
  background-image: url("~assets/image1.png");
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 23%;
}
.empty {
  width: 77%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 0px 5px 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-gg {
  display: flex;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 6px;
  outline: none;
}
.pic-google {
  background-image: url("~assets/search.svg");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
}
.text {
  padding-left: 15px;
  padding-top: 2px;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: roboto;
}
</style>
