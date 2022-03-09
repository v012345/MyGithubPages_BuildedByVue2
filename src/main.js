import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios';
import "./plugins/element.js";
import Echo from 'laravel-echo';
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// console.log(window.location.hostname)
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this; //全局事件总线
    Vue.prototype.$device = function () { return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? "mobile" : "PC" }()
    Vue.prototype.$Pusher = require("pusher-js")
    Vue.prototype.$Echo = new Echo({
      broadcaster: 'pusher',
      key: "ShdHLAikrhOsNRg9",
      wsHost: "api.nightowl.name",
      wsPort: 6001,
      forceTLS: false
    });
  },
  store,
  render: h => h(App),
}).$mount('#app')
