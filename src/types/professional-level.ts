import { z } from "zod"

export const professionalLevelSchema = z.object({
    id: z.number(),
    name: z.string(),
    acronym: z.string()
})

export type ProfessionalLevel = z.infer<typeof professionalLevelSchema>