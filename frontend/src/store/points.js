import axios from 'axios'
import auth from './auth'
 const points = {
    namespaced:true,
    state:{
        userPoints:null,
    },
    getters:{
        userPoints(state){
            return state.userPoints

        },
    },
    mutations:{
        SET_USERPOINTS(state,data){
            state.userPoints = data.data;

        }
        
        
    },
    actions:{
        async getUserPoint  ({dispatch},credentials){
            let response = await axios.get('/points/'+credentials,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
            })
        return dispatch('getUserPointCommit', response.data)



        },
        getUserPointCommit({commit},data){
            return commit('SET_USERPOINTS',data)

        }
       
        
    },
    modules:{
        auth
    }
}
export default  points