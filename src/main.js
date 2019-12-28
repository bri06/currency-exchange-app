import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import { VueSpinners } from '@saeris/vue-spinners';
import '@/assets/css/tailwind.css';
import App from './App.vue';


import router from '@/routes';

import { dollarFilter, percentFilter } from '@/utils';

Vue.use(VueSpinners);
Vue.use(Chartkick.use(Chart));


Vue.filter('dollar', dollarFilter);
Vue.filter('percent', percentFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
