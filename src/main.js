// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import vueres from 'vue-resource';

// import 'common/sass/index.scss';

Vue.config.productionTip = false;

Vue.use(vueres);
/* eslint-disa  ble no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
