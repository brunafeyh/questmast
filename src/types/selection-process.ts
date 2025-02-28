import { z } from "zod"
import { federateUnitListSchema } from "./federate-unit";
import { boardExaminerSchema } from "./border-examiner";
import { institutionSchema } from "./institution";
import { contentModeratorSchema } from "./content-moderator";

export const citySchema = z.object({
  city: z.string().min(1, "A cidade é obrigatória"),
  federateUnit: z.string().min(1, "O Estado é obrigatório")
})

export type CityDTO = z.infer<typeof citySchema>;

export const selectionProcessSchema = z.object({
  name: z.string().min(1, "O Nome é obrigatório"),
  openingDate: z.string().min(1, "A data de Abertura é obrigatória"),
  url: z.string().optional(),
  cityFormDTO: citySchema,
  boardExaminerId: z.number().min(1, "A Banca é obrigatória"),
  institutionId: z.number().min(1, "A Instituição é obrigatória"),
  contentModeratorEmail: z.string(),
  selectionProcessStatusId: z.number().min(1, "O Status é obrigatório"),
})

export type SelectionProcess = z.infer<typeof selectionProcessSchema>;


export const cityListSchema = z.object({
  id: z.number(),
  name: z.string(),
  federateUnit: federateUnitListSchema,
})

export const statusSchema = z.object({
  id: z.number(),
  description: z.string()
})

export const selectionProcessListSchema = z.object({
  id: z.number(),
  name: z.string(),
  viewCounter: z.number(),
  creationDate: z.string(),
  openingDate: z.string(),
  url: z.string(),
  city: cityListSchema,
  boardExaminer: boardExaminerSchema,
  institution: institutionSchema,
  contentModerator: contentModeratorSchema,
  selectionProcessStatus: statusSchema
})

export type SelectionProcessList = z.infer<typeof selectionProcessListSchema>;