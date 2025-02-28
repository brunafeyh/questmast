import { z } from "zod"

export const federateUnitSchema = z.object({
    name: z.string(),
    acronym: z.string()
})

export type FederateUnit = z.infer<typeof federateUnitSchema>

export const federateUnitListSchema = z.object({
    id: z.number(),
    name: z.string(),
    federateUnit: federateUnitSchema
  })