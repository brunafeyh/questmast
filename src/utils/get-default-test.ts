import { TestFormData } from "../types/test";
import { Test } from "../types/test-list";

export const getDefaultSelectionProcessTest = (selectionProcessTest: Test) => {
    const defaultValues: TestFormData = {
        applicationDate: selectionProcessTest.applicationDate,
        name: selectionProcessTest.name,
        functionId: selectionProcessTest.function.id,
        professionalLevelId: selectionProcessTest.professionalLevel.id,
        selectionProcessId: selectionProcessTest.selectionProcess.id,
        contentModeratorEmail: selectionProcessTest.selectionProcess.contentModerator.mainEmail || "",
        questionList: selectionProcessTest.questionList.map((q) => ({
            id: q.id,
            name: q.name,
            statementImage: q.statementImageUrl,
            statement: q.statement,
            explanation: q.explanation,
            videoExplanationUrl: q.videoExplanationUrl,
            questionAlternativeList: q.questionAlternativeList.map((alt) => ({
                id: alt.id,
                statement: alt.statement,
                isCorrect: alt.isCorrect,
            })),
            questionDifficultyLevelId: q.questionDifficultyLevel.id,
            subjectId: q.subject.id,
            subjectTopicList: q.subjectTopicList.map((topic) => topic.id),
        })),
    }
    return defaultValues
}