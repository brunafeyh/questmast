import { z } from "zod"

export const userEmailSchema = z.object({
    name: z.string(),
    mainEmail: z.string(),
    recoveryEmail: z.string()
})

export type UserEmails = z.infer<typeof userEmailSchema>