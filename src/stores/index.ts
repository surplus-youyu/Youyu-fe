import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 模块放置于此对象中即可
const modules = {
    // modules
};


export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
});
