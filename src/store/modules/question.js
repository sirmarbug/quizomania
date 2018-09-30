export default {
  namespaced: true,
  state: {
    selectedAnswer: false,
    submitClick: false,
    mode: 'learn',
    isGoodAnswer: false
  },
  getters: {
    examMode: state => {
      return state.mode === 'exam';
    },
    learnMode: state => {
      return state.mode === 'learn';
    },
    resultMode: state => {
      return state.mode === 'result';
    }
  },
  mutations: {
    selected(state) {
      state.selectedAnswer = true;
    },
    unselected(state) {
      state.selectedAnswer = false;
    },
    submitClicked(state) {
      state.submitClick = true;
    },
    unsubmitClicked(state) {
      state.submitClick = false;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    goodAnswer(state) {
      state.isGoodAnswer = true;
    },
    badAnswer(state) {
      state.isGoodAnswer = false;
    }
  }
}
