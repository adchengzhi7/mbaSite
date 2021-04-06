<template>
  <div > 
    <register-form :isTA="isTA" :currentRegPointUser="currentRegPointUser" :pointType="pointType" :pointData="pointData" ></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm'
import {mapGetters,mapActions} from 'vuex'

export default {

  components:{
    registerForm
  },
  computed:{
    ...mapGetters({
          currentRegPointUser:'currentRegPointUser',
          pointById:'userPoint/pointById'
        }),
    },
   mounted() {
      let vm =this;
      let pointsId = vm.$route.query.pointsId;
      if(!vm.currentRegPointUser && vm.isTA){
        vm.$router.push({ name: 'TaDash' })
      }
      if(!vm.currentRegPointUser && !vm.isTA){
        vm.$router.push({ name: 'StudentDash' })
      }
      if(pointsId){
        vm.getPointByPointId(pointsId);
      }
      if(vm.pointById){
        vm.sycnDataToComp();
      }
      

    },
    methods: {
    ...mapActions({
      getPointByPointId:'userPoint/getPointByPointId',
    }),
      sycnDataToComp(){
        let vm = this;
        vm.pointType.title =vm.pointById.section;
        vm.pointType.icon = vm.pointById.icon;
        vm.pointType.type= vm.pointById.type;

        vm.pointData.sectionTitle= vm.pointById.sectionTitle;
        vm.pointData.yearSelected= vm.pointById.yearSelected;
        vm.pointData.points= vm.pointById.point;
        vm.pointData.semesterSelected= vm.pointById.semesterSelected;
        vm.pointData.type= vm.pointById.type;
        vm.pointData.status= vm.pointById.status;
        vm.pointData.stuId= vm.pointById.stuId;
        vm.pointData.englishCredit= vm.pointById.englishCredit;

      }
    },
  
data() {
    return {
      pointType:{
        title:"",
        icon:"",
        type:"",
      },
      pointData:{
        sectionTitle:null,
        yearSelected : null,
        points : null,
        semesterSelected : null,
        type :null,
        status : null,
        stuId : null,
        englishCredit: null

      },
      isTA:true,
      
    }
  },
  

}
</script>
<style scoped>

</style>>
