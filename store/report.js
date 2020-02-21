export const state = {
    list_leave: [],
    data_filter: [],
    list_user: []
}

export const mutations = {    
    setLeaveReport(state , payload){
      state.list_leave = payload
    },
    setFilterReport(state , payload){
      state.data_filter = payload
    },
    setAlluser(state , payload){
      state.list_user = payload
    }
}

export const actions = {}

export const getters = {}