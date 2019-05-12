import App from './App.vue';
import Vue from 'vue';
import router from './views/router';
import store from './stores';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
