<template>
    <div class="p-5">
   <vue-csv-import 
    v-model="csv"
    :fields="{name: {required: true, label: 'Name'}, age: {required: true, label: 'Age'}}"
    >   
    
    <vue-csv-errors ></vue-csv-errors>

    <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> Custom Upload
    </label>
    <vue-csv-input id="file-upload"></vue-csv-input>

    <vue-csv-toggle-headers v-slot="{toggle,hasHeaders}">
        <div class="form-check form-switch" >
        <label v-if="hasHeaders == true" class="form-check-label" for="flexSwitchCheckChecked" >移除表頭</label>
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="toggle" >
             </div>
     </vue-csv-toggle-headers>
     
        
    <vue-csv-map  :auto-match="true" v-slot="{sample, map, fields}">
        <div>{{sample}}</div>
        <div>{{map}}</div>
        <div>{{fields}}</div>
    </vue-csv-map>
    
</vue-csv-import>
    <drop></drop>
    </div>
</template>

<script>
import {VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport} from 'vue-csv-import';

export default {
    component:{
        VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, 
        VueCsvInput, VueCsvErrors, VueCsvImport
    },
    data() {
    return {
        csv:'',
        file:'',

    }
},

methods: {
    check(ele){
        this.$emit(ele);
    },
    get() {
            this.$refs.file.click();
        },
    
    handleFileUpload: function () {
                let file = this.$refs.file.files[0];
                this.file= file
                this.fileIn =file
                console.log(file);
                
            },
     
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