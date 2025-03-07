import { z } from "zod"

export const subjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
})

export type Subject = z.infer<typeof subjectSchema>