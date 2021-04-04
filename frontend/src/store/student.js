import axios from 'axios'
import auth from './auth'
 const student = {
    namespaced:true,
    state:{
        studentList:null,
    },
    getters:{
        studentList(state){
            return state.studentList

        },
    },
    mutations:{
        SET_STUDENTLIST(state,data){
            state.studentList = data.data;

        }
        
        
    },
    actions:{
        async getStudentList  ({dispatch}){
            let response = await 
            axios.get('/users/',{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
             })
             .then(function (response) {
                 if(response.data.success ==0){
                    throw "invalid Token";
                 }
                 return response;
              })
              .catch(function (error) {
                   throw error;
              });
        return dispatch('studentListCommit', response.data)



        },
        studentListCommit({commit},data){
            return commit('SET_STUDENTLIST',data)
        },
       
        
    },
    modules:{
        auth
    }
}
export default  student