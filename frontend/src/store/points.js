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
            let response = await 
            axios.get('/points/'+credentials,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
             })
             .then(function (response) {
                 if(response.data.success ==0){
                    throw "invalid Token";
                 }
                 return response;
              })
              .catch(function (response,error) {
                  console.log(response);
                   throw error;
              });
        return dispatch('getUserPointCommit', response.data)



        },
        getUserPointCommit({commit},data){
            return commit('SET_USERPOINTS',data)
        },
        async insertUserPoint({dispatch},credentials){
            let response = await axios.post('/points/',credentials,{
                    headers:{'Authorization':'Bearer ' +auth.state.token }
            }).then(
                dispatch('getUserPoint', credentials.stuId)
            )
            return response;

            

        }
       
        
    },
    modules:{
        auth
    }
}
export default  points