import {createStore } from 'vuex'
import auth from './auth'
import points from './points'
import student from './student'

export default createStore({
    state:{
        currentRegPointUser:null,

    },
    getters:{
        currentRegPointUser(state){
            return state.currentRegPointUser
        }
    },
    mutations:{
        SET_CURRENTREGPOINTUSER(state,payload){
            state.currentRegPointUser = payload;
        }
    },
    actions:{
        regStudentIs({commit},data){
            commit('SET_CURRENTREGPOINTUSER',data)
        }
    },
    modules:{
        userPoint:points,
        auth:auth,
        student:student,
    }
})