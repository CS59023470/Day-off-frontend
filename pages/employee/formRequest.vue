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
        :status="propsConfirm.color_popup"
        @eventClick="clickFinish"
    />
    <PopupFail
        v-if="popupFail"
        :text="propsFailContent.text"
        @eventClick="closeFail"
    />
    <PopupLoader 
        v-if="popupLoader"
    />
</div>
</template>
<script>
import { mapState } from 'vuex'
import FormRequest from "../../components/FormRequest"
import LoadingPage from "../../components/LoadingPage"
import PopupConfirm from "../../components/Popup/PopupConfirm"
import PopupFinish from "../../components/Popup/PopupFinish"
import PopupFail from "../../components/Popup/PopupFail"
import PopupLoader from "../../components/Popup/PopupLoader"
import Provider from '../../service/provider'
const provider = new Provider()
export default {
    components: {
        FormRequest,
        LoadingPage,
        PopupConfirm,
        PopupFinish,
        PopupFail,
        PopupLoader
    },
    data(){
        return {
            api : provider,
            dataForm: null,
            textFinish: '',
            statusFinish: '',
            propsFailContent: {
                text: ''
            },
            propsConfirm: {
                title_popup_confirm: 'Are you sure to send the request?',
                color_popup: 'APPROVE'
            }
        }
    },
    mounted(){
        if(this.loadData){
            this.loadDataForm()
        }
    },
    methods: {
        loadDataForm(){
            this.$store.commit('formRequest/setloader', true)
            let user = JSON.parse(localStorage.getItem('userprofile'))
            let result_check_holiday = provider.checkSpecialholiday(user.userId)
            result_check_holiday.then((re_holiday) => {
                let result_user = provider.getUserFormRequest(user.userId)
                let result_weekend = provider.getAllWeekendCompany()
                let result_dayoff = provider.getAllDayoffCompany()
                let result_configday = provider.getConfigDay()
                let result_checkdate = provider.checkDaybyid(user.userId)
                
                result_checkdate.then((re_date) => {
                    this.$store.commit('formRequest/setCheckdate', re_date)

                    result_user.then((re_user) => {
                        this.$store.commit('formRequest/setUserdayleft', re_user[0])

                        result_weekend.then((re_weekend) => {
                            this.$store.commit('formRequest/setWeekend', re_weekend)

                            result_dayoff.then((re_dayoff) => {
                                this.$store.commit('formRequest/setDayoff', re_dayoff)
                                
                                result_configday.then((re_config) => {
                                    this.$store.commit('formRequest/setConfigDay', re_config[0])
                                    this.$store.commit('formRequest/setloader', false)
                                    this.$store.commit('formRequest/setStatusLoadData', false)
                                })
                            })
                        })
                    })
                })
            })
        },
        onsubmit(data){
            this.dataForm = data
            this.$store.commit('popup/showPopupConfirm')
        },
        clickConfirm(status){
            this.$store.commit('popup/closePopupConfirm')
            if(status === true){
                this.$store.commit('popup/showPopupLoader')
                let result = this.api.addFormLeaveRequest(this.dataForm) 
                result.then(re => {
                    if(re.status){
                        this.textFinish = re.text
                        this.$store.commit('popup/closePopupLoader')
                        this.$store.commit('popup/showPopupFinish')
                    }else{
                        this.$store.commit('popup/closePopupLoader')
                        this.propsFailContent.text = re.text
                        this.$store.commit('popup/showPopupFail')
                        window.location.reload()
                    }
                })
            }
        },
        clickFinish(event){
            window.location.href = this.pathDefult+'home'
        }
    },
    computed: {
        ...mapState({
            loadData: state => state.formRequest.statusLoadData,
            pathDefult: state => state.pathDefult.path,
            statusload: state => state.formRequest.loading,
            popupConfirm: state => state.popup.popup_confirm,
            popupFinish: state => state.popup.popup_finish,
            popupFail: state => state.popup.popup_fail,
            popupLoader: state => state.popup.popup_loader,
        })
    },
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