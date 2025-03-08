import { z } from "zod";

export const contentModeratorSchema = z.object({
    id: z.number(),
    name: z.string(),
    mainEmail: z.string()
});
export type ContentModerator = z.infer<typeof contentModeratorSchema>;

export const selectionProcessSchema = z.object({
    id: z.number(),
    name: z.string(),
    contentModerator: contentModeratorSchema,
});
export type SelectionProcess = z.infer<typeof selectionProcessSchema>;

export const testFunctionSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
});
export type TestFunction = z.infer<typeof testFunctionSchema>;

export const professionalLevelSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
});
export type ProfessionalLevel = z.infer<typeof professionalLevelSchema>;

export const questionAlternativeSchema = z.object({
    id: z.number(),
    statement: z.string(),
    isCorrect: z.boolean(),
});
export type QuestionAlternative = z.infer<typeof questionAlternativeSchema>;

export const questionDifficultyLevelSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
});
export type QuestionDifficultyLevel = z.infer<typeof questionDifficultyLevelSchema>;

export const subjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
});
export type Subject = z.infer<typeof subjectSchema>;

export const subjectTopicSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    subject: subjectSchema,
});
export type SubjectTopic = z.infer<typeof subjectTopicSchema>;

export const questionSchema = z.object({
    id: z.number(),
    applicationDate: z.string(),
    name: z.string(),
    statementImageUrl: z.string(),
    statement: z.string(),
    quantityOfCorrectAnswers: z.number(),
    quantityOfWrongAnswers: z.number(),
    quantityOfTries: z.number(),
    explanation: z.string(),
    videoExplanationUrl: z.string(),
    questionAlternativeList: z.array(questionAlternativeSchema),
    questionDifficultyLevel: questionDifficultyLevelSchema,
    subject: subjectSchema,
    subjectTopicList: z.array(subjectTopicSchema),
});
export type Question = z.infer<typeof questionSchema>;

export const testSchema = z.object({
    id: z.number(),
    name: z.string(),
    viewCounter: z.number(),
    questionList: z.array(questionSchema),
    applicationDate: z.string(),
    function: testFunctionSchema,
    professionalLevel: professionalLevelSchema,
    selectionProcess: selectionProcessSchema
});
export type Test = z.infer<typeof testSchema>;
