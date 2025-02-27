import { z } from "zod"

export const citySchema = z.object({
  city: z.string(),
  federateUnit: z.string()
})

export type CityDTO = z.infer<typeof citySchema>;

export const selectionProcessSchema = z.object({
  name: z.string(),
  openingDate: z.string(),
  url: z.string(),
  cityFormDTO: citySchema,
  boardExaminerId: z.number(),
  institutionId: z.number(),
  contentModeratorEmail: z.string(),
  selectionProcessStatusId: z.number(),
})

export type SelectionProcess = z.infer<typeof selectionProcessSchema>;
