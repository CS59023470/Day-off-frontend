<template>
<div>
  <div class="size">
    <div class="full">
      <div class="txt-input">
        <input type="text" v-model="name" placeholder="ค้นหาชื่อ" list="nameUser" @keyup="createListName">
        <datalist id="nameUser" v-if="statusGroup">
          <option v-for="(name , idx) in listNameUser" :key="idx">{{name.name}}</option>
        </datalist>
        <datalist id="nameUser" v-else>
          <option v-for="(name , idx) in listname" :key="idx">{{name.name}}</option>
        </datalist>
      </div>
      <div class="btn-icon">
        <button><i class="material-icons" v-on:click="input()">search </i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return { 
      name: "",
      listname: [],
      statusGroup: true,
      userSelected: null
    }
  },
  mounted(){
  },
  methods: {
    createListName() {
      this.statusGroup = false
      this.listname = []
      this.listNameUser.forEach(element => {
        if(element.name.includes(this.name)){
          this.listname.push(element)
        }
      });
    },
    input() {
      let user = this.listNameUser.filter(data => {
        return data.name === this.name
      })
      if(this.name){
        this.$emit('returnUserId', user[0].userId);
      }else {
        this.$emit('returnUserId', "");
      }
      
    }
  },
  computed: {

    ...mapState({
        listNameUser: state => state.leaveHistory.listAllUser
    })
  },
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
