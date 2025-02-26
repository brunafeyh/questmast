import { z } from "zod"

export const selectionProcessSchema = z.object({
  name: z.string(),
  openingDate: z.string(), 
  url: z.string(),
  cityId: z.number(),
  boardExaminerId: z.number(),
  institutionId: z.number(),
  contentModeratorId: z.number(),
  selectionProcessStatusId: z.number(),
})

export type SelectionProcess = z.infer<typeof selectionProcessSchema>;
