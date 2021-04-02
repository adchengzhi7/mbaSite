<template>
  <div class="home d-flex ">
    <div class="login-box">
      <div class="container p-50">
        <div class="h1 title-blue"> 政大MBA </div>
        <div class="h1 title-green ">特色學習登錄</div>
          <form class="needs-validation " v-on:submit.prevent="submit()"   >
            <div class="p-3">
          <div class="p-3 ">
            <input class="  bg-light form-control" v-model="form.user" placeholder="輸入您的學號" name="" id=""  required/>
          </div>
          <div class="input-group p-3">
            <input class="form-control" v-model="form.password" placeholder="Password" :type="passType" required >
            <div class="input-group-append">
              <button class="btn btn-icon" type="button" @click="showPassword">
                <i v-if="see" class="fas fa-eye-slash"></i>
                <i v-else class="fas fa-eye"></i>
              </button>
              
            </div>
          </div>
          <div  class="font-weight-bold text-danger" v-if="!notFirstLogin">
            {{ invalidUserMsg}}
          </div>
          </div>
        <div class="pt-3">

        <button type="submit"  class="btn  btn-lg btn-success ">
          登入
          <loading v-show="isLoading"></loading>
          </button>
        </div>
        </form>
        



      </div>
    </div>
    <div style="margin:auto">
       <img  src="../assets/mba-logo.png" alt="">
    </div>
   
  </div>
</template>

<script>
// @ is an alias to /src
import loading from '@/components/ele-loadingSmall'
  import {mapGetters,mapActions} from 'vuex'

export default {
  name: "Home",
  data() {
    return {
      info:null,
      form:{
        user:null,
        password:null,
      },
      isLoading:false,
      notFirstLogin:true,
      see:false,
      errorMsg:null,
      passType:'password',
    }
  },
  computed:{
    ...mapGetters({
      invalidUserMsg:'auth/invalidUserMsg'
    })
  },
  methods: {
    ...mapActions({
      signIn:'auth/signIn'
    }),
    showPassword(){
      let vm =this;
      if(vm.passType === 'password'){
        vm.passType = 'text'
        vm.see = !vm.see
      }else{
        vm.passType = 'password'
        vm.see = !vm.see
      }
    },
   async submit(){
      let vm =this;
      vm.isLoading =true
      await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
      vm.notFirstLogin = false;
      vm.signIn(vm.form).then( ()=>{
        vm.$router.replace({
          name:'StudentDash'
        })
      })
      vm.isLoading =false

     
    }
  },
  components: {
    loading
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";


.p-50{
  padding: 35% 10%;
}



.login-box {
  width: 40%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
}

.home{
      overflow: hidden;
      background-image: url("../assets/login-bg.jpg") ;
			background-position: center center;
			background-repeat:  no-repeat;
			background-attachment: fixed;
			background-size:  cover;
			background-color: #999;
}
</style>
