import { z } from "zod";

export const questionAlternativeResponseSchema = z.object({
    id: z.number(),
    statement: z.string(),
    isCorrect: z.boolean(),
})
export type QuestionAlternativeResponse = z.infer<typeof questionAlternativeResponseSchema>;

export const subjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
})
export type Subject = z.infer<typeof subjectSchema>;

export const subjectTopicResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    subject: subjectSchema,
})
export type SubjectTopicResponse = z.infer<typeof subjectTopicResponseSchema>;

export const questionDifficultyLevelResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
})
export type QuestionDifficultyLevelResponse = z.infer<typeof questionDifficultyLevelResponseSchema>;

export const questionResponseSchema = z.object({
    id: z.number(),
    applicationDate: z.string(),
    name: z.string(),
    statementImageUrl: z.string(),
    statementImageLegend: z.string(),
    statement: z.string(),
    quantityOfCorrectAnswers: z.number(),
    quantityOfWrongAnswers: z.number(),
    quantityOfTries: z.number(),
    explanation: z.string(),
    videoExplanationUrl: z.string(),
    questionAlternativeList: z.array(questionAlternativeResponseSchema),
    questionDifficultyLevel: questionDifficultyLevelResponseSchema,
    subject: subjectSchema,
    subjectTopicList: z.array(subjectTopicResponseSchema),
});
export type QuestionResponse = z.infer<typeof questionResponseSchema>;

export const solvedQuestionResponseSchema = z.object({
    id: z.number(),
    isCorrect: z.boolean(),
    startDateTime: z.string(),
    endDateTime: z.string(),
    questionAlternative: questionAlternativeResponseSchema,
    question: questionResponseSchema,
})
export type SolvedQuestionResponse = z.infer<typeof solvedQuestionResponseSchema>;

export const solvedTestResponseSchema = z.object({
    id: z.number(),
    startDateTime: z.string(),
    endDateTime: z.string(),
    quantityOfCorrectAnswers: z.number(),
    solvedQuestionList: z.array(solvedQuestionResponseSchema),
});
export type SolvedTestResponse = z.infer<typeof solvedTestResponseSchema>;
