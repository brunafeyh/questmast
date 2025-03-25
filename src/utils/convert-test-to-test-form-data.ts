import { TestFormData } from "../types/test";
import { Test } from "../types/test-list";

export function convertTestToTestFormData(userEmail: string,  id: number, test?: Test): TestFormData {
  if (!test) {
    return {
      applicationDate: "",
      name: "",
      functionId: 0,
      professionalLevelId: 0,
      selectionProcessId: id,
      contentModeratorEmail: userEmail,
      questionList: [],
    };
  }

  return {
    applicationDate: test.applicationDate,
    name: test.name,
    functionId: test.function?.id ?? 0,
    professionalLevelId: test.professionalLevel?.id ?? 0,
    selectionProcessId: test.selectionProcess?.id || id ||  0,
    contentModeratorEmail: test.selectionProcess?.contentModerator?.mainEmail || userEmail,
    questionList: test.questionList?.map((question) => ({
      id: question.id,
      name: question.name,
      statementImage: question.statementImageUrl || undefined,
      statementImageLegend: question.statementImageLegend || undefined,
      statement: question.statement,
      explanation: question.explanation || undefined,
      videoExplanationUrl: question.videoExplanationUrl || undefined,
      questionAlternativeList: question.questionAlternativeList.map((alt) => ({
        id: alt.id,
        statement: alt.statement,
        isCorrect: alt.isCorrect,
      })),
      questionDifficultyLevelId: question.questionDifficultyLevel?.id ?? 0,
      subjectId: question.subject?.id ?? 0,
      subjectTopicList: question.subjectTopicList?.map((topic) => topic.id) ?? [],
    })) ?? [],
  };
}
