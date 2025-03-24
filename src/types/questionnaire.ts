import { z } from "zod";

export const questionnaireFormSchema = z.object({
  name: z.string(),
  studentEmail: z.string(),
  isPublic: z.boolean(),
  questionnaireQuestionFormDTOList: z.array(
    z.object({
      subjectId: z.number(),
      subjectTopicIds: z.array(z.number()),
      quantity: z.number(),
      questionDifficultyLevelIds: z.array(z.number()),
    })
  ),
  questionFilterDTO: z.object({
    boardExaminerIds: z.array(z.number()),
    institutionIds: z.array(z.number()),
    functionIds: z.array(z.number()),
    questionDifficultyLevelIds: z.array(z.number()),
    subjectFilterDTOList: z.array(
      z.object({
        subjectId: z.number(),
        subjectTopicIds: z.array(z.number()),
      })
    ),
  }),
});

export type QuestionnaireForm = z.infer<typeof questionnaireFormSchema>;
