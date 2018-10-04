export default {
  namespaced: true,
  state: {
    answers: [],
    result: false
  },
  mutations: {
    addAnswer(state, answer) {
      state.answers.push(answer);
    },
    resetAnswersArray(state) {
      state.answers = [];
    },
    enableResult(state) {
      state.result = true;
    },
    disableResult(state) {
      state.result = false;
    }
  }
}
