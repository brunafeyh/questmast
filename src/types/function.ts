import { z } from "zod"

export const functionSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
})

export type Function = z.infer<typeof functionSchema>