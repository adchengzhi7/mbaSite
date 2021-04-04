<template>
  <div > 
    <register-form :isTA="isTA"  ></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm'
export default {

  components:{
    registerForm
  },
  mounted() {

  },
  
data() {
    return {
      isTA:false,
      
      
    }
  },
  

}
</script>
<style scoped>

</style>>
