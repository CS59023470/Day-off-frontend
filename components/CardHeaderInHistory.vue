<template>
  <div class="background">
    <div v-if="dataInHeader">
      <div class="card-intern" v-if="dataUser.statusWorking === 'internship'">
        <div class="userdetail">
          <div class="UserType">
            internship
          </div>
          <div class="boxname">
            <div class="name-user">{{ dataInHeader.name }}</div>
            <div class="email">{{ dataInHeader.email }}</div>
            <div class="scoringleave">
              {{ sizePersonal + sizeSick + sizeVacation }} All Leave in {{ yearAtSelect }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-employee" v-else>
        <div class="user">
          <img src="~/assets/LogoArtisan.png" width="50px" height="auto" />
        </div>

        <div class="userdetail">
          <div class="name-user">{{ dataInHeader.name }}</div>
          <div class="email">{{ dataInHeader.email }}</div>
          <div class="scoringleave">
            {{ sizePersonal + sizeSick + sizeVacation }} All Leave in {{ yearAtSelect }}
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="card-intern" v-if="dataUser.statusWorking === 'internship'">
        <div class="userdetail">
          <div class="UserType">
            internship
          </div>
          <div class="boxname">
            <div class="name-user">{{ dataUser.name }}</div>
            <div class="email">{{ dataUser.email }}</div>
            <div class="scoringleave">
              {{ sizePersonal + sizeSick + sizeVacation }} All Leave in {{ yearAtSelect }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-employee" v-else>
        <div class="user">
          <img src="~/assets/LogoArtisan.png" width="50px" height="auto" />
        </div>

        <div class="userdetail">
          <div class="name-user">{{ dataUser.name }}</div>
          <div class="email">{{ dataUser.email }}</div>
          <div class="scoringleave">
            {{ sizePersonal + sizeSick + sizeVacation }} All Leave in {{ yearAtSelect }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["sizePersonal", "sizeSick", "sizeVacation", "yearAtSelect", "dataInHeader"],
  data() {
    return {
      path: "",
      dataUser: {
        name: "",
        email: "",
        img: "",
        statusWorking: "",
        position: "",
        statusUser: ""
      }
    };
  },

  computed: {
    ...mapState({ pathDefult: state => state.pathDefult.path })
  },
  mounted() {
    // this.path = this.$route.name
    let dataLogin = JSON.parse(localStorage.getItem("userprofile"));
    this.dataUser.name = dataLogin.name;
    this.dataUser.email = dataLogin.email;
    this.dataUser.position = dataLogin.position;
    this.dataUser.statusUser = dataLogin.statusUser;
    this.dataUser.statusWorking = dataLogin.statusWorking;
    console.log("aaaaaa =>", dataLogin);
  }
};
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
      display: flex;
      .UserType {
        color: black;
        background: white;
        padding: 5px 10px 5px 3px;
        border-top: solid black 1px;
        border-right: solid black 1px;
        border-bottom: solid black 1px;
        border-radius: 0 50px 50px 0;
        height: 35px;
        width: 85px;
        margin-top: 10px;
        font-size: 15px;
      }
      .boxname {
        margin: 5% 5% 5% 15%;
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
  }
  .card-employee {
    width: 350px;
    height: auto;
    background-color: #0f4c81;
    display: flex;

    .user {
      width: 50px;
      padding-top: 10px;
      margin-left: 15px;
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
        color: white;
        font-size: 12px;
        font-weight: 100;
      }
    }
  }
}
</style>
