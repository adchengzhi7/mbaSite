<template>
  <div > 
     <student-page :isTA="isTA" :userData="userData"></student-page>
     <button @click="signOut"> sdsd</button>
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
import {mapActions, mapGetters} from 'vuex'

export default {
  mounted() {
    this.getData(this.userStuId)
  },
  
computed:{
    ...mapGetters({
      userStuId:'auth/userStuId',
      user:'auth/user'
      
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
       loginUser:'user/getloginuser',
      

    }),
      signOut(){
        this.signOutAction().then(() =>{
          this.$router.replace({
            name:"Home"
          })
        })
    },
    getData(id){
       this.loginUser(id);
    }
   
  },
data() {
    return {
      
      userData:{
        name:this.$store.state.auth.user,
        stuId:this.$store.state.auth.userStuId,
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
