<template>
  <div > 
     <div class="partTop">
       <div class="row mt-5">
         <div class="col"></div>
         <div class="col-8">
           <div class="d-flex mb-4">
             <div class="align-self-center">
               <img src="../assets/icon/global.svg" alt="">
             </div>
             <div class="text-left align-self-center">
               <h3 class="font-weight-boldest m-0   ">國際交換或雙聯學位</h3>
               <div class="text-muted">請輸入完整的單位名稱</div>
             </div>
           </div>
          <div class="text-left">
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
              <input class="form-control" type="text" v-model="a" placeholder="請輸入完整單位名稱">
              </div>
            </div>

            <div class="mt-3">
              <button class="btn btn-success btn-lg success ">提交申請</button>
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
  
data() {
    return {
      a:'',
      yearSelected:"",
      semesterSelected:"1",
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
     
      section:[{
        id:"S01",
        title:"學分查詢",
        icon:"fas fa-search",
        router:"Student"
      },
      {
        id:"S02",
        title:"登錄點數",
        icon:"far fa-plus-square",
         router:"StudentReg"
      }],
      
    }
  },
  computed:{
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
