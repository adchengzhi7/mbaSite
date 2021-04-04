<template>
  <div > 
     <student-page :key="ConfirmGetUserId" :userData="userData" :isTA="isTA" :userPoints="userPoints"></student-page>
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
import {mapActions, mapGetters} from 'vuex'

export default {

  components:{
    studentPage,
  },
  mounted() {
    let vm =this;
    try{
      vm.userData.stuId= vm.$route.params.stuId;
      vm.userData.name= vm.$route.params.name;
    }catch(e){
      console.log(e);
    }
    
  },
  computed:{
    ...mapGetters({
      user:'auth/user',
      userPoints:'userPoint/userPoints'

      
    }),
     isTA(){
       if(this.$store.state.auth.userType == 0) return false
       else return true
     },
     ConfirmGetUserId(){
      if(this.$route.params.stuId){
           return this.getPointsData(this.$route.params.stuId)

          }
          return null
     }
  },
  
  methods: {
     ...mapActions({
       getUserPoint:'userPoint/getUserPoint',
      signOutAction:'auth/signOut'

    }),
     getPointsData(id){
       let vm = this;
         vm.points = this.getUserPoint(id)
         .catch(function(e){
           vm.signOutAction().then(() =>{
             vm.$router.replace({
               name:"Home"
          })
          })
          console.log(e);
          })
         
    }
    
  },
data() {
    return {
       userData:{
        name:"",
        stuId:"",
      },
      
   
      
    }
  },

}
</script>
<style scoped>



</style>>
