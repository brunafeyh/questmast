import { z } from "zod";

export const QuestionRespondFormSchema = z.object({
    questionnaireId: z.number(),
    startDateTime: z.string(), 
    endDateTime: z.string(),
    studentMainEmail: z.string(),
    solvedQuestionList: z.array(
      z.object({
        startDateTime: z.string(),
        endDateTime: z.string(),
        selectedAlternativeId: z.number(),
        questionId: z.number(),
      })
    ),
  });
  
  export type QuestionRespondForm = z.infer<typeof QuestionRespondFormSchema>;