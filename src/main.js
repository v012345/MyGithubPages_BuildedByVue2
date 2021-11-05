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
    Vue.prototype.$device = function () { return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? "mobile" : "PC" }()
  },
  render: h => h(App),
}).$mount('#app')
