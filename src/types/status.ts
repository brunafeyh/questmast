import { z } from "zod"

export const selectionProcessStatusSchema = z.object({
    id: z.number(),
    description: z.string()
})

export type SelectionProcessStatus = z.infer<typeof selectionProcessStatusSchema>;
