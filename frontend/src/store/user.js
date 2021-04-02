import axios from 'axios'
import auth from './auth'
 const user = {
    namespaced:true,
    state:{
        
    },
    getters:{
        
    },
    mutations:{
        SET_LOGINUSER(state,data){
            console.log(state,data);
        }
        
    },
    actions:{
        async getloginuser  ({commit},credentials){
            let response = await axios.get('/users/'+credentials,{ 
                // params: { stuId: credentials },
                headers:{'Authorization':'Bearer ' +auth.state.token }
            })
            commit('SET_LOGINUSER',response.data)

        },
       
        
    },
    modules:{
        auth
    }
}
export default  user