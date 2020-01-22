<template>
  <div class="page">
    <div class="box">
      <div class="head">
        <div class="top-right">
          <!-- <button @click="$modal.hide('datailevent')"> -->
            <i class="material-icons">close</i>
          </button>
        </div>

        <div class="head-text">
          พนักงาน
          <!-- {{typeuser}} -->
        </div>
        <div class="text-body">
          <div class="name" style="font-size: 12px;">
            ชื่อ
          </div>
          <div class="name1">
            {{nameuser}}
            <!-- {{ datashow.leave.title }} -->
          </div>
          <div class="date">
            <div class="date-start">
              วันที่ลา
            </div>
            <div class="date-end">
              ช่วงเวลา
            </div>
          </div>
          <div class="date-time">
            <div class="date1">
              {{setFormatDate(startDate)}}
              <!-- {{ setFormatDate(datashow.startDate) }} -->
            </div>
            <div class="date3">
              ช่วงเช้า
              <!-- {{setFormatTime(startDate)}} -->
            </div>
          </div>
          <div class="date-2">
            <div class="end-date">
              ลาถึงวันที่
            </div>
            <div class="end-time">
              ช่วงเวลา
            </div>
          </div>

          <div class="date-time">
            <div class="date1">
              {{setFormatDate(endDate)}}
              <!-- {{ setFormatDate(datashow.endDate) }} -->
            </div>
            <div class="date3">
              ช่วงบ่าย
              <!-- {{setFormatTime(endDate)}} -->
            </div>
          </div>

          <div class="kind">
            ประเภทการลา
          </div>
          <div class="sick">
            ลาป่วย
            <!-- {{ datashow.type }} -->
          </div>
          <div class="description">
            รายละเอียดการลา
          </div>
          <div class="sl">
            <!-- {{textDetail}} -->
            <!-- sfdsgd -->
            <!-- {{ datashow.detail }} -->
          </div>
          <div class="email">
            อีเมลล์
          </div>
          <div class="name-email">
            kan23491@gmail.com
            <!-- {{ datashow.user.email }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["startDate","endDate","nameuser","typeuser","textDetail","starttime"],
  // props:['datashow'],
  methods: {
    setFormatDate(date) {
      return moment(date).format("L");
    },
    setFormatTime(time){
      return moment(time).format('LTS');
    }
  },
  mounted() {
    console.log(this.$props.datashow);
  }
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  padding: 15px 15px 15px 20px;
  .box {
    background-color: white;
    height: 100%;
    width: 100%;
    .head {
      width: 100%;

      .top-right {
        display: flex;
        justify-content: flex-end;
        button {
          border-radius: 80px;
          border: solid 1px gray;
          background-color: gray;
          .material-icons{
            color: white;
            width: 15px;
            display: flex;
            justify-content: center;
          }
        }
      }

      .head-text {
        background-color: white;
        border: solid 1px black;
        border-radius: 10px;
        width: 102px;
        padding: 5px;
        font-weight: 700;
        color: black;
        text-align: center;
        font-size: 20px;  
        margin-top: -20px;
        // margin-bottom: 15px;
      }

      .text-body {
          width: 100%;
          font-family: "roboto";
        .name {
          padding-top: 10px;
          font-weight: 300;
        }
        .name1 {
          font-size: 20px;
          color: Black;
          font-weight: 600;
        }
        .date {
          display: flex;
          padding-top: 10px;
          font-weight: 300;
          font-size: 12px;
          width: 100%;
          color: #5f5f5f;

          .date-start {
            width: 50%;
          }
          .date-end {
            width: 50%;
          }
        }
        .date-2 {
          display: flex;
          width: 100%;
          font-size: 12px;
          color: #5f5f5f;

          .end-date {
            width: 50%;
          }
          .end-time {
            width: 50%;
          }
        }
        .date-time {
          width: 100%;
          display: flex;
          font-size: 20px;
          color: Black;
          font-weight: 600;
          .date1 {
            width: 50%;
          }
          .date3 {
            width: 50%;
          }
        }
        .kind {
          padding-top: 10px;
          font-weight: 300;
          font-size: 12px;
        }
        .sick {
          font-size: 20px;
          color: Black;
          font-weight: 600;
        }
        .description {
          padding-top: 10px;
          font-weight: 300;
          font-size: 12px;
        }
        .sl {
          font-size: 20px;
          color: Black;
          font-weight: 600;
        }
        .email {
          padding-top: 10px;
          font-weight: 300;
          font-size: 12px;
        }
        .name-email {
          font-size: 20px;
          color: Black;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
