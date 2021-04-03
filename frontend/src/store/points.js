import axios from 'axios'
import auth from './auth'
 const points = {
    namespaced:true,
    state:{
        userPoints:null,
        userPointsLength:0,
    },
    getters:{
        userPoints(state){
            return state.userPoints

        },
        userPointsLength(state){
            return state.userPointsLength

        },
    },
    mutations:{
        SET_USERPOINTS(state,data){
            state.userPoints = data.data;
            state.userPointsLength = data.data.length;

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