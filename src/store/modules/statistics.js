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
  }
}
