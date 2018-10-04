import Vue from 'vue';
import Vuex from 'vuex';
import question from './modules/question';
import statistics from './modules/statistics';
import exam from './modules/exam';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    question,
    exam,
    statistics
  }
});
