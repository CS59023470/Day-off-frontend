<template>
<div class="box-content" >
    <div>
        <div class="container-intern"  v-if="listDataCard.statusUser === 'internship'">
           <div class="boxcontentIntern" >
                <div class="usertype">
                    {{ listDataCard.statusUser }}
                </div>
                <div class="Name">
                    {{ listDataCard.name }}
                </div>
            </div> 
        </div>
        <div class="container" v-else>
            <div class="boxcontentfulltime" >
                <div class="headbox">
                    <div class="usertype" >
                        {{ listDataCard.statusUser }}
                    </div>
                    <div class="logotype"></div>
                </div>
                <div class="name"> 
                    {{ listDataCard.name }}
                </div>
            </div>
        </div>
     </div>
</div>
</template>
<script>
export default {
    props:["listDataCard"],
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
                margin-top: 2px;
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
                    margin-top: 2px;
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
}
</style>
