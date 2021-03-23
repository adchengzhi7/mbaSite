<template >
       <div scroll="no" class=" bg-shadow" :class="{'closebar':!sidebarIsExpand,'sidebar':sidebarIsExpand}" 
       @mouseleave="sidebarIsExpand=false"
       @mouseenter="sidebarIsExpand=true">
         <div class="m-top text-left h-100 ">
           <div class="section-height">
            <router-link  :key="item.id" v-for="item in section"  :to="{name:item.router}" tag="div">
              <div class="section" :class="{'section-active':currentRouteName == item.router}" >
                <span class="p-4">
                <i :class="item.icon"></i>
                </span>
                <span v-show="sidebarIsExpand">{{item.title}}</span>
              </div>
            </router-link>
           </div>

           <div class="logout">
             <div class="dropdown-divider divider"></div>
             <div >
               <div class="section"  >
             <span class="p-4">
              <i class="far fa-arrow-alt-circle-left"></i>
             </span>
             <span v-show="sidebarIsExpand">登出</span>
           </div>
             </div>
           </div>
         </div>
       </div>
</template>
<script>
    export default {
      props:['modelValue','section'],  
  computed:{
    sidebarIsExpand:{
      get(){
        return this.modelValue
      },
      set(val){
        this.$emit('update:modelValue',val)

      }
    },
    currentRouteName() {
        return this.$route.name;
    }
  },
      data() {
        return {
        }
      },
       
    }
</script>
<style scoped>
.divider{
  margin: 0 25px;
}
.logout{
    height: 15%;

}
.section-height{
  height: 85%;
}
.section{
  padding:15px 0;
  color:#c0c0c0;
  font-weight: 900;
}
.section:hover{
    background-color:var(--hoverBgColor)
}
.section-active{
    color: var(--green);
}
.m-top{
  margin-top: 90px;
}

.closebar{
 width:65px;
  height: 100%;
  position: fixed;
  top:0;
  z-index: 2;
  background-color: #ffffff;

}
.sidebar{
  width:250px;
  height: 100%;
  position: fixed;
  top:0;
  z-index: 2;
  background-color: #ffffff;
}
a:link{
  text-decoration: none;
}

</style>