import {createStore } from 'vuex'
import auth from './auth'
import points from './points'
import student from './student'

export default createStore({
    state:{
        currentRegPointUser:null,
        windowWidth:null,
        avatar:null,

    },
    getters:{
        currentRegPointUser(state){
            return state.currentRegPointUser
        },
        windowWidth(state){
            return state.windowWidth
        },
        avatar(state){
            return state.avatar
        }
    },
    mutations:{
        SET_CURRENTREGPOINTUSER(state,payload){
            state.currentRegPointUser = payload;
        },
        SET_WINDOWWIDTH(state,payload){
            state.windowWidth = payload;
        },
        SET_AVATAR(state,payload){
            state.avatar = payload;
        }
        
        
    },
    actions:{
        regStudentIs({commit},data){
            commit('SET_CURRENTREGPOINTUSER',data)
        },
        getWidth({commit}){
            let width = window.innerWidth;
            commit("SET_WINDOWWIDTH",width)
        },
        avatarImg({commit},id){
            let sex ="male"
            let random =id;
            let api = "https://avatars.dicebear.com/v2/"+ sex +"/"+ random+".svg?background=%23d3d3d3";
            commit("SET_AVATAR",api)
          }
    },
    modules:{
        userPoint:points,
        auth:auth,
        student:student,
    }
})