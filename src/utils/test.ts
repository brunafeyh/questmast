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
    solvedTest?: any;
}) {
    const { questionList, responses, questionTimes, testStartTime, testEndTime, solvedTest } = params;
    return questionList.map((question, index) => {
        let selectedAlternativeId
        if (solvedTest) {
            const solvedQuestion = solvedTest.solvedQuestionList.find(
                (sq: any) => sq.question.id === question.id
            )
            if (solvedQuestion && solvedQuestion.questionAlternative) selectedAlternativeId = solvedQuestion.questionAlternative.id;
            else selectedAlternativeId = -1;
        } else {
            const selectedIndex = responses[index];
            if (selectedIndex !== -1) selectedAlternativeId = question.questionAlternativeList[selectedIndex].id;
            else selectedAlternativeId = -1;
        }
        const qTime = questionTimes[index];
        return {
            startDateTime: qTime.startDateTime || testStartTime,
            endDateTime: qTime.endDateTime || testEndTime,
            selectedAlternativeId,
            questionId: question.id,
        }
    })
}

export function computeCorrectCount(solvedTest: any | null): number | null {
    if (!solvedTest || !solvedTest.solvedQuestionList) return null
    return solvedTest.solvedQuestionList.filter((sq: any) => sq.isCorrect).length;
}
