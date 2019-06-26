import App from './App.vue';
import Vue from 'vue';
import router from './views/router';
import store from './stores';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../theme/index.less';
import * as VCharts from 'v-charts';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);
Vue.use(VCharts);
Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
