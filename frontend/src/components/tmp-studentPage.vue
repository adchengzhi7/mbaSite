<template>
    <div>
        <div class="partTop">
       <div class="row">
        <div class="col"></div>
        <div class="col-8">
            <div class="col">
                <div class="d-flex justify-content-center ">
                <avatar :image="avatarImg" size="lg"></avatar>
                <div class=" avatar-box">
                    <h4 class="font-weight-bold m-0">{{userData.name}}</h4>
                    <div>{{userData.stuId}}</div>
                </div>
                </div>
            </div>

            <div class="col">
            <div class="avatar-box p-3 ">
                <div class="d-flex flex-wrap pb-3 ">
                <div >已確認點數</div>
                <div class="ms-auto" >{{totalPoint}}/3</div>
                </div>
                <div class="progress">
                <div class="progress-bar success" role="progressbar" :style="{'width':totalPointToPrecent }" :aria-valuenow="totalPointToPrecent" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            </div>
        </div>
        <div class="col"></div>
       </div>
       
       
       <div v-if="pointsLength == 0" class="row mt-5" >
         <div class="col-2"></div>
         <div class="col content-box" >
           <div style="margin:auto">

           <img width="500" class="img-fluid" src="../assets/bro.svg" alt="">
           </div>
         </div>
         <div class="col content-box text-center" >
           <h2 class="font-weight-bold">尚未登錄點數</h2>
           <p>點擊按鈕開始登錄點數吧！</p>
           <button class="btn btn-success success"> <i class="fas fa-plus"></i>  登錄點數</button>
         </div>
         <div class="col-2"></div>


       </div>
       <div v-else class="row mt-5">
         <div class="col"></div>
         <div class="col-8">

         <tables :isTA="isTA"></tables>
         </div>
         <div class="col"></div>
       </div>
     </div>
    </div>
</template>
<script>
import avatar from "../components/ele-avatar"
import tables from "../components/ele-tableStudent"
import { mapGetters} from 'vuex'

export default {
    props:["isTA","userData"],
    data() {
        return {
            finalPoints:0,
            avatarImg:"http://placehold.it/64x64",
           }
    },
     components:{
    avatar,
    tables
  },
  
  computed:{
   ...mapGetters({
      userPoints:'userPoint/userPoints',
    }),
   
    pointsLength(){
      let vm =this; 
      if(vm.userPoints){
        return vm.userPoints.length;
       }
      return 0;

    },
     totalPoint(){
      let vm =this; 
      if(vm.userPoints){
        const pointArray=Object.values(vm.userPoints).map(
          function(item) {
            if(item.status ==2){
              return item.point
            }
            return 0
          }
            
        );
        return vm.finalPoints= pointArray.reduce((sum,key)=> sum+key)
       }
      return 0;
    },
    totalPointToPrecent(){
      let vm =this;
      const pointPercent = vm.finalPoints/ 3 *100;
      return pointPercent.toString()+"%";
      
    }
  },
 
    
}
</script>
<style scoped>
    .avatar-box{
  margin: auto 17px;
}
.partTop{
  padding:20px;
  text-align: left;
  color :var(--color)
}

.success{
  background-color: var(--green);
  }

.content-box{
  margin: auto 0;
}
.review-box{
  padding:15px;
}
.review-box:hover{
  background-color: var(--hoverBgColor);
}
.circle.small {
  background:var(--success);
	border-radius: 50%;
	width: 5px;
	height: 5px;

}
</style>