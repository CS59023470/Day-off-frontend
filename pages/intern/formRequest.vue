<template>
<div class="form-request-wrapper content_center">
    <div v-if="statusload === false" class="layout_form content_center">
        <div class="content_form">
            <FormRequest @form_request="onsubmit"/>
        </div>
    </div>
    <div v-else class="layout_loadder">
        <LoadingPage/>
    </div>
     <PopupConfirm 
            v-if="popupConfirm"
            :controPopup="propsConfirm"
            @eventClick="clickConfirm"
        />
    <PopupFinish 
        v-if="popupFinish"
        :text="textFinish"
        @eventClick="clickFinish"
    />
</div>
</template>
<script>
import { mapState } from 'vuex'
import FormRequest from "../../components/FormRequest"
import LoadingPage from "../../components/LoadingPage"
import PopupConfirm from "../../components/Popup/PopupConfirm"
import PopupFinish from "../../components/Popup/PopupFinish"
import Provider from '../../service/provider'
const provider = new Provider()
export default {
    components: {
        FormRequest,
        LoadingPage,
        PopupConfirm,
        PopupFinish
    },
    data(){
        return {
            api : provider,
            dataForm: null,
            textFinish: '',
            propsConfirm: {
                title_popup_confirm: 'ยืนยันการลา',
                color_popup: 'APPROVE'
            }
        }
    },
    methods: {
        onsubmit(data){
            this.dataForm = data
            this.$store.commit('popup/showPopupConfirm')
        },
        clickConfirm(status){
            this.$store.commit('popup/closePopupConfirm')
            if(status === true){
                this.$store.commit('formRequest/setloader', true)
                let result = this.api.addFormLeaveRequest(this.dataForm) 
                result.then(re => {
                    this.textFinish = re.text
                    this.$store.commit('formRequest/setloader', false)
                    this.$store.commit('popup/showPopupFinish')
                })
            }
        },
        clickFinish(event){
            //this.$router.push(this.pathDefult+'home')
            //window.location.reload(this.pathDefult+'home')
            window.location.href = this.pathDefult+'home'
        }
    },
    computed: {
        ...mapState({
            pathDefult: state => state.pathDefult.path,
            statusload: state => state.formRequest.loading,
            popupConfirm: state => state.popup.popup_confirm,
            popupFinish: state => state.popup.popup_finish
        })
    },
    asyncData(context) {
        context.store.commit('formRequest/setloader', true)
        let user = JSON.parse(localStorage.getItem('userprofile'))
        let result_check_holiday = provider.checkSpecialholiday(user.userId)

        result_check_holiday.then((re_holiday) => {

            let result_user = provider.getUserFormRequest(user.userId)
            let result_weekend = provider.getAllWeekendCompany()
            let result_dayoff = provider.getAllDayoffCompany()
            let result_configday = provider.getConfigDay()

            result_user.then((re_user) => {
                context.store.commit('formRequest/setUserdayleft', re_user[0])

                result_weekend.then((re_weekend) => {
                    context.store.commit('formRequest/setWeekend', re_weekend)

                    result_dayoff.then((re_dayoff) => {
                        context.store.commit('formRequest/setDayoff', re_dayoff)
                        
                        result_configday.then((re_config) => {
                            context.store.commit('formRequest/setConfigDay', re_config[0])
                            context.store.commit('formRequest/setloader', false)
                        })
                    })
                })
            })
        })
        return {status:true}
    }
}
</script>

<style lang="scss">
.form-request-wrapper{
    width: 100%;
    height: 100%;
    max-height: fit-content;
    
    .layout_form{
        width: 100%;
        height: 100%;
        padding: 20px 0px;

        .content_form{
            background-color: #fff;
            width: 45%;
            min-height: 100%;
            height: fit-content;
            border-radius: 10px;
            padding: 20px;
        }
    }

    .layout_loadder{
        background-color: #fff;
        width: 100%;
        height: 100%;
    }
}
</style>