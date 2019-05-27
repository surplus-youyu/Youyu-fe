import App from './App.vue';
import Vue from 'vue';
import router from './views/router';
import store from './stores';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../theme/index.less';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
