import axios from 'axios'
import auth from './auth'
 const student = {
    namespaced:true,
    state:{
        studentList:null,
        studentData:null,
        newStudentList:null,
    },
    getters:{
        studentList(state){
            return state.studentList

        },
        studentData(state){
            return state.studentData

        },
        newStudentList(state){
            return state.newStudentList
        }
    },
    mutations:{
        SET_STUDENTLIST(state,data){
            state.studentList = data.data;

        },
        SET_STUDENTDATA(state,data){
            state.studentData = data.data;

        },
        SET_NEWSTUDENTLIST(state,data){
            state.newStudentList = data;
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
        async getStudentDataById({commit},data){
            let response = await 
            axios.get('/users/'+data,{ 
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
        return commit('SET_STUDENTDATA', response.data)
        },
        newStudent({commit},data){
            commit('SET_NEWSTUDENTLIST',data)
        }
       
        
    },
    modules:{
        auth
    }
}
export default  student