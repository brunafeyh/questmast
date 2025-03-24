import { TestFormData } from "../types/test";
import { QuestionReturnIa } from "../types/question-return-ia";

export function convertQuestionsReturnIaToTestFormData(
    questions: QuestionReturnIa[], user: string
): TestFormData {
    return {
        applicationDate: new Date().toISOString().split("T")[0],
        name: "",
        functionId: 1,
        professionalLevelId: 1,
        selectionProcessId: 1,
        contentModeratorEmail: user,
        questionList: questions.map((q, index) => ({
            id: q.id ?? undefined,
            name: q.name || `Question ${index + 1}`,
            statementImage: q.statementImage || "",
            statement: q.statement || "No statement provided",
            explanation: q.explanation || "",
            videoExplanationUrl: q.videoExplanationUrl || "",
            questionAlternativeList: q.questionAlternativeList.map((alt) => ({
                id: alt.id ?? undefined,
                statement: alt.statement || "No alternative statement",
                isCorrect: alt.isCorrect ?? false,
            })),
            questionDifficultyLevelId: 0,
            subjectId: 0,
            subjectTopicList: [],
            quantityOfCorrectAnswers: 0,
            quantityOfWrongAnswers: 0,
            quantityOfTries: 0,
        })),
    }
}
