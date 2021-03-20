import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/index.css";
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
// import './assets/css/tailwind.css'
 
const myapp =createApp(App);
myapp.use(router)
myapp.mount('#app')
