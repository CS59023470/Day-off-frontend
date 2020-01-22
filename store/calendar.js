export const state = {
    keyColorCalendar: {
        color_Holiday: '#0B8043',
        color_sick_leave: '#B84C4C',
        color_personal_leave: '#4C86B8',
        color_vacation_leave: '#F97111',
    },
    list_event_all: []
}

export const mutations = {
    updateListEvent (state, payload) {
        state.list_event_all = payload
    }
}

export const actions = {}

export const getters = {}

