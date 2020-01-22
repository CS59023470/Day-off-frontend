<template>
  <div class="page" >
    <div class="box">
      <div class="icon">
        <button class="clear" @click="topage">
          <i class="material-icons">
            close
          </i>
        </button>
      </div>
      <div class="scc">
        <div class="succ">
          <i class="material-icons" >done</i>
        </div>
        <div class="head">
          {{Finish}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:['Finish','urlPage'],
    methods:{
      topage(){
        this.$router.push(this.pathDefult+this.$props.urlPage)
      }
    },
    computed:{
        ...mapState({pathDefult: state => state.pathDefult.path,})
    }
}

</script>
<style lang="scss" scoped>
@import "@/assets/style/Popup.scss";
.scc {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  // width: 300px;
  .succ {
    border-radius: 50%;
    border: none;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #2d810f;
    margin: 0px 10px;
    }
}
</style>
