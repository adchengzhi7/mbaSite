import {createStore } from 'vuex'
import auth from './auth'
import loginUser from './user'

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
            console.log(this.$axios);
            
            const a="okla"

            commit('setgreeting',a)
          

        }
    },
    modules:{
        user:loginUser,
        auth:auth,
    }
})