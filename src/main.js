import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import { store } from './store'
import VModal from 'vue-js-modal'
// import jQuery from 'jquery'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

Vue.config.productionTip = false

window.jQuery = require('jquery')

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
