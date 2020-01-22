import moment from 'moment'

export const state = {
    statusLoadData: true,
    loading: true,
    configDay: null,
    userdayleft: null,
    week_end: null,
    day_off: null
}

export const mutations = {
    setStatusLoadData (state, payload) {
        state.statusLoadData = payload
    },
    setloader (state, payload) {
        state.loading = payload
    },
    setConfigDay (state, payload){
        state.configDay = payload
    },
    setUserdayleft (state, payload) {
        state.userdayleft = payload
    },
    setWeekend (state, payload) {
        state.week_end = payload
    },
    setDayoff (state, payload) {
        state.day_off = payload
    },
}

export const actions = {

}

export const getters = {

    getWeekendModel (state) {
        let list_week_end = []

        state.week_end.forEach(week => {
            if(week.status === 'YES'){
                list_week_end.push(Number(week.dayofweek))
            }
        })

        return list_week_end
    },

    getDayoffCompany (state) {
        let list_day_off = []

        state.day_off.forEach(r => {
            if(r.status === 'One day'){
                let opj_date_off = {
                    startdate: r.startdate,
                    enddate: r.startdate,
                    description: r.description
                }
                list_day_off.push(opj_date_off)
            }else{
                let array_start = r.startdate.split('-')
                let array_end = r.enddate.split('-')
                let start = moment([Number(array_start[0]), (Number(array_start[1])-1), Number(array_start[2])]);
                let end = moment([Number(array_end[0]), (Number(array_end[1])-1), Number(array_end[2])]);
                let between = end.diff(start, 'days') + 1

                for(let i = 0 ; i < between ; i++){
                    let d = new Date(r.startdate)
                    let d2 = d.setDate(d.getDate() + i)
                    let opj_date_off = {
                        startdate: moment(d2).format('YYYY-M-D'),
                        enddate: moment(d2).format('YYYY-M-D'),
                        description: r.description
                    }
                    list_day_off.push(opj_date_off)
                }
            }
        })

        return list_day_off
    }
}

