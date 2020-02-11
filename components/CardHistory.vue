<template>
  <div class="Wrap-Content">
    <div class="Container">
      <div class="BoxcontentFulltime" v-if="status === true || status === 'full_time' || status === 'part_time'">
        <div class="HeadBox">
          <div class="UserType">
            Employee
          </div>
          <div class="LogoType"></div>
        </div>
        <div class="Name">{{ detailCard.startdate }} - {{ detailCard.enddate }}</div>
        <div class="ScoreLeaves">
          <div class="WorkLeave">
            {{ detailCard.detailleave }}
          </div>
        </div>
        <div class="more">
          <button @click="showCardDetail">
            <i class="material-icons">more_horiz</i>
          </button>
        </div>
      </div>
      <div class="BoxcontentIntern" v-if="status === false || status === 'internship'">
        <div class="UserType">
          internship
        </div>
        <div class="Name">{{ detailCard.startdate }} - {{ detailCard.enddate }}</div>
        <div class="ScoreLeaves">
          <div class="WorkLeave">
            {{ detailCard.detailleave }}
          </div>
        </div>
        <div class="more">
          <button @click="showCardDetail">
            <i class="material-icons">more_horiz</i>
          </button>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  props:["detailCard","status","indexcard"],
  methods:{
      showCardDetail(){
          this.$emit('eventShowDetail',this.$props.indexcard)
      }
  },
}
</script>

<style lang="scss">
.Wrap-Content {
  display: flex;
  flex-wrap: wrap;
  width: 325px;
  .Container {
    margin: 15px;
    width: 325px;
    height: 180px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px gray;
    display: flex;
    ////////////////// Style Card FullTime ////////////////
    .BoxcontentFulltime {
      padding: 5% 5% 5% 0;
      width: 100%;
      height: auto;
      .HeadBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .UserType {
          color: white;
          background: #0f4c81;
          padding: 5px 10px 5px 3px;
          border-radius: 0 50px 50px 0;
          height: auto;
          width: auto;
          font-size: 15px;
          font-family: roboto;
        }
        .LogoType {
          background-image: url("~assets/image1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .Name {
        width: 100%;
        text-align: center;
        margin-left: 5%;
        font-size: 20px;
        font-weight: 500;
        padding: 10px 0;
        color: #0f4c81;
        font-family: roboto;
      }
      .ScoreLeaves {
        display: flex;
        width: 100%;
        // margin-left: 5%;
        height: auto;
        justify-content: center;
        .WorkLeave {
          color: #0f4c81;
          text-align: center;
          width: 90%;
          overflow: hidden;
          white-space: nowrap;
          font-family: roboto;
        }
      }
      .more {
        display: flex;
        justify-content: center;
        button {
          background-color: white;
          border: none;
          i{
            background-color: transparent;
            border: none;
          }
        }
        
      }
    }
    ////////////// Style Card Intern //////////////////
    .BoxcontentIntern {
      padding: 5% 5% 5% 0;
      width: 100%;
      height: auto;
      .UserType {
        color: black;
        background: white;
        padding: 5px 10px 5px 3px;
        border-top: solid black 1px;
        border-right: solid black 1px;
        border-bottom: solid black 1px;
        border-radius: 0 50px 50px 0;
        height: auto;
        width: fit-content;
        font-size: 15px;
      }
      .Name {
        width: 100%;
        margin-left: 5%;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        padding: 10px 0;
        color: black;
      }
      .ScoreLeaves {
        display: flex;
        width: 100%;
        // margin-left: 5%;
        height: auto;
        justify-content: center;
        .WorkLeave {
          color: black;
          text-align: center;
          width: 90%;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .more {
        display: flex;
        justify-content: center;
        button {
          background-color: white;
          border: none;
          i{
            background-color: transparent;
            border: none;
          }
        }
      }
    }
  }
}
</style>
