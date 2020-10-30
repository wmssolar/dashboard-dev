import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardPlugin from './dashboard-plugin';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import JsonExcel from "vue-json-excel"

import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'

Vue.component('Pareto','highcharts/modules/pareto');
 
Vue.component("downloadExcel", JsonExcel);

Vue.use(HighchartsVue, {
	highcharts: Highcharts
})


Vue.use(ElementUI);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
 
import App from './App.vue';
Vue.config.devtools = true

 
// router setup
import routes from './routes/routes';

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // watch:{
  //   '$route'(to) {
  //     if(to.VueRouter.meta.reload==true){window.location.reload()}
  //   }
  // }
  
})
