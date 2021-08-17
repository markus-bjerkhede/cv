import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from "@/router";
import toaster from '@meforma/vue-toaster';
import VueSmoothScroll from 'vue3-smooth-scroll'

createApp(App)
  .use(toaster)
  .use(store)
  .use(router)
  .use(VueSmoothScroll)
  .mount('#app')