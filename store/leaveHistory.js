export const state = {
    history_search: [],
    listAllUser: [],
    userId_select: ''
}

export const mutations = {
    setHistoryAllBySearch (state, payload) {
        state.history_search = payload
    },
    setSearchListName (state, payload) {
        state.listAllUser = payload
    },
    setUserIdBySelect (state,payload) {
        state.userId_select = payload
    }
}

export const actions = {

}

export const getters = {
}

