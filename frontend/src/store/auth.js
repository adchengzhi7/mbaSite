import axios from 'axios'
import jwt_decode from "jwt-decode";
export default {
    namespaced:true,
    state:{
        token:null,
        user:null,
        invalidUserMsg:null,
    },
    getters:{
        authenticated(state){
            return state.token && state.user
        },
        user(state){
            return state.user
        },
        invalidUserMsg(state){
            return state.invalidUserMsg
        }
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
        },
        SET_USER(state,user){
            state.user = user
        },
        SET_invalidUserMsg(state,data){
            state.invalidUserMsg = data
        }
    },
    actions:{
        async signIn ({dispatch},credentials){
            let response = await axios.post('/users/login',credentials)
            return dispatch('attempt', response.data)
        },
        async attempt({commit,state},data){
            if(data.token){
                commit('SET_TOKEN',data.token)
            }
            if(!state.token){
                commit('SET_invalidUserMsg',data.message)

            }
            try {
                let decoded = jwt_decode(data.token);
                commit('SET_USER',decoded.result)
            } catch (e) {
                commit('SET_TOKEN',null)
                commit('SET_USER',null)
            }
        },
        signOut({commit}){
            commit('SET_TOKEN',null)
            commit('SET_USER',null)
        }
        
    },
    modules:{
    }
}