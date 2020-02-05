export const state = {
    manuSuperAdmin: [
        { text: 'Home' , path: 'home' , icon: 'house' , status: false},
        { text: 'Leave Request Form' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'Company Leave History' , path: 'search-history' , icon: 'search',status: false},
        { text: 'My Leave History' , path: 'history' , icon: 'history',status: false},
    ],
    manuAdmin: [
        { text: 'Home' , path: 'home' , icon: 'house' , status: false},
        { text: 'Leave Request Form' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'Company Leave History' , path: 'search-history' , icon: 'search',status: false},
        { text: 'My Leave History' , path: 'history' , icon: 'history',status: false},
    ],
    manuEmployee: [
        { text: 'Home' , path: 'home' , icon: 'house' , status: false},
        { text: 'Leave Request Form' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'My Leave History' , path: 'history' , icon: 'history',status: false},
    ],
    manuIntern: [
        { text: 'Home' , path: 'home' , icon: 'house' , status: false},
        { text: 'Leave Request Form' , path: 'formRequest' , icon: 'send', status: false},
        { text: 'My Leave History' , path: 'history' , icon: 'history',status: false},
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

