<template>
  <div > 
     <student-page :isTA="isTA" :userData="userData"  ></student-page>
  
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
import {mapActions, mapGetters} from 'vuex'

export default {
  
  
computed:{
    ...mapGetters({
      userStuId:'auth/userStuId',
      user:'auth/user',
      userPoints:'userPoint/userPoints'

      
    }),
     isTA(){
       if(this.$store.state.auth.userType == 0) return false
       else return true
     }
  },
  components:{
    studentPage,
  },
  methods: {
    ...mapActions({
       getUserPoint:'userPoint/getUserPoint',
    }),
    getPointsData(id){
       let vm = this;
       vm.points = this.getUserPoint(id);
    }
  },
   mounted() {
       this.getPointsData('105306032')
     
  },
data() {
    return {
      userData:{
        name:this.$store.state.auth.user,
        stuId:this.$store.state.auth.userStuId,
      },
    }
  },

}
</script>
<style scoped>



</style>>
