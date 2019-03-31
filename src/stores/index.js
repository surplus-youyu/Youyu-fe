import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const modules = {
    // extra modules
  };

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production'
})
