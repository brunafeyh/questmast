import { z } from "zod";

const QuestionPerMonthSchema = z.object({
  year: z.number(),
  month: z.number(),
  monthName: z.string(),
  count: z.number(),
});

const CorrectIncorrectPerMonthSchema = z.object({
  year: z.number(),
  month: z.number(),
  correctCount: z.number(),
  incorrectCount: z.number(),
});

const SubjectSchema = z.object({
  subjectId: z.number(),
  subjectName: z.string(),
  correctCount: z.number(),
  totalCount: z.number(),
  correctPercentage: z.number(),
});

export const StatsSchema = z.object({
  averageResponseTimeInSeconds: z.number(),
  numberOfQuestionnaires: z.number(),
  numberOfSelectionProcessTests: z.number(),
  overallCorrectPercentage: z.number(),
  questionsPerMonth: z.array(QuestionPerMonthSchema),
  correctIncorrectPerMonth: z.array(CorrectIncorrectPerMonthSchema),
  topSubjects: z.array(SubjectSchema),
  bottomSubjects: z.array(SubjectSchema),
});

export type Stats = z.infer<typeof StatsSchema>;
