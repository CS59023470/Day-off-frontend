import moment from 'moment'

export const state = {
    history_search: [],
    listAllUser: [],
    cardAdmin: ''
}

export const mutations = {
    setHistoryAllBySearch (state, payload) {
        state.history_search = payload
    },
    setSearchListName (state, payload) {
        state.listAllUser = payload
    },
    setCardAdmin (state,payload) {
        state.cardAdmin = payload
    }
}

export const actions = {

}

export const getters = {
}

