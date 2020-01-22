<template>
     <div class="box-nav">
        <div class="icon">
            <button class="btn_navber" type="button" @click="controMenu">
                <i class="material-icons">reorder</i>
            </button>
        </div>
        <div class="out">
            <button class="btn_navber" type="button" @click="clicklogout">
                <i class="material-icons">input</i>
            </button>
        </div>
        
    </div>
</template>

<script>



export default {    
    components:{
        
    },
    methods:{
        controMenu(){
            this.$emit('controMenu',true)
        },
        clicklogout() {
           this.$store.commit('popup/showPopuplogout')
        }
    },
     

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/StyleAllPage.scss";
    .box-nav{
        height: $heightFull;
        width: $widthFull;
        background-color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 2%;
    }

    .btn_navber{
        background-color: transparent;
        border: none;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;

        i{
            color: #ffffff;
            font-size:28px;
        }
    }

    .btn_navber:hover{
        i{
            color: #aaaaaa;
        }
    }
</style>
