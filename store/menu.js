export const state = {
    manuSuperAdmin: [
        { text: 'หน้าแรก' , path: 'home' , icon: 'house' , status: false},
        { text: 'แจ้งลางาน' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'ค้นหาประวัติการลา' , path: 'search-history' , icon: 'search',status: false},
        { text: 'ประวัติการลา' , path: 'history' , icon: 'history',status: false},
    ],
    manuAdmin: [
        { text: 'หน้าแรก' , path: 'home' , icon: 'house' , status: false},
        { text: 'แจ้งลางาน' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'ค้นหาประวัติการลา' , path: 'search-history' , icon: 'search',status: false},
        { text: 'ประวัติการลาของฉัน' , path: 'history' , icon: 'history',status: false},
    ],
    manuEmployee: [
        { text: 'หน้าแรก' , path: 'home' , icon: 'house' , status: false},
        { text: 'แจ้งลางาน' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'ประวัติการลา' , path: 'history' , icon: 'history',status: false},
    ],
    manuIntern: [
        { text: 'หน้าแรก' , path: 'home' , icon: 'house' , status: false},
        { text: 'แจ้งลางาน' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'ประวัติการลา' , path: 'history' , icon: 'history',status: false},
    ],
}

export const mutations = {
    setStatusSelect (state , payload) {
        switch(payload.path){
            case '/superadmin/' : 
                state.manuSuperAdmin.forEach( (st) => { st.status = false })
                state.manuSuperAdmin[payload.index].status = true
                break;
            case '/admin/' : 
                state.manuAdmin.forEach( (st) => { st.status = false })
                state.manuAdmin[payload.index].status = true
                break;
            case '/employee/' :
                state.manuEmployee.forEach( (st) => { st.status = false })
                state.manuEmployee[payload.index].status = true
                break;
            case '/intern/' : 
                state.manuIntern.forEach( (st) => { st.status = false })
                state.manuIntern[payload.index].status = true
                break;
            default: break;
        }
    },
    setStatusSelectByLoadURL(state , payload){
        switch(payload.mainPath){
            case 'superadmin' : 
                state.manuSuperAdmin.forEach( (st) => {
                    if(st.path === payload.subPath){
                        st.status = true
                    }else{
                        st.status = false
                    }
                })
                break;
            case 'admin' : 
                state.manuAdmin.forEach( (st) => {
                    if(st.path === payload.subPath){
                        st.status = true
                    }else{
                        st.status = false
                    }
                })
                break;
            case 'employee' :
                state.manuEmployee.forEach( (st) => {
                    if(st.path === payload.subPath){
                        st.status = true
                    }else{
                        st.status = false
                    }
                })
                break;
            case 'intern' : 
                state.manuIntern.forEach( (st,i) => {
                    if(st.path === payload.subPath){
                        st.status = true
                    }else{
                        st.status = false
                    }
                })
                break;
            default: break;
        }
    }
}

export const actions = {}

export const getters = {}

