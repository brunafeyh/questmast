import { z } from 'zod';

const QuestionAlternativeSchema = z.object({
  id: z.number(),
  statement: z.string(),
  isCorrect: z.boolean(),
});

const QuestionDifficultyLevelSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const SubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const SubjectTopicSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  subject: SubjectSchema,
});

const QuestionSchema = z.object({
  id: z.number(),
  applicationDate: z.string(),
  isGeneratedByAi: z.boolean(),
  name: z.string(),
  statementImageUrl: z.string(),
  statementImageLegend: z.string(),
  statement: z.string(),
  quantityOfCorrectAnswers: z.number(),
  quantityOfWrongAnswers: z.number(),
  quantityOfTries: z.number(),
  explanation: z.string(),
  videoExplanationUrl: z.string(),
  questionAlternativeList: z.array(QuestionAlternativeSchema),
  questionDifficultyLevel: QuestionDifficultyLevelSchema,
  subject: SubjectSchema,
  subjectTopicList: z.array(SubjectTopicSchema),
});

const SolvedQuestionSchema = z.object({
  id: z.number(),
  isCorrect: z.boolean(),
  startDateTime: z.string(),
  endDateTime: z.string(),
  questionAlternative: QuestionAlternativeSchema,
  question: QuestionSchema,
});

const QuestionnaireSchema = z.object({
  id: z.number(),
  startDateTime: z.string(),
  endDateTime: z.string(), 
  quantityOfCorrectAnswers: z.number(),
  solvedQuestionList: z.array(SolvedQuestionSchema),
});

export type QuestionaryRespond = z.infer< typeof QuestionnaireSchema>