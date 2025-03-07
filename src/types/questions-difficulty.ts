import { z } from "zod"

export const questiondifficultySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
})

export type Questiondifficulty = z.infer<typeof questiondifficultySchema>