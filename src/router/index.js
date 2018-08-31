import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Learn from '@/components/Learn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: 'Home',
      component: Home
    },
    {
      path: '/learn/:id',
      name: 'Learn',
      component: Learn
    },
    {
      path: '/learn',
      redirect: "/learn/1"
    }
  ]
})
