import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./plugins/element.js";


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this; //全局事件总线
  },
  render: h => h(App),
}).$mount('#app')
