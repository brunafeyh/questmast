export interface QuestionTime {
    startDateTime: string;
    endDateTime: string;
}

export function createSolvedQuestionList(params: {
    questionList: any[];
    responses: number[];
    questionTimes: QuestionTime[];
    testStartTime: string;
    testEndTime: string;
  }) {
    const { questionList, responses, questionTimes, testStartTime, testEndTime } = params;
  
    return questionList.map((question, index) => {
      const selectedIndex = responses[index]
      const qTime = questionTimes[index] || { startDateTime: testStartTime, endDateTime: testEndTime }

      console.log(selectedIndex)
      return {
        startDateTime: qTime.startDateTime || testStartTime,
        endDateTime: qTime.endDateTime || testEndTime,
        selectedAlternativeId: selectedIndex,
        questionId: question.id,
      };
    });
  }
  

export function computeCorrectCount(solvedTest: any | null): number | null {
    if (!solvedTest || !solvedTest.solvedQuestionList) return null
    return solvedTest.solvedQuestionList.filter((sq: any) => sq.isCorrect).length;
}
