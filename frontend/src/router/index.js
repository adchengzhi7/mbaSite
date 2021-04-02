import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Student from '../views/Student.vue'
import Ta from '../views/Ta.vue'
import TaDash from '../views/Ta-Dash.vue'
import TaReview from '../views/Ta-Review.vue'
import TaReg from '../views/Ta-Reg.vue'
import TaStudentPage from '../views/Ta-StudentPage.vue'
import TaRegForm from '../views/Ta-Reg-Form.vue'
import readCsv from '../views/Ta-ImportUser.vue'
import StudentReg from '../views/Student-Reg.vue'
import StudentRegForm from '../views/Student-Reg-Form.vue'
import StudentDash from '../views/Student-Dash.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(store.getters['auth/authenticated'].token){
        if(store.getters['auth/authenticated'].userType == 0){return next({name:'Student'})}
        if(store.getters['auth/authenticated'].userType == 1){return next({name:'TA'})}
        return next()
      }else{
        return next()
      }
    },
  },
  {
    path: "/ta",
    name: 'Ta',
    redirect:"/ta/dash",
    component:Ta,
    meta:{
      needLogin:true
    },   
    children:[{
      path: "dash",
      name: 'TaDash',
      component:TaDash
    },
    {
      path: "review",
      name: 'TaReview',
      component:TaReview
    },
    {
      path: "student",
      name: 'TaStudentPage',
      component:TaStudentPage
    },
    {
      path: "register",
      name: 'TaReg',
      component:TaReg
    },
    {
      path:"registerForm",
      name:"TaRegForm",
      component:TaRegForm
    },
    {
      path:"readCsv",
      name:"readCsv",
      component:readCsv
    }
  ]


  },
  {
    path: "/student",
    name: 'Student',
    redirect:"/student/dash",
    component:Student,
    meta:{
      needLogin:true
    },    
    children:[{
      path: "dash",
      name: 'StudentDash',
      component:StudentDash
    },
    {
      path: "register",
      name: 'StudentReg',
      component:StudentReg,
    },
    {
      path:"registerForm",
      name:"StudentRegForm",
      component:StudentRegForm
    }]

  },
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin === true) {
    if(!store.getters['auth/authenticated'].token){
      return next({
        name:'Home'
      })
    }
    

  }
  next();
});



export default router
