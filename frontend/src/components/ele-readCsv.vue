<template>
    <div class="p-5">
        <input type="file" @change="test"  accept=".csv">
        <div class="text-muted"> 共 {{countCsv}} 比資料
        </div>
        <div v-if="iserror" class="text-danger">
            {{error}}
        </div>
    </div>
</template>

<script>

import {mapActions} from 'vuex'
import {csv} from "csvtojson";  

export default {
    
    component:{
    },
    data() {
    return {
        jsonData:[],
        iserror:false,
        error:"檔案資料格式錯誤",
    }
},
computed:{
    countCsv(){
        let vm =this;
        let length =vm.jsonData.length;
        if(length >0){
            vm.newStudent(vm.jsonData)
            return  length
        }else{
           
            return 0
        } 
            
    }
},
methods: {
...mapActions({
    newStudent:'student/newStudent'
}),
    async test(input){
        let vm =this;
        if(input.target.files && input.target.files[0]){
        let tmppath = URL.createObjectURL(input.target.files[0]);
        const res = await fetch(tmppath);
        const text = await res.text();
        const jsonArray = await csv().fromString(text);
        vm.jsonData = jsonArray;
        if(jsonArray.length === 0){
             vm.iserror= true;
        }

        }
    },
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