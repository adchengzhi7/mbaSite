<template >
<nav class="navbar  fixed-top navbar-expand-lg navbar-light bg-light bg-shadow">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img class="img-fluid" src="../assets/mba-logo.png" width="30" height="30" alt="">
      <span class="ms-2 me-2 theme">特色學習登錄</span>
    </a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
     <ul class="navbar-nav me-auto mb-2 mb-lg-0 "></ul>
     <div class="d-flex">
       <avatar class="me-1 ms-1" :image="avatarImg" size="default" ></avatar>
       <ul class="navbar-nav me-2">
       <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{user}}
            </a>
            <div class="dropdown-menu dropdown-menu-start dropdown-menu-lg-end " aria-labelledby="navbarScrollingDropdown">
              <a class="dropdown-item" href="#" @click.prevent="signOut">登出</a>
            </div>
          </li>
      
      </ul>
     </div>

    </div>
  </div>
</nav>


</template>
<script>
import avatar from "./ele-avatar"
  import {mapGetters,mapActions} from 'vuex'

export default {
  data() {
    return {
      avatarImg:"http://placehold.it/64x64"
    }
  },
  components:{
    avatar
  },
  methods: {
    ...mapActions({
      signOutAction:'auth/signOut'
    }),
    signOut(){
        this.signOutAction().then(() =>{
          this.$router.replace({
            name:"Home"
          })
        })
    }
  },
  computed:{
    ...mapGetters({
      authenticated:'auth/authenticated',
      user:'auth/user'
    })
  }
}
</script>
<style scoped>
.bg-shadow {
    box-shadow: 0 5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2);
}
.theme{
    color: #38b269;
  font-weight: 900;
}

</style>