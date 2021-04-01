<template>
  <div > 
     <student-page :isTA="isTA" :userData="userData"></student-page>
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
import {mapActions} from 'vuex'
export default {
computed:{
     greeting(){
       return this.$store.state.greeting;
     }
  },
  components:{
    studentPage,
  },
  
  methods: {
    ...mapActions(['fetchData']),
    check(){
      this.fetchData();
    }
  },
data() {
    return {
      isTA:false,
      userData:{
        name:"李正治",
        stuId:"105306030",
        points:[
          {
            type:"",
            point:"1"
          },{
            type:"",
            point:"1"
          },
        ]
      },
      
   
      
    }
  },

}
</script>
<style scoped>



</style>>
