import { z } from "zod";

export const phoneSchema = z.object({
    number: z.string(),
    dddNumber: z.number(),
    ddiNumber: z.number()
})

export type PhoneType = z.infer<typeof phoneSchema>