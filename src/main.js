import { createApp } from 'vue'
import App from './App.vue'
import Swal from 'sweetalert2'
import store from "./store/index"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    
  })

  window.toast=Toast
createApp(App).use(store).mount('#app')
