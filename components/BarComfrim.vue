<template>
    <div class="box-group-menu">
        <div class="box-menu-btn">
            <div class="menu-left">
                <button type="button" @click="returnEvent('personal')" v-bind:class="{menuSelected: positionMenu === 'personal'}">
                    {{textmenuleft}}
                </button>
                <div class="scoring">{{sizePersonal}}</div>
            </div>
            <div class="menu-middle">
                <button type="button" @click="returnEvent('sick')" v-bind:class="{menuSelected: positionMenu === 'sick'}">
                    {{textmenumiddle}}
                </button>
                <div class="scoring">{{sizeSick}}</div>
            </div>
            <div class="menu-right">
                <button type="button" @click="returnEvent('vacation')" v-bind:class="{menuSelected: positionMenu === 'vacation'}">
                    {{textmenuright}}
                </button>
                <div class="scoring">{{sizeVacation}}</div>
            </div>
        </div>
        <div class="box-line-active" v-bind:class="{positionpersonal: positionMenu === 'personal' , positionsick: positionMenu === 'sick' , positionvacation: positionMenu === 'vacation'}">
            <div class="line-status-active"></div>
        </div>
        </div>
</template>

<script>
export default {
    props:['textmenuleft','textmenumiddle','textmenuright','sizePersonal','sizeSick','sizeVacation'],
    data(){
        return{
            positionMenu : null,
            path: ''
        }
    },
    mounted(){
        this.path = this.$route.name
    },
    methods:{
        returnEvent(event){
            if(event === 'personal'){
                if(this.positionMenu !== 'personal'){
                    this.positionMenu = 'personal'
                }
            }else if(event === 'sick'){
                if(this.positionMenu !== 'sick'){
                    this.positionMenu = 'sick'
                }
            }else{
                if(this.positionMenu !== 'vacation'){
                    this.positionMenu = 'vacation'
                }
            }

            this.$emit('eventClick',event)
        }
    }
}
</script>

<style lang="scss" scoped>

$heightBtnMenu : 90%;
$heightLineActive : 10%;

.box-group-menu{
    height: 100%;
    width: 100%;
    background-color: #fff;
    overflow: hidden;

    .box-menu-btn{
        width: 100%;
        height: $heightBtnMenu;
        display: flex;

        .menu-left , .menu-right , .menu-middle{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            
            button{
                height: 100%;
                width: fit-content;
                margin: 0px;
                padding: 0px;
                border: none;
                outline: none;
                background-color: transparent;
                font-size: 16px;
            }
        }
    }

    .box-line-active{
        height: $heightLineActive;
        display: flex;
        justify-content: center;
        width: 50%;

        .line-status-active{
            height: 100%;
            width: 15%;
            background-color: #0f4c81;
            border-top-right-radius: 5px; 
            border-top-left-radius: 5px; 
        }
    }
}

.menuSelected{
    color: #0f4c81;
    font-size: 18px !important;
    font-weight: 400 !important;
}

.position1{
    margin-left: 0px;
    animation-name: slide1;
    animation-duration: 0.3s;
}
    @keyframes slide1 {
        0% {
            margin-left: 50%;
        }
        70%{
            margin-left: 52%;
        }
        100%{
            margin-left: 0px;
        }
    }

.position2{
    margin-left: 50%;
    animation-name: slide2;
    animation-duration: 0.3s;
}
    @keyframes slide2 {
        0% {
            margin-left: 0px;
        }
        70%{
            margin-left: -2%;
        }
        100%{
            margin-left: 50%;
        }
    }
/*-------------------------------------------------------------------*/
.scoring {
            width: fit-content;
            min-width: 20px;
            height: 20px;
            font-size: 12px;
            background-color: #0f4c81;
            border-radius: 50px;
            margin-left: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

</style>