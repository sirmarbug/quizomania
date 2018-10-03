export function removingEmptyQuestions(questions) {
  let result = [];
  for (let i = 0; i < questions.length - 1; i++) {
    if (questions[i].goodAnswers.length > 0 && questions[i].goodAnswers[0] !== "") {
      result.push(questions[i]);
    }
  }
  return result;
}

// Return array with number questions
export function drawQuestions(count, lengthQuestions) {
  let randomNumberQuestion = 0;
  let repeatNumberQuestion = false;
  let numberQuestionsArray = [];
  while (numberQuestionsArray.length < count) {
    repeatNumberQuestion = false;
    randomNumberQuestion = Math.floor(Math.random() * lengthQuestions);
    if (randomNumberQuestion < lengthQuestions) {
      for (let i = 0; i < numberQuestionsArray.length; i++) {
        if (numberQuestionsArray[i] === randomNumberQuestion) {
          repeatNumberQuestion = true;
          break;
        }
      }
      if (!repeatNumberQuestion) {
        numberQuestionsArray.push(randomNumberQuestion);
      }
    }
  }
  return numberQuestionsArray;
}

export function createExamQuestions(questionsArray, questionsNumberArray) {
  let examQustions = [];
  for (let i = 0; i < questionsNumberArray.length; i++) {
    examQustions.push(questionsArray[questionsNumberArray[i]]);
  }
  return examQustions;
}
