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
            dispatch('errorMsg',response.data)
            return dispatch('attempt', response.data.token)
        },
        errorMsg({commit},data){
            return  commit('SET_invalidUserMsg',data.message)
        },
        async attempt({commit,state},token){
            if(token){
                commit('SET_TOKEN',token)
            }
            if(!state.token){
                return

            }
            try {
                let decoded = jwt_decode(token);
                commit('SET_USER',decoded.result.usersDetails_cName)
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