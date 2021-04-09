<template>
    <div class="p-5">
        <input type="file" @change="getCsvData"  accept=".csv">
        <div class="text-muted"> 共 {{countCsv}} 比資料
        </div>
        <div v-if="iserror" class="text-danger">
            {{error}}
        </div>
        <div v-if="loadingPrecentage == 100" class="text-success">
            {{isDone}}
        </div>
        <div v-if="countCsv !=0" class="btn btn-success success" @click="addUser">匯入名單</div>
    </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
import {csv} from "csvtojson";  

export default {
    
    component:{
    },
    data() {
    return {
        isDone:'',
        jsonData:[],
        iserror:false,
        error:"檔案資料格式錯誤",
    }
},
computed:{
    ...mapGetters({
        newStudentList:'student/newStudentList',
        loadingPrecentage:'student/loadingPrecentage'
    }),
    countCsv(){
        let vm =this;
        let length =vm.jsonData.length;
        if(length >0){
            vm.newStudent(vm.jsonData)
            return  length
        }else{
            vm.setNewStudentNull()
            return 0
        } 
            
    }
},
methods: {
...mapActions({
    newStudent:'student/newStudent',
    setNewStudentNull:'student/setNewStudentNull',
    insertStudentasList:'student/insertStudentasList'
}),
    async getCsvData(input){
        let vm =this;
        if(input.target.files && input.target.files[0]){
        let tmppath = URL.createObjectURL(input.target.files[0]);
        const res = await fetch(tmppath);
        const text = await res.text();
        const jsonArray = await csv().fromString(text);
        vm.jsonData = jsonArray;
        if(jsonArray.length === 0){
            vm.setNewStudentNull();
             vm.iserror= true;
        }

        }
    },
    async addUser(){
        let vm = this;
        const userList = vm.newStudentList;
        vm.insertStudentasList(userList)
        .catch((err)=>{
            throw err
        }).then(
            vm.isDone ="匯入完成"
        )
        
    }
},
}
</script>
<style scoped>
/* input[type="file"] {
    position: fixed;
    right: 100%;
    bottom: 100%;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 60px 120px;
    cursor: pointer;
} */
</style>