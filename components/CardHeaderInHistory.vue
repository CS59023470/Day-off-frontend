<template>
  <div class="background">
    <div class="card-intern" v-if="dataUser.statusWorking === 'internship'">
      <div class="userdetail">
        <div class="name-user">{{dataUser.name}}</div>
        <div class="email">{{dataUser.email}}</div>
        <div class="scoringleave">{{sizePersonal}}ลากิจ , {{sizeSick}}ลาป่วย , {{sizeVacation}}ลาพักร้อน</div>
      </div>
    </div>
    <div class="card-employee" v-else>
      <div class="iconBack" v-if="dataUser.statusUser === 'admin'|| dataUser.statusUser === 'super_admin'">
        <div class="btn-close">
          <button type="button" @click="pathsaech">
            <i class="material-icons"> arrow_back </i>
          </button>
            
         
        </div>
      </div>
      <div v-else></div>
      
      <div class="user">
        <img src="~/assets/LogoArtisan.png" width="50px" height="auto" />
      </div>

      <div class="userdetail">
        <div class="name-user">{{dataUser.name}}</div>
        <div class="email">{{dataUser.email}}</div>
        <div class="scoringleave">{{sizePersonal}}ลากิจ , {{sizeSick}}ลาป่วย , {{sizeVacation}}ลาพักร้อน</div>
      </div>
    </div>

    
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:['sizePersonal','sizeSick','sizeVacation'],
  data(){
      return{
        path:'',
        dataUser: {
          name: '',
          email: '',
          img: '',
          statusWorking: '',
          position: '',
          statusUser: '',
        }
      }
    },
  methods:{
    pathsaech(){
      this.$router.push(this.pathDefult+'search-history')
    },
 
  },
  computed:{
      ...mapState({pathDefult: state => state.pathDefult.path,})
  },
  mounted(){
    this.path = this.$route.name
    let dataLogin = JSON.parse(localStorage.getItem('userprofile'))
    this.dataUser.name = dataLogin.name
    this.dataUser.email = dataLogin.email
    this.dataUser.position = dataLogin.position
    this.dataUser.statusUser = dataLogin.statusUser    
    this.dataUser.statusWorking = dataLogin.statusWorking     
    console.log('aaaaaa =>',this.dataUser);  
  },
}
</script>

<style lang="scss" scoped>
.background {
  background-color: transparent;
  width: 100%;
  height: auto;
  padding: 20px;
  .card-intern {
    width: 350px;
    height: auto;
    background-color: white;
    margin: 10px;
    display: flex;
    border: solid black 1px;
    .userdetail {
      width: 300px;
      padding: 10px 20px;
      .name-user {
        color: black;
        font-size: 15px;
        font-weight: 500;
        padding-bottom: 5px;
      }
      .email {
        color: black;
        font-size: 12px;
        font-weight: 300;
        padding-bottom: 5px;
      }
      .scoringleave {
        padding-top: 10px;
        color: black;
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
  .card-employee {
    width: 350px;
    height: auto;
    background-color: #0f4c81;
    // margin: 10px;
    display: flex;
    .iconBack{
      .btn-close {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0px 0px 10px;
        button{
          height: 25px;
          width: 25px;
          background-color: white;
          border: none;
          border-radius: 50%;
          outline: none;
          i {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #134f83;
            font-size: 20px;
          }
        }
      }
    }

    .user {
      width: 50px;
      padding-top: 10px;
    }

    .userdetail {
      width: 300px;
      padding: 10px 20px;
      .name-user {
        color: white;
        font-size: 15px;
        font-weight: 500;
        padding-bottom: 5px;
      }
      .email {
        color: white;
        font-size: 12px;
        font-weight: 100;
        padding-bottom: 5px;
      }
      .scoringleave {
        padding-top: 10px;
        // text-align: center;
        color: white;
        font-size: 12px;
        font-weight: 100;
      }
    }
  }
}
</style>
