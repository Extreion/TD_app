import Vue from 'vue'
import App from './App.vue'
import './components'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import "./plugins"
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueSweetalert2 from 'vue-sweetalert2';
// import VueFusionCharts from 'vue-fusioncharts';
// import FusionCharts from 'fusioncharts';
// import Column2D from 'fusioncharts/fusioncharts.charts';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Vue.config.productionTip = false

// Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);
const optionsSweetAlert = {
  confirmButtonColor: '#ee0314',
  cancelButtonColor: '#607d8b',
  customClass: 'notifSweetAlert'
};


Vue.use(VueSweetalert2, optionsSweetAlert);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
