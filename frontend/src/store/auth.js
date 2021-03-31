import axios from 'axios'
export default {
    namespaced:true,
    state:{
        token:null,
        user:null,
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
        }
    },
    actions:{
        async signIn ({dispatch},credentials){
            let response = await axios.post('/users/login',credentials)
            dispatch('attempt', response.data.token)
        },
        async attempt({commit},token){
            commit('SET_TOKEN',token)
            console.log(token);

            // try{

            // }catch(e){
                
            // }
        }
        
    },
    modules:{
    }
}