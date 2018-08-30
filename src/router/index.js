import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/1" },
    {
      path: '/:id',
      name: 'Home',
      component: Home
    }
  ]
})
