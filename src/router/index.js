import Vue from 'vue';
import Router from 'vue-router';
import seller from 'components/seller/seller';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/seller',
      component: seller
    }
  ]
});
