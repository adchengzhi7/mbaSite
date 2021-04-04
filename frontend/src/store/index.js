import {createStore } from 'vuex'
import auth from './auth'
import points from './points'
import student from './student'

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
        userPoint:points,
        auth:auth,
        student:student,
    }
})