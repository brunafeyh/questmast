import { z } from "zod";

export const solvedQuestionSchema = z.object({
  startDateTime: z.string(),
  endDateTime: z.string(),
  selectedAlternativeId: z.number(),
  questionId: z.number(),
});
export type SolvedQuestion = z.infer<typeof solvedQuestionSchema>;

export const solvedSelectionProcessTestSchema = z.object({
  selectionProcessTestId: z.number(),
  startDateTime: z.string(), 
  endDateTime: z.string(),  
  studentMainEmail: z.string().email(),
  solvedQuestionList: z.array(solvedQuestionSchema),
});
export type SolvedSelectionProcessTest = z.infer<typeof solvedSelectionProcessTestSchema>;
