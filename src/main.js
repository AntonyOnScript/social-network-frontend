import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import http from "./http/http"

Vue.config.productionTip = false
Vue.config.silent = true

Vue.prototype.$http = http

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
