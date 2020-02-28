import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import router from './router';
import App from './App.vue';
import LoadingBar from './components/LoadingBar.vue';
import cart from './components/cart.vue';
import 'animate.css/animate.min.css';

library.add(faShoppingCart);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('LoadingBar', LoadingBar);
Vue.component('cart', cart);

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
