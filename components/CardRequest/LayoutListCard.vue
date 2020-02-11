<template>
    <div class="list-card-wrapper">
        <div class="layout-title-card content_center">
            <div class="content-title-card display_row">
                <div class="title-card-icon content_center">
                    <i class="material-icons">list_alt</i>
                </div>
                <div class="title-card-text centent_left">
                    <label style="font-family: roboto;">Leave Request</label>
                </div>
            </div>
        </div>
        <div v-if="listCardRequest === null" class="layout-list-card content_center" style="background-color: #fff">
            <div class="box_not_found">
                <div class="icon_not_found content_center">
                    <i class="material-icons">cloud_off</i>
                </div>
                <div class="text_not_found content_center">Data Not Found</div>
            </div>
        </div>
        <div v-else-if="listCardRequest.length === 0" class="layout-list-card" style="background-color: #fff">
            <LoadingPage/>
        </div>
        <div v-else class="layout-list-card">
            <div class="list_card" v-for="(list, index) in listCardRequest" :key="index">    
                <CardRequest
                    :statusUser="list.statusUser"
                    :datashow="list.datashow"
                    :indexData="index"
                    @clickBtnCard="clickBtnCard"
                    @eventShowDetail="clickShowDetail"
                />
            </div>
        </div>
        <PopupConfirm 
            v-if="popupConfirm"
            :controPopup="propsConfirm"
            @eventClick="clickConfirm"
        />
         <PopupLoader 
            v-if="popupLoader"
        />
        <PopupFinish 
            v-if="popupFinish"
            :text="propsFinish.text"
            :status="status_select"
            @eventClick="closeFinish"
        />
        <PopupFail
            v-if="popupFail"
            :text="propsFail.text"
            @eventClick="closeFail"
        />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CardRequest from "./CardRequest";
import LoadingPage from "../LoadingPage";
import PopupConfirm from "../Popup/PopupConfirm"
import PopupLoader from "../Popup/PopupLoader"
import PopupFinish from "../Popup/PopupFinish"
import PopupFail from "../Popup/PopupFail"
import Provider from '../../service/provider'
const provider = new Provider()

export default {
    props:['listCardRequest'],
    components:{
        CardRequest,
        LoadingPage,
        PopupConfirm,
        PopupLoader,
        PopupFinish,
        PopupFail
    },
    data(){
        return{
            api: provider,
            propsConfirm: {
                title_popup_confirm: '',
                color_popup: ''
            },
            propsFinish: {
                text: ''
            },
            propsFail: {
                text: ''
            },
            data_index: null,
            status_select: null,
        }
    },
    methods:{
        clickShowDetail(index){
            this.$emit('showPopupDetail',this.$props.listCardRequest[Number(index)])
        },
        clickBtnCard(data){
            this.propsConfirm.title_popup_confirm = data.title_popup_confirm
            this.propsConfirm.color_popup = data.status_select
            this.status_select = data.status_select
            this.data_index = data.index_data
            this.$store.commit('popup/showPopupConfirm')
        },
        clickConfirm(status){
            this.$store.commit('popup/closePopupConfirm')
            this.$store.commit('popup/showPopupLoader')
            let dataLogin = JSON.parse(localStorage.getItem('userprofile'))
            let rowId = this.$props.listCardRequest[this.data_index].datashow.rowId
            if(this.status_select === 'APPROVE'){
                let result = this.api.updateLeaveRequest(rowId, dataLogin.userId)
                result.then(re => {
                    this.$store.commit('popup/closePopupLoader')
                    if(re.status){
                        this.propsFinish.text = re.text
                        this.$store.commit('popup/showPopupFinish')
                    }else{
                        this.propsFail.text = re.text
                        this.$store.commit('popup/showPopupFail')
                    }
                })
            }else{
                let result = this.api.removeLeaveRequest(rowId, dataLogin.userId)
                result.then(re => {
                    this.$store.commit('popup/closePopupLoader')
                    if(re.status){
                        this.propsFinish.text = re.text
                        this.$store.commit('popup/showPopupFinish')
                    }else{
                        this.propsFail.text = re.text
                        this.$store.commit('popup/showPopupFail')
                    }
                })
            }
        },
        closeFinish(){
            this.$store.commit('popup/closePopupFinish')
            window.location.reload()
        },
        closeFail(){
            this.$store.commit('popup/closePopupFail')
            window.location.reload()
        }
    },
    computed: {
        ...mapState({
            popupConfirm: state => state.popup.popup_confirm,
            popupLoader: state => state.popup.popup_loader,
            popupFinish: state => state.popup.popup_finish,
            popupFail: state => state.popup.popup_fail,
        })
    },
}
</script>
<style lang="scss" scoped>
$heightFull: 100%;
$widthFull: 100%;
$heightTitleCard: 9%;
$heightListCard: $heightFull - $heightTitleCard;

.list-card-wrapper{
    width: $widthFull;
    height: $heightFull;

    .layout-title-card{
        width: $widthFull;
        height: $heightTitleCard;
        background-color: #00294d;

        .content-title-card{
            width: 60%;
            height: 50%;

            .title-card-icon{
                height: 100%;
                width: 25%;
    
                .material-icons{
                    color: #fff;
                    font-size: 22px;
                }
            }

            .title-card-text{
                height: 100%;
                width: 75%;
                font-family: roboto;

                label{
                    font-size: 18px;
                    color: #fff;
                    font-weight: 400;
                }
            }
        }
    }

    .layout-list-card{
        width: $widthFull;
        height: $heightListCard;
        max-height: $heightListCard;
        overflow: auto;
        padding: 10px 20px;

        .box_not_found{
            width: 100%;
            .icon_not_found{
                color: rgba(0,0,0,0.1);
                .material-icons{
                    font-size: 60px;
                }
            }

            .text_not_found{
                color: rgba(0,0,0,0.2);
                font-family: roboto;
            }

        }

        .list_card{
            width: 100%;
            height: 200px;
            margin-bottom: 20px;
        }
    }
}
</style>