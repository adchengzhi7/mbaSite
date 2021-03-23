import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Student from '../views/Student.vue'
import Ta from '../views/Ta.vue'
import TaDash from '../views/Ta-Dash.vue'
import StudentReg from '../views/Student-Reg.vue'
import StudentRegType from '../views/Student-Reg-Type.vue'
import StudentDash from '../views/Student-Dash.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/ta",
    name: 'Ta',
    redirect:"/ta/dash",
    component:Ta,
    children:[{
      path: "dash",
      name: 'TaDash',
      component:TaDash
    }]


  },
  {
    path: "/student",
    name: 'Student',
    redirect:"/student/dash",
    component:Student,
    children:[{
      path: "dash",
      name: 'StudentDash',
      component:StudentDash
    },
    {
      path: "register",
      name: 'StudentReg',
      component:StudentReg,
      children:[
        {
          path:"type",
          name:"StudentRegType",
          component:StudentRegType
        }
      ]
    }]

  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
