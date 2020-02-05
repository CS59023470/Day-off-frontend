export const state = {
    iconBack:false,
}

export const mutations ={
    showNavbarBack(state) {
        state.iconBack = true
    },
    showNavbarManu(state) {
        state.iconBack = false
    }
}