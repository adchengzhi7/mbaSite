<template>
    <div class="p-5">
   <vue-csv-import 
    v-model="csv"
    :fields="{
        name: {required: true, label: 'Name'}, personalid: {required: true, label: 'personalid'},
        studentid: {required: true, label: 'studentid'}, email: {required: true, label: 'email'}
    }"
    :text="text"
    v-slot="{errors}"
    >   
    
  

    <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i>上傳CSV
    </label>
    <div class="text-danger font-weight-boldest" :key="index" v-for="(error,index) in errors">
    {{error}}
    </div>
    <vue-csv-input id="file-upload"></vue-csv-input>

        <vue-csv-toggle-headers v-slot="{hasHeaders, toggle}">
            <div>
            <button v-if="hasHeaders" @click.prevent="toggle">包含標題</button>
            <button v-else @click.prevent="toggle">不包含標題</button>
            </div>
        </vue-csv-toggle-headers>
        
    <vue-csv-map  :auto-match="true" v-slot="{sample, map}">
        <div class="d-none">
            <div>{{sample}}</div>
                 <div>{{map}}</div>
        </div>
        
    </vue-csv-map>
    
</vue-csv-import>
    {{countCsv}}
    </div>
</template>

<script>

import {VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport} from 'vue-csv-import';
import {mapActions} from 'vuex'


export default {
    component:{
        VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, 
        VueCsvInput, VueCsvErrors, VueCsvImport,
    },
    data() {
    return {
        text:{
            "errors": {
                "fileRequired" : "至少選擇一個檔案",
                "invalidMimeType" : "檔案類型錯誤❌"
            },
            "toggleHeaders": "File has headers",
            "submitBtn": "Submit",
            "fieldColumn": "Field",
            "csvColumn": "Column"
        },
        csv:[],
        file:'',

    }
},
computed:{
    countCsv(){
        let length =this.csv.length;
        let vm = this;
        if(length >0){
            vm.newStudent(vm.csv)
            return  this.csv.length
        }
        else return 0
    }
},
methods: {
...mapActions({
    newStudent:'student/newStudent'
})
   
},
}
</script>
<style scoped>
input[type="file"] {
    position: fixed;
    right: 100%;
    bottom: 100%;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 60px 120px;
    cursor: pointer;
}
</style>