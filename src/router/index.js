import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Learn from '@/components/Learn';
import Exam from '@/components/Exam';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: 'Home',
      component: Home
    },
    {
      path: "/exam",
      name: 'Exam',
      component: Exam
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
