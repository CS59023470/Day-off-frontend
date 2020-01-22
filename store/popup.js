export const state = {
    popup_confirm : false,
    popup_finish : false,
    popup_fail : false,
    popup_detail : false,
    popup_loader : false,
    popup_logout : false
}

export const mutations = {
    //loader
    showPopupLoader (state) {state.popup_loader = true},
    closePopupLoader (state) {state.popup_loader = false},
    //cpmfirm
    showPopupConfirm (state) {state.popup_confirm = true},
    closePopupConfirm (state) {state.popup_confirm = false},
    //fail
    showPopupFail (state) {state.popup_fail = true},
    closePopupFail (state) {state.popup_fail = false},
    //finish
    showPopupFinish (state) {state.popup_finish = true},
    closePopupFinish (state) {state.popup_finish = false},
    //detail
    showPopupDetail (state) {state.popup_detail = true},
    closePopupDetail (state) {state.popup_detail = false},
    //logout
    showPopuplogout (state) {state.popup_logout = true},
    closePopuplogout (state) {state.popup_logout = false},
    

}

export const actions = {}

export const getters = {}

