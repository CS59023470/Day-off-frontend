<template>
<div class="box-content" >
    <div v-for="(Show, idx) in ListCard" :key="idx">
        <div class="container" v-if="Show.status === 'พนักงาน'" >
            <div class="boxcontentfulltime" >
                <div class="headbox">
                    <div class="usertype" >
                        {{ Show.status }}
                    </div>
                    <div class="logotype"></div>
                </div>
                <div class="name"> 
                    {{ Show.name }}
                </div>
            </div>
        </div>
        <div class="container-intern" v-else>
           <div class="boxcontentIntern" >
                <div class="usertype">
                    {{ Show.status }}
                </div>
                <div class="Name">
                    {{ Show.name }}
                </div>
            </div> 
        </div>
     </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            ListCard: [
                {
                status: "ฝึกงาน",
                name: "กัญญารัตน์"
                },
                  {
                status: "พนักงาน",
                name: "พี่มิ้น"
                },
            ]
        }
    }
}
</script>

<style lang="scss">
.box-content{
    width: 100%;
    height: 100%;
    display: flex;
    .container {
        margin: 15px;
        width: 250px;
        height: fit-content;
        background-color: white;
        border-radius: 10px;
        box-shadow: 5px 5px 10px 3px gray;
        ////////////////// Style Card FullTime ////////////////
        .boxcontentfulltime {
            padding: 5% 5% 5% 0;
            width: 100%;
            height: auto;
            .headbox {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .usertype {
                    color: white;
                    background: #0f4c81;
                    padding: 5px 10px 5px 3px;
                    border-radius: 0 50px 50px 0;
                    height: auto;
                    width: auto;
                    font-size: 15px;
                }
                .logotype {
                    background-image: url("~assets/image1.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
            .name {
                width: 100%;
                text-align: center;
                font-size: 20px;
                font-weight: 500;
                padding: 10px 0;
                color: #0f4c81;
            }
        }
    }
    ////////////// Style Card Intern //////////////////
    .container-intern{
          margin: 15px;
        width: 250px;
        height: fit-content;
        background-color: white;
        border-radius: 10px;
        box-shadow: 5px 5px 10px 3px gray;
        .boxcontentIntern {
            padding: 5% 5% 5% 0;
            width: 100%;
            height: auto;
            .usertype {
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
                text-align: center;
                font-size: 20px;
                font-weight: 500;
                padding: 10px 0;
                color: black;
            }
        }
    }
}
</style>
