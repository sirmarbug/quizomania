export default {
  namespaced: true,
  state: {
    answers: [],
  },
  mutations: {
    addAnswer(state, answer) {
      state.answers.push(answer);
    },
    resetAnswersArray(state) {
      state.answers = [];
    }
  }
}
