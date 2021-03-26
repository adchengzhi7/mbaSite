import {createStore } from 'vuex'

export default createStore({
    state:{
        greeting:"greeting"
    },
    mutations:{
        setgreeting(state,payload){
            state.greeting = payload;
        }
    },
    actions:{
        async fetchData({commit}){
            
            const a="okla"

            commit('setgreeting',a)
          

        }
    },
    modules:{}
})