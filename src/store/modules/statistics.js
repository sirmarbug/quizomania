export default {
  namespaced: true,
  state: {
    allAnswers: 0,
    goodAnswers: 0,
    badAnswers: 0
  },
  mutations: {
    incrementAllAnswers(state) {
      state.allAnswers++;
    },
    incrementGoodAnswers(state) {
      state.goodAnswers++;
    },
    incrementBadAnswers(state) {
      state.badAnswers++;
    },
    resetAllAnswers(state) {
      state.allAnswers = 0;
    },
    resetGoodAnswers(state) {
      state.goodAnswers = 0;
    },
    resetBadAnswers(state) {
      state.badAnswers = 0;
    }
  },
  actions: {
    reset(context) {
      context.commit('resetAllAnswers');
      context.commit('resetGoodAnswers');
      context.commit('resetBadAnswers');
    }
  }
}
