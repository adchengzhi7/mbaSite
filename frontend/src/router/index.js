import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Student from '../views/Student.vue'
import TaIndex from '../views/Ta-index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/student",
    name: 'Student',
    component:Student

  },
  {
    path: "/ta",
    name: 'TaIndex',
    component:TaIndex


  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
