export function removingEmptyQuestions(array){
  let result = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].goodAnswers.length > 0 && array[i].goodAnswers[0] !== "") {
      result.push(array[i]);
    }
  }
  return result;
}
