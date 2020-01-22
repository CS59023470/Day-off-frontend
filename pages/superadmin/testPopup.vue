<template>
    <PopupFinish
        text="Can not reject"
        @eventClick="closeFail"
    />
</template>
<script>
import { mapState } from 'vuex'
import PopupFinish from "../../components/Popup/PopupFinish"
export default {
    components:{
        PopupFinish
    },
    data(){
        return{
            
        }
    },
    methods:{
        closeFail(){
            
        }
    }
}
</script>
<style lang="scss">

</style>