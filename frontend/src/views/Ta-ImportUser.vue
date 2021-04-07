<template>
  <div > 
     <read-csv ></read-csv>
     <div class="row">
       <div class="col"></div>
       <div class="col-8">
        <customTable :filter="filter" :studentList="newStudentList">   </customTable>
       </div>
       <div class="col"></div>
     </div>
  </div>
</template>

<script>
import readCsv from "../components/ele-readCsv"
import customTable from "../components/ele-tableTAImport"
import { mapGetters } from "vuex";

export default {

  components:{
    readCsv,customTable
  },
  computed: {
    ...mapGetters({
      newStudentList:'student/newStudentList'
    })
  },
  methods: {
    
  },
data() {
    return {
      filter:"",
        studentList:[{
            stuId:"105306030",
            totalPoint:"123",
            cName:"123"
                
        }],
    }
  },

}
</script>
<style scoped>



</style>>
