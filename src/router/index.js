import Vue from 'vue';
import Router from 'vue-router';
import Home from '@views/Home';
import Learn from '@views/Learn';
import Exam from '@views/Exam';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: 'home',
      component: Home
    },
    {
      path: "/exam",
      name: 'exam',
      component: Exam
    },
    {
      path: '/learn/:id',
      name: 'learn',
      component: Learn
    },
    {
      path: '/learn',
      redirect: "/learn/1"
    }
  ]
})
