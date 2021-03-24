<template>
  <div > 
     <div class="partTop">
       <div class="row mt-5">
         <div class="col"></div>
         <div class="col-8">
           <div class="d-flex mb-4">
             <div class="align-self-center">
               <img v-if="icon == 'global' " class="img-fluid" src="../assets/icon/global.svg" alt="">
               <img v-if="icon == 'intern' " class="img-fluid" src="../assets/icon/intern.svg" alt="">
               <img v-if="icon == 'confrence' " class="img-fluid" src="../assets/icon/confrence.svg" alt="">
               <img v-if="icon == 'competition' " class="img-fluid" src="../assets/icon/competition.svg" alt="">
               <img v-if="icon == 'volunteer' " class="img-fluid" src="../assets/icon/volunteer.svg" alt="">
               <img v-if="icon == 'caseStudy' " class="img-fluid" src="../assets/icon/caseStudy.svg" alt="">
               <img v-if="icon == 'english' " class="img-fluid" src="../assets/icon/english.svg" alt="">
             </div>
             <div class="text-left align-self-center">
               <h3 class="font-weight-boldest m-0   ">{{title}}</h3>
               <div class="text-muted">請輸入完整的單位名稱</div>
             </div>
           </div>
          <div v-if="type != 'english'" class="text-left">
            <div class="row">
                <div class="col input-col">
                    <select class="form-control" name="" id="" v-model="yearSelected">
                      <option value="none" disabled >選擇學年</option>
                      <option :key="'year'+year" v-for="year in getYear" :value="year"> {{year}} 學年</option>
                    </select>
                </div>
                <div class="col input-col">
                    <select class="form-control" name="" id="" v-model="semesterSelected">
                      <option value="none" class="icon-disabled" disabled  required>選擇學期</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                </div>
            </div>
            <div class="row">
              <div class="col input-col">
              <input class="form-control" type="text" v-model="sectionTitle" placeholder="請輸入完整單位名稱">
              </div>
            </div>
            
             <div class="row" v-if="isTA">
              <div class="col input-col">
                  <div class="input-group ">
                    <div class="input-group-append">
                      <button class="btn btn-secondary" type="button" @click="minusPoints" >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                    <input class="form-control" type="number" max="2"  v-model="checkPoint" required >
                    <div class="input-group-append">
                      
                      <button class="btn btn-secondary " type="button" @click="addPoints" >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
              </div>
            </div>
            <div class="mt-3">
              <button class="btn btn-success btn-lg success " @click="submit">提交申請</button>
            </div>
          </div>

          <div v-else class="text-left">
            <div class="row">
                <div class="col input-col">
                    <select class="form-control" name="" id="" v-model="englishSelected">
                      <option value="none" disabled selected >選擇英語檢定類別</option>
                      <option :key="'test-'+test" v-for="test in englishTest" :value="englishTest"> {{test}} </option>
                    </select>
                </div>
                
            </div>
            <div class="row">
              <div class="col input-col">
              <input class="form-control" type="text" v-model="englishPoint" placeholder="輸入英語檢定分數">
              </div>
            </div>
            
            <div class="mt-3">
              <button class="btn btn-success btn-lg success " @click="submit">提交申請</button>
            </div>
          </div>
          
         </div>
         <div class="col"></div>
         

       </div>
     </div>
  </div>
</template>

<script>
export default {

  components:{
  },
  mounted() {
    let vm =this;
    if(!vm.$route.params.type){
      vm.$router.push({ name: 'StudentReg' })
    }
    vm.title =vm.$route.params.title;
    vm.icon = vm.$route.params.icon;
    vm.type= vm.$route.params.type;


  },
  
data() {
    return {
      title:"",
      icon:"",
      type:"",
      sectionTitle:'',
      yearSelected:"",
      points:1,
      semesterSelected:"none",
      englishPoint:"",
      englishSelected:"none",
      englishTest:["TOEFL PBT","TOEFL CBT","TOEFL IBT","IELTS","TOEIC"],
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
  computed:{
    imageUrl(){
      let vm = this;
      return "../assets/icon/"+vm.icon+".svg"
    },
     checkPoint:{
       get() {
           let vm =this;
           if(vm.points >2){
             const error=">2";
             alert(error)
        }
            return vm.points
            
       },
       set(newValue){
        let vm =this;
        if(newValue >2){
           vm.points=2;
        }
        
       }
    
     
    },
    getYear(){
      let vm =this;
      const date = new Date();
      const year = date.getFullYear();
      const mingYear = year -1911;
      vm.yearSelected = mingYear;
      const yearStart=mingYear -5;
      const yearEnd=mingYear +5 ;
      const yearList=[];
      for (let i = yearStart; i < yearEnd; i++) {
          yearList.push(i)
      }
      return yearList
      
      
    }
  },
  methods: {
    
    submit(){
      let vm =this;
      const sectionTitle = this.sectionTitle;
      const yearSelected = this.yearSelected;
      const points = this.points;
      const semesterSelected = this.semesterSelected;
      const type =vm.$route.params.type;
      console.log(sectionTitle,yearSelected,points,semesterSelected,type);

    },
    addPoints(){
      let vm =this;
      if(vm.points >=2){vm.points=2}
      else{vm.points =  vm.points+1}
     
    },
    minusPoints(){
      let vm =this;
      if(vm.points === 0){vm.points=0}
      else{vm.points =  vm.points-1}
    }
    
  },

}
</script>
<style scoped>
.input-col{
  margin-bottom:20px
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("../assets/icon/arrowDown.svg");
  background-repeat: no-repeat;
  background-position-x: 97%;
  background-position-y: 50%;
  border-radius: 2px;
  padding: 1rem;
  font-weight: 700;
    font-size: 18px;
}
::placeholder {
  font-weight: 700;
   color:var(--disableColor)
}
option:first-of-type {
   color:var(--disableColor)
}
</style>>
